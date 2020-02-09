import fetch from '@/common/fetch'

export function login(data){
    return fetch({
        url: '/login',
        method: 'post',
        data: data
      })
}