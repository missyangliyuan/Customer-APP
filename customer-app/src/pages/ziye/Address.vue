<template>
  <div class="address">
      <van-nav-bar
        title="我的地址"
        left-text="返回"
        left-arrow
        @click-left="onClickLeft"
        @click-right="onClickRight"
      />
        <van-address-list
        v-model="chosenAddressId"
        :list="address"
        @add="onAdd"
        @edit="onEdit"
        />
  </div>
</template>

<script>
import {mapActions,mapState, mapMutations} from 'vuex'
export default {
    data(){
        return {
            address:[],
            chosenAddressId: '0',
        }
    },
    created(){
        this.getInfo(this.token);
        console.log(this.info.id);
        let guke = this.info.name;
        this.findAddressById(this.info.id)
        .then((response)=>{
            response.data.forEach((item)=>{
                let obj = {
                    id:item.id,
                    name:guke,
                    tel:item.telephone,
                    address:item.province+item.city+item.area+item.address,
                };
                this.address.push(obj);
            })
        })
    },
    computed:{
        ...mapState('login',['token','info']),
        ...mapState('addressadd',['title']),
    },
    methods:{
        ...mapMutations('addressadd',['setTitle']),
        ...mapActions('address',['findAddressById']),
        ...mapActions('login',{
            'getInfo':'info'
        }),
        onClickLeft(){
            this.$router.push('/shouye/mine');
        },
        onClickRight(){},
        onAdd(){
            this.$router.push('/addressadd');
            this.setTitle('添加地址信息');
        },
        // onEdit(item,index){
        //     this.$router.push('/addressedit');
        //     console.log(item.id);
        // }
        onEdit(daingqiandizhi,index){
            console.log(daingqiandizhi,index);
            let a = daingqiandizhi.id;
             this.$router.push({
                path:'/addressedit',
                query:{a}
            });
        },
    }
}
</script>

<style>

</style>