<template>
    <div><NavBar class="navbar">
        <template v-slot:center>个人中心</template>
    </NavBar>
      <van-contact-card style="margin-top:50px" type="edit" :name="user.name" :tel="user.phone?user.phone:''" :editable="false" />
       <div class="list">
         <div @click="goto('/order')">订单管理</div>
         <div @click="goto('/address')">地址管理</div>
       </div>
        <div class="logoutbtn">
            <van-button round block @click="tologout" type="primary">退出</van-button>
        </div>

    </div>
</template>

<script>
    import NavBar from 'components/common/navbar/NavBar'
    import {logout,getUser} from "../../network/user";
    import {Notify} from 'vant'
    import {useRouter} from 'vue-router'
    import {useStore} from 'vuex'
    import {onMounted,reactive,toRefs} from 'vue'
    export default {
        name: "Profile",
        components:{
            NavBar
        },
        setup(){
            const router = useRouter()
            let store = useStore()
          const state = reactive({
            user:{}
          })
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

          onMounted(()=>{
            getUser().then(res=>{
              state.user = res
              console.log(res)
            })
          })

          const goto = (r,query)=>{
              router.push({path:r,query:query || {}})
          }
            return {tologout,...toRefs(state),goto}
        }
    }
</script>

<style scoped lang="scss">
.list{padding: 0 10px;margin-top:50px;
div{padding:10px;}
}
.logoutbtn{position: fixed;bottom: 60px;width: 90%;margin-left: 5%;
  left: 0;}
</style>