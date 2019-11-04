<template>
  <div class="addressadd">
      <van-nav-bar
        :title="title"
        left-text="返回"
        left-arrow
        border
        @click-left="onClickLeft"
      />
      <van-address-edit
        :area-list="areaList"
        show-delete
        show-set-default
        show-search-result
        :search-result="searchResult"
        area-columns-placeholder="['请选择', '请选择', '请选择']"
        @save="onSave"
        @delete="onDelete"
        @change-detail="onChangeDetail"
      />
  </div>
</template>

<script>
import {mapState,mapMutations, mapActions} from 'vuex';
import { Notify } from 'vant';
export default {
  data(){
    return {
      searchResult: [],
    }
  },
  created(){
    this.shengshiqu();
    this.getinfo(this.token);
  },
  computed:{
    ...mapState('addressadd',['areaList','title']),
    ...mapState('login',['token','info'])
  },
  methods:{
    ...mapMutations('addressadd',['shengshiqu']),
    ...mapActions('addressadd',['addAddress']),
    ...mapActions('login',{
      'getinfo':'info'
    }),
    onClickLeft(){
      this.$router.go(-1);
    },
    onSave(val) {
      console.log(val);
      let data = {
        province:val.province,
        city:val.city,
        area:val.county,
        address:val.addressDetail,
        telephone:val.tel,
        customerId:this.info.id
      };
      console.log(data)
      this.addAddress(data)
      .then((response)=>{
          this.$router.push('/address');
          Notify({ type: 'success', duration: 1000, message: '新地址添加成功' });
      })
    },
    onDelete() {
      Toast('delete');
    },
    onChangeDetail(val) {
      // if (val) {
      //   this.searchResult = [{
      //     name: '黄龙万科中心',
      //     address: '杭州市西湖区'
      //   }];
      // } else {
      //   this.searchResult = [];
      // }
    }
  }
}
</script>

<style>

</style>