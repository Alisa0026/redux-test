import { createStore, bindActionCreators } from '../redux'
// 把reducer都放到reducer文件夹中，每个组件对应一个reducer
// 把reducer合并
import combineReducer from "./reducers";

const store = createStore(combineReducer)

export default store