import React from 'react';
import { Component } from 'react'

import MyLayout from '@/router/layout/layout'

class Home extends Component{
    constructor(props){
        super(props);
        this.state = {};
    }
    render(){
        return (
            <MyLayout>
              <div className="home">
                hello!react-demo
              </div>
            </MyLayout>
        );
    }
}

export default Home;
