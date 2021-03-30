<template>
    <div>
        <NavBar>
            <template v-slot:center>{{ title }}</template>
        </NavBar>
        <div style="margin-top:50px">
        <van-address-edit
                :area-list="areaList"
                :address-info="addressInfo"
                show-postal
                :show-delete="type=='edit'"
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
                areaList:areaList,
                type:'add',
                addressId:'',
                title:'',
                addressInfo:{}
            })

            const onSave = (content) => {
                //Toast('save');
              console.log(content)
                const params = {
                    name:content.name,
                    phone:content.tel,
                    province:content.province,
                    city:content.city,
                    //country:content.county,
                  county:content.county,
                    address:content.addressDetail,
                    is_default:content.isDefault ? 1:0,
                  //areaCode:content.areaCode
                }
              if(state.type=='edit'){
                editAddress(state.addressId,params)
              }else if(state.type=='add'){
                addAddress(params)
              }
              Toast.success('保存成功')
              setTimeout(()=>{
                router.back()
              },1000)
            }
            const onDelete = () => {
              deleteAddress(state.addressId).then(res=>{
                Toast.success('删除成功')
                setTimeout(()=>{
                  router.back()
                },1000)
              })
            };
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
                const {type,addressId} = route.query;
                state.type = type
                state.addressId = addressId

                if(type == 'edit'){
                  getAddressDetail(addressId).then(res=>{
                    const addDetail = res
                    let _areacode = ''
                    Object.entries(areaList.county_list).forEach(([id,text])=>{
                      let provinceA =[]
                      let cityA=[]
                      if(text == addDetail.county){
                        Object.entries(areaList.province_list).forEach(([proid,pro])=>{
                          if(proid.substr(0,2)==id.substr(0,2)){
                            provinceA =[proid,pro]
                          }
                        })
                         Object.entries(areaList.city_list).forEach(([cityid,city])=>{
                          if(cityid.substr(0,4)==id.substr(0,4)){
                            cityA = [cityid,city]
                            console.log(id.substr(0,4))
                          }

                        })
                        console.log(cityA)
                        if(provinceA[1] == addDetail.province && cityA[1] == addDetail.city){
                          _areacode = id
                        }
                      }
                    })

                    console.log(_areacode)
                    state.addressInfo = {
                      name:addDetail.name,
                      tel:addDetail.phone,
                      province:addDetail.province,
                      city:addDetail.city,
                      county:addDetail.county,
                      areaCode:_areacode,
                      addressDetail:addDetail.address,
                      isDefault:!!addDetail.is_default
                    }
                  })
                }
            })
            const title = computed(()=>{
              return state.type =='add'?'新增地址':'编辑地址'
            })
            return {
              ...toRefs(state),
                onSave,
                onDelete,
                areaList,
                searchResult,
                onChangeDetail,
                title
            };
        },
        components:{
            NavBar
        }
    }


</script>

<style scoped>

</style>