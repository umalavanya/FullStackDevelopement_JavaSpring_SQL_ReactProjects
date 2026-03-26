// Understanding Promises
// A promise is an object representing the eventual completion (or failure) of an 
// Asynchronous operation. 
// It provides a cleaner way to handle async code compared to callbacks

// Promise states
// A promise can be in one of the three states
// 1. pending: initial state, neither fulfilled nor rejected
// 2. Fullfilled : Operation completed successfully
// 3. Rejected: Operation failed

const promise = new Promise((resolve, reject) => { 
    // Asynchronous operation
    const success = true ;

    if (success){
        resolve("Operation successful!") ; // Goes to .then()
    } else {
        reject("Opeartion failed") ; //Goes to .catch() 
    }
}) ;


// Creating and Using Promises
// Basic promise creation
const fetchData = () => {
    return new Promise((resolve, reject)=>{
        setTimeout(() => {
            const data = {id:1, name:"John"} ;
            // Simulate success/failure
            const success = true ;

            if(success) {
                resolve(data) ;

            } else {
                reject(new Error("Failed to fetch data!")) ;
            } 
        },1000) ;
    });

}

// Using the promise
fetchData()
    .then(data => {
        console.log(data) ;
    })
    .then(name => {
        console.log(name) ;
    })
    .catch((error) => {
        console.log(error) ;
    })
    .finally(() => {
        console.log("operation is completed!") ;
    }) ;