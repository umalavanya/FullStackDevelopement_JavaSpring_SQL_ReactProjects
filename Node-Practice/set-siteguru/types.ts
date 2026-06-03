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
