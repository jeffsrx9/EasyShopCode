import {
    getCart
} from "@/../public/network/cart";


const actions = {
    updateCart({commit}) {
        if(window.localStorage.getItem('token')){
            getCart().then(res => {
                commit('addCart', {count: res.data.length || 0});
            })
        }else{commit('addCart',{count:0})};
       
    }
}

export default actions;