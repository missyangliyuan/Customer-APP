<template>
  <div class="searchpassword">
      <van-nav-bar title="家政服务安全中心">
        <van-icon name="arrow-left" slot="left" @click="fanhuiHandler" />
      </van-nav-bar>
      <van-steps :active="active">
        <van-step>填写账号</van-step>
        <van-step>身份验证</van-step>
        <van-step>重置密码</van-step>
        <van-step>完成</van-step>
      </van-steps>
      <br>
      <div v-if="active == 0">
          <van-field
            v-model="username"
            required
            clearable
            label="账号"
            :error-message="errorusername"
            placeholder="请输入账号"
            @blur="querenusername"
        />
        <br>
        <br>
        <van-row>
            <van-col offset="9" span="6">
                <van-button type="info" @click="nextone">下一步</van-button>
            </van-col>
        </van-row>
      </div>
      <div v-if="active == 1">
          <van-field
            v-model="telephone"
            required
            clearable
            type="tel"
            label="手机号"
            :error-message="errortelephone"
            placeholder="请输入手机号"
        />
        <br>
        <br>
        <van-row>
            <van-col offset="9" span="6">
                <van-button type="info" @click="nexttwo">下一步</van-button>
            </van-col>
        </van-row>
      </div>
      <div v-if="active == 2">
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
        <br>
        <br>
        <van-row>
            <van-col offset="9" span="6">
                <van-button type="info" @click="nextthree">下一步</van-button>
            </van-col>
        </van-row>
      </div>
      <div v-if="active == 3">
          <br>
          <br>
          <br>
          <van-row>
            <van-col offset="11" color='red' span="6">
                    <van-icon size="40px" name="passed" />
            </van-col>
            <van-col offset="9"  span="8">
                    <div>密码修改完成！</div>
            </van-col>
          </van-row>
      </div>
  </div>
</template>

<script>
import { Step, Steps } from 'vant';
import { mapActions } from 'vuex';
export default {
    data(){
        return {
            active:0,
            username:'',
            telephone:'',
            password:'',
            realpassword:'',
            errormessage:'',
            errorusername:'',
            errortelephone:'',
            Allcustomer:[],
            xinxi:{},
        }
    },
    methods:{
        ...mapActions('login',['findAllcustomer','signup']),
        nextone(){
            let a = this.username;
            this.findAllcustomer()
            .then(response=>{
                this.Allcustomer = response.data;
            })
            let b = this.Allcustomer.filter(item=>{
                return item.username == this.username;
            })
            console.log(b)
            if(b.length == 0){
                this.errorusername = '您输入的账号不存在，请重新输入';
            } else {
                this.errorusername = '';
                console.log(b[0].id);
                this.xinxi = b[0];
                this.active+=1;
            }
        },
        nexttwo(){
            let a = this.telephone;
            this.findAllcustomer()
            .then(response=>{
                this.Allcustomer = response.data;
            })
            let b = this.Allcustomer.filter(item=>{
                return item.telephone == this.telephone;
            })
            console.log(b,'=====')
            if(b.length == 0){
                this.errortelephone = '您输入的手机号有误，请重新输入';
            } else {
                if(b[0].id == this.xinxi.id){
                    this.errortelephone = '';
                    this.active+=1;
                } else {
                    this.errortelephone = '您输入的手机号有误，请重新输入';
                }
            }
        },
        nextthree(){
            let a = this.password;
            let b = this.realpassword;
            if(a != b){
                this.errormessage = '两次输入的密码不一致';
            } else {
                this.errormessage = '';
                this.xinxi.password = this.realpassword;
                let c = this.xinxi;
                this.signup(c)
                .then(response=>{
                    this.active+=1;
                    setTimeout(()=>{
                        this.$router.go(-1);
                    },3000)
                })
            }
        },
        fanhuiHandler(){
            this.$router.go(-1);
        },
        querenusername(){
            this.errorusername = '您输入的账号不存在，请重新输入';
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
    }
}
</script>

<style>

</style>