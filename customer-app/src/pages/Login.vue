<template>
  <div class="login">
    <div class="head">
        家政服务登录系统
    </div>
    <van-cell-group>
            <van-field
            v-model="username"
            required
            clearable
            label="用户名"
            type="tel"
            clickable
            placeholder="请输入用户名"
        />
            <van-field
            v-model="password"
            type="password"
            label="密码"
            placeholder="请输入密码"
            required
        />
    </van-cell-group>
    <van-button class="login-btn" type="info" size="large" @click="loginHandler">登录</van-button>
  </div>
</template>

<script>
import {mapActions, mapState} from 'vuex';
import { Notify } from 'vant';
export default {
    data(){
        return {
            username:'',
            password:'',
        }
    },
    computed:{
        ...mapState('login',['info'])
    },
    methods:{
        ...mapActions('login',['LoginCustomer']),
        loginHandler() {
            let canshu = {
                username: this.username,
                password: this.password,
                type: 'customer'
            };
            this.LoginCustomer(canshu)
            .then((response)=>{
                console.log(response.data)
                this.$router.push('/shouye/home');
                Notify({ type: 'success', duration: 1000, message: '登录成功' });
            })
        }
    },
}
</script>

<style>
    .head {
        background-image: url("../assets/images/login_01.jpg");
        width: 100%;
        height: 220px;
        font-size: 30px;
        line-height: 220px;
        text-align: center;
        color: orangered;
    }
    .login-btn {
        box-sizing: border-box;
        margin-top:20%;
        margin-left: 5%;
        width: 90%;
        border-radius: 4%;
    }
</style>