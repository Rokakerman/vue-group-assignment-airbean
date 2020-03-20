<template>
  <section>
    <MenuItem v-for="(el, index) in menu" :key="el.id" :index="index" :item="el" />
  </section>
</template>

<script>
import MenuItem from './MenuItem.vue'
export default {
  components: {
    MenuItem
  },
  computed: {
    menu() {
      return this.$store.state.menu
    }
  },
  created() {
    this.$store.dispatch('loadMenu')
  }
}
</script>

<style></style>
