<template>
    <div><NavBar class="navbar">
        <template v-slot:center>个人中心</template>
    </NavBar>
        <div class="logoutbtn">
            <van-button round block @click="tologout">退出</van-button>
        </div>

    </div>
</template>

<script>
    import NavBar from 'components/common/navbar/NavBar'
    import {logout} from "../../network/user";
    import {Notify} from 'vant'
    import {useRouter} from 'vue-router'
    import {useStore} from 'vuex'
    export default {
        name: "Profile",
        components:{
            NavBar
        },
        setup(){
            const router = useRouter()
            let store = useStore()
            const tologout=()=>{
                logout().then(res=>{
                    if(res.status == '204'){
                        Notify("退出成功")

                        window.localStorage.setItem('token','')
                        store.commit('setIsLogin',false)
                        setTimeout(()=>{
                            router.push({path:'/login'})
                        },500)
                    }
                })
            }
            return {tologout}
        }
    }
</script>

<style scoped>
.logoutbtn{margin-top: 130px;}
</style>