import VueCompositionAPI, {
    computed,
    reactive,
    ref,
    watch,
    watchEffect,
} from '@vue/composition-api';
import Vue from 'vue';
Vue.use(VueCompositionAPI);
import { readable } from 'svelte/store';

const air = Symbol('空格子');
const white = Symbol('白方');
const black = Symbol('黑方');

export const chessPieceType = { air, white, black };

type chessPieceType = typeof air | typeof white | typeof black;

class Box {
    state = air as chessPieceType;
}

export function newGame() {
    const table = ref([0, 0, 0, 0, 0, 0, 0, 0, 0].map(() => new Box()));
    const winner = computed(() =>
        calculateWinner(table.value.map(el => el.state)),
    );
    const nextChessPiece = computed(() =>
        table.value.filter(el => el.state !== air).length % 2 === 0
            ? white
            : black,
    );
    /** 点击某个格子 */
    function tapBox(i: number) {
        if (winner.value) {
            return console.log('已决出胜负');
        }

        const c = table.value[i];
        const v = c.state;

        if (v !== air) {
            return console.log('这里已经被占用了');
        } else {
            c.state = nextChessPiece.value;
        }
    }
    /** 计算胜利者 */
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
    /** 提供一份数据给svelte */
    const svelteState = readable(
        {
            table: table.value,
            winner: winner.value,
            nextChessPiece: nextChessPiece.value,
        },
        set => {
            watchEffect(() => {
                set({
                    table: table.value,
                    winner: winner.value,
                    nextChessPiece: nextChessPiece.value,
                });
            });
        },
    );
    return { table, winner, tapBox, nextChessPiece, svelteState };
}

export const defaultGame = newGame();
