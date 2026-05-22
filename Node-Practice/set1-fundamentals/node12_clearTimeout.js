// Set a timeout and store its Id
const timeoutId = setTimeout(() => {

    console.log("This will not run") ;
    
}, 3000) ;

// Cancel the timeout before it executes
clearTimeout(timeoutId) ;