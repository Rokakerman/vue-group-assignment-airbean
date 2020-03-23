<template>
  <section class="modal">
    <button @click="$store.commit('showCart')" class="carticon">
      <img src="/assets/graphics/bag.svg" />
    </button>
    <section class="cart-outer">
      <section class="cart-inner">
        <div class="tip"></div>
        <h1>Din Beställning</h1>
        <div class="cart" v-if="$store.state.cart.length">
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
          Your Cart is empty
        </div>
        <div class="cart">
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
          <button class="checkout-btn" @click="sendOrder">Take my money!</button>
        </div>
      </section>
    </section>
  </section>
</template>

<script>
export default {
  data: () => {
    return {
      tweenedTotal: 0
    }
  },
  methods: {
    qty(element, qty) {
      this.$store.dispatch('changeItemQty', {
        el: element,
        qty: qty
      })
    },
    sendOrder() {
      this.$store.dispatch('sendOrder')
    }
  },
  computed: {
    cartTotal() {
      return this.$store.getters.cartTotal
    },
    total() {
      return this.cartTotal[1]
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
  }
}
</script>

<style>
.modal {
  position: fixed;
  color: white;
  width: 100vw;
  height: 100vh;
  left: 0;
  top: 0;
  background: rgba(0, 0, 0, 0.61);
}

.cart-outer {
  display: flex;
  justify-content: center;
  align-items: center;
}

.cart-inner {
  font-size: 1rem;
  position: relative;
  max-height: 90vh;
  width: 90vw;
  max-width: 30rem;
  color: var(--bean-black);
  background-color: white;
  border-radius: 5px;
  padding: 0 0.5rem;
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
  right: 1rem;
  top: -0.2rem;
  width: 20px;
  height: 20px;
  background: white;
  transform: rotate(45deg);
  z-index: -1;
}

.cart {
  overflow-y: none;
  width: 21rem;
}
.cart:first-of-type {
  overflow-y: auto;
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
  /* border: 1px solid var(--bean-black); */
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
  /* font-size: 0.9rem; */
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
  /* width: 13rem; */
  align-items: flex-start;
}
.cart-total--right {
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  /* border: 1px solid var(--bean-black); */
  /* overflow: hidden; */
  /* width: 8rem; */
  text-align: right;

  white-space: nowrap;
  /* align-items: flex-start; */
}
.cart-total--right h1 {
  margin-block-start: 0.7rem;
  margin-block-end: 0.3rem;
}
.cart-total--left p {
  margin-block-start: 0.1rem;
  margin-block-end: 0.3rem;
}
/* .cart-total--right h1 {
  margin-block-start: 0.1rem;
  margin-block-end: 0.3rem;
} */

/* .cart-item-qty {
  overflow-y: hidden;
} */
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
  margin-bottom: 4rem;
}
</style>
