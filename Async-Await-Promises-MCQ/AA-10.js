console.log('1');
async function asyncFunc() {
    console.log('2');
    await Promise.resolve();
    console.log('3');
}
asyncFunc();
setTimeout(() => console.log('4'), 0);
Promise.resolve()
    .then(() => console.log('5'))
    .then(() => console.log('6'));
console.log('7');