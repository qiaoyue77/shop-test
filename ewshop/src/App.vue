<template>
<router-view v-slot="{Component}">
  <transition>
    <keep-alive>
      <component :is="Component"></component>
    </keep-alive>
  </transition>
</router-view>
<!--  <router-view/>-->
  <div id="nav">
    <router-link class="nav-item" to="/">
      <i class="iconfont icon-shouye"></i>
      <div>首页</div></router-link>
    <router-link class="nav-item" to="/category"><i class="iconfont icon-fenlei"></i><div>分类</div></router-link>
    <router-link class="nav-item" to="/shopcart">
      <van-badge :content="20" max="9">
        <i class="iconfont icon-dilanxianxingiconyihuifu_huabanfuben "></i>
      </van-badge>
      <div>购物车</div></router-link>
    <router-link class="nav-item" to="/profile"><i class="iconfont icon-tubiaozhizuomoban"></i><div>我的</div></router-link>
  </div>
</template>
<style lang="scss">
  @import "assets/css/base.css";
  @import "assets/css/iconfont.css";
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;

}

#nav {
  padding: 10px;
  width: 100%;display: flex;flex-direction: row;position: fixed;bottom: 0;background: #efefef;
  .nav-item{
    flex:1
  }

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
