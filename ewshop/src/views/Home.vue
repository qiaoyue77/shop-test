<template>
  <div class="home">

  </div>
</template>

<script>
// @ is an alias to /src

import {onMounted ,ref} from 'vue'
import {getHomeAllData} from "network/home";

export default {
  name: 'Home',
  setup(){
    let banner = ref([])
    onMounted(()=>{
      getHomeAllData().then(res=>{
        console.log(res.slides)
        banner.value = res.slides
      }).catch(err=>{
          console.log(err)
      })
    })
    return {banner}
  },
  components: {

  }
}
</script>
