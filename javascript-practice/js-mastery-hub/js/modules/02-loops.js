// MODULE 2: LOOPS - while, do-while, for, for-in, for-of

const LoopsModule = {
    // 2.1 While Loop
    demoWhileLoop: function() {
        Utils.clearOutput();
        Utils.addDivider('WHILE LOOP DEMO');
        
        let count = 0;
        Utils.appendOutput("Counting from 0 to 4 using while loop:");
        
        while (count < 5) {
            Utils.appendOutput(`Current count: ${count}`);
            count++;
        }
        Utils.appendOutput("Loop ended!");
    },

    // 2.2 Do-While Loop
    demoDoWhileLoop: function() {
        Utils.clearOutput();
        Utils.addDivider('DO-WHILE LOOP DEMO');
        
        let count = 10;
        Utils.appendOutput("Even though condition is false, do-while runs once:");
        
        do {
            Utils.appendOutput(`Current count: ${count}`);
            count++;
        } while (count < 5);
        
        Utils.appendOutput("Loop ended!");
    },

    // 2.3 For Loop
    demoForLoop: function() {
        Utils.clearOutput();
        Utils.addDivider('FOR LOOP DEMO');
        
        Utils.appendOutput("Standard for loop from 0 to 4:");
        for (let i = 0; i < 5; i++) {
            Utils.appendOutput(`Iteration ${i}`);
        }
        
        Utils.addDivider('FOR LOOP - OPTIONAL STATEMENTS');
        let j = 0;
        for (; j < 3; ) {
            Utils.appendOutput(`Optional initialization/iteration: j = ${j}`);
            j++;
        }
    },

    // 2.4 For...in Loop (for objects)
    demoForInLoop: function() {
        Utils.clearOutput();
        Utils.addDivider('FOR...IN LOOP DEMO');
        
        // Object iteration
        const car = {
            brand: "Tesla",
            model: "Model 3",
            year: 2023,
            color: "Red",
            price: 50000
        };
        
        Utils.appendOutput("Iterating through car object properties:");
        for (let key in car) {
            Utils.appendOutput(`Property: ${key} -> Value: ${car[key]}`);
        }
        
        Utils.addDivider('FOR...IN WITH ARRAY');
        const fruits = ["Apple", "Banana", "Orange", "Mango"];
        Utils.appendOutput("Iterating through array (not recommended but possible):");
        for (let index in fruits) {
            Utils.appendOutput(`Index ${index}: ${fruits[index]}`);
        }
    },

    // 2.5 For...of Loop (for iterables)
    demoForOfLoop: function() {
        Utils.clearOutput();
        Utils.addDivider('FOR...OF LOOP DEMO');
        
        // Array iteration
        const colors = ["Red", "Green", "Blue", "Yellow"];
        Utils.appendOutput("Iterating through array:");
        for (let color of colors) {
            Utils.appendOutput(`Color: ${color}`);
        }
        
        Utils.addDivider('FOR...OF WITH STRING');
        const text = "Hello";
        Utils.appendOutput("Iterating through string characters:");
        for (let char of text) {
            Utils.appendOutput(`Character: '${char}'`);
        }
        
        // Set iteration
        Utils.addDivider('FOR...OF WITH SET');
        const uniqueNums = new Set([1, 2, 3, 3, 4, 4, 5]);
        Utils.appendOutput("Set contains unique values:");
        for (let num of uniqueNums) {
            Utils.appendOutput(`Number: ${num}`);
        }
        
        // Map iteration
        Utils.addDivider('FOR...OF WITH MAP');
        const userMap = new Map([
            ['name', 'John'],
            ['age', 30],
            ['city', 'New York']
        ]);
        Utils.appendOutput("Map key-value pairs:");
        for (let [key, value] of userMap) {
            Utils.appendOutput(`${key}: ${value}`);
        }
    },

    // 2.6 Nested Loops
    demoNestedLoops: function() {
        Utils.clearOutput();
        Utils.addDivider('NESTED LOOPS DEMO');
        
        Utils.appendOutput("Multiplication Table (1-5):");
        for (let i = 1; i <= 5; i++) {
            let row = "";
            for (let j = 1; j <= 5; j++) {
                row += `${i * j}\t`.padEnd(4);
            }
            Utils.appendOutput(row);
        }
    },

    // 2.7 Loop Control with Labels
    demoLoopLabels: function() {
        Utils.clearOutput();
        Utils.addDivider('LOOP LABELS DEMO');
        
        Utils.appendOutput("Finding coordinates of number 7 in a 3x3 matrix:");
        
        let matrix = [
            [1, 2, 3],
            [4, 5, 6],
            [7, 8, 9]
        ];
        
        outerLoop: // Label
        for (let i = 0; i < matrix.length; i++) {
            innerLoop:
            for (let j = 0; j < matrix[i].length; j++) {
                if (matrix[i][j] === 7) {
                    Utils.appendOutput(`✅ Found 7 at [${i}][${j}]`, 'success');
                    break outerLoop; // Break both loops
                }
                Utils.appendOutput(`Checking [${i}][${j}] = ${matrix[i][j]}`);
            }
        }
    },

    // 2.8 User-Defined Iterators
    demoCustomIterators: function() {
        Utils.clearOutput();
        Utils.addDivider('USER-DEFINED ITERATORS DEMO');
        
        // Custom iterator for even numbers
        function createEvenIterator(limit) {
            let current = 0;
            return {
                next: function() {
                    current += 2;
                    if (current <= limit) {
                        return { value: current, done: false };
                    }
                    return { done: true };
                },
                [Symbol.iterator]: function() {
                    return this;
                }
            };
        }
        
        Utils.appendOutput("Even numbers up to 10 using custom iterator:");
        const evenIterator = createEvenIterator(10);
        let result = evenIterator.next();
        while (!result.done) {
            Utils.appendOutput(`Even number: ${result.value}`);
            result = evenIterator.next();
        }
        
        // Custom iterable object
        Utils.addDivider('CUSTOM ITERABLE OBJECT');
        const oddNumbers = {
            [Symbol.iterator]: function() {
                let num = 1;
                return {
                    next: function() {
                        if (num <= 9) {
                            let value = num;
                            num += 2;
                            return { value, done: false };
                        }
                        return { done: true };
                    }
                };
            }
        };
        
        Utils.appendOutput("Odd numbers 1-9 using custom iterable:");
        for (let num of oddNumbers) {
            Utils.appendOutput(`Odd number: ${num}`);
        }
    }
};