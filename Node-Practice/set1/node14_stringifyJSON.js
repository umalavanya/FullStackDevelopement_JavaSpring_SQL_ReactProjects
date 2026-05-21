const obj = {
    name:"John",
    age: 20 ,
    city: "New York"
} ;

// Stringify with 2-space indentation
const jsonString = JSON.stringify(obj, null, 2) ;
console.log(jsonString) ;


const obj1 = {
  name: "John",
  password: "secret123",
  age: 30
};

// Exclude password property
console.log(JSON.stringify(obj1, ["name", "age"], 2));
// or with a function:
console.log(JSON.stringify(obj1, (key, value) => {
  if (key === "password") return undefined;
  return value;
}, 2));

// JSON.stringify(value, replacer, space)

// value - The object to stringify

// replacer - null or a function/array to filter properties

// space - Number of spaces for indentation (or string like " ") 


// Different indentation options

// const obj = { a: 1, b: 2 };

// console.log(JSON.stringify(obj, null, 2));  // 2 spaces
// console.log(JSON.stringify(obj, null, 4));  // 4 spaces
// console.log(JSON.stringify(obj, null, "\t")); // tabs