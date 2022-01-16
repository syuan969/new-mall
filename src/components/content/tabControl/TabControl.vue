<template>
  <div class="tab-control">
    <div class="tab-control-item" :class="{active:currentIndex===index}" v-for="(item, index) in titles" @click="itemClick(index)" :key="item.a">
      <span>{{item}}</span>
    </div>
  </div>
</template>

<script>
export default {
name:"TabControl",
props:{
  titles:{
    type:Array,
    data(){
      return[]
    }
  }
},
data(){
  return{
    currentIndex:0
  }
},
methods:{
  itemClick(index){
    // 1.改变currentIndex
    this.currentIndex=index
    // 2.从内部发到外部
    this.$emit('itemClick',index)
  }
}
}
</script>

<style scoped>
.tab-control{
  display: flex;
  text-align: center;
  line-height: 40px;
  font-size: 15px;
  background-color: #fff;
  z-index: 9;
}
 .tab-control-item {
    flex: 1;
  }
  .active {
    color: var(--color-high-text);
  }
   .tab-control-item span {
    padding: 5px;
  }
  .active span {
    border-bottom: 2px solid var(--color-high-text);
  }
</style>