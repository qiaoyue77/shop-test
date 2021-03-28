<template>
    <div><NavBar class="navbar">
        <template v-slot:center>用户注册</template>
    </NavBar>
    <div class="comtent">

        <van-form @submit="onSubmit">
            <van-field
                    v-model="name"
                    name="用户名"
                    label="用户名"
                    placeholder="用户名"
                    :rules="[{ required: true, message: '请填写用户名' }]"
            />
            <van-field
                    v-model="password"
                    type="password"
                    name="密码"
                    label="密码"
                    placeholder="密码"
                    :rules="[{ required: true, message: '请填写密码' }]"
            />
            <van-field
                    v-model="password_confirmation"
                    type="password"
                    name="确认密码"
                    label="确认密码"
                    placeholder="请填写一致密码"
                    :rules="[{ required: true, message: '请确认密码' }]"
            />
            <van-field
                    v-model="email"
                    name="邮箱"
                    label="邮箱"
                    placeholder="请输入正确的电子邮箱"
                    :rules="[{ required: true, message: '请输入正确的电子邮箱' }]"
            />
            <div style="margin: 16px;">
                <div class="loginout" @click="$router.push({path:'/login'})">已有账号，立即登录</div>
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
    import {register} from "../../network/user";
    import { Notify } from 'vant';
import {useRouter} from 'vue-router'
    export default {
        name: "Register",
        components:{
            NavBar
        },
        setup() {
            const userinfo = reactive({
                name:'',
                password:'',
                password_confirmation:'',
                email:''
            })
const router = useRouter()
            const onSubmit = ()=>{
                if(userinfo.password !== userinfo.password_confirmation){
                    Notify("两次密码不一致")
                }else{
                    register(userinfo).then(res =>{
                        if(res.status == '201'){
                            Notify("注册成功")

                            setTimeout(()=>{
                                router.push({path:'/login'})
                            },1000)
                        }

                        userinfo.password_confirmation = ''
                        userinfo.password = ''
                    })
                }
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