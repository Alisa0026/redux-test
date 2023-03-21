import { ADD2, MINUS2 } from '../action.types'
// 优化操作：
function add2() { // actionCreate 他是一个创建action的函数
    return { type: ADD2 }
}

function minus2() { // actionCreate 他是一个创建action的函数
    return { type: MINUS2 }
}

const actionCreators = { add2, minus2 }

export default actionCreators