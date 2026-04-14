async function fetchData() {
    console.log('Fetching...');
    const data = await new Promise((resolve) => {
        setTimeout(() => resolve('Data'), 0);
    });
    console.log(data);
    return 'Complete';
}
console.log('1');
const promise = fetchData();
console.log('2');
promise.then((val) => console.log(val));
console.log('3');