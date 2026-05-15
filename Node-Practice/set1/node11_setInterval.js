console.log('Starting Interval (will self-clear after 5 times)... ') ;

let timesRun = 0 ;
const maxTimes = 5 ;

const intervalId = setInterval(() => {
    timesRun++ ;
    console.log(`Interval running: ${timesRun} time(s)`) ;

    // Clear when condition is met

    if(timesRun === maxTimes) {
        clearInterval(intervalId) ;
        console.log('Interval cleared itself! No more executions.') ;

    }
}, 1000) ;