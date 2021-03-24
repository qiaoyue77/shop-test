<template>
    <div>
        <NavBar>
            <template  v-slot:center>分类</template>
        </NavBar>
      <div class="mainbox">
        <div class="catebar">
          1
        </div>

          <van-sidebar class="leftmenu" v-model="activeKey">
            <van-collapse v-model="activeName" accordion>
              <van-collapse-item :title="item.name" v-for="(item,index) in categories" :name="index" :key="index">
                <van-sidebar-item :title="sub.name" v-for="sub in item.children" :key="sub" />
              </van-collapse-item>

            </van-collapse>


          </van-sidebar>


        <div class="goodlist">
1
        </div>
      </div>
    </div>
</template>

<script>
    import NavBar from 'components/common/navbar/NavBar'
    import {getCategory} from "network/category";
    import {ref,reactive,onMounted} from 'vue'
    export default {
        name: "Category",
        components:{
            NavBar
        },
      setup(){
          let activeKey = ref(0)
        let categories = ref([])
        let activeName = ref("1")
        onMounted(()=>{
          getCategory().then(res=>{
            console.log(res)
            categories.value = res.categories
          })
        })

          return {
            activeKey,
            categories,
            activeName
          }
      }
    }
</script>

<style scoped lang="scss">
.mainbox{
  margin-top:45px;display: flex;flex-direction: row;flex-wrap: wrap;
  .catebar{
    height:45px;width:100%;padding-left:130px
  }
  .leftmenu{
    width:130px;position: relative;top:-45px;z-index: 99;
  }
  .goodlist{
    flex:1
  }
}
</style>