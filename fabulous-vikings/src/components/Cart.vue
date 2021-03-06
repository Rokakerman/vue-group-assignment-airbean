<template>
  <section class="modal">
    <div class="header">
      <figure @click="$store.commit('showCart')" class="carticon">
        <img src="/assets/graphics/bag.svg" />
        <div class="cart-count">
          <p>{{ cartCount }}</p>
        </div>
      </figure>
    </div>
    <section class="cart-outer">
      <section class="cart-inner">
        <div class="tip"></div>
        <h1>Din Beställning</h1>
        <div class="cart cart--top" v-if="$store.state.cart.length">
          <div class="cart-item-cont" v-for="(el, index) in $store.state.cart" :key="index">
            <div class="cart-item cart-item--left">
              <h2>{{ el.title }}<span></span></h2>
              <p>{{ el.price }} kr</p>
            </div>
            <div class="cart-item cart-item--right">
              <button class="btn btn-up" @click="qty(el, 1)"></button>
              <transition name="fade" mode="out-in">
                <p class="cart-item-qty" :key="el.qty">{{ el.qty }}</p>
              </transition>

              <button class="btn btn-dn" @click="qty(el, -1)"></button>
            </div>
          </div>
        </div>
        <div v-else>
          -- Din varukorg är tom --
        </div>
        <div class="cart" v-if="$store.state.cart.length">
          <div class="cart-total-cont">
            <div class="cart-item cart-total--left">
              <h1>Total<span></span></h1>
            </div>
            <div class="cart-total--right">
              <transition name="fade" mode="out-in">
                <h1 class="cart-item-qty">{{ animatedTotal }} kr</h1>
              </transition>
            </div>
          </div>
          <p>inkl moms + drönarleverans</p>
          <div v-if="error">
            <h2>Error:</h2>
            <p>{{ error }}</p>
          </div>
          <button v-else-if="!loading" class="checkout-btn" @click="sendOrder">Take my money!</button>
          <h2 v-else>Sending order...</h2>
        </div>
      </section>
    </section>
  </section>
</template>

<script>
export default {
  data: () => {
    return {
      tweenedTotal: 0,
      error: '',
      loading: false
    }
  },
  methods: {
    qty(element, qty) {
      this.$store.dispatch('changeItemQty', {
        el: element,
        qty: qty
      })
    },
    async sendOrder() {
      this.loading = true
      try {
        await this.$store.dispatch('sendOrder')
      } catch (e) {
        this.error = e.status + ' - ' + e.message
      }
      this.loading = false
      this.$router.push('status')
    },
    async signIn() {
      this.$store.commit('setUserData', { userName: 'Pippo Franco', userEmail: 'asd@asd.it' })
      try {
        await this.$store.dispatch('signIn')
      } catch (e) {
        console.log('error', e.message)
      }
    },
    async orderHistory() {
      try {
        await this.$store.dispatch('loadOrderHistory')
      } catch (e) {
        console.log('error', e.message)
      }
    }

  },
  computed: {
    cartTotal() {
      return this.$store.getters.cartTotal
    },
    total() {
      return this.cartTotal[1]
    },
    cartCount() {
      return this.$store.getters.cartTotal[0]
    },
    animatedTotal: function() {
      return this.tweenedTotal ? this.tweenedTotal.toFixed(0) : this.tweenedTotal
    }
  },
  watch: {
    total: function(newValue) {
      window.gsap.to(this.$data, { duration: 0.5, tweenedTotal: newValue })
    }
  },
  created() {
    this.tweenedTotal = this.total
  },
  destroyed() {
    this.$store.commit('showCart', false)
  }
}
</script>

<style scoped>
.modal {
  position: fixed;
  color: white;
  width: 100vw;
  height: 100vh;
  left: 0;
  top: 0;
  background: rgba(0, 0, 0, 0.61);
}
.header {
  display: flex;
  justify-content: flex-end;
  height: 5rem;
}

.cart-outer {
  display: flex;
  justify-content: center;
  align-items: center;
}

.cart-inner {
  font-size: 1rem;
  position: relative;
  max-height: 80vh;
  width: 90vw;
  max-width: 30rem;
  color: var(--bean-black);
  background-color: white;
  border-radius: 5px;
  padding: 0 0.5rem 2rem 0.5rem;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
}

.cart-inner h1 {
  font-size: 2em;
}

.tip {
  position: absolute;
  border-radius: 2px;
  right: 1.3rem;
  top: -0.2rem;
  width: 20px;
  height: 20px;
  background: white;
  transform: rotate(45deg);
  z-index: -1;
}

.cart {
  width: 21rem;
}
.cart--top {
  overflow-y: auto;
}

::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background-color: #ebebeb;
  -webkit-border-radius: 8px;
  border-radius: 8px;
}

::-webkit-scrollbar-thumb {
  -webkit-border-radius: 8px;
  border-radius: 8px;
  background: rgba(47, 41, 38, 0.541);
}

.cart-item-cont {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}

.cart-item {
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  overflow: hidden;
}
.cart-item--left {
  align-items: flex-start;
  width: 19rem;
}
.cart-item--right {
  align-items: center;
  width: 2rem;
}
.cart-item h2,
.cart-item h1 {
  margin-block-start: 0.7rem;
  margin-block-end: 0.3rem;
  white-space: nowrap;
}

.cart-item--left p {
  margin-block-start: 0.1rem;
  margin-block-end: 0.3rem;
}
.cart-item--right p {
  font-weight: 600;
  margin-block-start: 0.3rem;
  margin-block-end: 0.3rem;
}
span {
  display: inline-block;
  width: 300px;
  height: 10px;
  background-image: linear-gradient(to right, black 20%, rgba(255, 255, 255, 0) 0%);
  background-position: bottom;
  background-size: 5px 1px;
  background-repeat: repeat-x;
}
.btn-up {
  background: url('/assets/graphics/arrow-up.svg');
}
.btn-dn {
  background: url('/assets/graphics/arrow-down.svg');
}
.btn {
  width: 1rem;
  height: 0.5rem;
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
  border: none;
  cursor: pointer;
  transform: scale(1);
  transition: transform 0.5s;
}
.btn:focus {
  outline: none;
}
.btn:active {
  transform: scale(1.5);
  transition: 0s;
}

.cart > p {
  margin-block-start: 0.2rem;
  margin-block-end: 2rem;
  text-align: left;
}
.cart-total-cont {
  padding: 2.5rem 0 0 0;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}

.cart-total--left {
  align-items: flex-start;
}
.cart-total--right {
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  text-align: right;
  white-space: nowrap;
}
.cart-total--right h1 {
  margin-block-start: 0.7rem;
  margin-block-end: 0.3rem;
}
.cart-total--left p {
  margin-block-start: 0.1rem;
  margin-block-end: 0.3rem;
}

.fade-enter-active,
.fade-leave-active {
  transition: all 0.2s ease;
}
.fade-enter {
  transform: translateY(-20px);
  opacity: 0;
}
.fade-leave-to {
  transform: translateY(+20px);
  opacity: 0;
}

.checkout-btn {
  font-size: 1.9rem;
  padding: 0.8rem 2rem;
  border: none;
  border-radius: 2.5rem;
  color: white;
  background-color: var(--bean-black);
  /* outline: none; */
  /* margin-bottom: 2rem; */
}

@media screen and (min-width: 500px) {
  .tip {
    visibility: hidden;
  }
}
</style>
