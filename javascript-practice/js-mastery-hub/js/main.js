// Main application controller

// Current active topic
let currentTopic = 'control-flow';

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    Utils.clearOutput();
    Utils.appendOutput("🚀 JavaScript Mastery Hub initialized!", 'success');
    Utils.appendOutput("Click on any topic button to explore JavaScript concepts.");
    Utils.appendOutput("Each demo will show you practical implementations with explanations.");
    
    // Show initial demo
    showTopic('control-flow');
});

// Function to show selected topic
function showTopic(topic) {
    currentTopic = topic;
    
    const demoContent = document.getElementById('demo-content');
    Utils.clearOutput();
    
    switch(topic) {
        case 'control-flow':
            demoContent.innerHTML = createControlFlowDemo();
            break;
        case 'loops':
            demoContent.innerHTML = createLoopsDemo();
            break;
        case 'functions':
            demoContent.innerHTML = createFunctionsDemo();
            break;
        case 'objects':
            demoContent.innerHTML = createObjectsDemo();
            break;
        case 'advanced':
            demoContent.innerHTML = createAdvancedDemo();
            break;
        case 'es6':
            demoContent.innerHTML = createES6Demo();
            break;
    }
}

// Demo content creators
function createControlFlowDemo() {
    return `
        <div class="card">
            <h3>Control Flow Demos</h3>
            <p>Click buttons below to see different control flow concepts in action:</p>
            
            <button class="btn" onclick="ControlFlowModule.demoIfStatement()">If Statement</button>
            <button class="btn" onclick="ControlFlowModule.demoIfElseLadder()">If-Else Ladder</button>
            <button class="btn" onclick="ControlFlowModule.demoSwithCase()">Switch Case</button>
            <button class="btn" onclick="ControlFlowModule.demoBreak()">Break Statement</button>
            <button class="btn" onclick="ControlFlowModule.demoContinue()">Continue Statement</button>
            <button class="btn" onclick="ControlFlowModule.demoNestedControl()">Nested Control</button>
            
            <pre><code>
// Example: If statement
let age = 20;
if (age > 18) {
    console.log("Qualifies for driving");
}

// Example: Switch case
switch(day) {
    case 0:
    case 6:
        console.log("Weekend!");
        break;
    default:
        console.log("Weekday");
}
            </code></pre>
        </div>
    `;
}

function createLoopsDemo() {
    return `
        <div class="card">
            <h3>Loop Demos</h3>
            <p>Explore different types of loops in JavaScript:</p>
            
            <button class="btn" onclick="LoopsModule.demoWhileLoop()">While Loop</button>
            <button class="btn" onclick="LoopsModule.demoDoWhileLoop()">Do-While Loop</button>
            <button class="btn" onclick="LoopsModule.demoForLoop()">For Loop</button>
            <button class="btn" onclick="LoopsModule.demoForInLoop()">For...In Loop</button>
            <button class="btn" onclick="LoopsModule.demoForOfLoop()">For...Of Loop</button>
            <button class="btn" onclick="LoopsModule.demoNestedLoops()">Nested Loops</button>
            <button class="btn" onclick="LoopsModule.demoLoopLabels()">Loop Labels</button>
            <button class="btn" onclick="LoopsModule.demoCustomIterators()">Custom Iterators</button>
            
            <pre><code>
// While loop
let i = 0;
while (i < 5) {
    console.log(i);
    i++;
}

// For loop
for (let j = 0; j < 5; j++) {
    console.log(j);
}

// For...of with array
for (let item of array) {
    console.log(item);
}
            </code></pre>
        </div>
    `;
}

function createFunctionsDemo() {
    return `
        <div class="card">
            <h3>Function Demos</h3>
            <p>Master JavaScript functions:</p>
            
            <button class="btn" onclick="FunctionsModule.demoFunctionDeclarations()">Function Declarations</button>
            <button class="btn" onclick="FunctionsModule.demoArrowFunctions()">Arrow Functions</button>
            <button class="btn" onclick="FunctionsModule.demoFunctionParameters()">Function Parameters</button>
            <button class="btn" onclick="FunctionsModule.demoReturnStatement()">Return Statement</button>
            <button class="btn" onclick="FunctionsModule.demoFunctionInvocation()">Function Invocation</button>
            <button class="btn" onclick="FunctionsModule.demoConstructorFunctions()">Constructor Functions</button>
            <button class="btn" onclick="FunctionsModule.demoIIFE()">IIFE</button>
            <button class="btn" onclick="FunctionsModule.demoClosures()">Closures</button>
            <button class="btn" onclick="FunctionsModule.demoHoisting()">Hoisting</button>
            <button class="btn" onclick="FunctionsModule.demoSmarParameters()">Smart Parameters</button>
            
            <pre><code>
// Arrow function
const add = (a, b) => a + b;

// Closure example
function counter() {
    let count = 0;
    return function() {
        return ++count;
    };
}

// Default parameters
function greet(name = "Guest") {
    return \`Hello, \${name}\`;
}
            </code></pre>
        </div>
    `;
}

