console.log('Start');
setTimeout(() => console.log('Timeout'), 0);
Promise.resolve().then(() => console.log('Promise'));
async function demo() {
    console.log('Async start');
    await null;
    console.log('Async end');
}
demo();
console.log('End');