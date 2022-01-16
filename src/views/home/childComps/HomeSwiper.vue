<template>
   <div>
     <swiper>
      <swiper-item v-for="item in banners" :key="item.acm"> 
        <a :href="item.link">
          <img :src="item.image" alt="" @load="imageLoad">
        </a>
      </swiper-item>
    </swiper>
   </div>
</template>

<script>
import Swiper from "components/common/swiper/Swiper"
import SwiperItem from "components/common/swiper/SwiperItem"
export default {
  name:"HomeSwiper",
  components:{
    Swiper,
    SwiperItem
  },
  props:{
    banners:{
      type:Array,
      data(){
        return[]
      }
    }
  },
  data(){
    return{
      isLoad:false
    }
  },
  methods:{
    imageLoad(){
      if(!this.isLoad){
        this.$emit("hsLoad")
        this.isLoad=true
      }
    }
  }

}
</script>

<style>

</style>