<template>
    <div><NavBar class="navbar">
        <template v-slot:center>购物车</template>
    </NavBar>
    <div class="gcontetn">
        <div class="gcontetnmain">
            <van-checkbox-group v-model="result" ref="checkboxGroup">
                <van-swipe-cell :right-width="50">
                    <div class="good-item">
                        <van-checkbox name="a"></van-checkbox>
                        <div class="good-img">
                            <img src="~assets/image/lulu1.jpeg"/>
                        </div>
                        <div class="good-desc">
                            <div class="good-title">
                                <span>品牌</span>
                                <span>X100</span>
                            </div>
                            <div class="good-button">
                                <div class="good-price">
                                    <small>￥</small>999
                                </div>
                                <van-stepper :min="1" :max="10" />
                            </div>
                        </div>
                    </div>

                    <template #right>
                        <van-button square type="danger" text="删除" />
                    </template>
                </van-swipe-cell>


            </van-checkbox-group>
        </div>
        <van-submit-bar class="submit-all" :price="999" button-text="结算">
            <van-checkbox >全选</van-checkbox>
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
            const checkAll = () => {
                checkboxGroup.value.toggleAll(true);
            }
            const toggleAll = () => {
                    checkboxGroup.value.toggleAll();
                }
            //状态
            const state = reactive({
                list:[]
            })

            const init= ()=>{
                Toast.loading({message:'加载中...',forbidClick:true})
               getCart('include=goods').then(res=>{
                    state.list = res.data;
                   Toast.clear()
               })
            }
            onMounted(()=>{
                init()
            })
            const goto = ()=>{
                router.push({path:'/home'})
            }
                return {
                checked,
                    checkAll,
                    toggleAll,
                    checkboxGroup,
                    ...toRefs(state),
                    goto
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
            img{width: 50px;}
        }
    }

}
    .submit-all{bottom: 55px;}
</style>