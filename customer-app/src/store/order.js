import {get,post,post_array,post_json,post_obj_array} from '../http/axios'
export default {
    namespaced:true,
    state:{
        orders:[],
    },
    mutations:{
       shuaxinOrder(state,orders){
           state.orders = orders;
       }
    },
    getters:{

    },
    actions:{
        async findAllOrder(context){
            let response = await get('order/findAll');
            let daoxu = response.data.reverse();
            context.commit('shuaxinOrder',daoxu)
        },
        async saveOrder(context,data){
            let response = await post_obj_array('/order/save',data);
            return response;
        },
        // 确认订单
        async realOrder(context,id){
            let response = await get('/order/confirmOrder?orderId='+id);
            return response;
        },
        // 删除订单
        async deleteOrderHandler(context,id){
            let response = await get('/order/deleteById?id='+id)
            return response;
        }
    }
}