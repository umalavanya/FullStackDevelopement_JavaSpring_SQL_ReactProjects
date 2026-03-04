(function () {
            // grab display element
            const display = document.getElementById('calc-display');

            // calculator state
            let currentInput = '0';           // what's shown on display
            let previousOperand = null;
            let currentOperator = null;
            let shouldResetDisplay = false;   // after operator or equals, next digit starts fresh

            // helper to update the input field
            function updateDisplay(value) {
                display.value = value.slice(0, 12); // limit length to avoid overflow
            }

            // reset everything (like AC, but we have CE – we use CE as clear entry / clear all)
            function allClear() {
                currentInput = '0';
                previousOperand = null;
                currentOperator = null;
                shouldResetDisplay = false;
                updateDisplay(currentInput);
            }

            // clear entry (CE) : if there's an operator pending, reset current input; else full reset
            function clearEntry() {
                if (currentOperator !== null && previousOperand !== null) {
                    // just reset current input to 0, keep operator & previous
                    currentInput = '0';
                    shouldResetDisplay = true;   // next number will overwrite
                } else {
                    // if no operator, behaves like all clear
                    allClear();
                }
                updateDisplay(currentInput);
            }

            // handle number / decimal input (but we don't have '.' button – still prepared)
            function inputDigit(digit) {
                if (shouldResetDisplay) {
                    currentInput = digit;        // replace
                    shouldResetDisplay = false;
                } else {
                    // avoid multiple leading zeros (keep at least one zero)
                    if (currentInput === '0' && digit === '0') return; // keep single zero
                    if (currentInput === '0' && digit !== '0') {
                        currentInput = digit;
                    } else {
                        currentInput += digit;
                    }
                }
                updateDisplay(currentInput);
            }

            // operator handler (×, +, −, ÷)
            function handleOperator(nextOperator) {
                // convert displayed string to number
                const inputValue = parseFloat(currentInput);

                // avoid NaN if somehow empty
                if (isNaN(inputValue)) {
                    // reset
                    currentInput = '0';
                    updateDisplay(currentInput);
                    return;
                }

                // if there's already a pending operator and previous operand, calculate first
                if (currentOperator !== null && previousOperand !== null && !shouldResetDisplay) {
                    // perform pending operation
                    const result = calculate(previousOperand, inputValue, currentOperator);
                    if (result === 'ERROR') {
                        allClear();
                        display.value = 'Err';
                        return;
                    }
                    previousOperand = result;
                    currentInput = String(result);
                    updateDisplay(currentInput);
                } else if (previousOperand === null) {
                    // no previous operand, store the current one
                    previousOperand = inputValue;
                } else {
                    // if shouldResetDisplay was true, we keep previous operand unchanged
                    // but still need to update operator
                }

                // in all cases, set new operator and mark that next digit should reset display
                currentOperator = nextOperator;
                shouldResetDisplay = true;
            }

            // calculation helper
            function calculate(a, b, operator) {
                let result;
                switch (operator) {
                    case '+':
                        result = a + b;
                        break;
                    case '−':
                        result = a - b;
                        break;
                    case '×':
                        result = a * b;
                        break;
                    case '÷':
                        if (b === 0) {
                            return 'ERROR';   // division by zero
                        }
                        result = a / b;
                        break;
                    default:
                        return b;   // fallback
                }
                // round to avoid long floating points (max 8 decimals)
                return Math.round(result * 1e8) / 1e8;
            }

            // equals button
            function handleEquals() {
                if (currentOperator === null || previousOperand === null || shouldResetDisplay) {
                    // incomplete expression: just show current input, no crash
                    return;
                }

                const inputValue = parseFloat(currentInput);
                if (isNaN(inputValue)) return;

                const result = calculate(previousOperand, inputValue, currentOperator);
                if (result === 'ERROR') {
                    allClear();
                    display.value = 'Err';
                    return;
                }

                // display result
                currentInput = String(result);
                updateDisplay(currentInput);

                // after equals, set previousOperand to result, but clear operator so next op starts fresh
                previousOperand = result;
                currentOperator = null;
                shouldResetDisplay = true;   // next digit will overwrite
            }

            // listen to all key clicks
            document.querySelectorAll('.key').forEach(button => {
                button.addEventListener('click', (e) => {
                    const value = button.getAttribute('data-value');

                    // handle different key types
                    if (!isNaN(parseInt(value)) || value === '0') {   // numeric (0-9)
                        inputDigit(value);
                    }
                    else if (value === 'CE') {
                        clearEntry();
                    }
                    else if (value === '=') {
                        handleEquals();
                    }
                    else if (value === '×' || value === '+' || value === '−' || value === '÷') {
                        handleOperator(value);
                    }
                    // (no decimal point in this layout, but just in case)
                    else if (value === '.') {
                        // not used in this layout, but we can ignore
                    }
                });
            });

            // optional: keyboard support (not required, but nice)
            window.addEventListener('keydown', (e) => {
                const key = e.key;
                if (/^[0-9]$/.test(key)) {
                    e.preventDefault();
                    inputDigit(key);
                } else if (key === '+' || key === '-') {
                    e.preventDefault();
                    // map '-' to '−' for consistency
                    handleOperator(key === '-' ? '−' : '+');
                } else if (key === '*' || key.toLowerCase() === 'x') {
                    e.preventDefault();
                    handleOperator('×');
                } else if (key === '/') {
                    e.preventDefault();
                    handleOperator('÷');
                } else if (key === 'Enter' || key === '=') {
                    e.preventDefault();
                    handleEquals();
                } else if (key === 'Escape' || key === 'c' || key === 'C') {
                    e.preventDefault();
                    allClear();
                } else if (key === 'Backspace') {
                    // not part of spec, but we treat as CE? not exactly, but we ignore to keep simple.
                }
            });

            // initial display
            updateDisplay('0');
        })();