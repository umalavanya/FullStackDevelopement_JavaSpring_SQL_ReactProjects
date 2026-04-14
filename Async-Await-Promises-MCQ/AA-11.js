let x = 0;
async function increment() {
    x += await 1;
    console.log(x);
}
increment();
x += 1;
console.log(x);