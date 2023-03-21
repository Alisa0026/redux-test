import React, { useLayoutEffect, useState } from 'react'
import ReactReduxContext from "../ReactReduxContext"


// 用 useSyncExternalStore 来优化
function useSelector(selector) {
    const { store } = React.useContext(ReactReduxContext)

    // react18新增的自定义hooks，2个参数，参数1是外部仓库订阅的方法，参数2是获取快照的方法，获取最新的状态
    // 使用同步的外部仓库
    return useSyncExternalStore(
        store.subscribe,
        () => selector(store.getState())
    )

}

// 自己实现 useSyncExternalStore
function useSyncExternalStore(subscribe, getSnapState) {
    // 定义个状态，初始状态是快照的结果
    let [state, setState] = useState(getSnapState())

    // 内部也是个订阅
    // 用 useLayoutEffect 订阅一次就可以了，不需要每次都订阅
    // 如果写在外面，每次刷新组件都要订阅，不合理浪费性能
    useLayoutEffect(() => {
        // 当仓库状态发生改变，重新进行setState，把新快照传给state
        subscribe(() => {
            setState(getSnapState())
        })
    }, [])
    return state
}

export default useSelector