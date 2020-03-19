<template>
  <div class="main-view">
    <header class="main-header">
      <div class="header-icon-wrapper"> <figure class="navicon"> <img src="/assets/graphics/navicon.svg"> </figure> </div>
      <div class="header-icon-wrapper"> <figure class="carticon"> <img src="/assets/graphics/bag.svg"> </figure> </div>
    </header>
    <main class="main-content">
      <div v-if="view"><p>About</p></div>
      <div v-else><p>Menu</p></div>
    </main>
    <footer class="main-footer">

    </footer>
  </div>
</template>

<script>
export default {
  props: {
    view: Boolean
  },
  data() {
    return {

    }
  },
  methods: {

  },
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
  background-color:  #F3E4E1;
}

.main-header {
  background: url('/assets/graphics/graphics-header.svg');
  background-repeat: no-repeat;
  background-color: #F3E4E1;
  border: solid black 1px;
  height: 20%;
  display: flex;
}

.header-icon-wrapper {
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
  margin: 10px 0px 0px 10px;
  position: fixed;
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
  margin: 10px 0px 0px 120px;
  position: fixed;
}


.main-content {
  background: url('/assets/graphics/graphics-footer.svg');
  background-position: bottom;
  background-repeat: no-repeat;
  border: solid red 1px;
  min-height: 79%;
}

.main-footer {
  background: url('/assets/graphics/graphics-footer.svg');
  background-repeat: no-repeat;
}
</style>
/* eslint-disable */