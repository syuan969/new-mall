<template>
  <div class="goods">
    <!-- <h2>{{goodslist}}</h2> -->
    <goods-list-item v-for="item in goodslist" :goodsitem='item' :key="item.a"> </goods-list-item>
  </div>
</template>

<script>
import GoodsListItem from './GoodsListItem.vue'
export default {
  name: "GoodsList",
  props:{
    goodslist:{
      type:Array,
      default:[]
    }
  },
  components:{
    GoodsListItem
  }
};
</script>

<style scoped>
.goods{
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
}
</style>