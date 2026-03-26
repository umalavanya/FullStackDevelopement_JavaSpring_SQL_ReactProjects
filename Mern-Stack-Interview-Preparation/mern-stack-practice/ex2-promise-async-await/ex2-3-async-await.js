// Async Await
// Async / await is synactic sugar over promises, making asynchronous code look synchronous

// async function always return a promise
async function fetchUserData(){
    return {id:1, name: "John"}
}

// Equivalent to :
function fetchData(){
    return Promise.resolve({id: 1, name: "John"}) ;
}

try{
        const user1 = await fetchUserData() ;
        console.log(user1) ;
    } catch(error){
        console.log("Error: ", error) ;
        throw error ; //Propagate Error
    }



// Using await inside async functions
async function getUserinfo(){
    try{
        const user = await fetchUserData() ;
        console.log(user) ;
    } catch(error){
        console.log("Error: ", error) ;
        throw error ; //Propagate Error
    }
}

getUserinfo() ;