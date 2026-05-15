function myFunction(){
    // Simulate some work
    let sum = 0 ;
    for(let i = 0 ; i < 100000 ; i++){
        sum += i ;
    }
    return sum ;
}

// Measure execution time
console.time('myFunction') ;
myFunction() ;
console.timeEnd('myFunction')