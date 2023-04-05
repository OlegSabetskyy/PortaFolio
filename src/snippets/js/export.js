function test() {}
function test2() {
    globalThis.value = "global variable :D";
}

export default test;
export { test2 };
