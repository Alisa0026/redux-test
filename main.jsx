import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from "./react-redux";
import Counter1 from './components/Counter1'
import Counter2 from './components/Counter2'
// 使用 react-redux
import store from "./store"

// 最外层引入store，然后通过Provider向下层所有组件传递，那么下面所有组件都可以拿到store
ReactDOM.render(
    <Provider store={store}>
        <Counter1 />
        <hr />
        <Counter2 />
    </Provider>
    , document.getElementById('root'))