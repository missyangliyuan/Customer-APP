import {get,post,post_array,post_json} from '../http/axios'
import { getToken , setToken , removeToken } from '../utils/auth';
export default {
    namespaced:true,
    state:{
        info:{},
        token:getToken(),
    },
    mutations:{
        refreshInfo(state,info){
            state.info = info;
        },
        refreshToken(state,token){
            state.token = token;
        }
    },
    getters:{

    },
    actions:{
        async LoginCustomer(context,data){
            // 1. 登录
            let response = await post_json('/user/login',data);
            let token = response.data.token;
            // 2. 将token 缓存起来
            setToken(token);
            //  3. 将token 维护到状态机中
            context.commit('refreshToken',token)
            // await context.dispatch('info',token);
            return response;
        },
        // 通过token 获取info
        async info(context,token){
            let response = await get('/user/info',{token});
            // 将用户数据设置到 info 中
            context.commit('refreshInfo',response.data)
        },
        // 退出登录
        async logout(context){
            // 1. 请求后台退出登录
            await post('/user/logout');
            // 2. 清除本地缓存
            removeToken();
            // 3. 清理 store
            context.commit('refreshToken','');
            context.commit('refreshInfo',{})

        }
    }
}