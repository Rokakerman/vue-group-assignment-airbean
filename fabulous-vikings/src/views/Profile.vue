<template>
  <div class="profile-view">
    <Navigation v-on:closeNav="closingNav" v-if="displayNav == true" />
    <!-- v-on:showMenu="displayMenu"
      v-on:showAbout="displayAbout"
      v-on:showOrderStatus="orderStatus" -->
    <!-- <Order v-if="displayOrderStatus === true" v-on:closeOrderStatus="shutDownStatus" /> -->
    <header class="profile-header">
      <div class="header-icon-wrapper-left">
        <figure v-on:click="showNav" class="navicon">
          <img src="/assets/graphics/navicon.svg" />
        </figure>
      </div>
    </header>
    <main class="profile-main">
      <User v-if="view" />
      <SignUp v-else />
    </main>
    <footer class="profile-footer"></footer>
  </div>
</template>

<script>
import navigation from '../components/Navigation'
// import orderstatus from '../components/OrderStatus'
import sign from '../components/Sign'
import userProfile from '../components/UserProfile'

export default {
  components: {
    Navigation: navigation,
    // Order: orderstatus,
    SignUp: sign,
    User: userProfile
  },
  data() {
    return {
      displayNav: false
      //   displayOrderStatus: false
    }
  },
  props: {
    view: Boolean
  },
  computed: {
    user() {
      return this.$store.state.user
    },
    created() {
      return this.$store.dispatch('checkUser')
    }
  },
  methods: {
    showNav() {
      this.displayNav = true
    },
    closingNav() {
      this.displayNav = false
    },
    displayMenu() {
      return this.$router.push('/menu')
    },
    displayAbout() {
      return this.$router.push('/about')
    }
    // orderStatus() {
    //   return (this.displayOrderStatus = true)
    // },
    // shutDownStatus() {
    //   return (this.displayOrderStatus = false)
    // }
  }
}
</script>

<style>
.profile-view {
  margin: 0px;
  padding: 0px;
  height: 100vh;
}

.profile-header:before {
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
  background-color: var(--bean-brown);
}
.profile-header {
  position: relative;
  overflow: hidden;
  border: none;
  height: 15%;
  display: flex;
}

.profile-main {
  background-color: var(--bean-brown);
  height: 85%;
  display: flex;
  justify-content: center;
}
</style>
