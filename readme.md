# Redux 源码分析

执行下面命令启动项目看效果
```
npm run dev
```

# 目录
- redux: redux 源码实现
- react-redux: react-redux 源码实现
- doc: 简单原理性介绍
  - 关于 applyMiddleware 中 dispatch 赋值的解释
  - 中间件级联 compose 实现的简单介绍
- components: 计数组件 counter1 和 counter2
  - demo: 对实现步骤进行简单分步总结
    - counter1_1 最原始的使用`reudx`方式
    - counter1_2 最原始的使用`reudx`方式优化，加了 `actionCreators` 和 `bindActionCreators` `的实现，bindActionCreators` 将 `actionCreators` 和 `dispatch` 的绑定，不需要手动去派发(dispatch) action
    - counter1_3 将 store 和 `actionCreators` 做了抽离
  - counter1：class 组件最终使用 `react-redux` 中 `connect` 方式进行store中状态和dispatch的映射，不需要手动 subscribe 和 dispatch 了，代码更简洁
  - counter2: 函数组件
    - 使用 `react-redux` 的 `hooks`，`useSelector`, `useDispatch`。
    - 同时实现一个自定义的 `useBoundDispatch` 的hook，来进行 `actionCreators` 和  dispatch 的绑定。这样就可以把  `onClick={() => dispatch(actionCreators.add2())}` 替换成 `onClick={add2}`
- store: 对 store 的抽离，还有实现的一些中间件
  - demo: 
    - index-middle1: 针对实现异步操作改造 dispatch
    - index-middle2: 在上一步基础上，实现一个 `logger` 中间件和 `applyMiddleware` 方法
   
      > 中间件格式是固定的
      ```js
        function middleware(store) {
            // oldDispatch 其实就是原始的 store.dispatch
            return function (oldDispatch) {
                return function (action) {// 返回的此function 就是改造后的dispatch方法
                   // ....
                }
            }
        }
      ```
    - index-middle3: 把中间件抽离出去了，并且针对 `applyMiddleware` 方法中 `middlewareAPI` 进行优化。
      - 针对上面  index-middle2 中实现中间件传参是 `store`其实是不准确的，这里传参是像store但是不是，应该是传入的 middlewareAPI 对象，即 { getState, dispatch } ，其中 dispatch 不是原生的 dispatch，是改造后的 dispatch。要注意 applyMiddleware 的实现
  - index.js: 中间件级联的方式创建 store，并对多个 reducer 进行合并实现了 `combineReducer`
- main_redux.jsx: 是对 redux 在html中的一个简单使用
- main3.jsx: 是在没有使用 react-redux 时用的入口文件
- main.jsx: 使用 react-redux 时用的入口文件，同时使用了react18 中 createRoot 方法，使用 render 会报警告
  - 使用 Provider，最外层引入store，然后通过Provider向下层所有组件传递，那么下面所有组件都可以拿到store

# 实现 redux 中核心方法
- createStore
- combineReducers
- bindActionCreators
- 中间件相关的 
  - compose
  - applyMiddleware

# 实现 redux-react 核心方法
- Provider
- connect
- hooks
  - useSelector
  - useDispatch
  - 自定义实现的 useBoundDispatch
