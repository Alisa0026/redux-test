function add1(str) {
    return '1' + str
}
function add2(str) {
    return '2' + str
}
function add3(str) {
    return '3' + str
}

// let result = add3(add2(add1('test')))
// console.log(result); // 321test


// 写通用函数
function compose(...funcs) {
    return function (args) {
        for (let i = funcs.length - 1; i >= 0; i--) {
            args = funcs[i](args)
        }
        return args
    }
}
const fn = compose(add3, add2, add1)
console.log(fn('test')); // 321test