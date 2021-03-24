<template>
    <div><NavBar class="navbar">
        <template v-slot:center>个人中心</template>
    </NavBar></div>
</template>

<script>
    import NavBar from 'components/common/navbar/NavBar'
    export default {
        name: "Profile",
        components:{
            NavBar
        }
    }
</script>

<style scoped>

</style>