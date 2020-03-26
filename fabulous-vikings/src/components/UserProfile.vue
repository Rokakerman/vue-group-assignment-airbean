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
                <li class="order">
                    <div class="order-top-display">
                        <p class="product-id"> #F566GBF78 </p>
                        <p class="purchase-date"> 20/04/12 </p>
                    </div>
                    <div class="order-bottom-display">
                        <p class="product-flavout-text"> Total ordersumma </p>
                        <p class="product-sum-total"> 98kr </p>
                    </div>
                    <hr>
                </li>
            </ul>
        </main>
        <footer class="user-footer"></footer>
    </div>
</template>

<script>
export default {

}
</script>

<style>
.user-body {
    width: 90%;
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
}

.order-top-display {
    display: flex;
    justify-content: space-between;
    width: 100%;
    height: 30px;
}

.product-id {
    margin: 0px;
}

.purchase-date {
    margin: 0px;
}

.order-bottom-display {
    display: flex;
    justify-content: space-between;
    width: 100%;
}

.product-flavout-text {
    margin: 0px;
}

.product-sum-total {
    margin: 0px;
}

.user-footer {
    height: 20%;
}
</style>