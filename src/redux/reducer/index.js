import { combineReducers } from 'redux'
import user from './user'
import { rememberAccount } from './other'
const myreducer = combineReducers({
    user,
    rememberAccount
  })
  
export default myreducer