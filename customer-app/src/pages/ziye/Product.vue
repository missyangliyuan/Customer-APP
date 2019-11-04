<template>
  <div class="product">
      <van-nav-bar title="商品列表" left-text="返回" @click-left="onClickLeft" left-arrow>
        <van-icon name="search" slot="right" />
      </van-nav-bar>
      <van-row>
        <van-col span="5">
            <van-sidebar v-model="activeKey">
                <van-sidebar-item v-for='item in categories' :key="item.id" @click="chanpinHandler" :title="item.name"></van-sidebar-item>
            </van-sidebar>
        </van-col>
        <van-col span="19">
            <div class="neirong">
                <van-card
                centered
                v-for="item in chanpinfenlei"
                :key="item.id"
                :price="item.price"
                :desc="item.description"  
                :title="item.name"
                :thumb="item.photo"
                >
                <div slot="tags">
                    <van-tag plain type="danger">标签</van-tag>
                    <van-tag plain type="danger">标签</van-tag>
                </div>
                <div slot="footer">
                    <van-stepper v-model="item.number" @change="numberchangeHandler(item)" min='0' />
                </div>
                </van-card>
            </div>
        </van-col>
      </van-row>
       <van-goods-action>
        <van-goods-action-icon icon="chat-o" text="客服" @click="onClickKefu" />
        <van-goods-action-icon icon="cart-o" text="购物车" :info="gouwuche.size" @click="onClickShopcar" />
        <van-goods-action-button type="warning" text="加入购物车" @click="onClickAddShopcar" />
        <van-goods-action-button type="danger" text="立即购买" @click="BuyHandler" />
       </van-goods-action>
  </div>
</template>

<script>
import {mapState,mapActions, mapMutations, mapGetters} from 'vuex';
export default {
    data(){
        return {
            activeKey: 0,
            chanpinfenlei:[],
            gouwuche:new Map(),
        }
    },
    created(){
        this.findAllCategories();
        this.findAllProducts();
    },
    computed:{
        ...mapState('product',['categories','products']),
        ...mapGetters('shopcar',['total']),
        ...mapState('shopcar',['orderLines']),

    },
    methods:{
        ...mapMutations('shopcar',['addShopcar']),
        ...mapActions('product',['findAllCategories','findAllProducts']),
        onClickLeft(){
            this.$router.push('/shouye/home')
        },
        chanpinHandler(index){
            console.log(index);
            console.log(this.categories[index].id);
            let id = this.categories[index].id;
            this.chanpinfenlei = this.products.filter(item=>item.categoryId==id);
        },
        BuyHandler(){
            this.$router.push('/shouye/order/orderreal')
        },
        numberchangeHandler(val){
            let orderLine = {
                productId:val.id,
                productName:val.name,
                price:val.price,
                number:val.number,
            }
            console.log(orderLine);
            this.addShopcar(orderLine);
        },
        onClickKefu(){

        },
        onClickShopcar(){
            let arr = [...this.gouwuche];
            this.$router.push({
                path:'/shopcar',
                query: {arr},
            })
        },
        onClickAddShopcar(){
            console.log(this.orderLines);
            const map1 = new Map([...this.orderLines].filter(([k,v])=>v.number != 0));
            console.log(map1);
            this.gouwuche = map1;
        },
    }
}
</script>

<style>
    /* .van-sidebar {
        float: left;
    }
    .neirong {
        margin-left: 23%;
    } */
</style>