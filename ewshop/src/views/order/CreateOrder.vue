<template>
<div>
  <NavBar class="navbar">
    <template v-slot:center>订单预览</template>
  </NavBar>

  <div class="addressview" @click="goto">
    <div>
    <div class="name" >
      <span>{{ address.name }}</span>
      <span>{{ address.phone }}</span>
    </div>
    <div class="address">
      {{ address.province }} {{address.city}} {{address.county}} {{address.address}}
    </div>
    </div>
    <van-icon class="arrow" name="arrow"></van-icon>
  </div>

  <div class="good">
     <div class="good-item" v-for="(item,index) in cartList" :key="index">
       <div class="good-img">
         <img v-lazy="item.goods.cover_url">
       </div>
       <div class="good-desc">
         <div class="good-title">
           <span>{{ item.goods.title }}</span>
           <span>X{{ item.num }}</span>
         </div>
         <div class="good-btn">
           <div class="price">￥{{item.goods.price}}</div>
         </div>
       </div>
     </div>
  </div>

  <van-submit-bar :price="totalPrice * 100" button-text="生成订单" @submit="onSubmit" />

  <van-popup
      v-model:show="show"
      closeable
      position="bottom"
      :style="{ height: '30%' }"

  >
    <van-grid :border="false" :column-num="2">
      <van-grid-item>
        支付宝二维码<br>
        <van-image :src="aliyun" width="150" height="150"/>
      </van-grid-item>
      <van-grid-item>
        微信二维码<br>
        <van-image :src="wechat" width="150" height="150"/>
      </van-grid-item>
    </van-grid>

  </van-popup>
</div>
</template>

<script>
import NavBar from "../../components/common/navbar/NavBar";
import {getOrderList,getOrderPreview,payOrder,payOrderStatus,createOrder} from "../../network/order";
import {ref,reactive,toRefs,computed,onMounted} from 'vue'
import {useRouter,useRoute} from 'vue-router'
import {useStore} from 'vuex'
import {Toast} from 'vant'
export default {
name: "CreateOrder",
  components:{
  NavBar
  },
  setup(){
    const router = useRouter()
    const route = useRoute()
    const store = useStore()
    const state = reactive({
        cartList:[],
        address:{},
      show:false,
      orderId:'',
      aliyun:'',
      wechat:''
    })
    const init = ()=>{
      Toast.loading({message:'加载中',forbidClick:true})
      getOrderPreview().then(res=>{
        let address = res.address.filter(item=>{
          return item.is_default == '1'
        })
        if(address.length == 0){
          state.address={
            address:'还没有默认地址，请选择或添加'
          }
        }else{
          state.address = address[0]
        }
        state.cartList = res.carts
        Toast.clear()
      })
    }

    onMounted(()=>{
      init()
    })

    const goto = ()=>{
      router.push({path:'/address'})
    }
    const totalPrice = computed(()=>{
      let sum = 0
      state.cartList.forEach(n=>{
        sum += parseFloat(n.goods.price) * parseInt(n.num)
      })
      return sum
    })

    const onSubmit = ()=>{
      const params = {
        address_id :state.address.id

      }
      createOrder(params).then(res=>{
        Toast.success('创建订单成功')
        store.dispatch('updateCart')

        state.show = true
        state.orderId = res.id
        payOrder(state.orderId,{type:'aliyun'}).then(res=>{
          state.aliyun = res.qr_code_url;
          state.wechat = res.qr_code_url;
        })

        const time = setTimeout(()=>{
          /*payOrderStatus(state.orderId).then(res=>{
            if(res == 2){
              clearInterval(time)
              router.push({path:'/order',query:{status:2}})
            }
          })*/
          router.push({path:'/order',query:{status:2}})
        },2000)
      })
    }

    return {
      ...toRefs(state),goto,totalPrice,onSubmit
    }
  }
}
</script>

<style scoped lang="scss">
.addressview{margin:50px 0 10px 0 }
.van-submit-bar{bottom: 70px!important;}
.good-item,.addressview{display: flex;padding:10px;justify-content: space-between;align-items: center}

.good-img{
  img{width: 70px;margin-right: 10px}
}
</style>