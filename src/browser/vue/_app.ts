
import VueCompositionAPI, { defineComponent } from '@vue/composition-api';
import { chessPieceType, defaultGame } from '../common/data';

export default defineComponent({
    setup() {
        const g = defaultGame;
        const { table, tapBox, winner } = g;
        return { chessPieceType, table, tapBox, winner };
    },
});
