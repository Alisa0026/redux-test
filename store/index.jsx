import { createStore, applyMiddleware } from '../redux'
// 把reducer都放到reducer文件夹中，每个组件对应一个reducer
// 把reducer合并
import combineReducer from "./reducers";
// 中间件
import promise from './redux-promise';
import thunk from './redux-thunk';
import logger from './redux-logger';

// 调用 applyMiddleware 先传入中间件
// 返回函数传入 createStore
// 又返回的新函数，传入 combineReducer，然后返回一个新仓库store
const store = applyMiddleware(thunk, promise, logger)(createStore)(combineReducer)

export default store