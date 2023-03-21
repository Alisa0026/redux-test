import React, { useReducer, useLayoutEffect, useRef } from 'react'
import ReactReduxContext from "../ReactReduxContext"


function useSelector(selector) {
    const { store } = React.useContext(ReactReduxContext)
    const lastSelectedState = useRef(null) // 上一次选中状态

    const state = store.getState(); // 拿到仓库总状态 {counter1:{number:0},counter2:{number:0}}

    // 把仓库中的总状态映射出一个新的分状态，然后返回
    const selectedState = selector(state)

    // 订阅仓库中的状态变化事件，当仓库中的状态变化后，重新刷新组件
    const [, forceUpdate] = useReducer(x => x + 1, 0)

    useLayoutEffect(() => {
        // 订阅仓库状态变化事件，当仓库中的状态变化后，重新走forceUpdate
        store.subscribe(() => {
            // 每当仓库状态发生变更后，先获取最新的选中状态
            let selectedState = selector(store.getState())
            // 用最新的选中状态和老的选中状态进行对比，如果不相等重新渲染
            if(selectedState !== lastSelectedState.current){
                forceUpdate()
                lastSelectedState.current = selectedState
            }
           
        })
    }, [])
    return selectedState
}

export default useSelector