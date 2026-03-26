// Promise Chaining
// Promises can be chained to handle asynchrom=nous operations.
const getuser = () => {

    return new Promise(resolve =>{
        setTimeout(()=> resolve({id:1,name:"Alice"}),1000) ;
    }) ;

};

const getPosts = (userId) => {
    return new Promise(resolve => {
        setTimeout(()=>resolve()[
            {
 id:1, 
            },{

            }
        ],1000);
    })
}