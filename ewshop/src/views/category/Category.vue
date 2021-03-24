<template>
    <div>
        <NavBar>
            <template  v-slot:center>分类</template>
        </NavBar>
    </div>
</template>

<script>
    import NavBar from 'components/common/navbar/NavBar'
    export default {
        name: "Category",
        components:{
            NavBar
        }
    }
</script>

<style scoped>

</style>