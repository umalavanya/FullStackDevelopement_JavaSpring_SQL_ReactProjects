// The basics of typescript
//OOPS concepts
//abstract classes
//interfaces

let u:any = true ;
u = "string" ; // Error 
Math.round(u) ;
console.log(u, Math.round(u))

// difference between the any and unknown
// unknown must be type-checked before use
// You cant access properties on an unknown type without type assertion
// You can't call or construct values of type unknown


// You can narrow down the type of an unknown value using type gaurds

function processValue(value: unknown){
    if(typeof value === 'string') {
        console.log(value.toUpperCase()) ;

    } else if (Array.isArray(value)){
        console.log(value.length) ;
    }
}