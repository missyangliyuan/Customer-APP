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
    <van-row>
        <van-col offset="2" span="8">
            <div class="change" @click="toSignUp">没有账号？去注册</div>
        </van-col>
        <van-col offset="9" span="5">
            <div class="change" @click="forgetPasswordHandler">忘记密码</div>
        </van-col>
    </van-row>

    <van-button class="login-btn" type="info" size="large" @click="loginHandler">登录</van-button>
  </div>
</template>

<script>
import {mapActions, mapState} from 'vuex';
import { Notify } from 'vant';
import { Toast } from 'vant';
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
            console.log(canshu);
            this.LoginCustomer(canshu)
            .then((response)=>{
                console.log(response.data)
                this.$router.push('/shouye/home');
                Notify({ type: 'success', duration: 1000, message: '登录成功' });
            })
            .catch((response)=>{
                Toast({
                    message: '账号或密码错误',
                    icon: 'warning-o'
                });
            })
        },
        toSignUp(){
            this.$router.push('/signup');
        },
        forgetPasswordHandler(){
            this.$router.push('/searchpassword');
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
    .change {
        color: blue;
        font-size: 12px;
    }
</style>