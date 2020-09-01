import { computed, reactive, watch, watchEffect } from '@vue/composition-api';
import { readable } from 'svelte/store';

const air = Symbol('空格子');
const white = Symbol('白方');
const black = Symbol('黑方');

export const chessPieceType = { air, white, black };

type chessPieceType = typeof air | typeof white | typeof black;

class Box {
    state = air as chessPieceType;
}

export const GameState = reactive({
    table: [0, 0, 0, 0, 0, 0, 0, 0, 0].map(() => new Box()),
});

export const winner = computed(() =>
    calculateWinner(GameState.table.map(el => el.state)),
);

/** 点击某个格子 */
export function tapBox(i: number) {
    if (winner.value) {
        return console.log('已决出胜负');
    }

    const c = GameState.table[i];
    const v = c.state;

    if (v !== air) {
        return console.log('这里已经被占用了');
    } else {
        const i = GameState.table.filter(el => el.state !== air).length;
        c.state = i % 2 === 0 ? white : black;
    }
}

export const _GameState = readable(GameState, set => {
    const destroy = watch(
        GameState,
        () => {
            console.log('[GameState]', GameState);
            set(GameState);
        },
        { deep: true, immediate: true },
    );
    return () => destroy();
});

function calculateWinner(squares: chessPieceType[]) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (
            squares[a] &&
            squares[a] === squares[b] &&
            squares[a] === squares[c]
        ) {
            if (squares[a] === air) {
                continue;
            }
            return squares[a];
        }
    }
    return null;
}
