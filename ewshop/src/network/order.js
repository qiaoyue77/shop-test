import {request} from "./request";

export function createOrder(params){
    return request({
        url:'/api/orders',
        method:'post',
        params
    })
}

export function getOrderPreview(){
    return request({
        url:'/api/orders/preview',
        method:'get',

    })
}

export function payOrder(order,params){
    return request({
        url:`/api/orders/${order}/pay`,
        method:'get',
        params
    })
}

export function payOrderStatus(order){
    return request({
        url:`/api/orders/${order}/status`,
        method:'get',
    })
}

export function getOrderList(params){
    return request({
        url:`/api/orders`,
        method:'get',
        params
    })
}

export function getOrderDetail(order,params){
    return request({
        url:`/api/orders/${order}`,
        method:'get',
        params:{
            include:'user,orderDetail.goods'
        }
    })
}

export function confirmOrder(order){
    return request({
        url:`/api/orders/${order}/confirm`,
        method:'patch',
    })
}

export function viewExpress(order){
    return request({
        url:`/api/orders/${order}/express`,
        method:'get',
    })
}