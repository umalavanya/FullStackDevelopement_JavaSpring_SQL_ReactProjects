console.log("************ A coffee making program on Promise, Async and await ***********")

function boilWater() {
    return new Promise((resolve) => {

        console.log("Water is boiling!") ;
        setTimeout(() => {
            resolve("Water is boiled")
        }, 3000 ) ;
    }) ;
}


function addcoffee(){
    return new Promise((resolve) => { 
        console.log("Adding the grounded coffee powder!") ;

        setTimeout(()=>{
            resolve("The coffee powder is added.")
        },1000) ;
    }) ;
}


function addMilk(){
    return new Promise(() => {
        console.log("Adding Milk!") ;
        setTimeout(() => {
            console.log("Milk is added.") ;
        },1000) ;
    })
}


// async function to make coffee

async function makeCoffee(){
    console.log("------ Starting making coffee process ------");
    
    const waterStatus = await boilWater() ;
    console.log(waterStatus) ;


    const coffeeStatus = await addcoffee() ;
    console.log(coffeeStatus) ;

    const milkStatus = await addMilk() ;
    console.log(milkStatus) ;


    


}


makeCoffee() ;
setTimeout(()=>{

    console.log("Enjoy your coffee!!!")
},6000) ;

