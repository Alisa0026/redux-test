import { createStore } from 'redux'

const counter = document.getElementById('counter')
const addButton = document.getElementById('add-button')
const minusButton = document.getElementById('minus-button')

const ADD = 'ADD'
const MINUS = 'MINUS'
const initialState = { number: 0 }

/**
 * 接受新的动作，并根据老的状态计算新的状态
 * @param {*} state 
 * @param {*} action 
 */
function reducer(state = initialState, action) {
    switch (action.type) {
        case ADD:
            return { number: state.number + 1 }
        case MINUS:
            return { number: state.number - 1 }
        default:
            return state
    }
}
const store = createStore(reducer)

function render() {
    counter.innerHTML = store.getState().number
}

render()
// 状态发生变化重新执行render
store.subscribe(render)
addButton.addEventListener('click', () => {
    store.dispatch({ type: ADD })
})

minusButton.addEventListener('click', () => {
    store.dispatch({ type: MINUS })
})