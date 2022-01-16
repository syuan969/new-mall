<template>
  <div id="home">
    <nav-bar class="nav-bar">
      <div slot="center">首页</div>
    </nav-bar>
    <tab-control
        @itemClick="tabClick"
        :titles="['流行','新款','精选']"
        ref="tabControl1"
        class="tabcontrol"
        v-show="isTabFixed"
      ></tab-control>
    <scroll
      class="content"
      ref="scroll"
      :probe-type="3"
      @scroll="contentScroll"
      :pull-up-load="true"
      @pullingUp='loadMore'
    >
      <home-swiper
        :banners="banners"
        @hsLoad='hsLoad'
      ></home-swiper>
      <recommend-view :recommends="recommends"></recommend-view>
      <feature-view></feature-view>
      <tab-control
        @itemClick="tabClick"
        :titles="['流行','新款','精选']"
        ref="tabControl2"
      ></tab-control>
      <goods-list :goodslist="showGoodsList" />
    </scroll>
    <back-top
      @click.native='backTop'
      class="back-top"
      v-show="showBackTop"
    >
    </back-top>

  </div>
</template>

<script>
import NavBar from "common/navbar/NavBar";
import Scroll from "common/scroll/Scroll";
import TabControl from "content/tabControl/TabControl";
import GoodsList from "content/goods/GoodsList";
import BackTop from "content/backTop/BackTop";
import { getHomeMultidata, getHomeGoods } from "network/home";

import HomeSwiper from "views/home/childComps/HomeSwiper";
import RecommendView from "views/home/childComps/RecommendView";
import FeatureView from "views/home/childComps/FeatureView";

export default {
  name: "Home",
  components: {
    NavBar,
    Scroll,
    TabControl,
    GoodsList,
    BackTop,
    HomeSwiper,
    RecommendView,
    FeatureView,
  },
  data() {
    return {
      banners: [],
      recommends: [],
      goodsList: {
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] },
      },
      currentType: "pop",
      showBackTop: false,
      tabOffsetTop: 0,
      isTabFixed: false,
      saveY:0,
      itemImglistener:null
    };
  },
  created() {
    // 1.请求多个数据
    this.getHomeMultidata();
    // 2.请求商品数据
    this.getHomeGoods("new");
    this.getHomeGoods("pop");
    this.getHomeGoods("sell");
  },
  mounted() {
    const refresh = this.debounce(this.$refs.scroll.refresh, 50);
    this.itemImglistener=()=>{
      refresh();
    }
    // this.$bus.$on("sanyuan", () => {
    //   // this.$refs.scroll && this.$refs.scroll.refresh()
    //   refresh();
    // });
    this.$bus.$on('sanyuan',this.itemImglistener)
    // 获取轮播图加载后tab的offsettop
    // setTimeout(() => {}, 2000); 
  },
  computed: {
    showGoodsList() {
      return this.goodsList[this.currentType].list;
    },
  },
  destroyed(){
    // console.log('11111111111');

  },
  activated(){
    // console.log('activated');
    // this.$refs.scroll.refresh();
    this.$refs.scroll.scrollTo(0,this.saveY)
    this.$refs.scroll.refresh();
    
  },
  deactivated(){
    // console.log('deactivated');
    // this.$bus.$emit("upClick")
    this.saveY=this.$refs.scroll.getScrollY()
    this.$bus.$off("itemImgLoad",this.itemImglistener)
  },
  methods: {
    debounce(func, delay) {
      let timer = null;
      return function (...args) {
        if (timer) clearTimeout(timer);
        timer = setTimeout(() => {
          func.apply(this, args);
        }, delay);
      };
    },
    contentScroll(position) {
      this.showBackTop = -position.y > 1000;
      this.isTabFixed = -position.y > this.tabOffsetTop;
    },
    tabClick(index) {
      switch (index) {
        case 0:
          this.currentType = "pop";
          break;
        case 1:
          this.currentType = "new";
          break;
        case 2:
          this.currentType = "sell";
          break;
      }
      this.$refs.tabControl1.currentIndex=index;
      this.$refs.tabControl2.currentIndex=index;
    },
    getHomeMultidata() {
      getHomeMultidata().then((res) => {
        // console.log(res);
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
      });
    },
    getHomeGoods(type) {
      const page = this.goodsList[type].page + 1;
      getHomeGoods(type, page).then((res) => {
        this.goodsList[type].list.push(...res.data.list);
        this.goodsList[type].page += 1;
        this.$refs.scroll.finishPullUp();
      });
    },
    loadMore() {
      this.getHomeGoods(this.currentType);
      this.$refs.scroll.refresh();
    },
    backTop() {
      // console.log("111");
      this.$refs.scroll.scrollTo(0, 0, 300);
    },
    hsLoad() {
      // console.log(this.$refs.tabControl.$el.offsetTop);
      this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop;
    },
  },
};
</script>

<style scoped>
#home {
  /* position: relative; */
  /* padding-top: 44px; */
  height: 100vh;
}
.nav-bar {
  background-color: var(--color-tint);
  font-weight: 700;
  color: #fff;

  /* position: fixed;
  left: 0;
  right: 0;
  top: 0;*/
  /* z-index: 9; */
}

.content {
  /* background-color: pink; */
  /* height: 300px; */
  /* overflow: hidden; */
  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
}
.back-top {
  position: fixed;
  right: 10px;
  bottom: 55px;
}
.fixed {
  position: fixed;
  top: 44px;
  left: 0;
  right: 0;
}
.tabcontrol{
  position: relative;
  z-index: 9;
}
</style>
