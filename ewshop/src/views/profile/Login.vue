<template>
    <div><NavBar class="navbar">
        <template v-slot:center>登录</template>
    </NavBar>
        <div class="comtent">

            <van-form @submit="onSubmit">
                <van-field
                        v-model="email"
                        name="邮箱"
                        label="邮箱"
                        placeholder="请输入正确的电子邮箱"
                        :rules="[{ required: true, message: '请输入正确的电子邮箱' }]"
                />
                <van-field
                        v-model="password"
                        type="password"
                        name="密码"
                        label="密码"
                        placeholder="密码"
                        :rules="[{ required: true, message: '请填写密码' }]"
                />

                <div style="margin: 16px;">
                    <div class="loginout" @click="$router.push({path:'/register'})">没有账号，立即注册</div>
                    <van-button round block type="primary" native-type="submit">
                        提交
                    </van-button>
                </div>
            </van-form>
        </div>
    </div>
</template>

<script>
    import NavBar from 'components/common/navbar/NavBar'
    import {ref,reactive , toRefs} from 'vue'
    import {login} from "../../network/user";
    import { Notify } from 'vant';
    import {useRouter} from 'vue-router'
    import {useStore} from 'vuex'
    export default {
        name: "Login",
        components:{
            NavBar
        },
        setup() {
            const userinfo = reactive({
                email:'',
                password:'',

            })
            let router = useRouter()
            let store = useStore()
            const onSubmit = ()=>{
                login(userinfo).then(res=>{
                    window.localStorage.setItem('token',res.access_token)
                    store.commit('setIsLogin',true)

                    Notify("登录成功")
                    userinfo.email = ''
                    userinfo.password = ''

                    setTimeout(()=>{
                        router.go(-1)
                    },500)
                })
            }
            return{
                ...toRefs(userinfo),
                onSubmit
            }
        }
    }
</script>

<style scoped lang="scss">
    .comtent{margin-top: 50px;}
    .loginout{padding: 20px 0;font-size:13px;color:var(--color--text) !important}
</style>