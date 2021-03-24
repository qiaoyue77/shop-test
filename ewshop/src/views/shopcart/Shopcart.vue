<template>
    <div><NavBar class="navbar">
        <template v-slot:center>购物车</template>
    </NavBar></div>
</template>

<script>
    import NavBar from 'components/common/navbar/NavBar'
    export default {
        name: "Shopcart",
        components:{
            NavBar
        }
    }
</script>

<style scoped>

</style>