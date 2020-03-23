<template>
  <section>
    <Cart v-if="$store.state.showCart" />
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

<style></style>
