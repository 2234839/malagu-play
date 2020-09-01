<template>
    <div>
        <div class="c-board">
            <div
                v-for="(item, index) of table"
                :key="index"
                class="c-board-box"
                @click="() => tapBox(index)"
            >
                {{
                    chessPieceType.air === item.state
                        ? ''
                        : chessPieceType.white === item.state
                        ? '⚪'
                        : chessPieceType.black === item.state
                        ? '⚫'
                        : '🛑'
                }}
            </div>
        </div>
        <div class="c-info">
            胜利者：{{
                winner === null
                    ? ''
                    : winner === chessPieceType.white
                    ? '执白子（⚪）者胜'
                    : '执黑子（⚫）者胜'
            }}
        </div>
    </div>
</template>

<script src="./_app.ts" lang="ts"></script>

<style scoped>
.c-board {
    --size: 240px;
    display: flex;
    flex-wrap: wrap;
    width: 240px;
}
.c-board-box {
    --l: calc(var(--size) / 3);
    width: var(--l);
    height: var(--l);
    outline: 1px solid black;
    display: flex;
    justify-content: space-around;
    align-items: center;
    font-size: calc(var(--l) * 0.6);
}
</style>
