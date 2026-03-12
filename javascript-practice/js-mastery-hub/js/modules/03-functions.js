// MODULE 3: FUNCTIONS - All aspects of JavaScript functions

const FunctionsModule = {
    // 3.1 Function Declaration vs Expression
    demoFunctionDeclarations: function() {
        Utils.clearOutput();
        Utils.addDivider('FUNCTION DECLARATION VS EXPRESSION');
        
        // Function Declaration (hoisted)
        Utils.appendOutput("Function Declaration (hoisted):");
        Utils.appendOutput(`Result: ${add(5, 3)}`); // Works even before declaration
        
        function add(a, b) {
            return a + b;
        }
        
        // Function Expression (not hoisted)
        Utils.appendOutput("\nFunction Expression (not hoisted):");
        const multiply = function(a, b) {
            return a * b;
        };
        Utils.appendOutput(`Result: ${multiply(5, 3)}`);
        
        // Named Function Expression
        Utils.appendOutput("\nNamed Function Expression:");
        const factorial = function fact(n) {
            return n <= 1 ? 1 : n * fact(n - 1);
        };
        Utils.appendOutput(`Factorial of 5: ${factorial(5)}`);
    },

    // 3.2 Arrow Functions
    demoArrowFunctions: function() {
        Utils.clearOutput();
        Utils.addDivider('ARROW FUNCTIONS DEMO');
        
        // Basic arrow function
        const square = x => x * x;
        Utils.appendOutput(`Square of 5: ${square(5)}`);
        
        // Arrow with multiple parameters
        const sum = (a, b, c) => a + b + c;
        Utils.appendOutput(`Sum of 1,2,3: ${sum(1, 2, 3)}`);
        
        // Arrow with multiple statements
        const processArray = (arr) => {
            let sum = 0;
            for (let num of arr) {
                sum += num;
            }
            return sum / arr.length;
        };
        Utils.appendOutput(`Average of [2,4,6,8]: ${processArray([2,4,6,8])}`);
        
        // Arrow with default parameters
        const greet = (name = "Guest") => `Hello, ${name}!`;
        Utils.appendOutput(`Greet: ${greet("John")}`);
        Utils.appendOutput(`Greet (no name): ${greet()}`);
    },

    // 3.3 Function Parameters
    demoFunctionParameters: function() {
        Utils.clearOutput();
        Utils.addDivider('FUNCTION PARAMETERS DEMO');
        
        // Arguments object
        function sumAll() {
            let total = 0;
            for (let i = 0; i < arguments.length; i++) {
                total += arguments[i];
            }
            return total;
        }
        
        Utils.appendOutput(`sumAll(1,2,3,4): ${sumAll(1,2,3,4)}`);
        Utils.appendOutput(`sumAll(10,20): ${sumAll(10,20)}`);
        
        // Default parameters
        function calculate(price, tax = 0.1, discount = 0) {
            return price * (1 + tax) - discount;
        }
        
        Utils.appendOutput(`\nDefault Parameters Demo:`);
        Utils.appendOutput(`Price 100, default tax: ${calculate(100)}`);
        Utils.appendOutput(`Price 100, tax 0.2: ${calculate(100, 0.2)}`);
        Utils.appendOutput(`Price 100, tax 0.2, discount 10: ${calculate(100, 0.2, 10)}`);
        
        // Rest parameters
        function logItems(category, ...items) {
            Utils.appendOutput(`\nCategory: ${category}`);
            items.forEach((item, index) => {
                Utils.appendOutput(`  Item ${index + 1}: ${item}`);
            });
        }
        
        logItems("Fruits", "Apple", "Banana", "Orange", "Mango");
    },

    // 3.4 Return Statement
    demoReturnStatement: function() {
        Utils.clearOutput();
        Utils.addDivider('RETURN STATEMENT DEMO');
        
        // Multiple return points
        function getGrade(score) {
            if (score >= 90) return 'A';
            if (score >= 80) return 'B';
            if (score >= 70) return 'C';
            if (score >= 60) return 'D';
            return 'F';
        }
        
        Utils.appendOutput(`Score 95: Grade ${getGrade(95)}`);
        Utils.appendOutput(`Score 82: Grade ${getGrade(82)}`);
        Utils.appendOutput(`Score 55: Grade ${getGrade(55)}`);
        
        // Returning functions (closure)
        function createMultiplier(multiplier) {
            return function(number) {
                return number * multiplier;
            };
        }
        
        const double = createMultiplier(2);
        const triple = createMultiplier(3);
        
        Utils.appendOutput(`\nClosure Demo:`);
        Utils.appendOutput(`Double of 10: ${double(10)}`);
        Utils.appendOutput(`Triple of 10: ${triple(10)}`);
    },

    // 3.5 Function Invocation Methods
    demoFunctionInvocation: function() {
        Utils.clearOutput();
        Utils.addDivider('FUNCTION INVOCATION METHODS');
        
        const person = {
            firstName: "John",
            lastName: "Doe",
            fullName: function() {
                return `${this.firstName} ${this.lastName}`;
            }
        };
        
        Utils.appendOutput(`Normal invocation: ${person.fullName()}`);
        
        // call() method
        const anotherPerson = {
            firstName: "Jane",
            lastName: "Smith"
        };
        
        Utils.appendOutput(`\nUsing call(): ${person.fullName.call(anotherPerson)}`);
        
        // apply() method
        function introduce(greeting, punctuation) {
            return `${greeting}, I'm ${this.firstName} ${this.lastName}${punctuation}`;
        }
        
        Utils.appendOutput(`\nUsing apply(): ${introduce.apply(anotherPerson, ['Hello', '!'])}`);
        
        // bind() method
        const introduceJane = introduce.bind(anotherPerson, 'Hi');
        Utils.appendOutput(`\nUsing bind(): ${introduceJane('...')}`);
    },

    // 3.6 Constructor Functions
    demoConstructorFunctions: function() {
        Utils.clearOutput();
        Utils.addDivider('CONSTRUCTOR FUNCTIONS DEMO');
        
        // Constructor function
        function Car(brand, model, year) {
            this.brand = brand;
            this.model = model;
            this.year = year;
            this.getInfo = function() {
                return `${this.brand} ${this.model} (${this.year})`;
            };
        }
        
        // Creating objects
        const car1 = new Car("Tesla", "Model 3", 2023);
        const car2 = new Car("BMW", "X5", 2022);
        
        Utils.appendOutput(`Car 1: ${car1.getInfo()}`);
        Utils.appendOutput(`Car 2: ${car2.getInfo()}`);
        Utils.appendOutput(`car1 instanceof Car: ${car1 instanceof Car}`);
    },

    // 3.7 Self-Invoking Functions (IIFE)
    demoIIFE: function() {
        Utils.clearOutput();
        Utils.addDivider('IIFE - IMMEDIATELY INVOKED FUNCTION EXPRESSIONS');
        
        // Basic IIFE
        (function() {
            Utils.appendOutput("This IIFE runs immediately!");
        })();
        
        // IIFE with parameters
        (function(name) {
            Utils.appendOutput(`Hello, ${name}! (from IIFE)`);
        })("John");
        
        // IIFE returning value
        const result = (function() {
            let privateVar = 42;
            return {
                getValue: function() {
                    return privateVar;
                },
                setValue: function(val) {
                    privateVar = val;
                }
            };
        })();
        
        Utils.appendOutput(`\nPrivate variable from IIFE: ${result.getValue()}`);
        result.setValue(100);
        Utils.appendOutput(`Updated private variable: ${result.getValue()}`);
    },

    // 3.8 Closures
    demoClosures: function() {
        Utils.clearOutput();
        Utils.addDivider('CLOSURES DEMO');
        
        // Counter using closure
        function createCounter(initial = 0) {
            let count = initial;
            
            return {
                increment: function() {
                    count++;
                    return count;
                },
                decrement: function() {
                    count--;
                    return count;
                },
                getCount: function() {
                    return count;
                }
            };
        }
        
        const counter = createCounter(10);
        Utils.appendOutput(`Initial count: ${counter.getCount()}`);
        Utils.appendOutput(`After increment: ${counter.increment()}`);
        Utils.appendOutput(`After increment: ${counter.increment()}`);
        Utils.appendOutput(`After decrement: ${counter.decrement()}`);
        
        // Private variables with closure
        function createBankAccount(initialBalance) {
            let balance = initialBalance;
            
            return {
                deposit: function(amount) {
                    if (amount > 0) {
                        balance += amount;
                        return `Deposited ${amount}. New balance: ${balance}`;
                    }
                    return "Invalid amount";
                },
                withdraw: function(amount) {
                    if (amount > 0 && amount <= balance) {
                        balance -= amount;
                        return `Withdrawn ${amount}. New balance: ${balance}`;
                    }
                    return "Insufficient funds";
                },
                getBalance: function() {
                    return balance;
                }
            };
        }
        
        Utils.addDivider('BANK ACCOUNT CLOSURE');
        const account = createBankAccount(1000);
        Utils.appendOutput(account.deposit(500));
        Utils.appendOutput(account.withdraw(200));
        Utils.appendOutput(`Final balance: ${account.getBalance()}`);
        
        // Cannot access balance directly
        Utils.appendOutput(`Direct balance access: ${account.balance}`); // undefined
    },

    // 3.9 Function Hoisting
    demoHoisting: function() {
        Utils.clearOutput();
        Utils.addDivider('FUNCTION HOISTING DEMO');
        
        // Function declarations are hoisted
        Utils.appendOutput("Calling function before declaration:");
        Utils.appendOutput(`Result: ${hoistedFunction()}`);
        
        function hoistedFunction() {
            return "I was hoisted!";
        }
        
        // Function expressions are NOT hoisted
        try {
            Utils.appendOutput("\nTrying to call function expression before declaration:");
            notHoisted(); // This will throw error
        } catch (e) {
            Utils.appendOutput(`Error: ${e.message}`, 'error');
        }
        
        const notHoisted = function() {
            return "This won't work before declaration";
        };
        
        // Variable hoisting
        Utils.addDivider('VARIABLE HOISTING');
        Utils.appendOutput(`Value of x: ${x}`); // undefined (not error)
        var x = 5;
        Utils.appendOutput(`Value of x after initialization: ${x}`);
    },

    // 3.10 Smart Function Parameters
    demoSmarParameters: function() {
        Utils.clearOutput();
        Utils.addDivider('SMART FUNCTION PARAMETERS');
        
        // Default parameters
        function greetWithDefault(name = "Guest", greeting = "Hello") {
            return `${greeting}, ${name}!`;
        }
        
        Utils.appendOutput(greetWithDefault("John", "Hi"));
        Utils.appendOutput(greetWithDefault("Jane"));
        Utils.appendOutput(greetWithDefault());
        
        // Destructuring parameters
        function displayUser({ name, age, city = "Unknown" }) {
            return `Name: ${name}, Age: ${age}, City: ${city}`;
        }
        
        const user1 = { name: "Alice", age: 25, city: "New York" };
        const user2 = { name: "Bob", age: 30 };
        
        Utils.appendOutput(`\nUser 1: ${displayUser(user1)}`);
        Utils.appendOutput(`User 2: ${displayUser(user2)}`);
        
        // Rest parameters with destructuring
        function processOrder(customer, ...items) {
            Utils.appendOutput(`\nOrder for ${customer}:`);
            items.forEach((item, i) => {
                Utils.appendOutput(`  Item ${i + 1}: ${item.name} - $${item.price}`);
            });
            
            const total = items.reduce((sum, item) => sum + item.price, 0);
            return `Total: $${total}`;
        }
        
        const order = processOrder("John", 
            { name: "Laptop", price: 999 },
            { name: "Mouse", price: 29 },
            { name: "Keyboard", price: 89 }
        );
        Utils.appendOutput(order);
    }
};