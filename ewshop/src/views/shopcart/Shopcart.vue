<template>
    <div><NavBar class="navbar">
        <template v-slot:center>购物车</template>
    </NavBar>
    <div class="gcontetn">
        <div class="gcontetnmain">
            <van-checkbox-group v-model="result" ref="checkboxGroup" @change="groupChange">
                <van-swipe-cell :right-width="50" v-for="(item,index) in list" :key="index">
                    <div class="good-item">
                        <van-checkbox :name="item.id"></van-checkbox>
                        <div class="good-img">
                            <img :src="item.goods.cover_url"/>
                        </div>
                        <div class="good-desc">
                            <div class="good-title">
                                <span>{{ item.goods.title }}</span>
                                <span>X{{ item.goods.stock }}</span>
                            </div>
                            <div class="good-button">
                                <div class="good-price">
                                    <small>￥</small>{{ item.goods.price }}
                                </div>
                                <van-stepper :min="1" :max=" item.goods.stock " :model-value="item.num" :name="item.id" async-change
                                @change="onChange"/>
                            </div>
                        </div>
                    </div>

                    <template #right>
                        <van-button square type="danger" text="删除" @click="deleteGood(item.id)"/>
                    </template>
                </van-swipe-cell>


            </van-checkbox-group>
        </div>
        <van-submit-bar class="submit-all" :price="total * 100" button-text="结算" @submit="onSubmit">
            <van-checkbox v-model:checked="checkAll" @click="allchecked">全选</van-checkbox>
        </van-submit-bar>
        <div class="cartempty" v-if="!list.length">
            <div>购物车空空如也</div>
            <van-button round type="primary" block @click="goto">前往选购</van-button>
        </div>
    </div>
    </div>
</template>

<script>
    import NavBar from 'components/common/navbar/NavBar'
    import {ref,toRefs,reactive,computed,onMounted} from 'vue'
    import {useStore} from 'vuex'
    import {useRouter} from 'vue-router'
    import {getCart,deleteCartItem,checkedCart,modifyCart} from "../../network/cart";
    import {Toast} from 'vant'

    export default {
        name: "Shopcart",
        components:{
            NavBar
        },
        setup() {
            const checked = ref([]);
            const checkboxGroup = ref(null);
            let router = useRouter()
            let store = useStore()
          //const result = ref()
            //状态
            const state = reactive({
                list:[],
              result:[],
              checkAll:true
            })

            const init= ()=>{
                Toast.loading({message:'加载中...',forbidClick:true})
               getCart('?include=goods').then(res=>{
                    state.list = res.data;
                    state.result = res.data.filter(n=>n.is_checked ==1).map(item=> item.id)
                   Toast.clear()
               })
            }
            onMounted(()=>{
                init()
            })
            const goto = ()=>{
                router.push({path:'/home'})
            }

            const onChange = (value,detail)=>{
              Toast.loading({message:'修改中...',forbidClick:true})
                modifyCart(detail.name,{num:value}).then(res=>{
                  state.list.forEach(item=>{
                    if(item.id == detail.name){
                      item.num = value
                    }
                  })
                })
              Toast.clear()
            }

            const groupChange = (result)=>{
              if(result.length == state.list.length){
                state.checkAll = true
              }else{
                state.checkAll = false
              }
              state.result = result
              checkedCart({cart_ids:result}).then(res=>{

              })
            }

            const allchecked = ()=>{
              if(!state.checkAll){
                state.result = state.list.map(item=>item.id)
                state.checkAll= true
              }else{
                state.result=[]
                state.checkAll = false
              }
            }

            const deleteGood = (id)=>{
              deleteCartItem(id).then(res=>{
                init();
                store.dispatch('updateCart')
              })
            }

            const total = computed(()=>{
              let sum = 0
              state.list.filter(item => state.result.includes(item.id))
                    .forEach(item=>{
                      sum += parseInt(item.num) * parseFloat(item.goods.price)
                    })
              return sum
            })

          const onSubmit = ()=>{
              if(state.result.length == 0){
                Toast.fail('请选择商品进行结算')
                return
              }else{
                router.push({path:'/createorder'})
              }

          }
                return {
                checked,
                    checkboxGroup,
                    ...toRefs(state),
                    goto,
                  onChange,
                  groupChange,
                  allchecked,
                  deleteGood,
                  total,
                  onSubmit
            };
        }
    }
</script>

<style scoped lang="scss">
.gcontetn{
    margin-top:45px;
    .gcontetnmain{
        display: flex;flex-direction: row;width:100%;
        .van-checkbox-group{width:100%;}
        .good-item{width:100%;display: flex;flex-direction: row;justify-content: space-between;padding:10px;
        .good-desc{flex: 1}
        }
        .good-img{
          padding:0 10px;
            img{width: 60px;}
        }
    }

}
    .submit-all{bottom: 55px;}
</style>