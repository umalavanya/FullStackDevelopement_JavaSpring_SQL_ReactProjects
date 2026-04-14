async function getValue() {
    return 10;
}
async function main() {
    const result = await getValue();
    console.log(typeof result);
}
main();