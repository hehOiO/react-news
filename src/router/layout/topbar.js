import React from 'react'
import { Component } from 'react'
import { Layout,Menu, Dropdown, Icon } from 'antd';
import { connect } from 'react-redux' 
import '@/style/layout.less'
import Session from '@/common/Session'
import { userinfoAction } from '@/redux/action'
import { withRouter } from 'react-router-dom'
const { Header } = Layout;

const mapStateToProps = state=>{
    return{
        userInfo:Session.getItem('react_userInfo')||''
    }
}
const mapDispatchToProps = dispatch =>{
    return{
        changeUserInfo: value =>{
            dispatch(userinfoAction(value))
        }
    }
}
class TopBar extends Component {
    constructor(props){
        super(props);
        this.state = {};
    }
    menuHandle = event =>{
        if(event.key === '0'){
            this.lookDetail();
        }else{
            this.loginout();
        }
    }
    //查看个人详细信息
    lookDetail(){
        console.log(1);
    }
    //登出
    loginout(){
        const that= this;
        that.props.changeUserInfo("");
        Session.clear();
        console.log(333);
        that.props.history.push('/login')
    }
    render(){

        const menu = (
            <Menu onClick={ this.menuHandle }>
              <Menu.Item key="0" >
                <a >查看个人信息</a>
              </Menu.Item>
              <Menu.Item key="1">
                <a >退出登录</a>
              </Menu.Item>
            </Menu>
        );
        const { userInfo } = this.props;
        return(
            <Header>
                <div className="react-header">
                    <div className="logo" />
                    <div>
                        <Dropdown overlay={menu} trigger={['hover']}>
                            <a className="ant-dropdown-link" >
                            { userInfo.nickname }
                            <Icon type="down" style={{ fontSize:'16px',position:'relative',top:'1px' }}/>
                            </a>
                        </Dropdown>
                    </div>
                </div>
            </Header>
        )
    }
}
export default withRouter(connect(mapStateToProps,mapDispatchToProps)(TopBar));