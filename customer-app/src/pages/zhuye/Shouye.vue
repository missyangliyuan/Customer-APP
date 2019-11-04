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
import { mapState , mapActions } from 'vuex';
export default {
    data(){
        return {
            active: '/home'
        }
    },
    computed:{
        ...mapState('login',['token','info']),
    },
    methods:{
        ...mapActions('login',{
            'getInfo':'info',
            'logout':'logout'
        }),
        changeHandler(path){
            this.$router.push({path});
        },
    },
    created(){
        if(this.token){
            this.getInfo(this.token);
        } else {
            this.$toast('身份认证失效，请您重新登录');
            this.$router.push('/')
        }
    }
}
</script>

<style>

</style>