import React from "react"
import { createStore } from 'redux'

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
                <button onClick={() => store.dispatch({ type: ADD })}>+</button>
                <button onClick={() => store.dispatch({ type: MINUS })}>-</button>
            </div>
        )
    }
}
export default Counter1