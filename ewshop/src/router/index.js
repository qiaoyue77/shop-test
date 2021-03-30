import { createRouter, createWebHistory } from 'vue-router'
import store from '../store'
import {Notify} from "vant";

const Home = () => import(/* webpackChunkName: "about" */ '../views/home/Home')
const Category = () => import(/* webpackChunkName: "about" */ '../views/category/Category')
const Profile = () => import(/* webpackChunkName: "about" */ '../views/profile/Profile')
const Detail = () => import(/* webpackChunkName: "about" */ '../views/detail/Detail')
const Shopcart = () => import(/* webpackChunkName: "about" */ '../views/shopcart/Shopcart')
const Register = ()=> import("../views/profile/Register")
const Login = ()=> import("../views/profile/Login")
const AddressEdit = ()=> import ("../views/profile/AddressEdit") ;
const AddAddress = ()=> import ( "../views/profile/AddAddress") ;
const Address = ()=> import("../views/profile/Address")
const CreateOrder = ()=> import("../views/order/CreateOrder")
const Order = ()=> import("../views/order/Order")
const OrderDetail = ()=> import("../views/order/OrderDetail")
const routes = [
  {
    path: '/',
    name: 'DefaultHome',
    component: Home,
      meta:{
      title:"首页"
      }
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
      meta:{
          title:"首页"
      }
  },
  {
    path: '/category',
    name: 'Category',
    component: Category,
      meta:{
          title:"分类"
      }
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile,
      meta:{
          title:"个人中心",
        isAuthRequired:true
      }
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
    meta:{
      title:"注册"
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta:{
      title:"登录"
    }
  },
  {
    path: '/detail',
    name: 'Detail',
    component: Detail,
        meta:{
            title:"详情"
        }
  },
  {
    path: '/shopcart',
    name: 'Shopcart',
    component: Shopcart,
      meta:{
          title:"购物车",
        isAuthRequired:true
      }
  },
  {
    path: '/addressEdit',
    name: 'AddressEdit',
    component: AddressEdit,
    meta:{
      title:"修改地址"
    }
  },
  {
    path: '/addAddress',
    name: 'AddAddress',
    component: AddAddress,
    meta:{
      title:"添加地址"
    }
  },
  {
    path: '/address',
    name: 'Address',
    component: Address,
    meta:{
      title:"地址"
    }
  },
  {
    path: '/createOrder',
    name: 'CreateOrder',
    component: CreateOrder,
    meta:{
      title:"生成订单"
    }
  },
  {
    path: '/order',
    name: 'Order',
    component: Order,
    meta:{
      title:"订单"
    }
  },
  {
    path: '/orderDetail',
    name: 'OrderDetail',
    component: OrderDetail,
    meta:{
      title:"订单详情"
    }
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to,from,next)=>{
  if(to.meta.isAuthRequired && store.state.user.isLogin === false){
    Notify('请先登录')
    return next('/login')
  }else{
    next()
  }

  document.title = to.meta.title

})
export default router
