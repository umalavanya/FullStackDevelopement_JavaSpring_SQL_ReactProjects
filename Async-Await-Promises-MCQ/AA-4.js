async function getData() {
    try {
        const result = await Promise.reject('Error!');
        console.log('Success:', result);
    } catch (err) {
        console.log('Caught:', err);
    }
    console.log('Done');
}
getData();