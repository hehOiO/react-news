import React from 'react';
import {HashRouter, Switch,Route,Redirect} from 'react-router-dom';
import { Component } from 'react'
import { connect } from 'react-redux'
import Routers from './routeMap'
import Session from '@/common/Session'

const mapStateToProps = state => {
    return {
      userInfo:Session.getItem('react_userInfo')||''
    }
}

class BasicRoute extends Component{
    constructor(props){
        super(props);

        
    }
    componentDidMount(){
        const that = this;
        console.log(that.props);

    }
    render(){
        const { userInfo } = this.props; 
        return(
            <HashRouter>
                <Switch>
                {Routers.map((item, index) => { 

                    if(item.Redirect != '' && item.Redirect != undefined){
                        return <Route key={index} path={item.pathname} exact name={item.name} render={
                            props =>{
                                return <Redirect to={{pathname: item.Redirect,state: { from: props.location }}} />
                            }
                        } />
                        
                    }else{
                        return <Route key={index} path={item.pathname} exact={item.exact} name={item.name} render={
                            props =>{

                                if(!item.auth){
                                    if(userInfo){
                                        if(item.pathname == '/login'){
                                            return <Redirect to={{pathname: '/',state: { from: props.location }}} />
                                        }else{
                                            return <item.component {...props} />
                                        }
                                    }else{
                                        return <item.component {...props} />
                                    }
                                }else{
                                    if(userInfo){
                                        return <item.component {...props} />
                                    }else{
                                        return  <Redirect to={{pathname: '/login',state: { from: props.location }}} />
                                    }
                                }
                            }
                        } />
                    }
                    
                })}
                </Switch>
            </HashRouter>
        )
    }
}


export default connect(mapStateToProps)(BasicRoute);
