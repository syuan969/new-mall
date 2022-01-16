<template>
  <div id="app">
      <keep-alive exclude="Detail">
        <router-view></router-view>
      </keep-alive>
    <main-tab-bar id="maintab"></main-tab-bar>
    <!-- <h2>ssss</h2> -->
   
  </div>
</template>

<script>
  import MainTabBar from 'content/mainTabbar/MainTabBar'
  export default {
    name: 'app',
    components: {
      MainTabBar,

    }
  }
</script>

<style>
  @import "assets/css/base.css";

  #app {
    position: relative;
  }
  /* #maintab{
    z-index: 999;
  } */
</style>
