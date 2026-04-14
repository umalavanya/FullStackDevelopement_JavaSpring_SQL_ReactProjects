async function test() {
    console.log('A');
    await Promise.resolve();
    console.log('B');
}
console.log('C');
test();
console.log('D');