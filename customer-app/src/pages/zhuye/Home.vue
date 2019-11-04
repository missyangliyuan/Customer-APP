<template>
  <div class="home">
      <van-search
        placeholder="请输入搜索关键词"
        @focus="tosearch"
      >
      </van-search>
      <van-swipe :autoplay="1500" indicator-color="white">
        <van-swipe-item><img src="../../assets/images/home_001.png" alt=""></van-swipe-item>
        <van-swipe-item><img src="../../assets/images/home_002.png" alt=""></van-swipe-item>
        <van-swipe-item><img src="../../assets/images/home_003.png" alt=""></van-swipe-item>
        <van-swipe-item><img src="../../assets/images/home_004.png" alt=""></van-swipe-item>
        <van-swipe-item><img src="../../assets/images/home_005.png" alt=""></van-swipe-item>
        <van-swipe-item><img src="../../assets/images/home_006.png" alt=""></van-swipe-item>
        <van-swipe-item><img src="../../assets/images/home_007.png" alt=""></van-swipe-item>
        <van-swipe-item><img src="../../assets/images/home_008.png" alt=""></van-swipe-item>
      </van-swipe>
      <van-grid :column-num="3">
        <van-grid-item
          v-for="a in categories.slice(0,6)"
          :key="a.id"
          :icon="a.icon"
          :text="a.name"
          @click="lanmuHandler"
        />
      </van-grid>
      <van-grid :column-num="3">
        <van-grid-item
          v-for="b in products.slice(0,3)"
          :key="b.id"
          :icon="b.photo"
          :text="b.name"
          @click="chanpinHandler"
        />
      </van-grid>
      <div class="wei"></div>
  </div>
</template>

<script>
import {mapState,mapActions} from 'vuex';
export default {
  data(){
    return {
        
    }
  },
  created(){
    this.findAllCategories();
    this.findAllProducts();
  },
  computed:{
    ...mapState('home',['categories','products']),
  },
  methods:{
    ...mapActions('home',['findAllCategories','findAllProducts']),
    tosearch(){
      this.$router.push('/shouye/home/search')
    },
    lanmuHandler(){
      this.$router.push('/product');
    },
    chanpinHandler(){
      this.$router.push('/product');
    }
  }
}
</script>

<style>
  img {
    width: 100%;
  }
  .van-grid-item__icon {
    font-size: 60px;
  }
  .wei {
    height: 15%;
  }
</style>