async function test() {
    await 1;
    console.log('A');
}
setTimeout(() => console.log('B'), 0);
test();
Promise.resolve().then(() => console.log('C'));
console.log('D');