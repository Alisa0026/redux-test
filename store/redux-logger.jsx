// 实现一个真正的日志中间件，中间件格式是固定的
// 接受一个对象（有getState和dispatch），返回一个新函数，接入原始的老的dispatch方法 oldDispatch，再返回一个函数接收一个action
// function logger({ getState, dispatch }) {}
// ??? 这里传是像store但是不是，{ getState, dispatch } dispatch 不是原生的 dispatch，是改造后的 dispatch。需要改造
function logger({ getState, dispatch }) {
    // next就是 oldDispatch，一般叫下一步所以是next，其实就是原始的 store.dispatch
    return function (next) {
        return function (action) {//此方法就是改造后的dispatch方法
            console.log('老状态', getState());
            //调用原始的dispatch方法，传入动作action，发给仓库，仓库里会调用reducer计算新状态
            next(action)
            console.log('新状态', getState());
            // 返回action本身
            return action
        }
    }
}
export default logger