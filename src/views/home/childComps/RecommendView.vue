<template>
  <div class="recommend">
    <div
      v-for="item in recommends"
      :key="item.a"
      class="recommend-item"
    >
      <a :href="item.link">
        <img
          :src="item.image"
          alt=""
        >
        <div>{{item.title}}</div>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: "RecommendView",
  props: {
    recommends: {
      type: Array,
      default() {
        return [];
      },
    },
  },
};
</script>

<style scoped>
.recommend {
  display: flex;
  /* width: 100%;  */
  text-align: center;
  /* font-size: 12px; */
  /* margin-top: 30px; */
  /* padding: 10px 0 30px; */
  margin-top: 10px;
  font-size: 14px;
  padding-bottom: 30px;
  border-bottom: 10px solid #eee;
}
.recommend-item {
  flex: 1;
  width: 25vw;
}
.recommend-item img {
  width: 70px;
  padding-bottom: 10px;
}
</style>