import Session from '@/common/Session'

export function rememberAccount(state,action){
    if(state === undefined){
        state = ''; 
    }
    switch(action.type){
        case 'updata_remember_account':
            Session.saveItem('remember_account',action.value);
            return action.value;
        default:
            return state;
    }
}



