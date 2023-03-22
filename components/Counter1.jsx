import React from "react"
import { connect } from '../react-redux'

import actionCreators from '../store/actionCreators/counter1'


class Counter1 extends React.Component {
    render() {
        return (
            <div>
                <p>{this.props.number}</p>
                <button onClick={this.props.add1}>+</button>
                <button onClick={this.props.minus1}>-</button>
                <button onClick={this.props.thunkAdd}>thunkAdd(异步+1)</button>
                <button onClick={this.props.promiseAdd}>promiseAdd(+1)</button>
            </div>
        )
    }
}

// 把仓库中的状态映射为组件的属性对象，仓库到组件的输入
const mapStateToProps = state => state.counter1

export default connect(
    mapStateToProps,
    actionCreators // 会帮我们做自动绑定，组件的输出，在组件里派发动作，修改仓库
)(Counter1)