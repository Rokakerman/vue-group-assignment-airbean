<template>
  <div class="main-view">
    <Navigation
      v-on:closeNav="closingNav"
      v-on:showMenu="displayMenu"
      v-on:showAbout="displayAbout"
      v-on:showOrderStatus="orderStatus"
      v-if="displayNav == true"
    />
    <Order 
      v-if="displayOrderStatus === true"
      v-on:closeOrderStatus="shutDownStatus"
    />
    <header class="main-header">
      <div class="header-icon-wrapper-left">
        <figure v-on:click="showNav" class="navicon">
          <img src="/assets/graphics/navicon.svg" />
        </figure>
      </div>
      <div class="header-icon-wrapper-right">
        <figure @click="$store.commit('showCart')" v-if="!view" class="carticon">
          <img src="/assets/graphics/bag.svg" />
          <div class="cart-count"> <p> {{cartCount}} </p> </div>
        </figure>
      </div>
    </header>
    <main class="main-content">
      <About v-if="view" />
      <Menu v-else />
    </main>
    <footer class="main-footer"></footer>
  </div>
</template>

<script>
import about from '../components/About'
import menu from '../components/Menu'
import navigation from '../components/Navigation'
import orderstatus from '../components/OrderStatus'

export default {
  components: {
    About: about,
    Menu: menu,
    Navigation: navigation,
    Order: orderstatus
  },
  props: {
    view: Boolean
  },
  data() {
    return {
      displayNav: false,
      displayOrderStatus: false
    }
  },
  computed: {
    cartCount() {
      return this.$store.getters.cartTotal[0];
    }
  },
  methods: {
    showNav() {
      return (this.displayNav = true)
    },
    closingNav() {
      return (this.displayNav = false)
    },
    displayMenu() {
      if(this.$router == '/menu') {
        console.log('not pushing')
        return this.closingNav()
      }
      else {
        this.$router.push('/menu')
        return this.closingNav()
      }
    },
    displayAbout() {
      if(this.$router == '/about') {
        console.log('not pushing')
        return this.closingNav()
      }
      else {
        this.$router.push('/about')
        return this.closingNav()
      }
    },
    orderStatus() {
      this.displayOrderStatus = true;
    },
    shutDownStatus() {
      return this.displayOrderStatus = false;
    }
  }
}
</script>

<style>
body {
  margin: 0px;
  padding: 0px;
}

.main-view {
  margin: 0px;
  padding: 0px;
  height: 100vh;
  /* background-color: var(--bean-pink); */
}

.main-header:before {
  position: absolute;
  background-image: url('/assets/graphics/graphics-header2.svg');
  width: 100%;
  height: 100%;

  z-index: -1;
  content: '';
  transform: rotate(180deg);
  background-position: bottom;
  background-repeat: no-repeat;
  background-size: auto 800px;
  background-color: var(--bean-pink);
}
.main-header {
  position: relative;
  overflow: hidden;
  border: none;
  height: 15%;
  display: flex;
}

.header-icon-wrapper-left {
  height: 100%;
  width: 50%;
  background: none;
}

.header-icon-wrapper-right {
  display: flex;
  flex-direction: column;
  flex-wrap: wrap-reverse;
  height: 100%;
  width: 50%;
  background: none;
}

.navicon {
  height: 45px;
  width: 45px;
  padding: 0px;
  margin: 0px;
  border-radius: 50%;
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 20px 0px 0px 20px;
  cursor: pointer;
}

.carticon {
  height: 45px;
  width: 45px;
  padding: 0px;
  margin: 0px;
  border-radius: 50%;
  background-color: black;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 20px 20px 0px 0px;
  cursor: pointer;
  position: relative;
}

.cart-count {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: var(--bean-orange);
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 13px;
  position: absolute;
  top: 0px;
  right: 0px;
}

.main-content {
  background-image: url('/assets/graphics/graphics-footer2.svg');
  background-position: bottom;
  background-repeat: no-repeat;
  background-color: var(--bean-pink);
  background-size: auto 800px;
  min-height: 85%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.main-footer {
  background: url('/assets/graphics/graphics-footer.svg');
  background-repeat: no-repeat;
}
</style>
/* eslint-disable */
