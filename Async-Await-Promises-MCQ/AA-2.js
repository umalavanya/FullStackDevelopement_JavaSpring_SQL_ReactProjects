async function async1() {
    console.log('1');
    await async2();
    console.log('2');
}
async function async2() {
    console.log('3');
}
console.log('4');
async1();
console.log('5');