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
        async findAddressById(context,data){
            let response = await get('/address/findByCustomerId?id='+data);
            return response;
        }
    }
}