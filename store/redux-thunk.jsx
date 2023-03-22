// 实现异步1s后加1
function thunk({ getState, dispatch }) {
    // next就是 oldDispatch，一般叫下一步所以是next，其实就是原始的 store.dispatch
    return function (next) {
        return function (action) {//此方法就是改造后的dispatch方法
            // 判断action是对象还是function
            if (typeof action === 'function') {
                return action(getState, dispatch)
            }
            // 不是函数直接return next(action) 下一步
            return next(action)
        }
    }
}

export default thunk
