import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    menu: [],
    cart: JSON.parse(window.localStorage.getItem('cart')) ? JSON.parse(window.localStorage.getItem('cart')) : [],
    showCart: false
  },
  getters: {
    cartTotal(state) {
      // cartTotal returns an array of 2 items:
      // 1st is the total items in cart,
      // 2nd is the total value of items in cart
      return state.cart.reduce(
        (total, el) => {
          return [total[0] + el.qty, total[1] + el.qty * el.price]
        },
        [0, 0]
      )
    }
  },
  mutations: {
    loadMenu(state, menu) {
      state.menu = menu
    },
    addToCart(state, item) {
      const id = state.cart.findIndex(el => el.id === item.id)
      if (id > -1) {
        state.cart[id].qty++
      } else {
        state.cart = [...state.cart, { ...item, qty: 1 }]
      }
      window.localStorage.setItem('cart', JSON.stringify(state.cart))
    },
    showCart(state, value) {
      if (value == null) state.showCart = !state.showCart
      else state.showCart = value
    },
    changeItemQty(state, obj) {
      const id = state.cart.findIndex(el => el.id === obj.el.id)
      if (id > -1) {
        state.cart[id].qty += obj.qty
        if (state.cart[id].qty <= 0) state.cart.splice(id, 1)
        window.localStorage.setItem('cart', JSON.stringify(state.cart))
      }
    }
  },
  actions: {
    async loadMenu(ctx) {
      ctx.commit(
        'loadMenu',
        await fetch('http://localhost:5000/api/beans/', { method: 'GET' })
          .then(data => data.json())
          .then(res => JSON.parse(JSON.stringify(res.menu)))
      )
    },
    sendOrder() {
      console.log('dispatch sendOrder')
    },
    addToCart(ctx, item) {
      ctx.commit('addToCart', item)
    },
    changeItemQty(ctx, obj) {
      ctx.commit('changeItemQty', obj)
    }
  },
  modules: {}
})
