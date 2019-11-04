<template>
  <div class="login">
    <div class="head">
        家政服务注册系统
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
            :error-message="errorusername"
             @blur="checkusername"
        />
        <van-field
            v-model="realname"
            required
            clearable
            label="姓名"
            type="tel"
            clickable
            placeholder="请输入真实姓名"
        />
        <van-field
            v-model="password"
            type="password"
            label="密码"
            placeholder="请输入密码"
            required
        />
        <van-field
            v-model="realpassword"
            type="password"
            label="确认密码"
            placeholder="请再次输入密码"
            required
            :error-message="errormessage"
            @blur="querenmima"
        />
        <van-field
            v-model="telephone"
            required
            clearable
            label="电话"
            type="tel"
            clickable
            placeholder="请输入手机号"
        />
        <van-divider>以下为选填项</van-divider>
        <van-field
            v-model="qq"
            clearable
            label="QQ"
            type="tel"
            clickable
            placeholder="请输入QQ号"
        />
        <van-field
            v-model="gender"
            clearable
            label="性别"
            type="tel"
            disabled
            placeholder="请选择性别"
        />
        <van-radio-group v-model="radio" @change="genderHandler">
            <van-row>
                <van-col offset="6" span="3">
                    <van-radio name="男">男</van-radio>
                </van-col>
                <van-col offset="2" span="3">
                    <van-radio name="女">女</van-radio>
                </van-col>
            </van-row>
        </van-radio-group>
        <van-field
            v-model="idCard"
            clearable
            label="身份证"
            type="tel"
            clickable
            placeholder="请输入身份证号"
        />
        <van-field
            v-model="backCard"
            clearable
            label="银行卡"
            type="tel"
            clickable
            placeholder="请输入银行卡号"
        />
    </van-cell-group>
    <van-row>
        <van-col offset="16" span="8">
            <div class="change" @click="toSignIn">已有账号？去登录</div>
        </van-col>
    </van-row>

    <van-button class="login-btn" type="info" size="large" @click="signupHandler">注册</van-button>
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
            realname:'',
            password:'',
            realpassword:'',
            telephone:'',
            qq:'',
            gender:'男',
            radio: '男',
            idCard:'',
            backCard:'',
            errormessage:'',
            errorusername:'',
            Allcustomer:'',
        }
    },
    computed:{
        ...mapState('login',['info'])
    },
    methods:{
        ...mapActions('login',['findAllcustomer','signup']),
        genderHandler(a){
            this.gender = a;
        },
        checkusername(){
            let a = this.username;
            this.findAllcustomer()
            .then(response=>{
                this.Allcustomer = response.data;
            })
            let b = this.Allcustomer;
            let c = b.some((item)=>{
                return item.username == this.username;
            });
            console.log(c)
            if(c == true){
                this.errorusername = '该用户名已占用，请重新输入';
            } else {
                this.errorusername = '';
            }
        },
        querenmima(){
            let a = this.password;
            let b = this.realpassword;
            if(a != b){
                this.errormessage = '两次输入的密码不一致';
            } else {
                this.errormessage = '';
            }
        },
        toSignIn(){
            this.$router.push('/');
        },
        signupHandler(){
            let data = {
                username: this.username,
                password: this.password,
                realname: this.realname,
                telephone: this.telephone,
                gender: this.gender,
                idCard: this.idCard,
                backCard: this.backCard,
                type: 'customer'
            };
            console.log(data);
            this.signup(data)
            .then((response)=>{
                console.log(response.data)
                this.$router.push('/');
                Toast({
                    message: '恭喜您注册成功！',
                    icon: 'passed'
                });
            })
            .catch((response)=>{
                Toast({
                    message: '信息有误，注册失败。',
                    icon: 'warning-o'
                });
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
        margin-top:10%;
        margin-left: 5%;
        width: 90%;
        border-radius: 4%;
    }
    .change {
        color: blue;
        font-size: 12px;
    }
</style>