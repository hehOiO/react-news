import React from 'react';
import { Component } from 'react'
import '@/style/goods.less'
import MyLayout from '@/router/layout/layout'
import {Route,Router} from 'react-router-dom';
import GoodsList from './goods/list'

class Goods extends Component{
    constructor(props){
        super(props);
        this.state = {};
    }

    goToRouter(route){
        this.props.history.push(route);
    }
    render(){
        const { match } = this.props;
                
        return (
            <MyLayout>
              <div id="goods">
                    <div className="navagation">
                        <div className={ `li ${this.props.location.pathname == '/goods/list'?'active':'' } ` } onClick={ ()=>this.goToRouter('/goods/list') }>日常商品</div>
                    </div>  
                    <div className="content">
                        <Route path={`${match.url}/list`} component={GoodsList} ></Route>
                        
                    </div>
              </div>
            </MyLayout>

        );
    }
}

export default Goods;
