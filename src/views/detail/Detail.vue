<template>
  <div id="detail">
    <detail-nav-bar
      @titleClick='titleClick'
      ref="nav"
    ></detail-nav-bar>
    <!-- <ul id="abc">
      <li v-for="item in $store.state.cartList" :key="item.a">
        {{item}}
      </li>
    </ul> -->
    <scroll
      class="content"
      ref="scroll"
      @scroll="contentScroll"
      :probeType="3"
    >
      <detail-swiper
        ref="base"
        :images="topImages"
      ></detail-swiper>
      <detail-base-info :goods="goods" />
      <detail-shop-info :shop="shop"></detail-shop-info>
      <detail-goods-info :detailInfo="detailInfo"></detail-goods-info>
      <detail-param-info
        :paramInfo="paramInfo"
        ref="eDg"
      ></detail-param-info>
      <detail-comment-info
        :commentInfo="commentInfo"
        ref="comment"
      ></detail-comment-info>
      <detail-recomment-info
        :recommendList="recommend"
        ref="recommend"
      ></detail-recomment-info>
      <!-- <goods-list :goodslist="recommend"></goods-list> -->
    </scroll>
    <detail-bottom-bar
      id="dbb"
      @addToCart="addToCart"
    ></detail-bottom-bar>
    <back-top
      class="back-top"
      v-show="showBackTop"
      @click.native='backTop'
    ></back-top>
  </div>
</template>

<script>
import { debounce } from "../../common/utils";
import Scroll from "common/scroll/Scroll";

import DetailNavBar from "./childComps/DetallNavBar.vue";
import DetailSwiper from "./childComps/DetallSwiper.vue";
import DetailBaseInfo from "./childComps/DetailBaseInfo.vue";
import DetailShopInfo from "./childComps/DetailShopInfo.vue";
import DetailGoodsInfo from "./childComps/DetailGoodsInfo.vue";
import DetailParamInfo from "./childComps/DetailParamInfo.vue";
import DetailCommentInfo from "./childComps/DetailCommentInfo";
import DetailRecommentInfo from "./childComps/DetailRecommentInfo.vue";
import DetailBottomBar from "./childComps/DetailBottomBar.vue";
import GoodsList from "content/goods/GoodsList";
import {
  getDetail,
  Goods,
  Shop,
  GoodsParam,
  getRecommend,
} from "network/detail";

import BackTop from "content/backTop/BackTop";
import { backTopMixin } from "@/common/mixin";
export default {
  name: "Detail",
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
      recommend: [],
      themeTopYs: [],
      getThemeTopY: null,
      // itemImglistener:null
      currentIndex: 0,
      // showBackTop: false
    };
  },
  mixins: [backTopMixin],
  created() {
    // 1.保存传入的iid
    this.iid = this.$route.params.iid;
    // 2.根据iid请求详情数据
    getDetail(this.iid).then((res) => {
      // console.log(res);
      const data = res.result;
      // 1.顶部信息/轮播图
      this.topImages = res.result.itemInfo.topImages;
      // 2.商品信息
      this.goods = new Goods(
        data.itemInfo,
        data.columns,
        data.shopInfo.services
      );
      // 3.店铺信息
      this.shop = new Shop(data.shopInfo);
      // 4.商品详情信息
      this.detailInfo = data.detailInfo;
      // 5.参数信息
      this.paramInfo = new GoodsParam(
        data.itemParams.info,
        data.itemParams.rule
      );
      // 6.评论信息
      if (data.rate.list) {
        this.commentInfo = data.rate.list[0];
      }
    }),
      // 3.推荐商品
      getRecommend().then((res) => {
        this.recommend = res.data.list;
      });
    // 4.点击跳转
    this.getThemeTopY = debounce(() => {
      this.themeTopYs = [];
      this.themeTopYs.push(0);
      this.themeTopYs.push(this.$refs.eDg.$el.offsetTop);
      this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
      this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
      // console.log(this.themeTopYs);
    }, 1000);
  },
  mounted() {
    const refresh = debounce(this.$refs.scroll.refresh, 50);
    this.itemImglistener = () => {
      refresh();
    };
    this.$car.$on("detailImg", () => {
      // this.getThemeTopY();

      refresh();
    });
  },
  updated() {
    this.cBa();
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
    titleClick(index) {
      // console.log(index);
      this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 100);
    },
    cBa() {
      // console.log('---------------------------------------');
      this.getThemeTopY();
    },
    contentScroll(position) {
      // console.log(position);
      this.showBackTop = -position.y > 1000;
      const positionY = -position.y;
      let length = this.themeTopYs.length;
      for (let i = 0; i < length; i++) {
        if (
          this.currentIndex !== i &&
          ((i < length - 1 &&
            positionY >= this.themeTopYs[i] &&
            positionY < this.themeTopYs[i + 1]) ||
            (i === length - 1) & (positionY > this.themeTopYs[i]))
        ) {
          this.currentIndex = i;
          // console.log(this.currentIndex);
          this.$refs.nav.currentIndex = this.currentIndex;
        }
      }
    },
    addToCart() {
      console.log('-----------');
      // 1.创建对象
      const obj = {};
      // 2.对象信息
      obj.iid = this.iid;
      obj.imgURL = this.topImages[0];
      obj.title = this.goods.title;
      obj.desc = this.goods.desc;
      obj.newPrice = this.goods.nowPrice;
      // 3.添加到Store中
      // this.$store.dispatch("zxc", obj);
      this.$store.commit("abc", obj);
    },
  },
  components: {
    Scroll,
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    DetailRecommentInfo,
    DetailBottomBar,
    GoodsList,
    BackTop,
  },
};
</script>

<style scoped>
#abc {
  position: absolute;
  width: 100%;
  z-index: 9999;
  background-color: #fff;
}
#detail {
  width: 100%;
  height: 100vh;
  position: relative;
  z-index: 9;
  background-color: #fff;
}
.content {
  position: absolute;
  top: 44px;
  bottom: 60px;
}
.back-top {
  position: fixed;
  right: 10px;
  bottom: 55px;
}
#dbb {
  position: absolute;
  z-index: 999;
}
</style>