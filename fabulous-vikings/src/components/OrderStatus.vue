<template>
    <div class="order-body">
        <header class="order-header"> 
            <div class="order-number-container">
                <p class="order-number">Ordernummer</p> 
                <p class="order-number-id"> {{orderNumber}} </p> 
            </div>
        </header>
        <main class="order-main">
            <figure class="drone-container">
                <img src="/assets/graphics/drone.svg"/>
            </figure>
            <h1 class="order-title"> Din beställning är på väg!</h1>
            <div class="order-under-title-container">
                <h3 class="order-under-title-int"> 13 </h3> 
                <h3 class="order-under-title-string"> minuter </h3>
            </div>
        </main>
        <footer class="order-footer"> 
            <button class="confirm" v-on:click="closeOrderStatus"> Ok, cool! </button> 
        </footer>
  </div>
</template>

<script>
export default {
    // I orderstaus ska hämta data från store
    data() {
        return {
           orderNumber: this.$store.state.newOrder.orderNr
        }
    },
    methods: {
        closeOrderStatus() {
            this.$emit('closeOrderStatus')
        }
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

.order-header {
    height: 25%;
    width: 80%;
    display: flex;
    justify-content: center;
    align-items: center;
    color: white
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