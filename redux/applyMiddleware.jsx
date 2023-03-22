import compose from './compose';

// 级联中间件
// 为什么这么多层？函数柯里化。这里每一层可以传的参数数量不固定，比如中间件可以传多个
// 三步确定所有参数（第一层确定中间件，第二层获取createStore，第三层获取reducer）,然后一起处理
// 并且每层更清晰
function applyMiddleware(...middlewares) {
    // 返回新函数
    return function (createStore) {
        // 传入处理器 reducer
        return function (reducer, preloadedState) {

            // 先用原始的createStore创建原始的 store
            const store = createStore(reducer, preloadedState)

            let dispatch; // 此变量会指向新的dispatch方法 newDispatch
            let middlewareAPI = {
                getState: store.getState,
                dispatch: (action) => dispatch(action)
            }
            // 先把最外层剥掉
            let chain = middlewares.map(middleware => middleware(middlewareAPI))
            // 把chain传入，执行之后传入原始的 store.dispatch,返回新的dispatch
            dispatch = compose(...chain)(store.dispatch)
            return {
                ...store,
                dispatch
            }
        }
    }
}
export default applyMiddleware
