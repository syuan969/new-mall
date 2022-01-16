<template>
  <div id="cart">
    <nav-bar class="nav-bar">
      <div slot="center">购物车({{cartCount}})</div>
    </nav-bar>
    <!-- <scroll class="content"> -->
      <cart-list
        class="cart-list"
        :cart-list="cartList"
      ></cart-list>
    <!-- </scroll> -->
    <bottom-bar></bottom-bar>
  </div>
</template>

<script>
import NavBar from "common/navbar/NavBar";
import CartList from "./childComps/CartList";
import BottomBar from './childComps/BottomBar'
import Scroll from "common/scroll/Scroll";

export default {
  name: "Cart",
  components: {
    NavBar,
    CartList,
    Scroll,
    BottomBar
  },
  computed: {
    cartList() {
      return this.$store.getters.cartList;
    },
    cartCount() {
      return this.$store.getters.cartCount;
    },
  },
};
</script>

<style scoped>
#cart {
  /* position: relative; */
  height: 100vh;
}

#cart .nav-bar {
  background-color: var(--color-tint);
  font-weight: 700;
  color: #fff;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 99;
}
.content {
  position: absolute;
  top: 0px;
  bottom: 49px;
}
.cart-list {
  position: absolute; 
  top: 44px;
  padding-bottom: 93px;
  width: 100vw;
  background-color: pink;
}
</style>
