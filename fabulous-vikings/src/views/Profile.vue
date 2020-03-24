<template>
    <div class="profile-view">
        <Navigation
            v-on:closeNav="closingNav"
            v-on:showMenu="displayMenu"
            v-on:showAbout="displayAbout"
            v-on:showOrderStatus="orderStatus"
            v-if="displayNav == true"
        />
        <header class="profile-header">
            <div class="header-icon-wrapper-left">
                <figure v-on:click="showNav" class="navicon">
                    <img src="/assets/graphics/navicon.svg" />
                </figure>
            </div>
        </header>
        <main class="profile-main"></main>
        <footer class="profile-footer"></footer>
    </div>
</template>

<script>
import navigation from '../components/Navigation'

export default {
    components: {
        Navigation: navigation
    },
    data() {
        return {
            displayNav: false
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
            return (this.displayNav = true)
        },
        closingNav() {
            return (this.displayNav = false)
        },
        displayMenu() {
            return this.$router.push('/menu')
        },
        displayAbout() {
            return this.$router.push('/about')
        },
        orderStatus() {

        }
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
  border: solid black 1px;
  height: 15%;
  display: flex;
}

.profile-main {
    background-color: var(--bean-brown);
    height: 85%;
}

</style>