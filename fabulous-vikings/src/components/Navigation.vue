<template>
    <div class="nav-container">
        <header class="nav-header">
            <figure v-on:click="closeNav" class="close-icon-container"> 
                <img class="close-icon" src="/assets/graphics/close.svg"> 
            </figure>
        </header>
        <main class="nav-main">
            <article class="nav-option-container">
                <h1 class="nav-option" v-on:click="showMenu"> Meny </h1>
                <h1 class="nav-option" v-on:click="showAbout"> Vårt Kaffe </h1>
                <h1 class="nav-option"> Orderstatus </h1>
            </article>
        </main>
        <footer class="nav-footer"></footer>
    </div>
</template>

<script>
export default {
    data() {
        return {

        }
    },
    methods: {
        closeNav() {
            return this.$emit('closeNav')
        },
        showMenu() {
            return this.$emit('showMenu')
        },
        showAbout() {
            return this.$emit('showAbout')
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
    z-index: 4;
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
}
</style>