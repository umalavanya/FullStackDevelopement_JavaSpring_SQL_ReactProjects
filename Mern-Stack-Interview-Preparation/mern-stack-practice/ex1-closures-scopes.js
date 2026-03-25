// Understanding Scope
// Scope determines where variables and functions are accessible in your code.

// Types of Scope


// Global Scope
// Variables declared outside any fuction are globally accessible.
const globalVar = "I'm global" ;

function showGlobal(){
    console.log(globalVar) ; // Accessible
}

showGlobal() ;


// fuunction scope
// variables declared with var inside a function are only accessible within that function

function myFunction(){
    var functionScoped = "Only inside function" ;
    console.log(functionScoped) ; //works
}

// console.log(functionScoped) ;  // it causes error - reference error

// Block scope
// Variables declared with let and const are block-scoped (within {})
if(true){
    let blockScoped = "Only in this block"; 
    const alsoBlockScoped = "Also only in this block" ;
    var notBlockScoped = "Accessible outside!" ;

}

// Lexical Scope 
// JavaScript uses lexical scoping - inner functions have access to variables of outer functions
function outer(){
    const outerVar = "I'm from outer" ;
    function inner(){
        console.log(outerVar) ;
    }
    inner() ;
}
outer() ;


// 2. Understanding Closures 
// A Closure is a function that remembers its lexical scope even executed outside that scope.
// Every function in JS is a closure

// How Closures work
// When a function is defined, it captures (closes over) the variables from its containing scope.

function createCounter(){
    let count = 0 ;
    return function(){
        count++ ;
        return count ;
    }
}

const counter = createCounter() ;
console.log(counter()) ;
console.log(counter()) ;
counter();
console.log(counter()) ;
console.log(counter()) ;


// common closure examples
// 1.private variables

