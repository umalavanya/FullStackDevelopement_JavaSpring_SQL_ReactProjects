async function delay(ms) {
    const start = Date.now();
    await new Promise(resolve => setTimeout(resolve, ms));
    console.log(Date.now() - start);
}
async function run() {
    const start = Date.now();
    await delay(10);
    console.log("1*********") ;
    await delay(1000);
    console.log("2*********") ;
    await delay(1000);
    console.log("3**********") ;
    console.log(Date.now() - start);
}
run();