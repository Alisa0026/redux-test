import React from "react"
import actionCreators from '../store/actionCreators/counter2'
import { useSelector, useDispatch } from '../react-redux'
import { useBoundDispatch } from "../react-redux" // 源码没有，自己扩展

function Counter2() {
    // 1.从状态树中获取一部分状态，进行渲染 
    // 2. 当仓库中的状态发生改变后会重新渲染组件
    const counter2 = useSelector(state => state.counter2)
    const dispatch = useDispatch() // store.dispatch
    // const { add2, minus2 } = useBoundDispatch(actionCreators)

    return (
        <div>
            <p>{counter2.number}</p>
            <button onClick={() => dispatch(actionCreators.add2())}>+</button>
            <button onClick={() => dispatch(actionCreators.minus2())}>-</button>
            {/* <button onClick={add2}>+</button> */}
            {/* <button onClick={minus2}>-</button> */}
        </div>
    )
}

export default Counter2