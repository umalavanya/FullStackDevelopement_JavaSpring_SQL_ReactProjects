async function errorFunc() {
    throw new Error('Failed');
}
async function main() {
    try {
        await errorFunc();
        console.log('Success');
    } catch (e) {
        console.log('Error:', e.message);
    }
}
main();