import React, { useState, useEffect, useCallback, useRef } from 'react';
import Display from './Display';
import Keypad from './Keypad';
import ScientificFunctions from './ScientificFunctions';
import './Calculator.css';
import { evaluateExpression, formatDisplay } from '../utils/calculatorLogic';

function Calculator() {
  const [displayValue, setDisplayValue] = useState('0');
  const [history, setHistory] = useState('');
  const [expression, setExpression] = useState('');
  const [lastResult, setLastResult] = useState(null);
  const [isRadians, setIsRadians] = useState(true);
  const [buttonPressed, setButtonPressed] = useState(null);
  const [displayAnimation, setDisplayAnimation] = useState('');
  const [memory, setMemory] = useState(0);
  const [showMemoryIndicator, setShowMemoryIndicator] = useState(false);
  const displayRef = useRef(null);

  // Handle keyboard input
  const handleKeyPress = useCallback((event) => {
    const key = event.key;
    
    // Map keyboard keys to calculator buttons
    const keyMap = {
      '0': '0', '1': '1', '2': '2', '3': '3', '4': '4',
      '5': '5', '6': '6', '7': '7', '8': '8', '9': '9',
      '.': '.', '+': '+', '-': '−', '*': '×', '/': '÷',
      '%': '%', '(': '(', ')': ')', 'Enter': '=', '=': '=',
      'Escape': 'C', 'Backspace': '⌫', '^': '^', '!': '!',
      'm': 'MR', 'M': 'MR'
    };

    if (keyMap[key]) {
      event.preventDefault();
      handleButtonClick(keyMap[key]);
    }

    // Memory functions with Ctrl/Cmd
    if (event.ctrlKey || event.metaKey) {
      switch(key.toLowerCase()) {
        case 'm':
          event.preventDefault();
          handleMemoryOperation('MC');
          break;
        case 'p':
          event.preventDefault();
          handleMemoryOperation('M+');
          break;
        case 'l':
          event.preventDefault();
          handleMemoryOperation('M-');
          break;
      }
    }
  }, [displayValue]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [handleKeyPress]);

  // Memory functions
  const handleMemoryOperation = (operation) => {
    try {
      const currentValue = parseFloat(displayValue);
      switch(operation) {
        case 'MC':
          setMemory(0);
          setShowMemoryIndicator(false);
          break;
        case 'MR':
          setDisplayValue(formatDisplay(memory));
          setButtonPressed('MR');
          setTimeout(() => setButtonPressed(null), 200);
          break;
        case 'M+':
          setMemory(prev => prev + currentValue);
          setShowMemoryIndicator(true);
          break;
        case 'M-':
          setMemory(prev => prev - currentValue);
          setShowMemoryIndicator(true);
          break;
        case 'MS':
          setMemory(currentValue);
          setShowMemoryIndicator(true);
          break;
      }
    } catch (error) {
      console.error('Memory operation error:', error);
    }
  };

  const handleButtonClick = (button) => {
    setButtonPressed(button);
    setTimeout(() => setButtonPressed(null), 200);

    // Handle special cases
    if (button === 'C') {
      setDisplayValue('0');
      setHistory('');
      setExpression('');
      setLastResult(null);
      return;
    }

    if (button === '⌫') {
      if (displayValue.length > 1) {
        setDisplayValue(displayValue.slice(0, -1));
      } else {
        setDisplayValue('0');
      }
      return;
    }

    if (button === '±') {
      if (displayValue !== '0' && displayValue !== 'Error') {
        if (displayValue.startsWith('-')) {
          setDisplayValue(displayValue.slice(1));
        } else {
          setDisplayValue('-' + displayValue);
        }
      }
      return;
    }

    if (button === '=') {
      try {
        const result = evaluateExpression(displayValue, isRadians);
        setHistory(displayValue);
        setDisplayValue(formatDisplay(result));
        setLastResult(result);
        setExpression('');
        setDisplayAnimation('calculate');
      } catch (error) {
        setDisplayValue('Error');
        setExpression('');
        setDisplayAnimation('error');
        setTimeout(() => {
          if (lastResult !== null) {
            setDisplayValue(formatDisplay(lastResult));
          } else {
            setDisplayValue('0');
          }
          setDisplayAnimation('');
        }, 1000);
      }
      return;
    }

    // Handle operator buttons
    if (['+', '−', '×', '÷', '%'].includes(button)) {
      if (lastResult !== null && expression === '') {
        setDisplayValue(formatDisplay(lastResult) + button);
        setLastResult(null);
      } else if (displayValue === 'Error') {
        setDisplayValue('0' + button);
      } else {
        setDisplayValue(displayValue + button);
      }
      return;
    }

    // Handle decimal input
    if (button === '.') {
      // Check if current number already has a decimal
      const segments = displayValue.split(/[\+\−\×\÷]/);
      const lastSegment = segments[segments.length - 1];
      
      if (!lastSegment.includes('.')) {
        if (displayValue === '0' || displayValue === 'Error') {
          setDisplayValue('0.');
        } else {
          setDisplayValue(displayValue + '.');
        }
      }
      return;
    }

    // Handle number input
    if (!isNaN(button)) {
      if (displayValue === '0' || displayValue === 'Error') {
        setDisplayValue(button);
      } else if (lastResult !== null && expression === '') {
        setDisplayValue(button);
        setLastResult(null);
      } else {
        setDisplayValue(displayValue + button);
      }
      return;
    }

    // For other buttons, just append
    if (displayValue === '0' || displayValue === 'Error') {
      setDisplayValue(button);
    } else {
      setDisplayValue(displayValue + button);
    }
  };

  const handleScientificClick = (button) => {
    setButtonPressed(button);
    setTimeout(() => setButtonPressed(null), 200);
    
    let newValue = displayValue;
    let newExpression = expression;

    switch(button) {
      case 'π':
        newValue = Math.PI.toString();
        break;
      case 'e':
        newValue = Math.E.toString();
        break;
      case 'x²':
        if (displayValue !== '0' && displayValue !== 'Error') {
          newExpression = `(${displayValue})²`;
          newValue = `(${displayValue})^2`;
        }
        break;
      case '√':
        newExpression = `√(${displayValue})`;
        newValue = `sqrt(${displayValue})`;
        break;
      case '!':
        newExpression = `${displayValue}!`;
        newValue = `factorial(${displayValue})`;
        break;
      case '^':
        newValue = displayValue + '^';
        break;
      case '(':
      case ')':
        newValue = displayValue + button;
        break;
      case 'sin':
      case 'cos':
      case 'tan':
      case 'log':
      case 'ln':
      case 'sin⁻¹':
      case 'cos⁻¹':
      case 'tan⁻¹':
        newValue = displayValue === '0' || displayValue === 'Error' 
          ? `${button}(` 
          : displayValue + `${button}(`;
        newExpression = displayValue === '0' || displayValue === 'Error'
          ? `${button}(`
          : expression + `${button}(`;
        break;
      default:
        newValue = displayValue + button;
    }

    if (displayValue === '0' || displayValue === 'Error') {
      setDisplayValue(button === 'π' || button === 'e' ? newValue : button);
    } else {
      setDisplayValue(newValue);
    }
    
    if (newExpression) {
      setExpression(newExpression);
    }
  };

  const toggleAngleMode = () => {
    setIsRadians(!isRadians);
    setButtonPressed('RAD/DEG');
    setTimeout(() => setButtonPressed(null), 200);
  };

  // Update display animation when value changes
  useEffect(() => {
    if (displayValue !== '0' && displayValue !== 'Error') {
      setDisplayAnimation('slide-in');
      const timer = setTimeout(() => setDisplayAnimation(''), 300);
      return () => clearTimeout(timer);
    }
  }, [displayValue]);

  return (
    <div className="calculator">
      <div className="calculator-main">
        <div className="calculator-header">
          <div className="header-controls">
            <div 
              className={`angle-mode ${buttonPressed === 'RAD/DEG' ? 'button-press' : ''} ${isRadians ? 'active' : ''}`}
              onClick={toggleAngleMode}
              title={isRadians ? 'Switch to Degrees' : 'Switch to Radians'}
            >
              <span className="mode-icon">{isRadians ? 'π' : '°'}</span>
              <span className="mode-text">{isRadians ? 'RAD' : 'DEG'}</span>
            </div>
            {showMemoryIndicator && (
              <div className="memory-indicator" title={`Memory: ${memory}`}>
                M
              </div>
            )}
          </div>
          <div className="calculator-title">
            <span className="title-text shimmer">Scientific Calculator</span>
            <div className="title-sub">Professional Edition</div>
          </div>
        </div>
        
        <Display 
          displayValue={displayValue}
          history={history}
          expression={expression}
          animationClass={displayAnimation}
          memoryValue={memory}
          showMemory={showMemoryIndicator}
        />
        
        <div className="memory-functions">
          <button 
            className={`memory-btn ${buttonPressed === 'MC' ? 'button-press' : ''}`}
            onClick={() => handleMemoryOperation('MC')}
            title="Memory Clear"
          >
            MC
          </button>
          <button 
            className={`memory-btn ${buttonPressed === 'MR' ? 'button-press' : ''}`}
            onClick={() => handleMemoryOperation('MR')}
            title="Memory Recall"
          >
            MR
          </button>
          <button 
            className={`memory-btn ${buttonPressed === 'M+' ? 'button-press' : ''}`}
            onClick={() => handleMemoryOperation('M+')}
            title="Memory Add"
          >
            M+
          </button>
          <button 
            className={`memory-btn ${buttonPressed === 'M-' ? 'button-press' : ''}`}
            onClick={() => handleMemoryOperation('M-')}
            title="Memory Subtract"
          >
            M-
          </button>
          <button 
            className={`memory-btn ${buttonPressed === 'MS' ? 'button-press' : ''}`}
            onClick={() => handleMemoryOperation('MS')}
            title="Memory Store"
          >
            MS
          </button>
        </div>
        
        <Keypad 
          onButtonClick={handleButtonClick} 
          pressedButton={buttonPressed}
        />
      </div>
      <ScientificFunctions 
        onButtonClick={handleScientificClick}
        pressedButton={buttonPressed}
      />
    </div>
  );
}

export default Calculator;