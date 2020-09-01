import Vue from "vue";
export default Vue.extend({
  data() {
    return {
      count: 0 as any,
    };
  },
  methods: {
    test() {
      this.count++;
    },
  },
});
