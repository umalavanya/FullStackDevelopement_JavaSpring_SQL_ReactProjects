// MODULE 5: ADVANCED CONCEPTS - Regular Expressions, Sets, Maps, etc.

const AdvancedModule = {
    // 5.1 Regular Expressions
    demoRegularExpressions: function() {
        Utils.clearOutput();
        Utils.addDivider('REGULAR EXPRESSIONS DEMO');
        
        // Creating regex
        const regex1 = /hello/i; // Literal notation
        const regex2 = new RegExp("hello", "i"); // Constructor notation
        
        const text = "Hello, World! Hello again!";
        
        // test() method
        Utils.appendOutput(`test() - /hello/i.test(text): ${regex1.test(text)}`);
        
        // exec() method
        const result = regex1.exec(text);
        Utils.appendOutput(`\nexec() result: ${JSON.stringify(result)}`);
        
        // String methods with regex
        Utils.addDivider('STRING METHODS WITH REGEX');
        
        // match()
        const matches = text.match(/hello/gi);
        Utils.appendOutput(`match(/hello/gi): ${matches}`);
        
        // search()
        const index = text.search(/world/i);
        Utils.appendOutput(`search(/world/i): ${index}`);
        
        // replace()
        const replaced = text.replace(/hello/gi, "Hi");
        Utils.appendOutput(`replace(/hello/gi, "Hi"): ${replaced}`);
        
        // split()
        const words = text.split(/\s+|,\s*/);
        Utils.appendOutput(`split(/\\s+|,\\s*/): ${JSON.stringify(words)}`);
        
        // Common patterns
        Utils.addDivider('COMMON REGEX PATTERNS');
        
        // Email validation
        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        const emails = ["user@example.com", "invalid.email@", "another@test.co.uk"];
        
        Utils.appendOutput("Email validation:");
        emails.forEach(email => {
            Utils.appendOutput(`  ${email}: ${emailPattern.test(email)}`);
        });
        
        // Phone number (US format)
        const phonePattern = /^\(\d{3}\) \d{3}-\d{4}$/;
        const phones = ["(555) 123-4567", "555-123-4567", "(555)123-4567"];
        
        Utils.appendOutput("\nPhone validation:");
        phones.forEach(phone => {
            Utils.appendOutput(`  ${phone}: ${phonePattern.test(phone)}`);
        });
        
        // URL validation
        const urlPattern = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/;
        const urls = ["https://example.com", "www.test.com", "invalid url"];
        
        Utils.appendOutput("\nURL validation:");
        urls.forEach(url => {
            Utils.appendOutput(`  ${url}: ${urlPattern.test(url)}`);
        });
        
        // Extract numbers from string
        const mixed = "Order 123: price $45.67, quantity 5";
        const numbers = mixed.match(/\d+\.?\d*/g);
        Utils.appendOutput(`\nExtract numbers: ${numbers}`);
    },

    // 5.2 Set Object
    demoSets: function() {
        Utils.clearOutput();
        Utils.addDivider('SET OBJECT DEMO');
        
        // Creating Sets
        const set1 = new Set();
        const set2 = new Set([1, 2, 3, 3, 4, 4, 5]); // Duplicates removed
        
        Utils.appendOutput(`Set from array: ${Array.from(set2)}`);
        
        // Adding elements
        set1.add("Apple");
        set1.add("Banana");
        set1.add("Apple"); // Duplicate ignored
        set1.add("Orange");
        
        Utils.appendOutput(`\nset1 after adds: ${Array.from(set1)}`);
        
        // Set properties
        Utils.appendOutput(`set1 size: ${set1.size}`);
        
        // Checking existence
        Utils.appendOutput(`set1.has("Apple"): ${set1.has("Apple")}`);
        Utils.appendOutput(`set1.has("Grape"): ${set1.has("Grape")}`);
        
        // Deleting elements
        set1.delete("Banana");
        Utils.appendOutput(`\nAfter delete("Banana"): ${Array.from(set1)}`);
        
        // Iteration methods
        Utils.addDivider('SET ITERATION');
        
        // forEach
        Utils.appendOutput("forEach:");
        set1.forEach(value => {
            Utils.appendOutput(`  ${value}`);
        });
        
        // for...of
        Utils.appendOutput("\nfor...of:");
        for (let value of set1) {
            Utils.appendOutput(`  ${value}`);
        }
        
        // keys(), values(), entries()
        Utils.appendOutput("\nkeys():", Array.from(set1.keys()));
        Utils.appendOutput("values():", Array.from(set1.values()));
        Utils.appendOutput("entries():", Array.from(set1.entries()));
        
        // Set operations
        Utils.addDivider('SET OPERATIONS');
        
        const setA = new Set([1, 2, 3, 4, 5]);
        const setB = new Set([4, 5, 6, 7, 8]);
        
        // Union
        const union = new Set([...setA, ...setB]);
        Utils.appendOutput(`Union: ${Array.from(union)}`);
        
        // Intersection
        const intersection = new Set([...setA].filter(x => setB.has(x)));
        Utils.appendOutput(`Intersection: ${Array.from(intersection)}`);
        
        // Difference (A - B)
        const difference = new Set([...setA].filter(x => !setB.has(x)));
        Utils.appendOutput(`Difference (A-B): ${Array.from(difference)}`);
        
        // Symmetric Difference
        const symmetricDiff = new Set([
            ...[...setA].filter(x => !setB.has(x)),
            ...[...setB].filter(x => !setA.has(x))
        ]);
        Utils.appendOutput(`Symmetric Difference: ${Array.from(symmetricDiff)}`);
        
        // Clear set
        set1.clear();
        Utils.appendOutput(`\nAfter clear(), size: ${set1.size}`);
    },

    // 5.3 WeakSet
    demoWeakSet: function() {
        Utils.clearOutput();
        Utils.addDivider('WEAKSET DEMO');
        
        // WeakSet can only contain objects
        const weakSet = new WeakSet();
        
        let obj1 = { name: "Object 1" };
        let obj2 = { name: "Object 2" };
        let obj3 = { name: "Object 3" };
        
        // Adding objects
        weakSet.add(obj1);
        weakSet.add(obj2);
        
        Utils.appendOutput(`weakSet.has(obj1): ${weakSet.has(obj1)}`);
        Utils.appendOutput(`weakSet.has(obj2): ${weakSet.has(obj2)}`);
        Utils.appendOutput(`weakSet.has(obj3): ${weakSet.has(obj3)}`);
        
        // Deleting object
        weakSet.delete(obj1);
        Utils.appendOutput(`\nAfter delete(obj1), has(obj1): ${weakSet.has(obj1)}`);
        
        // Demonstrate weak references (garbage collection)
        Utils.addDivider('WEAK REFERENCES DEMO');
        Utils.appendOutput("Creating temporary object...");
        
        (function() {
            let temp = { data: "temporary" };
            weakSet.add(temp);
            Utils.appendOutput(`Inside function, has(temp): ${weakSet.has(temp)}`);
        })();
        
        Utils.appendOutput("After function ends, temp is garbage collected");
        Utils.appendOutput("(Can't verify directly as WeakSet is not iterable)");
        
        // WeakSet limitations
        Utils.addDivider('WEAKSET LIMITATIONS');
        Utils.appendOutput("❌ Cannot iterate over WeakSet");
        Utils.appendOutput("❌ No size property");
        Utils.appendOutput("❌ Only objects can be added");
        
        try {
            weakSet.add("string"); // This will throw error
        } catch(e) {
            Utils.appendOutput(`✓ Trying to add string: ${e.message}`, 'error');
        }
    },

    // 5.4 Map Object
    demoMaps: function() {
        Utils.clearOutput();
        Utils.addDivider('MAP OBJECT DEMO');
        
        // Creating Maps
        const map1 = new Map();
        const map2 = new Map([
            ["name", "John"],
            ["age", 30],
            ["city", "New York"]
        ]);
        
        Utils.appendOutput(`Map from array: ${JSON.stringify([...map2])}`);
        
        // Adding/updating elements
        map1.set("key1", "value1");
        map1.set("key2", "value2");
        map1.set("key1", "updated value"); // Updates existing
        
        Utils.appendOutput(`\nmap1 after sets: ${JSON.stringify([...map1])}`);
        
        // Getting elements
        Utils.appendOutput(`map1.get("key1"): ${map1.get("key1")}`);
        Utils.appendOutput(`map1.get("nonexistent"): ${map1.get("nonexistent")}`);
        
        // Map properties
        Utils.appendOutput(`\nmap1 size: ${map1.size}`);
        Utils.appendOutput(`map1.has("key2"): ${map1.has("key2")}`);
        
        // Deleting elements
        map1.delete("key2");
        Utils.appendOutput(`\nAfter delete("key2"), has("key2"): ${map1.has("key2")}`);
        
        // Objects as keys
        Utils.addDivider('OBJECTS AS KEYS');
        const objKey1 = { id: 1 };
        const objKey2 = { id: 2 };
        
        map1.set(objKey1, "Value for obj1");
        map1.set(objKey2, "Value for obj2");
        
        Utils.appendOutput(`map1.get(objKey1): ${map1.get(objKey1)}`);
        Utils.appendOutput(`map1.get(objKey2): ${map1.get(objKey2)}`);
        
        // Different key types
        Utils.addDivider('DIFFERENT KEY TYPES');
        const mixedMap = new Map();
        
        mixedMap.set(1, "Number key");
        mixedMap.set("1", "String key");
        mixedMap.set(true, "Boolean key");
        mixedMap.set(null, "Null key");
        mixedMap.set(undefined, "Undefined key");
        
        Utils.appendOutput(`Number 1: ${mixedMap.get(1)}`);
        Utils.appendOutput(`String "1": ${mixedMap.get("1")}`);
        Utils.appendOutput(`Boolean true: ${mixedMap.get(true)}`);
        
        // Iteration methods
        Utils.addDivider('MAP ITERATION');
        
        // forEach
        Utils.appendOutput("forEach:");
        map2.forEach((value, key) => {
            Utils.appendOutput(`  ${key}: ${value}`);
        });
        
        // for...of
        Utils.appendOutput("\nfor...of (entries):");
        for (let [key, value] of map2) {
            Utils.appendOutput(`  ${key}: ${value}`);
        }
        
        // keys(), values(), entries()
        Utils.appendOutput("\nkeys():", Array.from(map2.keys()));
        Utils.appendOutput("values():", Array.from(map2.values()));
        Utils.appendOutput("entries():", Array.from(map2.entries()));
        
        // Map vs Object
        Utils.addDivider('MAP VS OBJECT');
        Utils.appendOutput("Map advantages:");
        Utils.appendOutput("✓ Any type as key");
        Utils.appendOutput("✓ Maintains insertion order");
        Utils.appendOutput("✓ Easy to get size");
        Utils.appendOutput("✓ Better performance for frequent additions/removals");
        
        // Clear map
        map1.clear();
        Utils.appendOutput(`\nAfter clear(), size: ${map1.size}`);
    },

    // 5.5 WeakMap
    demoWeakMap: function() {
        Utils.clearOutput();
        Utils.addDivider('WEAKMAP DEMO');
        
        const weakMap = new WeakMap();
        
        let obj1 = { id: 1 };
        let obj2 = { id: 2 };
        let obj3 = { id: 3 };
        
        // Setting values
        weakMap.set(obj1, "Private data for obj1");
        weakMap.set(obj2, "Private data for obj2");
        
        // Getting values
        Utils.appendOutput(`weakMap.get(obj1): ${weakMap.get(obj1)}`);
        Utils.appendOutput(`weakMap.get(obj2): ${weakMap.get(obj2)}`);
        Utils.appendOutput(`weakMap.get(obj3): ${weakMap.get(obj3)}`);
        
        // Checking existence
        Utils.appendOutput(`\nweakMap.has(obj1): ${weakMap.has(obj1)}`);
        Utils.appendOutput(`weakMap.has(obj2): ${weakMap.has(obj2)}`);
        
        // Deleting
        weakMap.delete(obj1);
        Utils.appendOutput(`\nAfter delete(obj1), has(obj1): ${weakMap.has(obj1)}`);
        
        // Practical use case: private data
        Utils.addDivider('PRACTICAL USE CASE - PRIVATE DATA');
        
        const _privateData = new WeakMap();
        
        class Person {
            constructor(name, age) {
                _privateData.set(this, { name, age });
            }
            
            getName() {
                return _privateData.get(this).name;
            }
            
            getAge() {
                return _privateData.get(this).age;
            }
        }
        
        const person = new Person("Alice", 25);
        Utils.appendOutput(`Person name: ${person.getName()}`);
        Utils.appendOutput(`Person age: ${person.getAge()}`);
        
        // Cannot access private data directly
        Utils.appendOutput(`Direct access: ${person.name}`); // undefined
        
        // WeakMap limitations
        Utils.addDivider('WEAKMAP LIMITATIONS');
        Utils.appendOutput("❌ Cannot iterate over WeakMap");
        Utils.appendOutput("❌ No size property");
        Utils.appendOutput("❌ Keys must be objects");
        
        try {
            weakMap.set("string", "value");
        } catch(e) {
            Utils.appendOutput(`✓ Trying to use string key: ${e.message}`, 'error');
        }
    },

    // 5.6 Iterables
    demoIterables: function() {
        Utils.clearOutput();
        Utils.addDivider('ITERABLES DEMO');
        
        // Built-in iterables
        Utils.appendOutput("Built-in iterables:");
        
        // Array
        const array = [1, 2, 3];
        Utils.appendOutput(`  Array: ${[...array]}`);
        
        // String
        const string = "Hello";
        Utils.appendOutput(`  String: ${[...string]}`);
        
        // Map
        const map = new Map([['a', 1], ['b', 2]]);
        Utils.appendOutput(`  Map: ${[...map]}`);
        
        // Set
        const set = new Set([1, 2, 3, 3]);
        Utils.appendOutput(`  Set: ${[...set]}`);
        
        // Creating custom iterable
        Utils.addDivider('CUSTOM ITERABLE');
        
        const range = {
            start: 1,
            end: 5,
            [Symbol.iterator]() {
                let current = this.start;
                const end = this.end;
                
                return {
                    next() {
                        if (current <= end) {
                            return { value: current++, done: false };
                        }
                        return { done: true };
                    }
                };
            }
        };
        
        Utils.appendOutput("Range 1-5:");
        for (let num of range) {
            Utils.appendOutput(`  ${num}`);
        }
        
        // Fibonacci sequence as iterable
        const fibonacci = {
            [Symbol.iterator]() {
                let prev = 0, curr = 1;
                return {
                    next() {
                        [prev, curr] = [curr, prev + curr];
                        return { value: curr, done: false };
                    }
                };
            }
        };
        
        Utils.appendOutput("\nFirst 5 Fibonacci numbers:");
        let count = 0;
        for (let num of fibonacci) {
            if (count++ >= 5) break;
            Utils.appendOutput(`  ${num}`);
        }
        
        // Making object iterable
        Utils.addDivider('MAKING OBJECTS ITERABLE');
        
        const person = {
            name: "John",
            age: 30,
            city: "New York",
            
            [Symbol.iterator]() {
                const properties = Object.entries(this);
                let index = 0;
                
                return {
                    next: () => {
                        if (index < properties.length) {
                            return { value: properties[index++], done: false };
                        }
                        return { done: true };
                    }
                };
            }
        };
        
        Utils.appendOutput("Iterating over person object:");
        for (let [key, value] of person) {
            Utils.appendOutput(`  ${key}: ${value}`);
        }
    },

    // 5.7 TypedArray
    demoTypedArray: function() {
        Utils.clearOutput();
        Utils.addDivider('TYPEDARRAY DEMO');
        
        // Different TypedArray types
        Utils.appendOutput("TypedArray types:");
        
        const int8 = new Int8Array([127, -128, 100]);
        Utils.appendOutput(`Int8Array: ${int8}`);
        
        const uint8 = new Uint8Array([255, 0, 128]);
        Utils.appendOutput(`Uint8Array: ${uint8}`);
        
        const int16 = new Int16Array([32767, -32768, 10000]);
        Utils.appendOutput(`Int16Array: ${int16}`);
        
        const uint16 = new Uint16Array([65535, 0, 32768]);
        Utils.appendOutput(`Uint16Array: ${uint16}`);
        
        const int32 = new Int32Array([2147483647, -2147483648, 1000000]);
        Utils.appendOutput(`Int32Array: ${int32}`);
        
        const float32 = new Float32Array([3.14, -2.5, 1.618]);
        Utils.appendOutput(`Float32Array: ${float32}`);
        
        const float64 = new Float64Array([3.14159265359, 2.71828]);
        Utils.appendOutput(`Float64Array: ${float64}`);
        
        // Creating from ArrayBuffer
        Utils.addDivider('FROM ARRAYBUFFER');
        
        const buffer = new ArrayBuffer(16);
        const view = new Int32Array(buffer);
        view[0] = 42;
        view[1] = 100;
        
        Utils.appendOutput(`Int32Array from buffer: ${view}`);
        Utils.appendOutput(`Length: ${view.length}`);
        Utils.appendOutput(`ByteLength: ${view.byteLength}`);
        
        // TypedArray methods
        Utils.addDivider('TYPEDARRAY METHODS');
        
        const arr = new Int32Array([5, 2, 8, 1, 9, 3]);
        Utils.appendOutput(`Original: ${arr}`);
        
        // map
        const doubled = arr.map(x => x * 2);
        Utils.appendOutput(`map(x2): ${doubled}`);
        
        // filter
        const filtered = arr.filter(x => x > 4);
        Utils.appendOutput(`filter(x > 4): ${filtered}`);
        
        // reduce
        const sum = arr.reduce((acc, x) => acc + x, 0);
        Utils.appendOutput(`reduce(sum): ${sum}`);
        
        // sort
        const sorted = new Int32Array([...arr].sort((a,b) => a - b));
        Utils.appendOutput(`sorted: ${sorted}`);
        
        // subarray
        const sub = arr.subarray(1, 4);
        Utils.appendOutput(`subarray(1,4): ${sub}`);
        
        // TypedArray vs regular Array
        Utils.addDivider('TYPEDARRAY VS REGULAR ARRAY');
        Utils.appendOutput("TypedArray advantages:");
        Utils.appendOutput("✓ Fixed type - better performance");
        Utils.appendOutput("✓ Direct memory access");
        Utils.appendOutput("✓ Ideal for binary data");
        Utils.appendOutput("\nLimitations:");
        Utils.appendOutput("❌ Fixed length");
        Utils.appendOutput("❌ No push/pop/unshift/shift");
        Utils.appendOutput("❌ All elements same type");
    }
};