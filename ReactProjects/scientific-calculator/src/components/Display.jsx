import React, { useEffect, useState } from 'react';
import './Display.css';

function Display({ displayValue, history, expression, animationClass, memoryValue, showMemory }) {
  const [valueHistory, setValueHistory] = useState([]);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (displayValue && displayValue !== '0') {
      setValueHistory(prev => {
        const newHistory = [...prev, displayValue];
        return newHistory.slice(-3); // Keep only last 3 values
      });
      setIsAnimating(true);
      const timer = setTimeout(() => setIsAnimating(false), 300);
      return () => clearTimeout(timer);
    }
  }, [displayValue]);

  const formatNumber = (num) => {
    if (num === 'Error') return num;
    
    // Remove trailing zeros after decimal
    if (num.includes('.')) {
      return num.replace(/(\.\d*?[1-9])0+$/, '$1').replace(/\.$/, '');
    }
    return num;
  };

  return (
    <div className={`display-container ${animationClass} ${isAnimating ? 'pulse' : ''}`}>
      <div className="display-header">
        {showMemory && (
          <div className="memory-display" title={`Memory: ${memoryValue}`}>
            M: {formatNumber(memoryValue.toString().slice(0, 8))}
          </div>
        )}
        <div className="display-mode">
          {valueHistory.length > 0 && (
            <div className="history-preview">
              {valueHistory.slice(0, 2).map((val, idx) => (
                <div key={idx} className="history-item">
                  {formatNumber(val).slice(-10)}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      
      <div className="expression-section">
        <div className="history-display">
          {history ? (
            <span className="history-text shimmer">
              {formatNumber(history).slice(-30)}
            </span>
          ) : (
            <span className="placeholder">Previous calculation</span>
          )}
        </div>
        
        <div className="expression-display">
          {expression ? (
            <span className="expression-text">
              {expression}
            </span>
          ) : (
            <span className="placeholder">Enter expression</span>
          )}
        </div>
      </div>
      
      <div className="main-display-section">
        <div className="main-display-wrapper">
          <div className={`main-display ${displayValue === 'Error' ? 'error' : ''}`}>
            {displayValue === 'Error' ? (
              <div className="error-container">
                <span className="error-icon">⚠️</span>
                <span className="error-text">Error</span>
              </div>
            ) : (
              <div className="number-container">
                <span className="number-display">
                  {formatNumber(displayValue)}
                </span>
                {displayValue.length > 12 && (
                  <span className="overflow-indicator">...</span>
                )}
              </div>
            )}
          </div>
          <div className="cursor"></div>
        </div>
      </div>
      
      <div className="display-footer">
        <div className="status-bar">
          <div className="digit-count">
            {displayValue.replace(/[^0-9]/g, '').length} digits
          </div>
          <div className="expression-length">
            {expression.length} chars
          </div>
        </div>
        <div className="display-line"></div>
      </div>
    </div>
  );
}

export default Display;