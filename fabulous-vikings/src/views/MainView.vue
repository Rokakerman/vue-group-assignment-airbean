<template>
  <div class="main-view">
    <Navigation
      v-on:closeNav="closingNav"
      v-on:showMenu="displayMenu"
      v-on:showAbout="displayAbout"
      v-if="displayNav == true"
    />
    <header class="main-header">
      <div class="header-icon-wrapper">
        <figure v-on:click="showNav" class="navicon">
          <img src="/assets/graphics/navicon.svg" />
        </figure>
      </div>
      <div class="header-icon-wrapper">
        <figure v-if="!view" class="carticon"><img src="/assets/graphics/bag.svg" /></figure>
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

export default {
  components: {
    About: about,
    Menu: menu,
    Navigation: navigation
  },
  props: {
    view: Boolean
  },
  data() {
    return {
      displayNav: false
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
      this.$router.push('/menu')
      return this.closingNav()
    },
    displayAbout() {
      this.$router.push('/about')
      return this.closingNav()
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
  background-color: var(--bean-pink);
}

.main-header {
  background: url('/assets/graphics/graphics-header.svg');
  background-repeat: no-repeat;
  background-color: var(--bean-pink);
  background-size: cover;
  border: solid black 1px;
  height: 15%;
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
  margin: 20px 0px 0px 20px;
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
  margin: 20px 0px 0px 120px;
}

.main-content {
  background: url('/assets/graphics/graphics-footer.svg');
  background-position: bottom;
  background-repeat: no-repeat;
  background-color: #f3e4e1;
  background-size: contain;
  border: solid red 1px;
  min-height: 84%;
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
