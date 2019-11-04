<template>
  <div class="editaddress">
      <van-nav-bar
        title="编辑地址信息"
        left-text="返回"
        left-arrow
        border
        @click-left="onClickLeft"
      />
      <van-cell-group>
        <van-field
            v-model="name"
            label="姓名"
            placeholder="请输入姓名"
        />
        <van-field
            v-model="phone"
            label="电话"
            placeholder="请输入手机号"
        />
        <van-field
            @click="showPopup"
            v-model="d"
            label="地区"
            placeholder="请选择地区"
        />
        <van-field
            v-model="address"
            label="详细地址"
            placeholder="街道门牌、楼层房间号等信息"
        />
        <van-button class="btn editAddress" type="info" size="large" @click="editHandler">保存</van-button>
        <van-button class="btn deleteAddress" type="danger" size="large" @click="deleteHandler">删除</van-button>
       </van-cell-group>
       <van-popup
        round
        v-model="show"
        position="bottom"
        :style="{ height: '50%' }"
        ><van-area :area-list="areaList"  value="xuanzhong" @cancel='quxiao' @confirm='queren' /></van-popup>
  </div>
</template>

<script>
import {mapState,mapMutations, mapActions} from 'vuex';
import { Notify } from 'vant';
export default {
    data(){
        return {
            diqu:[],
            d:[],
            show: false,
            name:'',
            phone:'',
            address:'',
            obj:[],
            id:'',
            arr:[],
        }
    },
    created(){
        this.shengshiqu();
        let b = this.$route.query;
        console.log(b.a);
        this.id = b.a;
        this.findAddressById(this.info.id)
        .then((response)=>{
            console.log(response.data);
            // console.log(daingqiandizhi.id);
            this.obj = response.data.filter(item=>item.id==b.a);
            this.name = this.info.name;
            this.phone = this.obj[0].telephone;
            this.d = [this.obj[0].province+' '+this.obj[0].city+' '+this.obj[0].area];
            this.address = this.obj[0].address;
        })
        
    },
    computed:{
        ...mapState('addressadd',['areaList']),
        ...mapState('login',['info']),
    },
    methods:{
        ...mapMutations('addressadd',['shengshiqu']),
        ...mapActions('addressadd',['addAddress','deleteAddress']),
        ...mapActions('address',['findAddressById']),
        queren(arr){
            this.show = false;
            console.log(arr);
            let c = [];
            arr.forEach((item)=>{
                c.push(item.name);
                console.log(c)
            })
            this.arr = c;
            this.d = c[0]+' '+c[1]+' '+c[2];
        },
        quxiao(){
            this.show = false;
        },
        onClickLeft(){
            this.$router.go(-1);
        },
        showPopup(){
            this.show = true;
        },
        editHandler(){
            let data = {
                id:this.id,
                province:this.arr[0],
                city:this.arr[1],
                area:this.arr[2],
                address:this.address,
                telephone:this.phone,
                customerId:this.info.id
            }
            console.log(data)
            this.addAddress(data)
            .then((response)=>{
                this.$router.go(-1);
                Notify({ type: 'success', duration: 1000, message: '地址修改成功' });
            })
        },
        deleteHandler(){
            this.deleteAddress(this.id)
            .then((response)=>{
                this.$router.go(-1);
                Notify({ type: 'success', duration: 1000, message: '地址删除成功' });
            })
        }
    }
}
</script>

<style scoped>
    .btn {
    margin-top: 5%;
    box-sizing: border-box;
    width: 90%;
    margin-left: 5%;
    border-radius: 4%;
  }
</style>