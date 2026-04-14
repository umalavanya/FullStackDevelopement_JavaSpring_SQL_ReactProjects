async function one() {
    console.log('1');
    await two();
    console.log('2');
}
async function two() {
    console.log('3');
    await three();
    console.log('4');
}
async function three() {
    console.log('5');
}
one();
console.log('6');