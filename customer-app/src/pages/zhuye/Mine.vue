<template>
  <div class="mine">
      <van-nav-bar title="个人中心">
        <van-icon name="arrow-left" slot="left" @click="fanhuiHandler" />
        <van-icon name="setting-o" slot="right" />
      </van-nav-bar>
      <div class="xinxi">
        <div class="touxiang">
          <img :src="info.avatar" alt="">
        </div>
        <div class="username">{{info.name}}</div>
      </div>
      <van-cell title="我的地址" icon="location-o" is-link to="/address" />
      <van-cell title="我的订单" icon="orders-o" is-link to="/shouye/order" />
      <van-cell title="我的购物车" icon="shopping-cart-o" is-link to="/shopcar" />
      <van-cell title="我的钱包" icon="bag-o" is-link @click="bagHandler" />
      <van-button class="logout" type="danger" size="large" @click="logoutHandler">退出登录</van-button>
  </div>
</template>

<script>
import {mapActions, mapState} from 'vuex';
import { Notify } from 'vant';
import { Toast } from 'vant';
export default {
    data(){
      return {
        
      }
    },
    created(){
    },
    computed:{
      ...mapState('login',['info'])
    },
    methods:{
      ...mapActions('login',['logout']),
      ...mapActions('mine',['']),
      logoutHandler(){
        this.logout()
        .then((response)=>{
          this.$router.push('/');
          Notify({ type: 'success', duration: 1000, message: '您已退出登录' });
        });
      }, 
      fanhuiHandler(){
        this.$router.push('/shouye/home')
      },
      bagHandler(){
        Toast({
                message: '亲，该功能还未开放哟！',
                icon: 'like-o'
            });
      }
    }
}
</script>

<style>
  .xinxi {
    width: 100%;
    background: #ededed;
    margin-top: 2%;
    margin-bottom: 10%;
    padding: 2% 5%;
    box-sizing: border-box;
    display: flex;
  }
  .xinxi > .username {
    margin-left: 5%;
    line-height: 58px;
  }
  .touxiang {
    width: 60px;
    height: 60px;
    border-radius: 50%;
  }
  .touxiang > img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
  }
  .logout {
    margin-top: 10%;
    box-sizing: border-box;
    width: 90%;
    margin-left: 5%;
    border-radius: 4%;
  }
</style>