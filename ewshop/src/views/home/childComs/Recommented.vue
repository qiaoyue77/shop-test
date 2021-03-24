<template>
    <div class="recombox">
        <div class="recomitem" v-for="item in recomments.slice(0,4)" :key="item">
            <a @click.prevent = "godetail(item.id)">
                <img :src="item.cover_url"/>
                <div>{{item.title}}</div>
            </a>
        </div>

    </div>
</template>

<script>
    import {useRouter} from 'vue-router'
    export default {
        name: "recommented",
        props:{
            recomments:{
                type:Array,
                default(){
                    return []
                }
            }
        },
        setup(){
            const router = useRouter()
             const godetail=(id)=>{
                router.push({path:"/detail",query:{id}})
             }
            return {
                godetail
            }
        }
    }
</script>

<style scoped lang="scss">
    .recombox{
        width: 100%;display: flex;flex-direction: row;border-bottom: 8px solid #ededed;
        .recomitem{height:100%;flex: 1;
        img{width:80%;height:75%}
        }
    }

</style>