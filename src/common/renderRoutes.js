import React from 'react'
import { Route, Redirect, Switch } from 'react-router-dom'

function _extends() {
    _extends = Object.assign || function (target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];
  
        for (var key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key];
          }
        }
      }
  
      return target;
    };
  
    return _extends.apply(this, arguments);
}

const renderRoutes = (routes, authed, authPath = '/login',extraProps, switchProps)=>{
    if (extraProps === void 0) {
      extraProps = {};
    }
  
    if (switchProps === void 0) {
      switchProps = {};
    }
  
    return routes ? React.createElement(Switch, authed, authPath = '/login',switchProps, routes.map(function (route, i) {
      return React.createElement(Route, {
        key: route.key || i,
        path: route.path,
        exact: route.exact,
        strict: route.strict,
        render: function render(props) {
            if(!route.auth || authed || route.path === authPath){
                return route.render ? route.render(_extends({}, props, {}, extraProps, {
                    route: route
                })) : React.createElement(route.component, _extends({}, props, extraProps, {
                    route: route
                }));
            }
            return <Redirect to={{ pathname: authPath, state: { from: props.location } }} />    
        }
      });
    })) : null;
}
  


export default renderRoutes