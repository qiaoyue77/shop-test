<template>
    <div>
        <NavBar>
            <template  v-slot:center>详情</template>
        </NavBar>
        <van-image width="100%" :src="detail.cover_url" lazy-load/>
        <van-card
                :num="detail.stock"
                :price="detail.price"
                :desc="detail.description"
                :title="detail.title"
        >
            <template #tags>
                <van-tag plain type="danger">新书</van-tag>
                <van-tag plain type="danger">推荐</van-tag>
            </template>
            <template #footer>
                <van-button  type="warning" @click="handleAddCart">加入购物车</van-button>
                <van-button type="danger" @click="goToCart">立即购买</van-button>
            </template>
        </van-card>

        <van-tabs v-model:active="active">
            <van-tab title="概述">
                <div class="content" v-html="detail.details">

                </div>
            </van-tab>
            <van-tab title="热评">
                <div v-for="item in detail.comments" :key="item"></div>
            </van-tab>
            <van-tab title="相关图书">
                <goods-list :goods="like_goods"></goods-list>
            </van-tab>
        </van-tabs>
    </div>
</template>

<script>
    import NavBar from 'components/common/navbar/NavBar'
    import {useRoute,useRouter} from 'vue-router'
    import {ref,onMounted,reactive,toRefs} from 'vue'
    import {getDetail} from "network/detail";
    import GoodsList from "../../components/content/goods/GoodsList";
    import {addCart} from "../../network/cart";
    import {Toast} from 'vant'
    import {useStore} from 'vuex'
    export default {
        name: "Detail",
        components:{
            NavBar,
            GoodsList
        },
        setup(){
            const route = useRoute()
            let router = useRouter()
            let store = useStore()
            const active = ref(0);
            const id = ref(0)
            let book = reactive({
                detail:{},
                like_goods:[]
            })

            onMounted(()=>{
                id.value = route.query.id;
                getDetail(id.value).then(res=>{
                    console.log(res)
                    book.detail = res.goods;
                    book.like_goods = res.like_goods
                })
            })

            const handleAddCart=()=>{
                addCart({goods_id:book.detail.id,num:1}).then(res=>{
                    if(res.status == '204' || res.status == '201'){
                        Toast.success('添加成功')
                        store.dispatch('updateCart')
                    }
                })
            }

            const goToCart=()=>{
                addCart({goods_id:book.detail.id,num:1}).then(res=>{
                    if(res.status == '204' || res.status == '201'){
                        Toast.success('添加成功,显示购物车')
                        store.dispatch('updateCart')
                        router.push({path:'/shopcart'})
                    }
                })
            }

            return {
                id,
                ...toRefs(book),
            active,handleAddCart,goToCart
            }
        }
    }
</script>

<style scoped lang="scss">
    .van-card{text-align: left}
    .van-card__content{align-items: flex-start!important;}
    .content{
        padding: 10px;
        img{
            max-width: 100%;
            height: auto;
        }
    }
</style>