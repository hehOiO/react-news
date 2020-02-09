import React from 'react'
import { Component } from 'react'
import { Layout, Icon } from 'antd';
import { NavLink } from 'react-router-dom'
import '@/style/layout.less'


const { Sider } = Layout;

class SideBar extends Component {
    constructor(props){
        super(props);
        this.state = {};
    }
    render(){
        return(
          <Sider width={200} style={{ background: '#001529' }}>
            <div className="my-silde">
              <NavLink to="/home"  activeClassName="selected">
                <div className="navclass">
                <Icon type="home" style={{ position:'relative',top:'-1px'}}/>
                  <span style={{ marginLeft:'5px'}}>首页</span>
                </div>
              </NavLink>
              <NavLink to="/goods"  activeClassName="selected">
                <div className="navclass">
                  <Icon type="shopping" style={{ position:'relative',top:'-1px'}}/>
                  <span style={{ marginLeft:'5px'}}>商品中心</span>
                </div>
              </NavLink>
            </div>

          </Sider>
        )
    }
}
export default SideBar;