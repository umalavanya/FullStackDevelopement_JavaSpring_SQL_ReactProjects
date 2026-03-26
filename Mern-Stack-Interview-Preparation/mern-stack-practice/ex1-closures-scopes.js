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

// -----------------------------------------
function createBankAccount(initialBalance){
    let balance  = initialBalance ; //private Variable
    return {
        deposit: 
            function(amount){
                balance += amount ;
                return `Deposited ${amount}. New Balance:${balance}` ;
            },
        withdraw: function(amount){
            if(amount > balance){
                return "Insufficient funds!!!" ;
            }
            balance -= amount ;
            return `Withdrew ${amount}. New balance: ${balance}` ;
        },
        getBalance: function (amount){
            return balance ;

        }
    }
}


const account  = createBankAccount(100) ;
console.log(account.getBalance()) ;
console.log(account.deposit(50)) ;
console.log(account.getBalance()) ;

// --------------------------------------------------------------

// 2. Function Factoies
function multiplyBy(factor){
    return function(number){
        return number*factor ;
    } ;
}

const double = multiplyBy(2) ;
const triple = multiplyBy(3) ;

console.log(double(5)); // 10
console.log(triple(5)); // 15
// ------------------------------------------------------
// 3. Loop and Closure (Common Pitfall)
// Problem: using var in loops
for(var i = 0; i <= 3; i++){
    setTimeout(function(){
        console.log(i) ;//prints 4,4,4 not 1,2,3
    }, 100) ;
}


// Solution 1: use let (block scope)

for(let i=0; i<= 3; i++){
    setTimeout(function(){
        console.log(i) ;
    },100) ;
}

// Solution2: Create closure with IIFE
for(var i = 0; i<=3; i++)(
    (function(j){
        setTimeout(function(){
            console.log(j) ;
        },100)
    })(i)
) ;


// Memory considerations
// Closures keep variables in memory as long as closure exists.
function heavyfunction() {

    const largeData = new Array(10000000).fill("data") ;
    return function(){
        console.log("Closure still holds largeData in memory!") ;
    }
}

let closure =  heavyfunction() ; //LargeData stays in memory!

// To free memory ;
closure = null ;


// MCQ
// --------------------------------------
// Question 1: What will be the output of the following code
// let x = 10 ;
// function test(){
//     console.log(x) ;
//     let x = 20 ;   //Reference Error
// }
// test() ;

/*Explanation
Due to the Temporal Dead Zone (TDZ), 
variables declared with `let` cannot be accessed before declaration, 
even if there's a global variable with the same name.
*/

// -----------------------------
// Question 2: 
for (var i = 0; i < 3; i++) {
    setTimeout(() => console.log(i), 100);
}
// 3,3,3

// ---------------------------------
// Question 3: What will be logged
console.log("********************") ;
function outer() {
    let arr = [];
    for (let i = 0; i < 3; i++) {
        arr.push(function() { return i; });
    }
    return arr;
}
const funcs = outer();
console.log(funcs[0](), funcs[1](), funcs[2]());
console.log("********************") ;
// Explanation: `let` creates a new binding for each iteration, so each closure captures a different `i` value.

// -----------------------
// Question 4: Which statement about closures is FALSE? 
/*A) Closures have access to outer function's variables even after the outer function returns
B) Closures are created only when a function returns another function
C) Closures can help create private variables
D) Closures can cause memory leaks if not managed properly

Answer: B) 
Explanation: Every function in JavaScript is a closure. 
A function doesn't need to return another function to create a closure. */


// ----------------------------------------
// Question 5: 
function dblcounter(){
    let count = 0 ;
    return{
        increment: ()=> ++count,
        decrement: () => --count 

    }; 
}

console.log("----------Double Counter Started--------------") ;
const c1= dblcounter() ;
const c2= dblcounter() ;
c1.increment() ;
c1.increment() ;
console.log(c1.increment(),c2.decrement()) ;
console.log("----------Double counter ended----------------") ;

// --------- Exercises -------------------
// 
// Key Take Aways
 