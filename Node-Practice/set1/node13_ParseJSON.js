// Basic Example

// JSON string
const jsonString = '{"name":"John", "age": 30, "city":"New york"}' ;

// Parse the string into an object
const obj = JSON.parse(jsonString) ;


// Access properties
console.log(obj.name) ;
console.log(obj.age) ;
console.log(obj.city) ;


// Nested Properties

const jsonStringNested = '{"user":{"name":"Alice", "address":{"city":"Boston", "zip":"02101"}}}' ;

const objNested = JSON.parse(jsonStringNested) ;

console.log(objNested.user.name) ;
console.log(objNested.user.address.city) ;
console.log(objNested.user.address.zip) ;