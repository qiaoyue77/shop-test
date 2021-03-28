import axios from 'axios'
import {Notify} from "vant";
import router from "../router";

export  function request(config) {
 const instance = axios.create({
     baseURL:"https://api.shop.eduwork.cn",
     timeout:5000
 })

    //请求拦截
    instance.interceptors.request.use(config=>{
        //token
        const token = window.localStorage.getItem('token')
        if(token){
            config.headers.Authorization = 'Bearer '+token
        }
        return config
    },err=>{
        console.log(err)

    })
    //响应拦截
    instance.interceptors.response.use(res=>{
        return res.data ?res.data:res
    },err=>{
        console.log(err)
        if(err.response.status == '401'){
            Notify("请先登录")
            router.push({path:"/login"})
        }
        Notify(err.response.data.errors[Object.keys(err.response.data.errors)[0]][0])
    })

    return instance(config)
}