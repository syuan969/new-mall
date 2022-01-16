import {
  ADD_COUNTER, ADD_TO_CART
} from './mutations-types'

export default {
  addCart(context, payload) {
    console.log('这里是addCart');
    let oldProduct = context.state.cartList.find(item => item.iid === payload.iid);

    if (oldProduct) {
      // oldProduct.count += 1
      console.log('-------');
      context.commit(ADD_COUNTER, oldProduct)
    } else {
      payload.count = 1
      console.log('++++++++++++++');
      // state.cartList.push(payload)
      context.commit(ADD_TO_CART, payload)
    }
    // console.log(state.cartList);
  }
}