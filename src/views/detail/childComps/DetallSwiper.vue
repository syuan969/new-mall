<template>
  <div>
    <swiper class="detail-swiper">
      <swiper-item
        class="item"
        v-for="(item,index) in images"
        :key="index"
      >
        <img
          :src="item"
          alt=""
        >
      </swiper-item>
    </swiper>
  </div>
</template>

<script>
import Swiper from "components/common/swiper/Swiper";
import SwiperItem from "components/common/swiper/SwiperItem";
export default {
  name: "DetailSwiper",
  components: {
    Swiper,
    SwiperItem,
  },
  props: {
    images: {
      type: Array,
      default() {
        return [];
      },
    },
  },
};
</script>

<style scoped>
.detail-swiper{
  height: 300px;
}
.item {
    text-align: center;
    /* margin-top: 30px; */
    height: 300px;
    /* overflow: hidden; */
  }
.detail-swiper .item img {
    /* height: 100%; */
    /* background-position-y: 20px; */
    /* object-fit:contain;  */
    width: 100%;
  }
</style>