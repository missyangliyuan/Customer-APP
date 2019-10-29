<template>
  <div class="shouye">
      <router-view></router-view>
      <div>
        <van-tabbar v-model="active" @change="changeHandler">
            <van-tabbar-item name="/shouye/home" icon="star-o">首页</van-tabbar-item>
            <van-tabbar-item name="/shouye/order" icon="shopping-cart-o">订单</van-tabbar-item>
            <van-tabbar-item name="/shouye/mine" icon="contact">我的</van-tabbar-item>
        </van-tabbar>
      </div>
  </div>
</template>

<script>
export default {
    data(){
        return {
            active: '/home'
        }
    },
    methods:{
        changeHandler(path){
            this.$router.push({path});
        }
    }
}
</script>

<style>

</style>