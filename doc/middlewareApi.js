// let dispatch;

// let api = {
//     dispatch: dispatch
// }
// console.log(api.dispatch); // undefined
// dispatch = 100
// console.log(api.dispatch); // undefined

// 如果改成下面，就会变化
let dispatch;
let api2 = {
    dispatch: () => dispatch // 就永远引用这个变量
}
console.log(api2.dispatch()); // undefined
dispatch = 100
console.log(api2.dispatch()); // 100