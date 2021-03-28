<template>
    <div class="body">
        <NavBar class="navbar">
            <template v-slot:center>图书</template>
        </NavBar>
      <TabControl v-show="istabshow" :title="['畅销','新书','精选']" @tabclick="tabclick"></TabControl>
      <div class="wrapper">
        <div class="content">
          <div ref="barref">
            <HomeSwiper :banner="banners"></HomeSwiper>
            <Recommented :recomments = "recos"></Recommented>
          </div>
          <TabControl :title="['畅销','新书','精选']" @tabclick="tabclick"></TabControl>
          <GoodsList :goods="showGoods"></GoodsList>
        </div>
      </div>
      <BackTop v-show="istabshow" @toTop="toTop"></BackTop>
    </div>
</template>

<script>
    import NavBar from "../../components/common/navbar/NavBar";
    import Recommented from 'views/home/childComs/Recommented'
    import TabControl from 'components/content/tabControl/TabControl'
    import GoodsList from 'components/content/goods/GoodsList'
    import BackTop from "../../components/common/backtop/BackTop";
    import HomeSwiper from "./childComs/HomeSwiper";
    import BScroll from 'better-scroll'
    import {getHomeAllData,getHomeGoods} from "../../network/home";
    import {onMounted,ref,reactive,computed,watchEffect,nextTick} from 'vue'

    export default {
        name: "Home",
        setup(){
            let istabshow = ref(false)
            let recos = ref([]);
            let barref = ref(null)
            let goods = reactive({
                sales:{page:1,list:[]},
                recommend:{page:1,list:[]},
                new:{page:1,list:[]},
            })
          let banners = ref([])
            const currentGoods = ref("sales")


            onMounted(()=>{
                getHomeAllData().then(res=>{
                    console.log(res)
                    recos.value = res.goods.data
                  banners.value = res.slides
                }).catch(err=>{
                    console.log(err)
                })

                getHomeGoods("sales").then(res=>{
                    goods.sales.list = res.goods.data
                }).catch(err=>{
                    console.log(err)
                })

                getHomeGoods("recommend").then(res=>{
                    goods.recommend.list = res.goods.data
                }).catch(err=>{
                    console.log(err)
                })

                getHomeGoods("new").then(res=>{
                    goods.new.list = res.goods.data
                }).catch(err=>{
                    console.log(err)
                })

                //console.log(goods)
              const wrapper = document.querySelector(".wrapper")
              scroll = new BScroll(wrapper,{
                probeType: 3,
                click: true,
                pullUpLoad:true
              })
              scroll.on("scroll",(position)=>{
                 //console.log(position.y)

                istabshow.value = (-position.y > barref.value.offsetHeight)
              })

              scroll.on("pullingUp",()=>{
                const page = goods[currentGoods.value].page +1;
                getHomeGoods(currentGoods.value,page).then((res)=>{
                  goods[currentGoods.value].list.push(...res.goods.data)
                  goods[currentGoods.value].page +=1
                })
                console.log(page)
                scroll.finishPullUp()
                scroll.refresh()
              })

              console.log(barref)
            })


            const showGoods = computed(()=>{
                return goods[currentGoods.value].list
            })
            const tabclick = (index)=>{
              let tabtxt = ['sales','new','recommend']
              currentGoods.value = tabtxt[index]
              nextTick(()=>{
                scroll && scroll.refresh()
              })
                console.log(index)
            }

          watchEffect(()=>{
            nextTick(()=>{
              scroll && scroll.refresh()
            })

          })

          const toTop=()=>{
              scroll.scrollTo(0,0,500)
          }

            return {
                recos,
                tabclick,
                goods,
                showGoods,
              istabshow,
              barref,
              toTop,
              banners,

            }
        },
        components:{
            NavBar,
            Recommented,
            TabControl,
            GoodsList,
          BackTop,
          HomeSwiper
        }
    }
</script>

<style scoped lang="scss">
.body{height:100vh;position: relative}
.banner{
    /*margin-top:45px;*/
    img{width: 100%;height:150px}
}
.wrapper{position: absolute;top:45px;bottom:50px;left:0;right:0;width:100%;overflow: hidden}
</style>