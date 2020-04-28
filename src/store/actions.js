export default {
    addCart(context,payload){
        let oldObj = context.state.cartList.find(item => item.iid === payload.iid)
        if(oldObj){
            context.commit("addCount",oldObj)
        }else{
            payload.count =1
            payload.checked = true
            context.commit("addToCart",payload)
        }
    }
}