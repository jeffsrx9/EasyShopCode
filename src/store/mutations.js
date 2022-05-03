const mutations = {
    setIsLogin(state, payload) {
        // 判斷是否有token存在
        state.user.isLogin = payload;
    },
    setIsLoginsuper(state, payload) {
        state.user.isLoginsuper = payload;
    },
    addCart(state,payload){
        state.cartCount = payload.count
    }

}

export default mutations;