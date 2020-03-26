<template>
    <div class="user-body">
        <header class="user-header">
            <figure class="avatar-frame">
            
            </figure>
        </header>
        <main class="user-main"></main>
        <footer class="user-footer"></footer>
    </div>
</template>

<script>
export default {

}
</script>

<style>
.user-body {
    max-width: 90%;
}

.user-header {
    height: 40%;
    display: flex;
    flex-direction: column;
    align-items: center;
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
}

.user-main {
    height: 40%;
}

.user-footer {
    height: 20%;
}
</style>