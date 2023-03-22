function foo(a) {
    function bar(b) {
        console.log(a, b); // 1 2
    }
    bar(2)
}
foo(1)