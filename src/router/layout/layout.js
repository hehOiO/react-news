import React from 'react'
import { Component } from 'react'
import '@/style/layout.less'
import { Layout, Breadcrumb } from 'antd';
import TopBar from './topbar'
import SideBar from './sidebar'
import { withRouter } from 'react-router-dom'
import { findRouter } from '@/common/common'
import Routers from '@/routeMap'
const { Content } = Layout;

class MyLayout extends Component {
    constructor(props){
        super(props);
        this.state = {
            pathInfo:findRouter(this.props.location.pathname,Routers)
        };

    }

    render(){
        const { pathInfo } = this.state;
        return(
            <Layout style={{ height:'100%' }}>
                <TopBar></TopBar>
                <Layout>
                    <SideBar></SideBar>
                    <Layout style={{ padding: '24px 24px' }}>
                        <Content  style={{ background: '#fff',margin: 0,minHeight: 280,height:"100%" }}>
                        { this.props.children }
                        </Content>
                    </Layout>
                </Layout>
            </Layout>
        )
    }
}
export default withRouter(MyLayout);