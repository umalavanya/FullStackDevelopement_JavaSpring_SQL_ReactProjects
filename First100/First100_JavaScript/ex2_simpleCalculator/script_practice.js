(function () {
    // grab display element
    const display = document.getElementById('calc-display') ;
    
    
    //calculator state
    let currentInput = '0';  // what's shown on display
    let previousOperand = null;
    let currentOperator = null ;
    let shouldResetDisplay = false ;


    // helper to update the input field
    function updateDisplay(value) {
        display.value = value.slice(0,12); //limit length to avoid overflow
        
    }


})() ;
