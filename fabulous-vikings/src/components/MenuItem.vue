<template>
  <section class="main-cont">
    <button class="ext" @click="addToCart"></button>
    <div class="inner-cont">
      <h2>{{ item.title }}<span></span></h2>
      <p>{{ item.desc }}</p>
    </div>
    <h2 class="ext price">{{ item.price }} kr</h2>
  </section>
</template>

<script>
export default {
  props: {
    item: Object
  },
  methods: {
    addToCart() {
      this.$store.dispatch('addToCart', this.item)
    }
  }
}
</script>

<style scoped>
.main-cont {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin: 0.8rem 0;
}
.inner-cont {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  overflow-x: hidden;
  max-width: 17rem;
}

h2,
p {
  white-space: pre;
  margin-block-start: 0.2rem;
  margin-block-end: 0.2rem;
  color: var(--bean-black);
}
span {
  display: inline-block;
  width: 200px;
  height: 10px;
  background-image: linear-gradient(to right, black 20%, rgba(255, 255, 255, 0) 0%);
  background-position: bottom;
  background-size: 5px 1px;
  background-repeat: repeat-x;
}
.ext {
  margin: 0 1rem;
}
.price {
  margin-block-start: 0.2rem;
  align-self: flex-start;
}
button {
  cursor: pointer;
  background: url('/assets/graphics/add.svg');
  background-repeat: no-repeat;
  background-color: var(--bean-black);
  background-position: center;
  background-size: 55%;
  border: none;
  border-radius: 50%;
  width: 2rem;
  height: 2rem;
}
</style>
