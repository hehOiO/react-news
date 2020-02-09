import React from 'react'
import { Component } from 'react'
import '@/style/notfound.less'
class NotFound extends Component {
    constructor(props){
        super(props);
        this.state = {};
    }
    render(){
        return(
            <div id="notfound">
                <div style={{ width:'100%',height:"22%" }}></div>
                <div className="message warning">
                    <div className="inset">
                        <div className="login-head">
                            <h1>404-网页出错啦！</h1>
                            <div className="alert-close"> </div> 			
                        </div>
                        <form>
                            <div className="clear"> </div>
                            <div>
                                <h2>对不起，您访问的页面丢失了，我们会很快将他找回。</h2>
                                <br/>
                                <div className="clear"></div>	
                            </div>
                        </form>				
                    </div>
                </div> 
                <div className="clear"> </div>
                <div className="footer">
                    <p>Copyright ©react-demo</p>
                </div>
            </div>
        )
    }
}
export default NotFound