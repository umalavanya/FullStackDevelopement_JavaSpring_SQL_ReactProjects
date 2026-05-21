// Basic Example

// JSON string
const jsonString = '{"name":"John", "age": 30, "city":"New york"}' ;

// Parse the string into an object
const obj = JSON.parse(jsonString) ;


// Access properties
console.log(obj.name) ;
console.log(obj.age) ;
console.log(obj.city) ;