import { createStore, bindActionCreators } from '../redux'
// 把reducer都放到reducer文件夹中，每个组件对应一个reducer
// 把reducer合并
import combineReducer from "./reducers";

// 实现一个真正的日志中间件，中间件格式是固定的
// 接受一个对象（有getState和dispatch），返回一个新函数，接入原始的老的dispatch方法 oldDispatch，再返回一个函数接收一个action
// function logger({ getState, dispatch }) {}
 // ??? 这里传是像store但是不是，{ getState, dispatch } dispatch 不是原生的 dispatch，是改造后的 dispatch。需要改造
function logger(store) {
    // oldDispatch 其实就是原始的 store.dispatch
    return function (oldDispatch) {
        return function (action) {//此方法就是改造后的dispatch方法
            console.log('老状态', store.getState());
            //调用原始的dispatch方法，传入动作action，发给仓库，仓库里会调用reducer计算新状态
            oldDispatch(action)
            console.log('新状态', store.getState());
            // 返回action本身
            return action
        }
    }
}

// 使用
// 为什么这么多层？函数柯里化。这里每一层可以传的参数数量不固定，比如中间件可以传多个
// 三步确定所有参数（第一层确定中间件，第二层获取createStore，第三层获取reducer）,然后一起处理
// 并且每层更清晰
function applyMiddleware(logger) {
    // 返回新函数
    return function (createStore) {
        // 传入处理器 reducer
        return function (reducer) {
            // 先用原始的createStore创建原始的 store
            const store = createStore(reducer)
            // logger先接收对象（有getState和dispatch）即store仓库
            // 返回函数接收 oldDispatch 其实就是原始的 store.dispatch
            // 然后返回的就是新的dispatch，下面解构覆盖
            const dispatch = logger(store)(store.dispatch)
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
const store = applyMiddleware(logger)(createStore)(combineReducer)

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