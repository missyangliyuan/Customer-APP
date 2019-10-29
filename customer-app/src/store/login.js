import {get,post,post_array,post_json} from '../http/axios'
export default {
    namespaced:true,
    state:{
        info:{},
    },
    mutations:{
        refreshInfo(state,info){
            state.info = info;
        }
    },
    getters:{

    },
    actions:{
        async LoginCustomer(context,data){
            let response = await post_json('/user/login',data);
            let token = response.data.token;
            await context.dispatch('info',token);
            return response;
        },
        async info(context,token){
            let response = await get('/user/info',{token});
            context.commit('refreshInfo',response.data)
        }
    }
}