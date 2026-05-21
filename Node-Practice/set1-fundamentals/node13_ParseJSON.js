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

// Error Handling

const jsonStringE = '{"name":"John, age:30}' ;

try{
    const objE = JSON.parse(jsonStringE) ;
    console.log(objE.name);

} catch (error) {
    console.error("Invalid JSON: ", error.message) ;
}

// Quick tips
// JSON keys must be in double quotes : "key" not 'key' or just key
// Strings in JSON must use double quotes : "value" not 'value'
// Use try-catch when parsing JSON from untrusted sources
// To go back to JSON string: JSON.stringify(obj)