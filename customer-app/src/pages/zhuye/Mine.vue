<template>
  <div class="mine">
      <van-nav-bar title="个人中心">
        <van-icon name="arrow-left" slot="left" />
        <van-icon name="setting-o" slot="right" />
      </van-nav-bar>
      <div class="xinxi">
        <div class="touxiang">
          <img src="../../assets/images/mine_02.jpg" alt="">
        </div>
        <div class="username">{{info.name}}</div>
      </div>
      <van-panel title="我的地址" icon="location-o" @click="addressHandler"></van-panel>
      <van-panel title="我的订单" icon="orders-o"></van-panel>
      <van-panel title="我的钱包" icon="bag-o"></van-panel>
      <van-button class="logout" type="danger" size="large" @click="logoutHandler">退出登录</van-button>
  </div>
</template>

<script>
import {mapActions, mapState} from 'vuex';
import { Notify } from 'vant';
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
      ...mapActions('mine',['Logout']),
      logoutHandler(){
        this.Logout()
        .then((response)=>{
          this.$router.push('/');
          Notify({ type: 'success', duration: 1000, message: '您已退出登录' });
        });
      },
      addressHandler(){
        this.$router.push('/address')
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
    width: 20%;
    height: 20%;
    border-radius: 50%;
  }
  .touxiang > img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
  }
  .logout {
    margin-top: 10%;
  }
</style>