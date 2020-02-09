import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import Router from './router';
import './style/global.less'
import { Provider } from "react-redux";
import reactStore from "./redux/reducer";
import { createStore } from 'redux'

let store = createStore(reactStore)

ReactDOM.render(<Provider store={store}><Router /></Provider>
, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
