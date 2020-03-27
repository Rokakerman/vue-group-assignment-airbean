<template>
  <section class="menu-cont">
    <Cart v-if="$store.state.showCart" />
    <header class="header">
      <h1 class="title">Meny</h1>
    </header>
    <MenuItem v-for="(el, index) in menu" :key="el.id" :index="index" :item="el" />
  </section>
</template>

<script>
import MenuItem from './MenuItem.vue'
import Cart from './Cart.vue'
export default {
  components: {
    MenuItem,
    Cart
  },
  computed: {
    menu() {
      return this.$store.state.menu
    }
  },
  created() {
    this.$store.dispatch('loadMenu')
    // console.log(window.localStorage.getItem('cart'))
  }
}
</script>

<style scoped>
.menu-cont {
  box-sizing: border-box;
  max-height: 70vh;
  overflow-y: auto;
  overflow-x: hidden;
}

.title {
  font-size: 2rem;
  text-align: center;
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
</style>
