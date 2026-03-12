// MODULE 4: OBJECTS - Number, Boolean, String, Array, Date, Math, etc.

const ObjectsModule = {
    // 4.1 Number Object
    demoNumberObject: function() {
        Utils.clearOutput();
        Utils.addDivider('NUMBER OBJECT DEMO');
        
        const num = 123.4567;
        
        // Number properties
        Utils.appendOutput(`Number.MAX_VALUE: ${Number.MAX_VALUE}`);
        Utils.appendOutput(`Number.MIN_VALUE: ${Number.MIN_VALUE}`);
        Utils.appendOutput(`Number.POSITIVE_INFINITY: ${Number.POSITIVE_INFINITY}`);
        Utils.appendOutput(`Number.NEGATIVE_INFINITY: ${Number.NEGATIVE_INFINITY}`);
        Utils.appendOutput(`Number.NaN: ${Number.NaN}`);
        Utils.appendOutput(`Number.EPSILON: ${Number.EPSILON}`);
        
        // Number methods
        Utils.addDivider('NUMBER METHODS');
        Utils.appendOutput(`Original number: ${num}`);
        Utils.appendOutput(`toFixed(2): ${num.toFixed(2)}`);
        Utils.appendOutput(`toPrecision(4): ${num.toPrecision(4)}`);
        Utils.appendOutput(`toExponential(2): ${num.toExponential(2)}`);
        Utils.appendOutput(`toString(16): ${num.toString(16)}`); // Hexadecimal
        
        // Static methods
        Utils.appendOutput(`\nNumber.isInteger(10): ${Number.isInteger(10)}`);
        Utils.appendOutput(`Number.isInteger(10.5): ${Number.isInteger(10.5)}`);
        Utils.appendOutput(`Number.isNaN(NaN): ${Number.isNaN(NaN)}`);
        Utils.appendOutput(`Number.parseFloat("123.45"): ${Number.parseFloat("123.45")}`);
        Utils.appendOutput(`Number.parseInt("123.45"): ${Number.parseInt("123.45")}`);
    },

    // 4.2 Boolean Object
    demoBooleanObject: function() {
        Utils.clearOutput();
        Utils.addDivider('BOOLEAN OBJECT DEMO');
        
        // Truthy and Falsy values
        Utils.appendOutput("FALSY VALUES (all return false):");
        const falsyValues = [false, 0, -0, "", null, undefined, NaN];
        falsyValues.forEach(val => {
            Utils.appendOutput(`Boolean(${String(val)}): ${Boolean(val)}`);
        });
        
        Utils.appendOutput("\nTRUTHY VALUES (all return true):");
        const truthyValues = [true, 1, -1, "hello", [], {}, function(){}];
        truthyValues.forEach(val => {
            Utils.appendOutput(`Boolean(${String(val)}): ${Boolean(val)}`);
        });
        
        // Boolean object vs primitive
        Utils.addDivider('BOOLEAN OBJECT VS PRIMITIVE');
        const boolPrimitive = true;
        const boolObject = new Boolean(true);
        
        Utils.appendOutput(`typeof true: ${typeof boolPrimitive}`);
        Utils.appendOutput(`typeof new Boolean(true): ${typeof boolObject}`);
        Utils.appendOutput(`boolPrimitive == boolObject: ${boolPrimitive == boolObject}`);
        Utils.appendOutput(`boolPrimitive === boolObject: ${boolPrimitive === boolObject}`);
    },

    // 4.3 String Object
    demoStringObject: function() {
        Utils.clearOutput();
        Utils.addDivider('STRING OBJECT DEMO');
        
        const str = "  Hello, JavaScript World!  ";
        Utils.appendOutput(`Original string: "${str}"`);
        Utils.appendOutput(`Length: ${str.length}`);
        
        // String methods
        Utils.addDivider('STRING METHODS');
        Utils.appendOutput(`toUpperCase(): "${str.toUpperCase()}"`);
        Utils.appendOutput(`toLowerCase(): "${str.toLowerCase()}"`);
        Utils.appendOutput(`trim(): "${str.trim()}"`);
        Utils.appendOutput(`charAt(7): "${str.charAt(7)}"`);
        Utils.appendOutput(`indexOf('JavaScript'): ${str.indexOf('JavaScript')}`);
        Utils.appendOutput(`includes('World'): ${str.includes('World')}`);
        Utils.appendOutput(`startsWith('  Hello'): ${str.startsWith('  Hello')}`);
        Utils.appendOutput(`endsWith('!  '): ${str.endsWith('!  ')}`);
        
        // Substring methods
        Utils.appendOutput(`\nslice(2, 7): "${str.slice(2, 7)}"`);
        Utils.appendOutput(`substring(2, 7): "${str.substring(2, 7)}"`);
        Utils.appendOutput(`substr(2, 5): "${str.substr(2, 5)}"`);
        
        // Split and join
        const words = str.trim().split(" ");
        Utils.appendOutput(`\nsplit(): ${JSON.stringify(words)}`);
        Utils.appendOutput(`join('-'): ${words.join('-')}`);
        
        // Replace
        Utils.appendOutput(`\nreplace('World', 'Universe'): "${str.replace('World', 'Universe')}"`);
        
        // Template literals
        Utils.addDivider('TEMPLATE LITERALS');
        const name = "Alice";
        const age = 28;
        const templateStr = `Hello, my name is ${name} and I'm ${age} years old.`;
        Utils.appendOutput(templateStr);
        
        // Multiline string
        const multiline = `
            This is a
            multiline string
            using template literals.
        `;
        Utils.appendOutput(`Multiline: ${multiline}`);
    },

    // 4.4 Array Object
    demoArrayObject: function() {
        Utils.clearOutput();
        Utils.addDivider('ARRAY OBJECT DEMO');
        
        // Creating arrays
        const arr1 = [1, 2, 3, 4, 5];
        const arr2 = new Array(5); // Empty array of length 5
        const arr3 = new Array(1, 2, 3); // [1,2,3]
        
        Utils.appendOutput(`Array literal: ${arr1}`);
        Utils.appendOutput(`new Array(5): ${arr2}`);
        Utils.appendOutput(`new Array(1,2,3): ${arr3}`);
        
        // Array properties
        Utils.appendOutput(`\nLength of arr1: ${arr1.length}`);
        
        // Array methods - Adding/Removing
        Utils.addDivider('ADDING/REMOVING ELEMENTS');
        const fruits = ["Apple", "Banana"];
        Utils.appendOutput(`Original: ${fruits}`);
        
        fruits.push("Orange"); // Add to end
        Utils.appendOutput(`After push('Orange'): ${fruits}`);
        
        const last = fruits.pop(); // Remove from end
        Utils.appendOutput(`After pop(): ${fruits}, removed: ${last}`);
        
        fruits.unshift("Mango"); // Add to beginning
        Utils.appendOutput(`After unshift('Mango'): ${fruits}`);
        
        const first = fruits.shift(); // Remove from beginning
        Utils.appendOutput(`After shift(): ${fruits}, removed: ${first}`);
        
        // Array methods - Iteration
        Utils.addDivider('ARRAY ITERATION');
        const numbers = [1, 2, 3, 4, 5];
        
        // forEach
        Utils.appendOutput("forEach:");
        numbers.forEach((num, index) => {
            Utils.appendOutput(`  numbers[${index}] = ${num}`);
        });
        
        // map
        const doubled = numbers.map(num => num * 2);
        Utils.appendOutput(`\nmap (double): ${doubled}`);
        
        // filter
        const evens = numbers.filter(num => num % 2 === 0);
        Utils.appendOutput(`filter (evens): ${evens}`);
        
        // reduce
        const sum = numbers.reduce((acc, num) => acc + num, 0);
        Utils.appendOutput(`reduce (sum): ${sum}`);
        
        // some/every
        Utils.appendOutput(`\nsome(num > 3): ${numbers.some(num => num > 3)}`);
        Utils.appendOutput(`every(num > 0): ${numbers.every(num => num > 0)}`);
        
        // find/findIndex
        Utils.appendOutput(`find(num > 3): ${numbers.find(num => num > 3)}`);
        Utils.appendOutput(`findIndex(num > 3): ${numbers.findIndex(num => num > 3)}`);
        
        // Array methods - Transformation
        Utils.addDivider('ARRAY TRANSFORMATION');
        const nested = [1, [2, 3], [4, [5, 6]]];
        Utils.appendOutput(`Original nested: ${JSON.stringify(nested)}`);
        Utils.appendOutput(`flat(): ${JSON.stringify(nested.flat())}`);
        Utils.appendOutput(`flat(2): ${JSON.stringify(nested.flat(2))}`);
        
        const arr = [3, 1, 4, 1, 5, 9];
        Utils.appendOutput(`\nOriginal: ${arr}`);
        Utils.appendOutput(`sort(): ${arr.sort()}`);
        Utils.appendOutput(`reverse(): ${arr.reverse()}`);
        Utils.appendOutput(`slice(1,4): ${arr.slice(1,4)}`);
    },

    // 4.5 Date Object
    demoDateObject: function() {
        Utils.clearOutput();
        Utils.addDivider('DATE OBJECT DEMO');
        
        // Current date
        const now = new Date();
        Utils.appendOutput(`Current date/time: ${now}`);
        
        // Creating specific dates
        const specific1 = new Date(2023, 0, 15, 10, 30, 45); // Year, Month (0-11), Day, Hour, Minute, Second
        const specific2 = new Date("2023-01-15T10:30:45");
        const specific3 = new Date(1673789445000); // Milliseconds since epoch
        
        Utils.appendOutput(`\nSpecific date (month params): ${specific1}`);
        Utils.appendOutput(`Specific date (string): ${specific2}`);
        Utils.appendOutput(`Specific date (milliseconds): ${specific3}`);
        
        // Getting date components
        Utils.addDivider('GETTING DATE COMPONENTS');
        Utils.appendOutput(`getFullYear(): ${now.getFullYear()}`);
        Utils.appendOutput(`getMonth(): ${now.getMonth()} (0-11)`);
        Utils.appendOutput(`getDate(): ${now.getDate()}`);
        Utils.appendOutput(`getDay(): ${now.getDay()} (0-6)`);
        Utils.appendOutput(`getHours(): ${now.getHours()}`);
        Utils.appendOutput(`getMinutes(): ${now.getMinutes()}`);
        Utils.appendOutput(`getSeconds(): ${now.getSeconds()}`);
        Utils.appendOutput(`getMilliseconds(): ${now.getMilliseconds()}`);
        Utils.appendOutput(`getTime(): ${now.getTime()} (milliseconds since epoch)`);
        
        // UTC methods
        Utils.addDivider('UTC METHODS');
        Utils.appendOutput(`getUTCFullYear(): ${now.getUTCFullYear()}`);
        Utils.appendOutput(`getUTCHours(): ${now.getUTCHours()}`);
        Utils.appendOutput(`getTimezoneOffset(): ${now.getTimezoneOffset()} minutes`);
        
        // Setting date components
        Utils.addDivider('SETTING DATE COMPONENTS');
        const future = new Date();
        future.setFullYear(2025);
        future.setMonth(11); // December
        future.setDate(25);
        Utils.appendOutput(`Future date: ${future}`);
        
        // Date formatting
        Utils.addDivider('DATE FORMATTING');
        Utils.appendOutput(`toDateString(): ${now.toDateString()}`);
        Utils.appendOutput(`toTimeString(): ${now.toTimeString()}`);
        Utils.appendOutput(`toLocaleDateString(): ${now.toLocaleDateString()}`);
        Utils.appendOutput(`toLocaleTimeString(): ${now.toLocaleTimeString()}`);
        Utils.appendOutput(`toISOString(): ${now.toISOString()}`);
        Utils.appendOutput(`toUTCString(): ${now.toUTCString()}`);
        
        // Date calculations
        Utils.addDivider('DATE CALCULATIONS');
        const start = new Date(2023, 0, 1);
        const end = new Date(2023, 11, 31);
        const diffMs = end - start;
        const diffDays = diffMs / (1000 * 60 * 60 * 24);
        
        Utils.appendOutput(`Days in 2023: ${diffDays}`);
    },

    // 4.6 Math Object
    demoMathObject: function() {
        Utils.clearOutput();
        Utils.addDivider('MATH OBJECT DEMO');
        
        // Math properties
        Utils.appendOutput(`Math.PI: ${Math.PI}`);
        Utils.appendOutput(`Math.E: ${Math.E}`);
        Utils.appendOutput(`Math.LN2: ${Math.LN2}`);
        Utils.appendOutput(`Math.LN10: ${Math.LN10}`);
        Utils.appendOutput(`Math.SQRT2: ${Math.SQRT2}`);
        
        // Basic operations
        Utils.addDivider('BASIC OPERATIONS');
        Utils.appendOutput(`Math.abs(-5): ${Math.abs(-5)}`);
        Utils.appendOutput(`Math.round(4.7): ${Math.round(4.7)}`);
        Utils.appendOutput(`Math.ceil(4.2): ${Math.ceil(4.2)}`);
        Utils.appendOutput(`Math.floor(4.7): ${Math.floor(4.7)}`);
        Utils.appendOutput(`Math.trunc(4.7): ${Math.trunc(4.7)}`);
        Utils.appendOutput(`Math.pow(2, 8): ${Math.pow(2, 8)}`);
        Utils.appendOutput(`Math.sqrt(16): ${Math.sqrt(16)}`);
        Utils.appendOutput(`Math.cbrt(27): ${Math.cbrt(27)}`);
        
        // Min/Max
        Utils.addDivider('MIN/MAX');
        Utils.appendOutput(`Math.max(10, 5, 20, 15): ${Math.max(10, 5, 20, 15)}`);
        Utils.appendOutput(`Math.min(10, 5, 20, 15): ${Math.min(10, 5, 20, 15)}`);
        
        // Random numbers
        Utils.addDivider('RANDOM NUMBERS');
        Utils.appendOutput(`Math.random(): ${Math.random()}`);
        Utils.appendOutput(`Random 1-10: ${Math.floor(Math.random() * 10) + 1}`);
        Utils.appendOutput(`Random 1-100: ${Math.floor(Math.random() * 100) + 1}`);
        
        // Trigonometric functions
        Utils.addDivider('TRIGONOMETRIC FUNCTIONS');
        Utils.appendOutput(`Math.sin(Math.PI/2): ${Math.sin(Math.PI/2)}`);
        Utils.appendOutput(`Math.cos(0): ${Math.cos(0)}`);
        Utils.appendOutput(`Math.tan(Math.PI/4): ${Math.tan(Math.PI/4)}`);
        Utils.appendOutput(`Math.asin(1): ${Math.asin(1)}`);
        Utils.appendOutput(`Math.acos(0): ${Math.acos(0)}`);
        Utils.appendOutput(`Math.atan(1): ${Math.atan(1)}`);
        
        // Logarithmic functions
        Utils.addDivider('LOGARITHMIC FUNCTIONS');
        Utils.appendOutput(`Math.log(1): ${Math.log(1)}`);
        Utils.appendOutput(`Math.log(10): ${Math.log(10)}`);
        Utils.appendOutput(`Math.log10(100): ${Math.log10(100)}`);
        Utils.appendOutput(`Math.log2(8): ${Math.log2(8)}`);
    },

    // 4.7 Variable Scope
    demoVariableScope: function() {
        Utils.clearOutput();
        Utils.addDivider('VARIABLE SCOPE DEMO');
        
        // Global scope
        var globalVar = "I'm global";
        let globalLet = "I'm also global (let)";
        const globalConst = "I'm constant";
        
        Utils.appendOutput(`Global: ${globalVar}`);
        Utils.appendOutput(`Global let: ${globalLet}`);
        Utils.appendOutput(`Global const: ${globalConst}`);
        
        // Function scope
        function scopeDemo() {
            var functionVar = "I'm function-scoped";
            let blockLet = "I'm block-scoped";
            const blockConst = "I'm block-scoped constant";
            
            Utils.appendOutput(`\nInside function:`);
            Utils.appendOutput(`  functionVar: ${functionVar}`);
            Utils.appendOutput(`  blockLet: ${blockLet}`);
            Utils.appendOutput(`  blockConst: ${blockConst}`);
            Utils.appendOutput(`  globalVar: ${globalVar}`); // Can access global
            
            // Block scope
            if (true) {
                var varInBlock = "I'm still function-scoped (var)";
                let letInBlock = "I'm block-scoped (let)";
                const constInBlock = "I'm block-scoped (const)";
                
                Utils.appendOutput(`\n    Inside block:`);
                Utils.appendOutput(`      varInBlock: ${varInBlock}`);
                Utils.appendOutput(`      letInBlock: ${letInBlock}`);
                Utils.appendOutput(`      constInBlock: ${constInBlock}`);
            }
            
            // Can access varInBlock (function-scoped)
            Utils.appendOutput(`\n  After block:`);
            Utils.appendOutput(`  varInBlock: ${varInBlock}`);
            
            // Cannot access letInBlock or constInBlock
            try {
                Utils.appendOutput(letInBlock);
            } catch(e) {
                Utils.appendOutput(`  Cannot access letInBlock: ${e.message}`, 'error');
            }
        }
        
        scopeDemo();
        
        // Cannot access function-scoped variables outside
        try {
            Utils.appendOutput(functionVar);
        } catch(e) {
            Utils.appendOutput(`\nOutside function - cannot access functionVar: ${e.message}`, 'error');
        }
    },

    // 4.8 Global Variables
    demoGlobalVariables: function() {
        Utils.clearOutput();
        Utils.addDivider('GLOBAL VARIABLES DEMO');
        
        // Intentionally creating global variables
        var globalVar = "Created with var";
        globalImplicit = "Created without keyword"; // Becomes global (bad practice)
        
        Utils.appendOutput(`globalVar: ${globalVar}`);
        Utils.appendOutput(`globalImplicit: ${globalImplicit}`);
        
        // In browser, global variables become window properties
        if (typeof window !== 'undefined') {
            Utils.appendOutput(`\nwindow.globalVar: ${window.globalVar}`);
            Utils.appendOutput(`window.globalImplicit: ${window.globalImplicit}`);
        }
        
        // Avoiding global namespace pollution
        Utils.addDivider('AVOIDING GLOBAL NAMESPACE POLLUTION');
        
        // Using IIFE
        (function() {
            const privateVar = "I'm private to this IIFE";
            Utils.appendOutput(`Inside IIFE: ${privateVar}`);
        })();
        
        // Cannot access privateVar outside IIFE
        try {
            Utils.appendOutput(privateVar);
        } catch(e) {
            Utils.appendOutput(`Outside IIFE: Cannot access privateVar`, 'error');
        }
        
        // Using modules (simulated)
        const MyModule = (function() {
            let privateCounter = 0;
            
            function privateFunction() {
                return "Private function called";
            }
            
            return {
                increment: function() {
                    privateCounter++;
                    return privateCounter;
                },
                getCounter: function() {
                    return privateCounter;
                },
                callPrivate: function() {
                    return privateFunction();
                }
            };
        })();
        
        Utils.appendOutput(`\nModule pattern:`);
        Utils.appendOutput(`Counter: ${MyModule.getCounter()}`);
        Utils.appendOutput(`After increment: ${MyModule.increment()}`);
        Utils.appendOutput(`Private function via module: ${MyModule.callPrivate()}`);
    },

    // 4.9 DataView
    demoDataView: function() {
        Utils.clearOutput();
        Utils.addDivider('DATAVIEW DEMO');
        
        // Create ArrayBuffer
        const buffer = new ArrayBuffer(16);
        Utils.appendOutput(`ArrayBuffer byte length: ${buffer.byteLength}`);
        
        // Create DataView
        const view = new DataView(buffer);
        
        // Write different data types
        view.setInt8(0, 127);
        view.setUint8(1, 255);
        view.setInt16(2, 32767, true); // little-endian
        view.setUint16(4, 65535, true);
        view.setInt32(6, 2147483647, true);
        view.setFloat32(10, 3.14159, true);
        view.setFloat64(14, 123.456789, true);
        
        // Read data back
        Utils.appendOutput(`Int8 at 0: ${view.getInt8(0)}`);
        Utils.appendOutput(`Uint8 at 1: ${view.getUint8(1)}`);
        Utils.appendOutput(`Int16 at 2 (LE): ${view.getInt16(2, true)}`);
        Utils.appendOutput(`Uint16 at 4 (LE): ${view.getUint16(4, true)}`);
        Utils.appendOutput(`Int32 at 6 (LE): ${view.getInt32(6, true)}`);
        Utils.appendOutput(`Float32 at 10 (LE): ${view.getFloat32(10, true)}`);
        Utils.appendOutput(`Float64 at 14 (LE): ${view.getFloat64(14, true)}`);
        
        // View properties
        Utils.appendOutput(`\nView buffer: ${view.buffer}`);
        Utils.appendOutput(`View byteLength: ${view.byteLength}`);
        Utils.appendOutput(`View byteOffset: ${view.byteOffset}`);
    }
};