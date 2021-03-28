const mutations = {
    setIsLogin(state,payLoad){
        state.user.isLogin = payLoad
    },
    addCart(state,payload){
        state.cartCount = payload.count
    }
}

export default mutations