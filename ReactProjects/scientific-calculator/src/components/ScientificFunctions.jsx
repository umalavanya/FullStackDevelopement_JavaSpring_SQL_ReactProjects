import React from 'react';
import './ScientificFunctions.css';

function ScientificFunctions({ onButtonClick }) {
  const scientificButtons = [
    ['sin', 'cos', 'tan', 'log'],
    ['π', 'e', 'x²', '√'],
    ['(', ')', '!', '^'],
    ['sin⁻¹', 'cos⁻¹', 'tan⁻¹', 'ln']
  ];

  const handleClick = (value) => {
    onButtonClick(value);
  };

  return (
    <div className="scientific-panel">
      <div className="scientific-header">
        <span>Scientific Functions</span>
      </div>
      <div className="scientific-grid">
        {scientificButtons.map((row, rowIndex) => (
          <div key={rowIndex} className="scientific-row">
            {row.map((button, colIndex) => {
              let className = 'scientific-button';
              
              if (['sin', 'cos', 'tan', 'log', 'sin⁻¹', 'cos⁻¹', 'tan⁻¹', 'ln'].includes(button)) {
                className += ' trig';
              } else if (['π', 'e'].includes(button)) {
                className += ' constant';
              } else if (['x²', '√', '!', '^'].includes(button)) {
                className += ' operation';
              } else {
                className += ' other';
              }

              return (
                <button
                  key={colIndex}
                  className={className}
                  onClick={() => handleClick(button)}
                >
                  {button}
                </button>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}

export default ScientificFunctions;