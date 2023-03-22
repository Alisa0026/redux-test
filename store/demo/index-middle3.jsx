import { createStore, bindActionCreators } from '../../redux'
// 把reducer都放到reducer文件夹中，每个组件对应一个reducer
// 把reducer合并
import combineReducer from "../reducers";
import promise from '../redux-promise';
import thunk from '../redux-thunk';
import logger from '../redux-logger';

// 使用
// 为什么这么多层？函数柯里化。这里每一层可以传的参数数量不固定，比如中间件可以传多个
// 三步确定所有参数（第一层确定中间件，第二层获取createStore，第三层获取reducer）,然后一起处理
// 并且每层更清晰
function applyMiddleware(middleware) {
    // 返回新函数
    return function (createStore) {
        // 传入处理器 reducer
        return function (reducer) {

            // 先用原始的createStore创建原始的 store
            const store = createStore(reducer)

            let dispatch;
            let middlewareAPI = {
                getState: store.getState,
                // 这里的dispatch是新的dispatch，因为中间件可以嵌套，logger的参数里接收的也是新改造的dispatch
                // 这里不可以直接赋值为dispatch而省略函数定义，因为赋值给middlewareAPI中的dispatch是undefined，下面给dispatch赋值以后，这里dispatch还是undefined，所以不能省略
                dispatch: (action) => dispatch(action)
            }
            // 在此之前是不能调用dispatch方法的，因为没有赋值
            dispatch = middleware(middlewareAPI)(store.dispatch)
            return {
                ...store,
                dispatch
            }
        }
    }
}

// 调用 applyMiddleware 先传入logger
// 返回函数传入 createStore
// 又返回的新函数，传入 combineReducer，然后返回一个新仓库store
const store = applyMiddleware(promise)(createStore)(combineReducer)

/*
const store = createStore(combineReducer)
// 实现异步操作改造 dispatch
// 获取老的方法
const oldDispatch = store.dispatch

store.dispatch = function (action) {
    // 在新的方法里，调用老的方法延迟1s去派发action
    setTimeout(() => {
        oldDispatch(action)
    }, 1000);
    return action
}


// 实现打印日志
// 状态变更前打印老状态，变更后打印新状态
store.dispatch = function (action) {
    console.log('prev state', store.getState());
    oldDispatch(action)
    console.log('next state', store.getState());
}
*/
export default store