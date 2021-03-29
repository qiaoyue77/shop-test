<template>
    <div>
        <NavBar>
            <template v-slot:center>添加地址</template>
        </NavBar>
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
        />
    </div>
</template>

<script>
    import NavBar from 'components/common/navbar/NavBar'
    import { ref,reactive,toRefs,computed,onMounted } from 'vue';
    import {useRouter} from 'vue-router'
    import {useStore} from 'vuex'
    import { Toast } from 'vant';
    import {areaList} from "../../utils/arealist";

    export default {
        name: "AddressEdit",
        setup() {
            const searchResult = ref([]);
            let router = useRouter()
            let store = useStore()
            const onSave = () => Toast('save');
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