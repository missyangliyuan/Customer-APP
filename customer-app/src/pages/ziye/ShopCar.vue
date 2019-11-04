<template>
  <div class="shopcar">
      <van-nav-bar title="我的购物车" left-text="返回" @click-left="onClickLeft" left-arrow>
      </van-nav-bar>
        <van-checkbox-group v-model="result" @change='totalHandler'>
            <van-row v-for="item in gouwuche" :key='item'>
                <van-col span="3">
                    <van-checkbox :name="item[1]" v-model="checked"></van-checkbox>
                </van-col>
                <van-col span="21">
                    <van-card
                    :price="item[1].price"
                    desc="描述信息"
                    :origin-price="item[1].price*1.5"
                    :title="item[1].productName"
                    thumb="https://img.yzcdn.cn/vant/t-thirt.jpg"
                    >
                        <div slot="footer">
                            <van-stepper v-model="item[1].number" />
                        </div>
                    </van-card>
                </van-col>
            </van-row>
        </van-checkbox-group>
        <van-submit-bar
        :price="total*100"
        button-text="提交订单"
        safe-area-inset-bottom
        @submit="onSubmitOrderHandler"
        >
        <van-checkbox v-model="checked" @click="quanxuanHandler">全选</van-checkbox>
        <span slot="tip">
            你的收货地址不支持同城送, <span>修改地址</span>
        </span>
        </van-submit-bar>
  </div>
</template>

<script>
import {mapState} from 'vuex';
export default {
    data(){
        return {
            gouwuche:[],
            result:[],
            total:'',
            checked: false,
        }
    },
    created(){
        let obj = this.$route.query;
        this.gouwuche = obj.arr;
        
    },
    computed:{
         ...mapState('shopcar',['orderLines']),
    },
    methods:{
        onClickLeft(){
            this.$router.go(-1)
        },
        totalHandler(val){
            if(val.length != this.gouwuche.length){
                this.checked = false;
            } else {
                this.checked = true;
            }
            console.log(val);
            let a = 0;
            val.forEach(item=>{
                a += item.price*item.number;
            })
            this.total = a;
        },
        quanxuanHandler(){
            this.checked = true;
            let obj = this.$route.query;
            this.result = obj.arr.map(value=>value[1]);
        },
        onSubmitOrderHandler(){
            let arr = this.result;
            console.log(arr);
            this.$router.push({
                path:'/shopcarorderreal',
                query:{arr},
            })
        }
    }
}
</script>

<style>

</style>