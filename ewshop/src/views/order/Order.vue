<template>
  <div>
    <NavBar class="navbar">
      <template v-slot:center>订单</template>
    </NavBar>
  </div>
</template>

<script>
import NavBar from "../../components/common/navbar/NavBar";
export default {
name: "Order",
  components:{
    NavBar
  }
}
</script>

<style scoped>

</style>