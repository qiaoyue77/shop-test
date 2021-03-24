<template>
    <div class="navbar">
        <div class="left" @click="goback"><slot name="left">&lt;</slot></div>
        <div class="center"><slot name="center"></slot></div>
        <div class="right"><slot name="right"></slot></div>
    </div>
</template>

<script>
    import {useRouter} from 'vue-router'
    export default {
        name: "NavBar",
        setup(){
            const router = useRouter()
            const goback=()=>{
                router.go(-1)
            }

            return {goback}
        }
    }
</script>

<style scoped>
.navbar{background: var(--color--background);
height: 45px;position: fixed;top:0;left: 0;width: 100%;z-index: 999;line-height: 45px;color:#fff;display: flex;flex-direction: row}
    .left,.right{width: 60px}
    .center{flex: 1}
</style>