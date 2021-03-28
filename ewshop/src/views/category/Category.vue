<template>
    <div>
        <NavBar>
            <template  v-slot:center>分类</template>
        </NavBar>
      <div class="mainbox" ref="barref">
        <div class="catebar">
            <van-tabs v-model:active="active" @click="tabclick">
                <van-tab title="销量排序"></van-tab>
                <van-tab title="价格排序"></van-tab>
                <van-tab title="评论排序"></van-tab>
            </van-tabs>
        </div>

          <van-sidebar class="leftmenu" v-model="activeKey">
            <van-collapse v-model="activeName" accordion>
              <van-collapse-item :title="item.name" v-for="(item,index) in categories" :name="index" :key="index">
                <van-sidebar-item :title="sub.name" v-for="sub in item.children" :key="sub.id" @click="getGoods(sub.id)"/>
              </van-collapse-item>

            </van-collapse>


          </van-sidebar>


        <div class="goodlist">
            <div class="content">
                <van-card
                        :num="item.comments_count"
                        :tag="item.comments_count >= 0?'流行':'标签'"
                        :price="item.price"
                        :desc="item.updated_at"
                        :title="item.title"
                        :thumb="item.cover_url"
                        :lazy-load="true"

                v-for="item in showGoods" :key="item.id" @click="itemClick(item.id)"/>
            </div>
        </div>
      </div>
        <BackTop v-show="istabshow" @toTop="toTop"></BackTop>
    </div>
</template>

<script>
    import NavBar from 'components/common/navbar/NavBar'
    import BackTop from "../../components/common/backtop/BackTop";
    import {getCategory,getCategoryGoods} from "network/category";
    import {ref,reactive,onMounted,computed,watchEffect,nextTick} from 'vue'
    import BScroll from 'better-scroll'
    import {useRouter} from 'vue-router'
    export default {
        name: "Category",
        components:{
            NavBar,
            BackTop
        },
      setup(){
          let barref = ref(null)
          let activeKey = ref(0)
        let categories = ref([])
        let activeName = ref("1")
          const active = ref(2);
         let bscroll = reactive(null)
          const router = useRouter()

        onMounted(()=>{
          getCategory().then(res=>{
            console.log(res)
            categories.value = res.categories
          })

            init()
            const goodscon = document.querySelector(".goodlist")
            bscroll = new BScroll(goodscon,{
                probeType:3,
                click:true,
                pullUpLoad:true
            })
            bscroll.on("scroll",(position)=>{
                //console.log(position.y)

                istabshow.value = (-position.y > barref.value.offsetHeight)
            })
            bscroll.on("pullingUp",()=>{
                const page = goods[currentOrder.value].page +1

                getCategoryGoods(currentOrder.value,currentCid.value,page).then(res=>{
                    //console.log(res.goods.data)
                    goods[currentOrder.value].list.push(...res.goods.data)
                    goods[currentOrder.value].page +=1;
                    nextTick(()=>{
                        bscroll && bscroll.refresh()
                    })
                })
                console.log(page)
                bscroll.finishPullUp();

                nextTick(()=>{
                    bscroll && bscroll.refresh()
                })
            })
        })
          let goods = reactive({
              sales:{page:1,list:[]},
              price:{page:1,list:[]},
              comments_count:{page:1,list:[]}
          })

          let showGoods = computed(()=>{
              return goods[currentOrder.value].list
          })
          const init = ()=>{
              getCategoryGoods('sales',currentCid.value).then(res=>{
                  //console.log(res.goods.data)
                  goods.sales.list = res.goods.data
              })

              getCategoryGoods('price',currentCid.value).then(res=>{
                  //console.log(res.goods.data)
                  goods.price.list = res.goods.data
              })

              getCategoryGoods('comments_count',currentCid.value).then(res=>{
                  //console.log(res.goods.data)
                  goods.comments_count.list = res.goods.data
              })
          }
          let currentOrder = ref("sales")
          let currentCid = ref(0)
          const tabclick=(index)=>{
              let orders = ["sales","price","comments_count"]
              currentOrder.value = orders[index]
              getCategoryGoods(currentOrder.value,currentCid.value).then(res=>{
                  //console.log(res.goods.data)
                  goods[currentOrder.value].list = res.goods.data

                  nextTick(()=>{
                      bscroll && bscroll.refresh()
                  })
              })
          }

          const getGoods = (cid)=>{
              currentCid.value = cid
              init()
              console.log(cid)
          }
          watchEffect(()=>{
              nextTick(()=>{
                  bscroll && bscroll.refresh()
              })
          })
          let istabshow = ref(false)
          const toTop=()=>{
              bscroll.scrollTo(0,0,500)
          }

          const itemClick = (itemid)=>{
            router.push({path:'/detail',query:{id:itemid}})

          }

          return {
            activeKey,
            categories,
            activeName,
              active,
              tabclick,
              currentOrder,
              getGoods,
              currentCid,
              showGoods,
              bscroll,
              toTop,
              istabshow,
              barref,
              itemClick
          }
      }
    }
</script>

<style scoped lang="scss">
.mainbox{
  margin-top:45px;display: flex;flex-direction: row;flex-wrap: wrap;height: calc(100vh - 45px);
  .catebar{
    height:45px;width:100%;padding-left:130px;    z-index: 99
  }
  .leftmenu{
    width:130px;position: relative;top:0px;z-index: 99;
  }
  .goodlist{
      width: calc(100% - 130px);height: 100%;
  }
}
</style>