async function test() {
    return Promise.reject('Oops');
}
test()
    .then(() => console.log('Success'))
    .catch((err) => console.log('Caught:', err));