import React, { useEffect, useState } from 'react';
import './Keypad.css';

function Keypad({ onButtonClick, pressedButton }) {
  const [rippleButtons, setRippleButtons] = useState([]);
  
  const basicButtons = [
    ['C', '⌫', '%', '÷'],
    ['7', '8', '9', '×'],
    ['4', '5', '6', '−'],
    ['1', '2', '3', '+'],
    ['0', '.', '=', '±']
  ];

  const handleClick = (value, event) => {
    if (event) {
      const rect = event.currentTarget.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      
      // Add ripple effect
      const rippleId = Date.now();
      setRippleButtons(prev => [...prev, { id: rippleId, value, x, y }]);
      setTimeout(() => {
        setRippleButtons(prev => prev.filter(r => r.id !== rippleId));
      }, 600);
    }
    
    onButtonClick(value);
  };

  // Add keyboard sound effect (optional)
  const playKeySound = () => {
    // This is a placeholder for keyboard sound
    // You can add actual sound effects if desired
    if (typeof window !== 'undefined') {
      const audioContext = new (window.AudioContext || window.webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      oscillator.frequency.value = 800;
      oscillator.type = 'sine';
      
      gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
      
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.1);
    }
  };

  const getButtonType = (button) => {
    if (['C', '⌫'].includes(button)) return 'function';
    if (['÷', '×', '−', '+', '=', '±'].includes(button)) return 'operator';
    if (button === '0') return 'number zero';
    if (!isNaN(button)) return 'number';
    return 'other';
  };

  const getButtonLabel = (button) => {
    const labels = {
      'C': 'Clear',
      '⌫': 'Backspace',
      '÷': 'Divide',
      '×': 'Multiply',
      '−': 'Subtract',
      '+': 'Add',
      '=': 'Equals',
      '±': 'Plus/Minus',
      '%': 'Percent',
      '.': 'Decimal'
    };
    return labels[button] || button;
  };

  return (
    <div className="keypad">
      {basicButtons.map((row, rowIndex) => (
        <div key={rowIndex} className="keypad-row">
          {row.map((button, colIndex) => {
            const buttonType = getButtonType(button);
            const isPressed = pressedButton === button;
            const isZero = button === '0';
            const isEquals = button === '=';
            
            let className = `keypad-button ${buttonType} ripple`;
            
            if (isPressed) {
              className += ' button-press';
              if (isEquals) className += ' bounce';
            }
            
            // Find ripple for this button
            const buttonRipples = rippleButtons.filter(r => r.value === button);

            return (
              <button
                key={colIndex}
                className={className}
                onClick={(e) => {
                  playKeySound();
                  handleClick(button, e);
                }}
                aria-label={getButtonLabel(button)}
                data-value={button}
                onMouseDown={(e) => e.currentTarget.classList.add('active')}
                onMouseUp={(e) => e.currentTarget.classList.remove('active')}
                onMouseLeave={(e) => e.currentTarget.classList.remove('active')}
              >
                {/* Ripple effects */}
                {buttonRipples.map(ripple => (
                  <span 
                    key={ripple.id}
                    className="ripple-effect"
                    style={{
                      left: ripple.x,
                      top: ripple.y
                    }}
                  />
                ))}
                
                <span className="button-content">
                  <span className="button-text">{button}</span>
                  {isZero && <span className="zero-label">zero</span>}
                  {isEquals && <span className="equals-glow"></span>}
                </span>
                
                {/* Button glow effect */}
                <span className="button-glow"></span>
                
                {/* Active state indicator */}
                {isPressed && (
                  <span className="press-indicator"></span>
                )}
              </button>
            );
          })}
        </div>
      ))}
      
      {/* Keyboard hint */}
      <div className="keyboard-hint">
        <span className="hint-icon">⌨️</span>
        <span className="hint-text">Keyboard supported</span>
      </div>
    </div>
  );
}

export default Keypad;