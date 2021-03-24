<template>
  <div class="backtop" @click="toTop">

  </div>
</template>

<script>
//import
export default {
name: "BackTop",
  setup(props,{emit}){
  return {
    toTop:()=>{
      emit('toTop')
    }
  }
  }
}
</script>

<style scoped>
.backtop{background: url("~assets/image/up.png") 0 0 no-repeat;width: 40px;height:40px;bottom: 80px;right:20px;z-index: 99;position: fixed;background-size: cover}
</style>