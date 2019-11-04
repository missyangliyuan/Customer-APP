import {get,post,post_array,post_json} from '../http/axios'
export default {
    namespaced:true,
    state:{
        categories:[],
        products:[],
    },
    mutations:{
        shuaxinCategories(state,categories){
            state.categories = categories;
        },
        shuaxinProduct(state,products){
            state.products = products;
        }
    },
    getters:{

    },
    actions:{
        async findAllCategories(context){
            let response = await get('/category/findAll')
            context.commit('shuaxinCategories',response.data);
        },
        async findAllProducts(context){
            let response = await get('/product/findAll')
            context.commit('shuaxinProduct',response.data);
        }
    }
}