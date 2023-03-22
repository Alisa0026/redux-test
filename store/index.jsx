import { createStore, bindActionCreators } from '../redux'
// 把reducer都放到reducer文件夹中，每个组件对应一个reducer
// 把reducer合并
import combineReducer from "./reducers";

const store = createStore(combineReducer)

// 实现异步操作改造 dispatch
// 获取老的方法
const oldDispatch = store.dispatch
/*
store.dispatch = function (action) {
    // 在新的方法里，调用老的方法延迟1s去派发action
    setTimeout(() => {
        oldDispatch(action)
    }, 1000);
    return action
}
*/

// 实现打印日志
// 状态变更前打印老状态，变更后打印新状态
store.dispatch = function (action) {
    console.log('prev state', store.getState());
    oldDispatch(action)
    console.log('next state', store.getState());
}
export default store