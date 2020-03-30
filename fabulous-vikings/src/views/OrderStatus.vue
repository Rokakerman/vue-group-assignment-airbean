<template>
  <div class="order-body">
    <header class="order-header">
      <div class="order-number-container">
        <p class="order-number">Ordernummer</p>
        <p class="order-number-id">{{ orderNumber }}</p>
      </div>
    </header>
    <main class="order-main">
      <!-- <figure class="drone-container">
        <img src="/assets/graphics/drone1.svg" />
      </figure> -->
      <!-- <iframe class="drone-container" src="/assets/graphics/drone1.svg" frameborder="0"></iframe> -->
      <!-- <svg class="drone-container" v-html="require('../assets/graphics/drone1.svg')"></svg> -->
      <!-- <div class="drone-container" v-html="require('../assets/graphics/drone1.svg')"></div> -->
      <drone class="drone-container" />
      <h1 class="order-title">Din beställning är på väg!</h1>
      <div class="order-under-title-container">
        <h3 class="order-under-title-int">13</h3>
        <h3 class="order-under-title-string">minuter</h3>
      </div>
    </main>
    <footer class="order-footer">
      <button class="confirm" v-on:click="$router.push('menu')">Ok, cool!</button>
    </footer>
  </div>
</template>

<script>
import drone from '@/assets/graphics/drone1.svg'
export default {
  data() {
    return {
      orderNumber: 3494
    }
  },
  components: {
    drone: drone
  },
  mounted() {
    // console.log(this.$refs.drone.contentDocument)
    animate()
    function animate() {
      let tl = window.gsap.timeline({
        // repeat: -1
        //   repeatDelay: 0.6
        // onRepeat: function() {
        //   this.x(Math.floor(Math.random() * (100 - -100 + 1) + -100))
        // }
      })
      tl.to('.drone-container', 2, {
        // repeat: 1,
        x: 'random(100,-100)',
        // onRepeat: () => this.x(Math.floor(Math.random() * (100 - -100 + 1) + -100))
        onComplete: animate
      })
    }
    // tl.to('.drone-container', { scale: 1 }, '0.2')
    // tl.to('.drone-container #BlackLeft', { duration: 0.05, repeat: -1, fill: '#d4d4d4' })
    // tl.to('.drone-container #BlackRight', { duration: 0.05, repeat: -1, fill: '#d4d4d4' }, '0.025')
    // tl.to('.drone-container #Light2', { duration: 1, repeat: -1, ease: 'none', fill: 'rgb(57, 218, 57)' })
    // tl.from('.drone-container', { duration: 2, repeat: 1, scale: 1.4, x: -1300 })

    // tl.addLabel('spin', 3)
    //insert a rotation tween at the "spin" label (you could also define the insertion point as the time instead of a label)
    // tl.to('.drone-container', { duration: 2, scale: 'random(1, 1.2)', rotation: 'random(-5,5)' }, 'spin')
    //go to the "spin" label and play the timeline from there
    // tl.play('spin')
    // tl.to('.drone-container', { duration: 2, repeat: -1, yoyo: true, scale: 1.5, x: 'random(100,-100)' })
  }
}
</script>

<style>
.drone-container {
  transform: scale(1.5);
}
.order-body {
  background-color: var(--bean-orange);
  position: fixed;
  margin: 0px;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 2;
}

.order-header {
  height: 25%;
  width: 80%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
}

.order-number-container {
  display: flex;
  justify-content: space-around;
  align-items: center;
}

.order-number {
  font-weight: normal;
  margin-right: 5px;
}

.order-number-id {
  font-weight: bolder;
  margin-left: 5px;
}

.order-main {
  height: 50%;
  width: 80%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.drone-container {
  margin-top: -100px;
}

.order-title {
  margin-bottom: 0px;
  font-size: 40px;
  color: white;
}

.order-under-title-container {
  display: flex;
  justify-content: space-around;
  width: 130px;
  color: white;
  font-size: 18px;
}

.order-under-title-int {
  font-weight: bolder;
}

.order-under-title-string {
  font-weight: unset;
}

.order-footer {
  width: 80%;
  height: 25%;
}

.confirm {
  width: 200px;
  height: 60px;
  background-color: white;
  border: none;
  border-radius: 30px 30px 30px 30px;
  font-size: 24px;
  cursor: pointer;
}
</style>
