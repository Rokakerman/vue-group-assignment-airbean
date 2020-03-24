<template>
  
</template>

<script>
export default {
    computed: {
        user() {
            return this.$store.state.user
        }
    },
    created() {
        this.$store.dispatch('checkUser')
    }
}
</script>

<style>

</style>