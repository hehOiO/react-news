import React from 'react'
import '@/style/login.less'
import { Component } from 'react'
import { Icon,Input,Checkbox } from 'antd'
import { login as loginApi } from '@/api/user/login'
import Toast from '@/components/toast'
import { connect } from 'react-redux'
import { userinfoAction,rememberAccountAction } from '@/redux/action'
import Session from '@/common/Session'

const mapStateToProps = state => {
    return {
      userInfo:Session.getItem('react_userInfo')||'',
      rememberAccount:Session.getItem('remember_account')||false,
    }
}
const mapDispatchToProps = dispatch => {
    return {
      changeUserInfo: value => {
        dispatch(userinfoAction(value))
      },
      changeRememberAccount: value => {
        dispatch(rememberAccountAction(value))
      }
    }
}
class Login extends Component{
    constructor(props){
        super(props);
        this.state = {
            userInfo:{
                username:'',
                password:''
            }
        };
        console.log(this.props);
    }
    changeUsername = ({ target: { value } }) =>{
        let cache = this.state;
        cache.userInfo.username = value;
        this.setState(cache) 
    }
    changePassword = ({ target: { value } }) =>{
        let cache = this.state;
        cache.userInfo.password = value;
        this.setState(cache) 
    }
    submitInfo = ()=>{
        const that = this;
        let params = this.state.userInfo;
        loginApi(params).then(response=>{
            if(response.data.code === 200){
                let userInfo = response.data.data;
                that.props.changeUserInfo(userInfo);
                that.props.history.push('/')
            }else{
                Toast.error('账号不存在或账号面错误')
            }
        })
    }
    changeRemember(){
        const that = this;
        let { rememberAccount } = this.props;
        console.log(this.props);
        rememberAccount = !rememberAccount;
        this.props.changeRememberAccount(rememberAccount);
    }
    render(){
        const { userInfo } = this.state;
        const { rememberAccount } =  this.props;
        return(
            <div id='login'>
                <div className="login-modal">
                    <div className="login-title">
                        react-login
                    </div>
                    <div className="login-input">
                        <div className="login-info-box" style={{ marginBottom:'20px' }}>
                            <div className="box-icon">
                                <Icon type="user" style={{ fontSize:'25px',color:'#666' }}/>
                            </div>
                            <div className="box-line-item login-username">
                                <Input placeholder="请输入用户名" onChange={ this.changeUsername } value={ userInfo.username } /> 
                            </div>
                        </div>
                        <div className="login-info-box">
                            <div className="box-icon">
                                <Icon type="lock" style={{ fontSize:'25px',color:'#666' }}/>
                            </div>
                            <div className="box-line-item login-username">
                                <Input.Password  placeholder="请输入密码" onChange={ this.changePassword } value={ userInfo.password }/> 
                            </div>
                        </div>
                    </div>
                    <div className="remember-account">
                        <Checkbox onChange={ ()=>this.changeRemember() } defaultChecked={ rememberAccount }>记住账号</Checkbox>
                    </div>
                    <div className="login-button" onClick={ this.submitInfo }>
                        登&nbsp;&nbsp;&nbsp;录
                    </div>
                </div>
            </div>
        )
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Login)