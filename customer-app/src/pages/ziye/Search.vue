<template>
  <div class="search">
      <van-row>
        <van-col span="2"><van-icon class='fanhui' name="arrow-left" @click="fanhuiHandler"></van-icon></van-col>
        <van-col span="22">
            <van-search class="sousuokuang"
                placeholder="请输入搜索关键词"
                show-action
                @search="onSearch"
                >
                <van-button plain type="info" slot="action" size="small" @click="onSearch">搜索</van-button>
            </van-search>
        </van-col>
      </van-row>
  </div>
</template>

<script>
import { Toast } from 'vant';
export default {
    data(){
        return {

        }
    },
    methods:{
        fanhuiHandler(){
            this.$router.push('/shouye/home')
        },
        onSearch(){
            Toast({
                message: '亲，该功能还未开放哟！',
                icon: 'like-o'
            });
        }
    }
}
</script>

<style>
    .fanhui {
        font-size: 24px;
        line-height: 50px;
        margin-left: 8%;
    }
</style>