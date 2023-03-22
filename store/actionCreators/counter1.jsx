import { ADD1, MINUS1 } from '../action.types'
// 优化操作：
function add1() { // actionCreate 他是一个创建action的函数
    return { type: ADD1 }
}

function minus1() { // actionCreate 他是一个创建action的函数
    return { type: MINUS1 }
}

// 异步1s后+1，redux中不能派发函数，所以需要thunk中间件
function thunkAdd() {
    return function (getState, dispatch) {
        setTimeout(() => {
            dispatch({ type: ADD1 })
        }, 1000);
    }
}

const actionCreators = { add1, minus1, thunkAdd }

export default actionCreators