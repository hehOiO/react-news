export const userinfoAction = function(userinfo){
    return{
        type:'updata_userinfo',
        value:userinfo
    }
}
export const rememberAccountAction = function(flag){
    return{
        type:'updata_remember_account',
        value:flag
    }
}