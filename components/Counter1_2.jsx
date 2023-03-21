import React from "react"
import { createStore, bindActionCreators } from 'redux'

// *** 针对多组件该如何处理？把store 和reducer都进行提取

const ADD = 'ADD'
const MINUS = 'MINUS'
const initialState = { number: 0 }

/**
 * 接受新的动作，并根据老的状态计算新的状态
 * @param {*} state 
 * @param {*} action 
 */
function reducer(state = initialState, action) {
    switch (action.type) {
        case ADD:
            return { number: state.number + 1 }
        case MINUS:
            return { number: state.number - 1 }
        default:
            return state
    }
}
const store = createStore(reducer)

// 优化操作：
function add() { // actionCreate 他是一个创建action的函数
    return { type: ADD }
}

function minus() { // actionCreate 他是一个创建action的函数
    return { type: MINUS }
}

const actionCreators = { add, minus }
const boundActionCreators = bindActionCreators(actionCreators, store.dispatch)
// boundActionCreators = {add:()=>dispatch({ type: ADD }),minus} 这样不用手动派发了

class Counter1 extends React.Component {
    constructor(props) {
        super(props)
        this.state = { number: store.getState().number }
    }

    componentDidMount() {
        // 订阅
        this.unsubscribe = store.subscribe(() => this.setState({
            number: store.getState().number
        }))
    }

    componentWillUnmount() {
        // 取消订阅
        this.unsubscribe()
    }

    render() {
        return (
            <div>
                <p>{this.state.number}</p>
                <button onClick={boundActionCreators.add}>+</button>
                <button onClick={boundActionCreators.minus}>-</button>
            </div>
        )
    }
}
export default Counter1