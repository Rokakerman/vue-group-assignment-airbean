<template>
  <div class="order-body" v-bind:class="{ 'no-order-body': orderNa }">
    <header class="order-header">
      <div class="order-number-container">
        <p class="order-number">{{ orderNrTitle }}</p>
        <p class="order-number-id">{{ orderNumber }}</p>
      </div>
    </header>
    <main class="order-main">
      <div class="drone-wrapper">
        <drone class="drone-container" v-bind:class="{ 'drone-container-order': !orderNa }" />
      </div>
      <h1 class="order-title">{{ orderTitle }}</h1>
      <div class="order-under-title-container">
        <h3 class="order-under-title-int">{{ timeLeftToDelivery }}</h3>
        <!-- <h3 class="order-under-title-string">{{ ETAMinuter }}</h3> -->
      </div>
    </main>
    <footer class="order-footer">
      <button class="confirm" v-on:click="$router.push('menu')">{{ button }}</button>
    </footer>
  </div>
</template>

<script>
import drone from '@/assets/graphics/drone1.svg?inline'
export default {
  data() {
    return {
      orderNumber: this.$store.state.newOrder.orderNr,
      orderNa: false,
      orderNrTitle: 'Ordernummer',
      orderNr: '',
      orderTitle: 'Din beställning är på väg!',
      ETA: this.$store.state.newOrder.eta,
      ETAMinuter: '',
      button: '',
      timeLeftToDelivery: '',
      interval: ''
    }
  },
  components: {
    drone
  },
  methods: {
    checkOrder() {
      if (this.$store.state.newOrder.orderNr.length == 0) {
        console.log('Testing: ', this.$store.state.newOrder.orderNr)
        this.orderNa = true
        this.orderNrTitle = 'Inget att visa!'
        this.orderTitle = 'Det finns inget köp att visa'
        this.ETA = ''
        this.button = 'Take me back'
        return
      }
      this.orderNa = false
      this.orderNr = this.$store.state.newOrder.orderNr
      this.orderNrTitle = 'Ordernummer'
      this.orderTitle = 'Din beställning är på väg!'
      /*if (this.ETA == 0) {
          this.ETA = Math.floor(Math.random()* 10)
          console.log('here')
        }*/
      this.ETA = this.$store.state.newOrder.eta
      this.ETAMinuter = 'Minuter'
      this.button = 'Ok, cool!'
      return
    },
    checkDeliveryDate() {
      if (this.$store.state.newOrder.orderDateTime - new Date().getTime() < 0)
        return (this.timeLeftToDelivery = '')

      this.interval = setInterval(() => {
        const now = new Date().getTime()

        const distance = this.$store.state.newOrder.orderDateTime - now

        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
        const seconds = Math.floor((distance % (1000 * 60)) / 1000)

        if (distance < 0) {
          this.timeLeftToDelivery = ''
          clearInterval(this.interval)
        } else this.timeLeftToDelivery = `${minutes} minuter  ${seconds} s `
      }, 1000)
    }
  },
  mounted() {
    this.checkOrder()
    this.checkDeliveryDate()
  },
  destroyed() {
    if (this.interval) clearInterval(this.interval)
  }
}
</script>

<style>
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

.no-order-body {
  background-color: rgb(221, 94, 68);
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

.drone-wrapper {
  width: 80vw;
  max-width: 400px;
}

.drone-container {
  margin-top: -100px;
  position: relative;
}

#Cup {
  fill: wheat;
  /* drone1 
  217
120 
   height="120"
   width="217"
*/
}

.drone-container-order #Light2 {
  animation: light 0.9s infinite;
}

@keyframes light {
  from {
    fill: rgb(57, 218, 57);
  }
  to {
    fill: black;
  }
}

.drone-container-order {
  animation: drone 3s infinite, drone-y 2s infinite, drone-r 2s infinite;
  left: 0px;
}

@keyframes drone {
  0% {
    left: 0px;
  }
  33% {
    left: -50px;
  }
  66% {
    left: 50px;
  }
  100% {
    left: 0px;
  }
}

@keyframes drone-y {
  0% {
    top: 0px;
  }
  50% {
    top: 15px;
  }
  100% {
    top: 0px;
  }
}

@keyframes drone-r {
  0% {
    transform: rotate(0deg);
  }
  25% {
    transform: rotate(-2deg);
  }
  75% {
    transform: rotate(2deg);
  }
  100% {
    transform: rotate(0deg);
  }
}

.drone-container-order #BlackLeft {
  animation: propeller 0.07s infinite;
}

.drone-container-order #BlackRight {
  animation: propeller 0.07s infinite;
  animation-delay: 0.025s;
}

@keyframes propeller {
  from {
    fill: #d4d4d4;
  }
  to {
    fill: black;
  }
}

.order-title {
  margin-bottom: 0px;
  font-size: 38px;
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
  white-space: nowrap;
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
