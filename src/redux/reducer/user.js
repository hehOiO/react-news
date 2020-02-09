import Session from '@/common/Session'

const userinfo = function(state,action){
    if(state === undefined){
        state = ''; 
    }
    switch(action.type){
        case 'updata_userinfo':
            Session.saveItem('react_userInfo',action.value);
            return action.value;
        default:
            return state;
    }
}
export default userinfo;