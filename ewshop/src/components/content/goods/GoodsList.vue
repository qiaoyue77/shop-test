<template>
    <div class="goods">
        <GoodsListItem v-for="item in goods" :key="item" :product="item"></GoodsListItem>

    </div>
</template>

<script>
    import GoodsListItem from 'components/content/goods/GoodsListItem'
    export default {
        name: "goods-list",
        components:{
            GoodsListItem
        },
        props:{
            goods:{
                type:Array,
                default(){
                    return []
                }
            }
        }
    }
</script>

<style scoped lang="scss">
.goods{display: flex;flex-direction: row;flex-wrap: wrap;justify-content: space-between;padding:10px}
</style>