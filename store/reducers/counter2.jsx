
import { ADD2, MINUS2 } from '../action.types'
const initialState = { number: 0 }

/**
 * 接受新的动作，并根据老的状态计算新的状态
 * @param {*} state 
 * @param {*} action 
 */
function reducer(state = initialState, action) {
    switch (action.type) {
        case ADD2:
            return { number: state.number + 1 }
        case MINUS2:
            return { number: state.number - 1 }
        default:
            return state
    }
}
export default reducer