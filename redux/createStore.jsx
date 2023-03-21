// redux 
function createStore(reducer) {
    let state;
    const listeners = [];

    function getState() {
        return state
    }

    /**
     * 向仓库派发一个动作，会调用reducer，根据老状态和新动作计算新状态
     * @param {*} action 
     */
    function dispatch(action) {
        state = reducer(state, action)
        // 执行listeners的回调
        listeners.forEach(l => l())
    }

    /**
     * 订阅状态变化事件，当状态发生改变后执行所有监听函数
     * @param {*} listener 
     * @returns 
     */
    function subscribe(listener) {
        listeners.push(listener)

        // 返回取消监听的函数
        return () => {
            let index = listeners.indexOf(listener)
            listeners.splice(index, 1)
        }
    }

    // 内部先派发一次
    dispatch({ type: '@@REDUX/INIT' })

    return {
        getState,
        subscribe,
        dispatch
    }
}
export default createStore