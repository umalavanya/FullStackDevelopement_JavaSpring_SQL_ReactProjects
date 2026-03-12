// MODULE 1: CONTROL FLOW - if...else, switch, break, continue

const ControlFlowModule = {
    // 1.1 Basic if statement
    demoIfStatement: function() {
        Utils.clearOutput();
        Utils.addDivider('IF STATEMENT DEMO');
        
        let age = 20;
        Utils.appendOutput(`Age: ${age}`);
        
        if (age > 18) {
            Utils.appendOutput("✅ Qualifies for driving (age > 18)", 'success');
        }
        
        // Try with different values
        age = 15;
        Utils.appendOutput(`\nAge: ${age}`);
        if (age > 18) {
            Utils.appendOutput("✅ Qualifies for driving", 'success');
        } else {
            Utils.appendOutput("❌ Does NOT qualify for driving", 'error');
        }
    },

    // 1.2 if...else ladder
    demoIfElseLadder: function() {
        Utils.clearOutput();
        Utils.addDivider('IF...ELSE LADDER DEMO');
        
        const marks = 85;
        Utils.appendOutput(`Student Marks: ${marks}`);
        
        let grade;
        if (marks >= 90) {
            grade = 'A+';
            Utils.appendOutput("Grade: A+ (Excellent!)", 'success');
        } else if (marks >= 80) {
            grade = 'A';
            Utils.appendOutput("Grade: A (Very Good!)", 'success');
        } else if (marks >= 70) {
            grade = 'B';
            Utils.appendOutput("Grade: B (Good)", 'success');
        } else if (marks >= 60) {
            grade = 'C';
            Utils.appendOutput("Grade: C (Average)", 'success');
        } else if (marks >= 50) {
            grade = 'D';
            Utils.appendOutput("Grade: D (Pass)", 'success');
        } else {
            grade = 'F';
            Utils.appendOutput("Grade: F (Fail)", 'error');
        }
    },

    // 1.3 Switch Case Statement
    demoSwithCase: function() {
        Utils.clearOutput();
        Utils.addDivider('SWITCH CASE DEMO');
        
        const day = new Date().getDay(); // 0-6 (Sunday = 0)
        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        
        Utils.appendOutput(`Today is: ${days[day]}`);
        
        switch(day) {
            case 0:
            case 6:
                Utils.appendOutput("🎉 It's Weekend! Time to relax!", 'success');
                break;
            case 1:
                Utils.appendOutput("😊 Monday - Start of the week", 'normal');
                break;
            case 2:
            case 3:
            case 4:
                Utils.appendOutput("💼 Weekday - Keep working!", 'normal');
                break;
            case 5:
                Utils.appendOutput("🎊 Friday - Almost weekend!", 'success');
                break;
            default:
                Utils.appendOutput("Invalid day!", 'error');
        }
        
        // Demo without break (fall-through)
        Utils.addDivider('SWITCH WITHOUT BREAK (FALL-THROUGH)');
        let book = 'maths';
        Utils.appendOutput(`Book: ${book}`);
        
        switch(book) {
            case 'history':
                Utils.appendOutput("History Book");
            case 'maths':
                Utils.appendOutput("Maths Book");
            case 'economics':
                Utils.appendOutput("Economics Book");
            default:
                Utils.appendOutput("Unknown Book");
        }
        Utils.appendOutput("Notice: All cases after 'maths' executed due to missing break!");
    },

    // 1.4 Break Statement Demo
    demoBreak: function() {
        Utils.clearOutput();
        Utils.addDivider('BREAK STATEMENT DEMO');
        
        Utils.appendOutput("Loop from 1 to 10, break at 5:");
        for (let i = 1; i <= 10; i++) {
            if (i === 5) {
                Utils.appendOutput(`⚠️ Break at ${i}`, 'error');
                break;
            }
            Utils.appendOutput(`Iteration: ${i}`);
        }
        
        Utils.appendOutput("\nLoop stopped after break!");
    },

    // 1.5 Continue Statement Demo
    demoContinue: function() {
        Utils.clearOutput();
        Utils.addDivider('CONTINUE STATEMENT DEMO');
        
        Utils.appendOutput("Loop from 1 to 10, skip number 5:");
        for (let i = 1; i <= 10; i++) {
            if (i === 5) {
                Utils.appendOutput(`⏭️ Skipping ${i}`, 'error');
                continue;
            }
            Utils.appendOutput(`Iteration: ${i}`);
        }
    },

    // 1.6 Nested if-else with break/continue
    demoNestedControl: function() {
        Utils.clearOutput();
        Utils.addDivider('NESTED CONTROL FLOW DEMO');
        
        let matrix = [
            [1, 2, 3, 4],
            [5, 6, 7, 8],
            [9, 10, 11, 12]
        ];
        
        Utils.appendOutput("Searching for number 7 in matrix...");
        
        outerloop: // Label for break
        for (let i = 0; i < matrix.length; i++) {
            for (let j = 0; j < matrix[i].length; j++) {
                Utils.appendOutput(`Checking matrix[${i}][${j}] = ${matrix[i][j]}`);
                
                if (matrix[i][j] === 7) {
                    Utils.appendOutput(`✅ Found 7 at position [${i}][${j}]!`, 'success');
                    break outerloop; // Break outer loop using label
                }
                
                if (matrix[i][j] % 2 === 0) {
                    Utils.appendOutput(`   Even number found, continuing...`);
                    continue;
                }
            }
        }
    }
};