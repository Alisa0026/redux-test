function compose(...funcs) {
    return function (args) {
        for (let i = funcs.length - 1; i >= 0; i--) {
            args = funcs[i](args)
        }
        return args
    }
}

// 假设3个中间件
let promise = (middlewareAPI) => next => action => {
    console.log('promise');
    next(action)
}
let thunk = (middlewareAPI) => next => action => {
    console.log('thunk');
    next(action)
}
let logger = (middlewareAPI) => next => action => {
    console.log('logger');
    next(action)
}

/**
 * 把中间件函数放数组中，每个都执行一下把外面一次剥掉，得到三个函数
    next => action => {
        console.log('xxx');
        next(action)
    }
    进行组合返回新的函数 composed 接收参数原始的 dispatch。
    传给 logger 的next，返回 
    action => {
        console.log('logger');
        next(action)
    }
    这个又会当做参数传给 thunk 的 next，返回
    action => {
        console.log('thunk');
        next(action)
    }
    同理传给 promise 的 next，返回
    action => {
        console.log('promise');
        next(action)
    }
    就是最终的 newDispatch
 *  */

const chain = [promise, thunk, logger].map(fn => fn({}))
// 组合是从右向左组合
// 调用时从左往右执行
// 用的也是和 koa 相同的洋葱圈模型
const composed = compose(...chain)
const dispatch = (action) => {
    console.log('这是原始的dispatch方法', action);
}
// 返回新的dispatch
const newDispatch = composed(dispatch)

newDispatch({ type: "ADD" })