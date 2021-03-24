<template>
    <div class="goodsitem">
        <img v-lazy="product.cover_url"/>
        <div class="good-info">
            <p>{{ product.title }}</p>
            <span><small>$</small>{{ product.price }}</span>
            <span class="collect"><img src="~assets/image/collection.png"/>{{product.collection}}</span>
        </div>
    </div>
</template>

<script>
    export default {
        name: "goods-list-item",
        props:{
            product:{
                type:Object,
                detault(){
                    return {}
                }
            }
        }
    }
</script>

<style scoped lang="scss">
.goodsitem{
    width:46%;padding-bottom: 40px;
    position: relative;
    img{width: 100%}
   .good-info{position: absolute;width: 100%;bottom:0;left:0;font-size: 12px;overflow: hidden;
   p{
       overflow: hidden;text-overflow: ellipsis;white-space: nowrap;
   }
      .collect{position: relative;width:14px;height:14px;display: inline-block;
      &:before{
          content: "";display: block;
          background: url("~assets/image/collection.png") 0 0;width:14px;height:14px;position: absolute;;top:0;left: 0;
      }
      }
   }
}
</style>