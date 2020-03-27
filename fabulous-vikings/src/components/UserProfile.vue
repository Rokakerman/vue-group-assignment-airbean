<template>
    <div class="user-body">
        <header class="user-header">
            <figure class="avatar-frame"></figure>
            <h1 class="user-name"> Karl Magnussen </h1>
            <p class="user-email"> kalle1992@outlook.com </p>
        </header>
        <main class="user-main">
            <h1 class="user-order-title"> Orderhistorik </h1>
            <ul class="order-history">
                <li v-for="order in history" v-bind:key="order.orderNr" class="order">
                    <div class="order-top-display">
                        <p class="product-id"> {{order.orderNr}} </p>
                        <p class="purchase-date"> 20/04/12 </p>
                    </div>
                    <div class="order-bottom-display">
                        <p class="product-flavout-text"> Total ordersumma </p>
                        <p class="product-sum-total"> {{order.total}} </p>
                    </div>
                    <hr class="product-line">
                </li>
            </ul>
            <hr class="product-list-footer">
        </main>
        <footer class="user-footer">
            <p class="total-spent"> Totalt spenderat </p>
            <p class="total-sum"> {{total}} </p>
        </footer>
    </div>
</template>

<script>
export default {
    created() {
        this.orderHistory()
    },
    methods: {
        async orderHistory() {
            try {
                await this.$store.dispatch('loadOrderHistory')
            } catch (e) {
                console.log('error', e.message)
            }
        }
    },
    computed: {
        history() {
            return this.$store.state.orderHistory.list
        },
        total() {
            return this.$store.state.orderHistory.total
        }
    }
}
</script>

<style>
.user-body {
    width: 90%;
    max-width: 700px;
}

.user-header {
    height: 40%;
    display: flex;
    flex-direction: column;
    align-items: center;
    color: white;
}

.avatar-frame {
    background-color: var(--bean-pink);
    background-image: url('../assets/graphics/Union.svg');
    background-repeat: no-repeat;
    background-position: center;
    background-position-y: bottom;
    border-radius: 50%;
    height: 100px;
    width: 100px;
    margin: 0px;
}

.user-name {
    margin-bottom: 0px;
    font-size: 28px;
}

.user-email {
    margin-top: 5px;
}

.user-main {
    height: 40%;
    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: start;
    color: white;
}

.user-order-title {
    margin: 0px;
}

.order-history {
    padding: 0px;
    list-style: none;
    margin-bottom: 0px;
    width: 100%;
    overflow-y: scroll;
    scrollbar-width: thin;
}

.order-top-display {
    display: flex;
    justify-content: space-between;
    width: 100%;
    height: 30px;
}

.product-id {
    margin: 0px;
    opacity: 80%;
}

.purchase-date {
    margin: 0px;
    opacity: 60%;
}

.order-bottom-display {
    display: flex;
    justify-content: space-between;
    width: 100%;
}

.product-flavout-text {
    margin: 0px;
    opacity: 60%;
}

.product-sum-total {
    margin: 0px;
    opacity: 60%;
}

.product-line {
    opacity: 60%;
}

.user-footer {
    height: 20%;
    width: 100%;
    display: flex;
    justify-content: space-between;
    color: white;
}

.product-list-footer {
    width: 100%;
    margin-top: auto;
    border: none;
    height: 1px;
    margin: 0px;
    background-color: white;
}
</style>