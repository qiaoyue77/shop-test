<template>
    <div class="tab-control">
        <div class="tab-control-item " :class="{active:index==currenttab}" v-for="(item,index) in title" :key="index" @click="onchange(index)">
            <span>{{item}}</span>
        </div>

    </div>
</template>

<script>
    import {ref,emit} from 'vue'
    export default {
        name: "tab-control",
        props:{
            title:{
                type:Array,
                default(){
                    return []
                }
            }
        },
        setup(props,{emit}){
            const currenttab = ref(0)
            const onchange = (index)=>{

                currenttab.value = index
                emit('tabclick',index)
            }
            return {currenttab,onchange}
        }
    }
</script>

<style scoped lang="scss">
  .tab-control{
      width:100%;height:40px;display: flex;;flex-direction: row;align-items: center;background: #f9f454;position: sticky;top:45px;z-index: 99;
      .tab-control-item{
          flex:1;height: 100%;display: flex;align-items: center;justify-content: center;
      }
      .active{color: var(--color--text);
          border-bottom: 2px solid var(--color--text)}
  }
</style>