function createObjectsDemo() {
    return `
        <div class="card">
            <h3>Object Demos</h3>
            <p>Explore JavaScript built-in objects:</p>
            
            <button class="btn" onclick="ObjectsModule.demoNumberObject()">Number Object</button>
            <button class="btn" onclick="ObjectsModule.demoBooleanObject()">Boolean Object</button>
            <button class="btn" onclick="ObjectsModule.demoStringObject()">String Object</button>
            <button class="btn" onclick="ObjectsModule.demoArrayObject()">Array Object</button>
            <button class="btn" onclick="ObjectsModule.demoDateObject()">Date Object</button>
            <button class="btn" onclick="ObjectsModule.demoMathObject()">Math Object</button>
            <button class="btn" onclick="ObjectsModule.demoVariableScope()">Variable Scope</button>
            <button class="btn" onclick="ObjectsModule.demoGlobalVariables()">Global Variables</button>
            <button class="btn" onclick="ObjectsModule.demoDataView()">DataView</button>
            
            <pre><code>
// Number methods
let num = 123.456;
num.toFixed(2); // "123.46"

// String methods
"hello".toUpperCase(); // "HELLO"

// Array methods
[1,2,3].map(x => x * 2); // [2,4,6]
            </code></pre>
        </div>
    `;
}

function createAdvancedDemo() {
    return `
        <div class="card">
            <h3>Advanced Concepts</h3>
            <p>Deep dive into advanced JavaScript:</p>
            
            <button class="btn" onclick="AdvancedModule.demoRegularExpressions()">Regular Expressions</button>
            <button class="btn" onclick="AdvancedModule.demoSets()">Set Object</button>
            <button class="btn" onclick="AdvancedModule.demoWeakSet()">WeakSet</button>
            <button class="btn" onclick="AdvancedModule.demoMaps()">Map Object</button>
            <button class="btn" onclick="AdvancedModule.demoWeakMap()">WeakMap</button>
            <button class="btn" onclick="AdvancedModule.demoIterables()">Iterables</button>
            <button class="btn" onclick="AdvancedModule.demoTypedArray()">TypedArray</button>
            
            <pre><code>
// Regular Expression
const emailRegex = /^[^@]+@[^@]+\.[^@]+$/;

// Set
const unique = new Set([1,2,2,3]); // {1,2,3}

// Map
const map = new Map();
map.set('key', 'value');
            </code></pre>
        </div>
    `;
}

function createES6Demo() {
    return `
        <div class="card">
            <h3>ES6+ Features</h3>
            <p>Modern JavaScript features:</p>
            
            <button class="btn" onclick="ES6Module.demoSymbol()">Symbol</button>
            <button class="btn" onclick="ES6Module.demoTemplateLiterals()">Template Literals</button>
            <button class="btn" onclick="ES6Module.demoTaggedTemplates()">Tagged Templates</button>
            <button class="btn" onclick="ES6Module.demoReflect()">Reflect Object</button>
            <button class="btn" onclick="ES6Module.demoCompleteES6()">Complete ES6 Demo</button>
            
            <pre><code>
// Symbol
const sym = Symbol('description');

// Template Literals
const name = 'John';
const greeting = \`Hello, \${name}!\`;

// Tagged Template
function tag(strings, ...values) {
    return strings[0] + values.map(v => v.toUpperCase()).join('');
}
            </code></pre>
        </div>
    `;
}

// Keyboard shortcuts
document.addEventListener('keydown', function(e) {
    if (e.ctrlKey && e.key >= '1' && e.key <= '6') {
        const topics = ['control-flow', 'loops', 'functions', 'objects', 'advanced', 'es6'];
        showTopic(topics[parseInt(e.key) - 1]);
    }
});

// Export for module usage (if using modules)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        showTopic,
        currentTopic
    };
}