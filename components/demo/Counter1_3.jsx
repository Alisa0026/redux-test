import React from "react"
import { bindActionCreators } from 'redux'

import store from "../store";
import actionCreators from '../store/actionCreators/counter1'

const boundActionCreators = bindActionCreators(actionCreators, store.dispatch)
// boundActionCreators = {add:()=>dispatch({ type: ADD }),minus} 这样不用手动派发了

class Counter1 extends React.Component {
    constructor(props) {
        super(props)
        this.state = { number: store.getState().counter1.number }
    }

    componentDidMount() {
        // 订阅
        this.unsubscribe = store.subscribe(() => this.setState({
            number: store.getState().counter1.number
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
                <button onClick={boundActionCreators.add1}>+</button>
                <button onClick={boundActionCreators.minus1}>-</button>
            </div>
        )
    }
}
export default Counter1