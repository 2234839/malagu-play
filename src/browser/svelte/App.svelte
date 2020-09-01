<script>
    import { defaultGame, chessPieceType } from '../common/data';
    const s = defaultGame.svelteState;
</script>

<style>
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

<div class="c-board">
    {#each $s.table as item, index}
        <div class="c-board-box" on:click={() => defaultGame.tapBox(index)}>
            {chessPieceType.air === item.state ? '' : chessPieceType.white === item.state ? '⚪' : chessPieceType.black === item.state ? '⚫' : '🛑'}
        </div>
    {/each}
</div>
<div class="c-info">
    <div>
        胜利者：{$s.winner === null ? '' : $s.winner === chessPieceType.white ? '执白子（⚪）者胜' : '执黑子（⚫）者胜'}
    </div>
    <div>
        下一颗棋子：{$s.nextChessPiece === chessPieceType.white ? '白子（⚪）' : '黑子（⚫）'}
    </div>
</div>
