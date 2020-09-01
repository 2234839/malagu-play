import Vue from 'vue';
import VueCompositionAPI, {
    defineComponent,
    reactive,
    ref,
} from '@vue/composition-api';
Vue.use(VueCompositionAPI);
import { chessPieceType, GameState, tapBox, winner } from '../common/data';

export default defineComponent({
    setup() {
        function onClickBox(i: number) {
            tapBox(i);
        }

        return { winner, chessPieceType, GameState, onClickBox };
    },
});
