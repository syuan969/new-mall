import Vue from 'vue'
import Vuex from 'vuex'

// import mutations from './mutations'
// import actions from './actions'
import getters from './getters'

Vue.use(Vuex)
const state = {
  cartList: []
};
const store=new Vuex.Store({
  state,
  mutations:{
    abc(state,payload){
      console.log('zxcxc');
      const product=state.cartList.find(item => item.iid === payload.iid)
      if(product){
        product.count+=1
      }else {
        payload.count =1
        payload.checked =true
        state.cartList.push(payload)
      }
    }
  },
  actions:{
    zxc(context,payload){
      console.log('shuodao');
    }
  },
  getters
})

export default store