import {get,post,post_array,post_json} from '../http/axios'
import _ from 'lodash'
export default {
    namespaced:true,
    state:{
        // 购物车里的东西
        orderLines:new Map(),
    },
    mutations:{
        // 添加购物车 { productId productName price Number}
        addShopcar(state,orderLine){
            // 如果订单项存在，修改number
            // if(orderLines.has(orderLines.productId)){
            //     state.orderLines.get(orderLine.productId).number = orderLine.number;
            // } else {
                // 如果不存在 添加
                state.orderLines.set(orderLine.productId,orderLine)
                state.orderLines = _.clone(state.orderLines);
            // }
        },
        // 清空购物车
        clearShopcar(state){
            state.orderLines.clear();
        }
    },
    getters:{
        total(state){
            let result = 0;
            // state.orderLines.forEach(item=>{
            //     result += item.price * item.number;
            // })
            for(let orderLine of state.orderLines.values()){
                result += orderLine.price * orderLine.number;
            };
            return result;
        }
    },
    actions:{
        
    }
}