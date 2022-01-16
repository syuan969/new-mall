<template>
  <nav-bar class="bgc">
    <img
      src="~assets/img/common/back.svg"
      slot="left"
      class="back"
      @click="backClick"
    >
    <div
      slot="center"
      class="title"
    >
      <span
        v-for="(item,index) in title"
        :key="index"
        class="title-item"
        :class="{active:index===currentIndex}"
        @click="itemClick(index)"
      >{{item}}</span>
    </div>
  </nav-bar>
</template>

<script>
import NavBar from "common/navbar/NavBar";
export default {
  name: "DetailNavBar",
  components: {
    NavBar,
  },
  data() {
    return {
      title: ["商品", "参数", "评论", "推荐"],
      currentIndex: 0,
    };
  },
  // activated(){
  //   this.currentIndex==0
  // },
  methods: {
    // 返回上一页
    backClick() {
      this.$router.back();
    },
    // 点击文字变色
    itemClick(index){
      this.currentIndex=index
      this.$emit('titleClick',index)
    }
  },
};
</script>

<style scoped>
/* #navbar{
  background-color: #fff;
} */
.bgc{
  background-color: #fff;
}
.back {
  margin-top: 10px;
  margin-right: 20px;
}
.title {
  display: flex;
  padding: 0 20px;
  font-size: 14px;
}
.title-item {
  flex: 1;
}
.title-item.active {
  color: var(--color-high-text);
}
</style>