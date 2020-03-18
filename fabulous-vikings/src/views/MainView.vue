<template>
  <div v-if="view"><p>About</p></div>
  <div v-else><p>Menu</p></div>
</template>

<script>
export default {
  props: {
    view: Boolean
  }
}
</script>

<style></style>
