<template>
  <div>
    <NavBar>
      <template v-slot:center>地址管理</template>
    </NavBar>
    <div class="contain">
      <van-address-list
          v-model="chosenAddressId"
          :list="list"
          default-tag-text="默认"
          @add="onAdd"
          @edit="onEdit"
      />

      <div v-if="!list.length">还没有地址</div>
    </div>
  </div>

</template>

<script>
import NavBar from "../../components/common/navbar/NavBar";
import {ref,reactive,onMounted,computed,toRefs} from 'vue'
import {useRouter,useRoute} from 'vue-router'
import {useStore} from 'vuex'
import {Toast} from 'vant'
import {getAddressList} from "../../network/address";

export default {
name: "Address",
  components:{
  NavBar
  },
  setup(){
   const route = useRoute()
    const router = useRouter()
    const store = useStore()
    const state=reactive({
      chosenAddressId:"1",
      list:[]
    })

    onMounted(()=>{
      getAddressList().then(res=>{
        console.log(res)
        //Toast.loading('加载中')
        if(res.data.length==0){
          state.list = [];
          return
        }else{
          state.list = (res.data).map(item=>{
            return {
              id:item.id,
              name:item.name,
              tel:item.phone,
              address:`${item.province} ${item.city} ${item.county} ${item.address} `,
              isDefault:!!item.is_default
            }
          })
        }

      })
    })
    const onAdd = ()=>{
     router.push({path:'/addressEdit',query:{type:'add'}})
    }
    const onEdit = (item)=>{
      router.push({path:'/addressEdit',query:{type:'edit',addressId:item.id}})
    }
    /*const select = (item)=>{
      router.push({path:'/createorder',query:{addressId:item.id}})
    }*/
    return {...toRefs(state),
      onAdd,onEdit
   }
  }
}
</script>

<style scoped lang="scss">
.contain{margin-top:50px;height:calc(100% - 100px)}
.addbtn{position: fixed;width:80%;bottom: 70px;left: 10%;}
.van-address-list__bottom{bottom: 100px!important;}
</style>