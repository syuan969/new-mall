import{
  ADD_COUNTER,ADD_TO_CART
} from './mutations-types'

export default {
  [ADD_COUNTER](state, payload) {
    console.log('shoudao');
    payload.count++
  },
  [ADD_TO_CART](state, payload) {
    state.cartList.push(payload)
  }
}