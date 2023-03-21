import React from 'react'
import ReactReduxContext from './ReactReduxContext'

export default function (props) {
    // 向下层传递store
    return (
        <ReactReduxContext.Provider value={{ store: props.store }}>
            {props.children}
        </ReactReduxContext.Provider>
    )
}