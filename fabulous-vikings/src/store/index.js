import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    menu: [],
    cart: window.localStorage.getItem('cart') ? window.localStorage.getItem('cart') : []
  },
  mutations: {
    loadMenu(state, menu) {
      state.menu = menu
    },
    addToCart(state, item) {
      state.cart = [...state.cart, item]
      window.localStorage.setItem('cart', JSON.stringify(state.cart))
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
    addToCart(ctx, item) {
      ctx.commit('addToCart', item)
    }
  },
  modules: {}
})
