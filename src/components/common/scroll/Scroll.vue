<template>
  <div
    class="wrapper"
    ref="wrapper"
  >
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from "better-scroll";
export default {
  name: "Scroll",
  data() {
    return {
      scroll: null,
    };
  },
  props: {
    probeType: {
      type: Number,
      default: 1,
    },
    pullUpLoad: {
      type: Boolean,
      default: false,
    },
  },
  mounted() {
    this.scroll = new BScroll(this.$refs.wrapper, {
      click: true,
      probeType: this.probeType,
      pullUpLoad: this.pullUpLoad,
      observeDom:true,
      observeImage:true
    });
    // 2.将监听事件回调
    this.scroll.on("scroll", (position) => {
      this.$emit("scroll", position);
    });
    // console.log(this.scroll);
    // 3.监听上拉到底部
    this.scroll.on("pullingUp", () => {
      // console.log("上拉加载");
      this.$emit("pullingUp");
    });
  },
  methods: {
    scrollTo(x, y, time = 300) {
      this.scroll.scrollTo(x, y, time);
    },
    finishPullUp() {
      this.scroll.finishPullUp();
    },
    refresh() {
      this.scroll && this.scroll.refresh && this.scroll.refresh();
      // console.log('--------');
      //  console.log(this.scroll.scrollerHeight);
    },
    getScrollY(){
      return this.scroll? this.scroll.y:0
    }
  },
};
</script>

<style scoped>
</style>