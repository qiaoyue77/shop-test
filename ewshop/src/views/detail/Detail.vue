<template>
    <div>
        <NavBar>
            <template  v-slot:center>详情{{id}}</template>
        </NavBar>

    </div>
</template>

<script>
    import NavBar from 'components/common/navbar/NavBar'
    import {useRoute} from 'vue-router'
    import {ref} from 'vue'
    export default {
        name: "Detail",
        components:{
            NavBar
        },
        setup(){
            const route = useRoute()

            const id = ref(0)
            id.value = route.query.id

            return {
                id
            }
        }
    }
</script>

<style scoped>

</style>