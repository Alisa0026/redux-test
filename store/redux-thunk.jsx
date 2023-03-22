// 实现异步1s后加1
// { getState, dispatch } dispatch 不是原生的 dispatch，是改造后的 dispatch。
function thunk({ getState, dispatch }) {
    // next就是 oldDispatch，一般叫下一步所以是next，其实就是原始的 store.dispatch
    return function (next) {
        return function (action) {//此方法就是改造后的dispatch方法
            // 判断action是对象还是function
            // 把新的dispatch传给了函数，这样就可以在函数里派发动作
            if (typeof action === 'function') {
                return action(getState, dispatch)
            }
            // 不是函数直接return next(action) 下一步
            return next(action)
        }
    }
}

export default thunk
