import axios from 'axios'
export  function request(config) {
 const instance = axios.create({
     baseURL:"https://api.shop.eduwork.cn",
     timeout:5000
 })

    //请求拦截
    instance.interceptors.request.use(config=>{
        //token
        return config
    },err=>{
        console.log(err)
    })
    //响应拦截
    instance.interceptors.response.use(res=>{
        return res.data ?res.data:res
    },err=>{
        console.log(err)
    })

    return instance(config)
}