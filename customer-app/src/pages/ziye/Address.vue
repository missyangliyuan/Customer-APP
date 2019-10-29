<template>
  <div class="address">
      <van-nav-bar
        title="我的地址"
        left-text="返回"
        right-text="管理"
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
import {mapActions,mapState} from 'vuex'
export default {
    data(){
        return {
            address:[],
            chosenAddressId: '1',
        }
    },
    created(){
        console.log(this.info.id);
        let guke = this.info.name;
        this.findAddressById(this.info.id)
        .then((response)=>{
            console.log(response.data,"====");
            this.address = response.data;
            response.data.forEach((item)=>{
                console.log(item.id);
                let obj = {
                    id:item.id,
                    name:guke,
                    tel:item.telephone,
                    address:item.province+item.city+item.area+item.address,
                };
                console.log(obj);
                this.address = [obj];
                console.log(this.address)
            })
        })
    },
    computed:{
        ...mapState('login',['info']),
    },
    methods:{
        ...mapActions('address',['findAddressById']),
        onClickLeft(){
            this.$router.push('/shouye/mine');
        },
        onClickRight(){},
        onAdd(){

            this.$router.push('/addressadd')
        },
        onEdit(){},
    }
}
</script>

<style>

</style>