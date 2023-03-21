import React, { useReducer, useLayoutEffect } from 'react'
import ReactReduxContext from "../ReactReduxContext"


function useSelector(selector) {
    const { store } = React.useContext(ReactReduxContext)
    const state = store.getState(); // 拿到仓库总状态 {counter1:{number:0},counter2:{number:0}}

    // 把仓库中的总状态映射出一个新的分状态，然后返回
    const selectedState = selector(state)

    // 订阅仓库中的状态变化事件，当仓库中的状态变化后，重新刷新组件
    const [, forceUpdate] = useReducer(x => x + 1, 0)

    useLayoutEffect(() => {
        // 订阅仓库状态变化事件，当仓库中的状态变化后，重新走forceUpdate
        store.subscribe(() => {
            forceUpdate()
        })
    }, [])
    return selectedState
}

export default useSelector