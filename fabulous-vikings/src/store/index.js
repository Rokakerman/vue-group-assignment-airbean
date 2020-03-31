import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    menu: [],
    cart: JSON.parse(window.localStorage.getItem('cart')) ? JSON.parse(window.localStorage.getItem('cart')) : [],
    showCart: false,
    userData: {
      UUID: JSON.parse(window.localStorage.getItem('UUID')) ? JSON.parse(window.localStorage.getItem('UUID')) : '',
      userRegistered: JSON.parse(window.localStorage.getItem('userRegistered'))
        ? JSON.parse(window.localStorage.getItem('userRegistered'))
        : false,
      userName: JSON.parse(window.localStorage.getItem('userName'))
        ? JSON.parse(window.localStorage.getItem('userName'))
        : '',
      userEmail: JSON.parse(window.localStorage.getItem('userEmail'))
        ? JSON.parse(window.localStorage.getItem('userEmail'))
        : '',
      gdpr: 0
    },

    newOrder: JSON.parse(window.localStorage.getItem('newOrder'))
      ? JSON.parse(window.localStorage.getItem('newOrder'))
      : { orderNr: '', eta: 0, orderDateTime: '' }, //till orderstatus här ska datan hämtas
    orderHistory: { list: [], total: 0 } //till orderhistory
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
    setUserData({ userData }, user) {
      userData.userName = user.userName
      userData.userEmail = user.userEmail
      userData.gdpr = user.gdpr
    },
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
    },
    newOrder(state, apiRes) {
      console.log('order', apiRes)
      console.log('UUID', !state.userData.UUID)
      if (!state.userData.UUID) {
        state.userData.UUID = apiRes.UUID
        window.localStorage.setItem('UUID', JSON.stringify(state.userData.UUID))
      }
      if (!state.userData.userRegistered && apiRes.userRegistered) {
        state.userData.userRegistered = true
        window.localStorage.setItem('userRegistered', JSON.stringify(true))
      }
      state.newOrder.orderNr = apiRes.orderNr
      state.newOrder.eta = apiRes.eta
      state.cart = []
      window.localStorage.setItem('cart', JSON.stringify(state.cart))
      state.newOrder.orderDateTime = new Date().getTime() + Number(apiRes.eta) * 60000
      window.localStorage.setItem('newOrder', JSON.stringify(state.newOrder))
    },
    saveUser(state, resApi) {
      if (state.userData.UUID == null || !state.userData.UUID) {
        state.userData.UUID = resApi.UUID
        window.localStorage.setItem('UUID', JSON.stringify(resApi.UUID))
      }
      state.userData.userRegistered = true
      window.localStorage.setItem('userRegistered', JSON.stringify(true))
      // userData.userName = resApi.userName
      window.localStorage.setItem('userName', JSON.stringify(resApi.userName))
      // userData.userEmail = resApi.userEmail
      window.localStorage.setItem('userEmail', JSON.stringify(resApi.userEmail))
    },
    orderHistory(state, apiRes) {
      state.orderHistory = {}
      state.orderHistory = { list: apiRes.orders, total: apiRes.totalOrders }
    }
  },
  actions: {
    async signIn({ commit, state }) {
      if (!state.userData.userName || !state.userData.userEmail)
        throw { status: 400, message: 'user Name and Email are mandatory' }

      const result = await fetch('http://localhost:5000/api/beans/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(state.userData)
      })
        .then(data => data.json())
        .then(res => JSON.parse(JSON.stringify(res)))
      // console.log('fetchresult', result)
      if (result.status === 200) commit('saveUser', result)
      else throw { status: result.status, message: result.message }
    },
    async loadMenu({ commit }) {
      commit(
        'loadMenu',
        await fetch('http://localhost:5000/api/beans/', { method: 'GET' })
          .then(data => data.json())
          .then(res => JSON.parse(JSON.stringify(res.menu)))
      )
    },
    async sendOrder({ commit, state }) {
      // console.log('dispatch sendOrder')
      const result = await fetch('http://localhost:5000/api/beans/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({ UUID: state.userData.UUID, items: state.cart })
      })
        .then(data => data.json())
        .then(res => JSON.parse(JSON.stringify(res)))
      if (result.status === 200) commit('newOrder', result)
      else throw { status: result.status, message: result.message }
    },
    async loadOrderHistory({ commit, state }) {
      const result = await fetch('http://localhost:5000/api/beans/orderhistory/' + state.userData.UUID, {
        method: 'GET'
      })
        .then(data => data.json())
        .then(res => JSON.parse(JSON.stringify(res)))
      if (result.status === 200) {
        commit('orderHistory', result)
        // console.log('fetchresult', result)
      } else throw { status: result.status, message: result.message }
    },
    addToCart({ commit }, item) {
      commit('addToCart', item)
    },
    changeItemQty({ commit }, obj) {
      commit('changeItemQty', obj)
    }
  },
  modules: {}
})
