<template>
  <div class="nav-container">
    <header class="nav-header">
      <figure v-on:click="closeNav" class="close-icon-container">
        <img class="close-icon" src="/assets/graphics/close.svg" />
      </figure>
    </header>
    <main class="nav-main">
      <article class="nav-option-container">
        <h1 class="nav-option" v-on:click="showMenu">Meny</h1>
        <h1 class="nav-option" v-on:click="showAbout">Vårt Kaffe</h1>
        <h1 class="nav-option" v-on:click="showOrderStatus">Orderstatus</h1>
        <h1 class="nav-option" v-on:click="showProfile">Profil</h1>
      </article>
    </main>
    <footer class="nav-footer"></footer>
  </div>
</template>

<script>
export default {
  data() {
    return {
      orderNa: false
    }
  },

  methods: {
    closeNav() {
      return this.$emit('closeNav')
    },
    showMenu() {
      //   return this.$emit('showMenu')
      if (this.$route.path !== '/menu') this.$router.push('/menu')
      this.$emit('closeNav')
    },
    showAbout() {
      //   return this.$emit('showAbout')

      if (this.$route.path !== '/about') this.$router.push('/about')
      this.$emit('closeNav')
    },
    showOrderStatus() {
      //   return this.$emit('showOrderStatus')
      /*if (this.$store.state.newOrder.orderNr.length == 0) {
        console.log('Testing: ', this.$store.state.newOrder.orderNr)
        this.orderNa = true
        setTimeout(this.removeMe, 5000)
        return 
      }*/
      this.$router.push('/status')
    },
    showProfile() {
      if (this.$store.state.userData.userRegistered) {
        if (this.$route.path !== '/profile') this.$router.push('/profile')
      } else if (this.$route.path !== '/sign') this.$router.push('/sign')
      this.$emit('closeNav')
    },
    removeMe() {
      console.log('Here')
      return this.orderNa = false
      
    }
  }
}
</script>

<style>
.nav-container {
  background-color: var(--bean-brown);
  position: fixed;
  width: 100%;
  height: 100%;
  z-index: 1;
}

.nav-header {
  height: 15%;
}

.close-icon-container {
  background-color: white;
  border-radius: 50%;
  height: 45px;
  width: 45px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 20px 0px 0px 20px;
  cursor: pointer;
}

.close-icon {
  height: 25px;
  width: 25px;
}

.nav-main {
  height: 85%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.nav-option-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 150px;
}

.nav-option {
  color: white;
  margin-bottom: 0px;
  font-size: 40px;
  cursor: pointer;
}

.nav-option-na {
  color: red;
  text-shadow: black 2px;
}
</style>
