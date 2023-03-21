import React from 'react'
import ReactReduxContext from './ReactReduxContext'

export default function Provider(props) {
    // 向下层传递store
    return (
        <ReactReduxContext.Provider value={{ store: props.store }}>
            {props.children}
        </ReactReduxContext.Provider>
    )
}

// react-redux 的 Provider是用react的上下文实现的