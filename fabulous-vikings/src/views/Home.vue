<template>
  <div class="home" @click="goToMenu">
    <div class="inner-cont left-cont"></div>
    <div class="inner-cont right-cont"></div>
    <div class="inner-cont central"></div>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'Home',
  components: {},
  methods: {
    goToMenu() {
      this.$router.push('/menu')
    }
  }
}
</script>

<style scoped>
.home {
  cursor: pointer;
  height: 100vh;
  width: 100vw;
  background-color: #0e927d;
  position: relative;
}

.left-cont {
  background: url('/assets/graphics/intro-graphic-left.svg');
  background-size: contain;
}
.right-cont {
  background: url('/assets/graphics/intro-graphic-left.svg');
  background-size: contain;
  transform: rotateY(180deg) rotateX(180deg);
}
.central {
  background: url('/assets/graphics/airbean-landing.svg');
  background-size: auto;
  background-repeat: no-repeat;
  background-position: center;
}
.inner-cont {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background-repeat: no-repeat;
}
</style>
