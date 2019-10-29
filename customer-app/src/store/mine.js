import {get,post,post_array,post_json} from '../http/axios'
export default {
    namespaced:true,
    state:{

    },
    mutations:{
       
    },
    getters:{

    },
    actions:{
        async Logout(){
           let response = await post('/user/logout');
           return response;
        }
    }
}