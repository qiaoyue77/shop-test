<template>
    <div>
        <NavBar>
            <template v-slot:center>修改地址</template>
        </NavBar>
        <div style="margin-top:50px">
        <van-address-edit
                :area-list="areaList"
                show-postal
                show-delete
                show-set-default
                show-search-result
                :search-result="searchResult"
                :area-columns-placeholder="['请选择', '请选择', '请选择']"
                @save="onSave"
                @delete="onDelete"
                @change-detail="onChangeDetail"
        /></div>
    </div>
</template>

<script>
    import NavBar from 'components/common/navbar/NavBar'
    import { ref,reactive,toRefs,computed,onMounted } from 'vue';
    import {useRouter,useRoute} from 'vue-router'
    import {useStore} from 'vuex'
    import { Toast } from 'vant';
    import {areaList} from "../../utils/arealist";
    import {addAddress,editAddress,deleteAddress,getAddressDetail} from "../../network/address";

    export default {
        name: "AddressEdit",
        setup() {
            const searchResult = ref([]);
            let router = useRouter()
            let route = useRoute()
            let store = useStore()
            const state = reactive({
                areaList:areaList
            })

            const onSave = (content) => {
                //Toast('save');
                const params = {
                    name:content.name,
                    phone:content.tel,
                    province:content.province,
                    city:content.city,
                    country:content.country,
                    address:content.addressDetail,
                    is_default:content.is_default ? 1:0
                }

                addAddress(params).then(res=>{
                    Toast.success('保存成功')
                    setTimeout(()=>{
                        router.back()
                    },1000)
                })
            }
            const onDelete = () => Toast('delete');
            const onChangeDetail = (val) => {
                if (val) {
                    searchResult.value = [
                        {
                            name: '黄龙万科中心',
                            address: '杭州市西湖区',
                        },
                    ];
                } else {
                    searchResult.value = [];
                }
            };
            onMounted(()=>{

            })

            return {
                onSave,
                onDelete,
                areaList,
                searchResult,
                onChangeDetail,
            };
        },
        components:{
            NavBar
        }
    }


</script>

<style scoped>

</style>