import { ADD1, MINUS1 } from '../action.types'
// 优化操作：
function add1() { // actionCreate 他是一个创建action的函数
    return { type: ADD1 }
}

function minus1() { // actionCreate 他是一个创建action的函数
    return { type: MINUS1 }
}

const actionCreators = { add1, minus1 }

export default actionCreators