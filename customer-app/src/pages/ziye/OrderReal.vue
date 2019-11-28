<template>
  <div class="orderreal">
      <van-nav-bar title="确认订单" left-text="返回" @click-left="onClickLeft" left-arrow>
      </van-nav-bar>
      <van-cell icon="location-o" is-link @click="changeAddress">
         <template slot="title">
            <van-row>
                <van-col span="6">{{realaddress.name}}</van-col>
                <van-col span="6">{{realaddress.tel}}</van-col>
                <van-col offset="6" span="6">切换地址</van-col>
                <van-col span="24">{{realaddress.address}}</van-col>
            </van-row>
        </template>
      </van-cell>
      <br>
      <van-cell icon="orders-o">
         <template slot="title">
             <van-row>
                 <van-col span="24">订单详情</van-col>
             </van-row>
            <van-row v-for="i of orderLines.values()" :key='i.productName'>
                <van-col span="6">{{i.productName}}</van-col>
                <van-col span="6">￥{{i.price}}</van-col>
                <van-col span="6">*{{i.number}}</van-col>
                <van-col span="6">￥{{i.number*i.price}}</van-col>
            </van-row>
            
        </template>
      </van-cell>
      <van-cell>
          <van-row>
                 <van-col offset='13' span="4">总额：</van-col>
                 <van-col offset='1' span="6">￥{{total}}</van-col>
             </van-row>
      </van-cell>
      <van-cell>
          <template slot="title">
            
        </template>
      </van-cell>
      <br>
      <van-cell icon="clock-o">
          <template slot="title">
            <van-row>
                <van-col span="24">服务时间</van-col>
                <van-col span="24">{{moment}}</van-col>
            </van-row>
        </template>
      </van-cell>
      <van-cell title="请选择支付方式">
          <template slot="title">
            <van-row>
                 <van-col span="24">请选择支付方式</van-col>
             </van-row>
             <br>
            <van-radio-group v-model="radio">
                <van-row>
                    <van-col offset="2" span="21">
                        <van-radio name="1" checked-color="#07c160"><van-icon name="alipay" />支付宝支付</van-radio>
                        <br>
                    </van-col>
                    <van-col offset="2" span="21">
                        <van-radio name="2" checked-color="#07c160"><van-icon name="wechat" />微信支付</van-radio>
                    </van-col>
                </van-row>
            </van-radio-group>
          </template>
      </van-cell>
      <br>
      <br>
      <br>
      <van-row>
        <van-col offset="2" span="20">
            <van-button size="large" type="info" @click="realOrderHandler">确认支付</van-button>
        </van-col>
      </van-row>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex';
import { Notify } from 'vant';
export default {
    data(){
        return {
            addresses:[],
            realaddress:{
                name:'张三',
                tel:13511112222,
                address:'山西省太原市迎泽区五一广场'
            },
            moment:'',
            radio:'1',
        }
    },
    created(){
        console.log(this.$route.query,'=====');
        if(this.$route.query.obj){
            this.realaddress = this.$route.query.obj;
        }
        this.getInfo(this.token);
        this.findAddressById(this.info.id)
        .then((response)=>{
            this.addresses = response.data;
            console.log(response.data)
        }) 
        this.momentHandler(); 
        
    },
    computed:{
        ...mapState('login',['token','info']),
        ...mapState('shopcar',['orderLines']),
        ...mapGetters('shopcar',['total'])
    },
    methods:{
        ...mapActions('login',{
            'getInfo':'info'
        }),
        ...mapActions('address',['findAddressById']),
        ...mapActions('order',['saveOrder','findAllOrder']),
        onClickLeft(){
            this.$router.push('/product');
        },
        changeAddress(){
            this.$router.push("/shouye/order/orderreal/selectaddress");
            // let obj = this.$route.query;
            // console.log(this.realaddress,'-----');
            // this.realaddress = obj.obj;
            // console.log(obj)
            // console.log(this.realaddress)
            // console.log(this.$route.query)
        },
        momentHandler(){
            let now = new Date();
            this.moment = now.toLocaleString();
        },
        // 确认订单 保存数据
        realOrderHandler(){
            let data = {
                customerId:this.info.id,
                addressId:this.realaddress.id,
                orderLines:Array.from(this.orderLines.values())
            };
            console.log(data);
            this.saveOrder(data)
            .then((response)=>{
                this.orderLines.clear();
                this.$router.push('/shouye/order')
                Notify({ type: 'success', duration: 1000, message: '恭喜您下单成功！请耐心等待。' });
                this.findAllOrder();
            })
        }
    }
}
</script>

<style>

</style>