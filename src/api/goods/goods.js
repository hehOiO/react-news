import fetch from '@/common/fetch'

export function getGoodsList(params){
    return fetch({
        url: '/goods/list',
        method: 'get',
        params: params
      })
}
export function getGoodsTypeList(params){
    return fetch({
        url: '/goods/type/list',
        method: 'get',
        params: params
      })
}
export function getGoodsBrandList(params){
    return fetch({
        url: '/goods/brand/list',
        method: 'get',
        params: params
      })
}
export function getGoodsModelList(params){
    return fetch({
        url: '/goods/model/list',
        method: 'get',
        params: params
      })
}
export function insertGoods(data){
    return fetch({
        url: '/goods/insert',
        method: 'post',
        data: data
      })
}
export function getGoodsDetail(params){
    return fetch({
        url: '/goods/detail',
        method: 'get',
        params: params
      })
}
export function deleteGoods(params){
    return fetch({
        url: '/goods/delete',
        method: 'delete',
        params: params
      })
}