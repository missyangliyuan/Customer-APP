<template>
  <div class="addressadd">
      <van-nav-bar
        title="新增地址信息"
        left-text="返回"
        left-arrow
        border
        @click-left="onClickLeft"
      />
      <van-address-edit
        :area-list="areaList"
        show-postal
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
import {mapState,mapMutations} from 'vuex'
export default {
  data(){
    return {
      searchResult: [],
    }
  },
  created(){
    console.log(this.areaList,'====')
    this.shengshiqu();
  },
  computed:{
    ...mapState('addressadd',['areaList'])
  },
  methods:{
    ...mapMutations('addressadd',['shengshiqu']),
    onClickLeft(){
      this.$router.push('/address')
    },
    onSave() {
      Toast('save');
    },
    onDelete() {
      Toast('delete');
    },
    onChangeDetail(val) {
      if (val) {
        this.searchResult = [{
          name: '黄龙万科中心',
          address: '杭州市西湖区'
        }];
      } else {
        this.searchResult = [];
      }
    }
  }
}
</script>

<style>

</style>