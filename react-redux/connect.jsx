import ReactReduxContext from "./ReactReduxContext"
import { bindActionCreators } from '../redux'
/**
 * 连接 组件和仓库
 * @param {*} mapStateToProps  把仓库中的状态映射为组件的属性对象 state=>state.counter1
 * @param {*} mapDispatchToProps  把store.dispatch 方法映射为组件的属性对象 ，参数可以是一个对象，也可以是一个函数
 * 可以传函数 dispatch=({add(){dispatch({type:'ADD1'})}})
 * 也可以传对象 actionCreators
 * 返回值都会称为组件属性
 */
function connect(mapStateToProps, mapDispatchToProps) {
    return function (OldComponent) {
        return class extends React.Component {

            static contextType = ReactReduxContext;

            constructor(props, context) { // this.context，来自ReactReduxContext的value
                super(props)
                const { store } = context // 拿到context的仓库
                const { getState, subscribe, dispatch } = store
                this.state = mapStateToProps(getState()) // 仓库状态映射为属性对象
                // 订阅
                this.unsubscribe = subscribe(() => {
                    this.setState(mapStateToProps(getState()))
                })

                
                let dispatchProps;
                // 判断传递的是函数
                if (typeof mapDispatchToProps === 'function') {
                    dispatchProps = mapDispatchToProps(dispatch)
                } else {
                    // 传递的对象，用 bindActionCreators 做个绑定
                    dispatchProps = bindActionCreators(mapDispatchToProps, dispatch)
                }
                // 最后赋值
                this.dispatchProps = dispatchProps
            }

            componentWillUnmount() {
                // 取消订阅
                this.unsubscribe()
            }

            render() {
                return (
                    <OldComponent {...this.props} {...this.state} {...this.dispatchProps} />
                )
            }
        }
    }
}
export default connect