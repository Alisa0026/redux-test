// 实现异步1s后加1
function promise({ getState, dispatch }) {
    // next就是 oldDispatch，一般叫下一步所以是next，其实就是原始的 store.dispatch
    return function (next) {
        return function (action) {//此方法就是改造后的dispatch方法
            // 判断promise
            if (action.then && typeof action.then === 'function') {
                // 让then执行派发成功
                action.then(dispatch)
            } else {
                next(action)
            }
        }
    }
}

export default promise
