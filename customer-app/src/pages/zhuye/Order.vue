<template>
  <div class="order">
      <van-nav-bar title="我的订单" left-text="返回" @click-left="onClickLeft" left-arrow>
        <van-icon name="search" slot="right" />
      </van-nav-bar>
      <van-tabs v-model="active" line-width='20%' swipeable>
        <van-tab title="全部订单">
          <van-card
            centered
            v-for="item in allOrder"
            :key="item.id"
            thumb="https://img.yzcdn.cn/vant/t-thirt.jpg"
          ><div slot="tags" class="dingdan">
              <div>订单号：{{item.id}}</div><br>
              <div>下单时间：{{item.orderTime | datefmt}}</div><br>
              <div>订单状态：{{item.status}}</div><br>
              <div>订单总额：{{item.total}}</div><br>
            </div>
          </van-card>
        </van-tab>
        <van-tab title="未付款">
          <van-card
            centered
            v-for="item in wfkOrder"
            :key="item.id"
            thumb="https://img.yzcdn.cn/vant/t-thirt.jpg"
          ><div slot="tags" class="dingdan">
              <div>下单时间：{{item.orderTime | datefmt}}</div><br>
              <div>订单号：{{item.id}}</div><br>
              <div>订单状态：{{item.status}}</div><br>
              <div>订单总额：{{item.total}}</div><br>
            </div>
          </van-card>
        </van-tab>
        <van-tab title="未服务">
          <van-card
            centered
            v-for="item in djdOrder"
            :key="item.id"
            thumb="https://img.yzcdn.cn/vant/t-thirt.jpg"
          ><div slot="tags" class="dingdan">
              <div>下单时间：{{item.orderTime | datefmt}}</div><br>
              <div>订单号：{{item.id}}</div><br>
              <div>订单状态：{{item.status}}</div><br>
              <div>订单总额：{{item.total}}</div><br>
            </div>
          </van-card>
          <van-card
            centered
            v-for="item in wfwOrder"
            :key="item.id"
            thumb="https://img.yzcdn.cn/vant/t-thirt.jpg"
          ><div slot="tags" class="dingdan">
              <div>下单时间：{{item.orderTime | datefmt}}</div><br>
              <div>订单号：{{item.id}}</div><br>
              <div>订单状态：{{item.status}}</div><br>
              <div>订单总额：{{item.total}}</div><br>
            </div>
          </van-card>
        </van-tab>
        <van-tab title="待确认">
          <van-card
            centered
            v-for="item in dqrOrder"
            :key="item.id"
            thumb="https://img.yzcdn.cn/vant/t-thirt.jpg"
          ><div slot="tags" class="dingdan">
              <div>下单时间：{{item.orderTime | datefmt}}</div><br>
              <div>订单号：{{item.id}}</div><br>
              <div>订单状态：{{item.status}}</div><br>
              <div>订单总额：{{item.total}}</div><br>
            </div>
            <div slot="footer">
              <van-button size="mini" @click="realOrderHandler(item.id)">确认订单</van-button>
            </div>
          </van-card>
        </van-tab>
        <van-tab title="已完成">
          <van-card
            centered
            v-for="item in ywcOrder"
            :key="item.id"
            thumb="https://img.yzcdn.cn/vant/t-thirt.jpg"
          ><div slot="tags" class="dingdan">
              <div>下单时间：{{item.orderTime | datefmt}}</div><br>
              <div>订单号：{{item.id}}</div><br>
              <div>订单状态：{{item.status}}</div><br>
              <div>订单总额：{{item.total}}</div><br>
            </div>
            <div slot="footer">
              <van-button type="info" size="mini" @click="xiangxiOrderHandler(item.id)">详细</van-button>
              <van-button type="danger" size="mini" @click="deleteHandler(item.id)">删除订单</van-button>
            </div>
          </van-card>
        </van-tab>
      </van-tabs>
  </div>
</template>

<script>
import {mapState,mapActions} from 'vuex';
import { Notify } from 'vant';
import { Dialog } from 'vant';
export default {
  data(){
    return {
      allOrder:[],
      wfkOrder:[],
      wfwOrder:[],
      dqrOrder:[],
      ywcOrder:[],
      djdOrder:[],
      active:0,
    }
  },
  created(){
    let customerId = this.info.id;
    console.log(customerId);
    this.findAllOrder();
    console.log(this.orders)
    //  过滤出当前用户的订单
    let a = this.orders.filter(item=>item.customerId=customerId);
    console.log(a);
    this.allOrder = a;
    //  根据订单状态 过滤订单
    let b = a.filter(item=>item.status=='未付款');
    let c = a.filter(item=>item.status=='待派单');
    let d = a.filter(item=>item.status=='待确认');
    let e = a.filter(item=>item.status=='已完成');
    let f = a.filter(item=>item.status=='待接单');
    this.wfkOrder = b;
    this.wfwOrder = c;
    this.dqrOrder = d;
    this.ywcOrder = e;
    this.djdOrder = f;
  },
  // 状态机映射
  computed:{
    ...mapState('login',['token','info']),
    ...mapState('order',['orders']),
  },
  methods:{
    ...mapActions('login',{
      'getinfo':'info',
    }),
    ...mapActions('order',['findAllOrder','realOrder','deleteOrderHandler']),
    onClickLeft(){
      this.$router.push('/shouye/home')
    },
    // 确认订单服务完成
    realOrderHandler(id){
      this.realOrder(id)
      .then((response)=>{
        Notify({ type: 'success', duration: 1000, message: '确认订单成功' });
        let customerId = this.info.id;
        this.findAllOrder();
        let a = this.orders.filter(item=>item.customerId=customerId);
        this.dqrOrder = a.filter(item=>item.status=='待确认');
        console.log(this.dqrOrder)
      })
    },
    deleteHandler(id){
      Dialog.confirm({
        title: '提示',
        message: '是否确认删除，该操作将永久删除订单？'
      }).then(() => {
        this.deleteOrderHandler(id)
        .then((response)=>{
          console.log(response)
          if(response.status == 200){
            Notify({ type: 'success', duration: 1000, message: '订单删除成功' });
          } else {
            Dialog.alert({title: '删除失败'});
          }
        })
      }).catch(() => {
        // on cancel
      });
    }
  }
}
</script>

<style scoped>
  .dingdan > div {
    margin-left: 15px;
  }
</style>