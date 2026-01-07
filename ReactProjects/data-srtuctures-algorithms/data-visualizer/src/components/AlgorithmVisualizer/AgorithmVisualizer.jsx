// src/components/AlgorithmVisualizer/AlgorithmVisualizer.jsx
import { useState, useEffect } from 'react';
import '../../styles/AlgorithmVisualizer.css';

const AlgorithmVisualizer = ({ algorithm }) => {
  const [array, setArray] = useState([64, 34, 25, 12, 22, 11, 90]);
  const [currentStep, setCurrentStep] = useState(0);
  const [isSorting, setIsSorting] = useState(false);
  const [speed, setSpeed] = useState(500);
  const [comparisons, setComparisons] = useState(0);
  const [swaps, setSwaps] = useState(0);

  const bubbleSortStep = (arr, step) => {
    const newArr = [...arr];
    let comp = 0;
    let swap = 0;

    for (let i = 0; i < newArr.length - step - 1; i++) {
      comp++;
      if (newArr[i] > newArr[i + 1]) {
        [newArr[i], newArr[i + 1]] = [newArr[i + 1], newArr[i]];
        swap++;
      }
    }

    setComparisons(comparisons + comp);
    setSwaps(swaps + swap);
    return newArr;
  };

  const quickSortStep = (arr, low, high) => {
    // Simplified quicksort visualization
    const pivot = arr[high];
    let i = low - 1;

    for (let j = low; j < high; j++) {
      if (arr[j] < pivot) {
        i++;
        [arr[i], arr[j]] = [arr[j], arr[i]];
      }
    }
    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
    return i + 1;
  };

  const startSorting = () => {
    setIsSorting(true);
    setComparisons(0);
    setSwaps(0);
  };

  const reset = () => {
    setIsSorting(false);
    setCurrentStep(0);
    setArray([64, 34, 25, 12, 22, 11, 90]);
  };

  useEffect(() => {
    if (isSorting && currentStep < array.length) {
      const timer = setTimeout(() => {
        const newArray = bubbleSortStep(array, currentStep);
        setArray(newArray);
        setCurrentStep(currentStep + 1);
      }, speed);

      return () => clearTimeout(timer);
    } else if (currentStep >= array.length) {
      setIsSorting(false);
    }
  }, [isSorting, currentStep, array, speed]);

  return (
    <div className="algorithm-visualizer">
      <h3>{algorithm === 'bubble' ? 'Bubble Sort' : 'Quick Sort'}</h3>
      
      <div className="visualization-container">
        <div className="array-bars">
          {array.map((value, index) => {
            let barClass = 'array-bar';
            if (algorithm === 'bubble' && index >= array.length - currentStep) {
              barClass += ' sorted';
            }
            return (
              <div
                key={index}
                className={barClass}
                style={{
                  height: `${value * 3}px`,
                  width: `${40}px`
                }}
              >
                <span className="bar-value">{value}</span>
              </div>
            );
          })}
        </div>
      </div>

      <div className="algorithm-stats">
        <div className="stat">
          <span className="stat-label">Comparisons:</span>
          <span className="stat-value">{comparisons}</span>
        </div>
        <div className="stat">
          <span className="stat-label">Swaps:</span>
          <span className="stat-value">{swaps}</span>
        </div>
        <div className="stat">
          <span className="stat-label">Time Complexity:</span>
          <span className="stat-value">O(n²)</span>
        </div>
      </div>

      <div className="algorithm-controls">
        <button onClick={startSorting} disabled={isSorting}>
          {isSorting ? 'Sorting...' : 'Start Sorting'}
        </button>
        <button onClick={reset} disabled={isSorting}>
          Reset
        </button>
        <div className="speed-control">
          <label>Speed:</label>
          <input
            type="range"
            min="100"
            max="1000"
            value={speed}
            onChange={(e) => setSpeed(e.target.value)}
            disabled={isSorting}
          />
          <span>{1000 - speed}ms</span>
        </div>
      </div>

      <div className="algorithm-explanation">
        <h4>How it works:</h4>
        <p>
          {algorithm === 'bubble' 
            ? 'Bubble Sort repeatedly steps through the list, compares adjacent elements and swaps them if they are in the wrong order.'
            : 'Quick Sort is a divide-and-conquer algorithm that picks an element as pivot and partitions the array around the pivot.'
          }
        </p>
      </div>
    </div>
  );
};

export default AlgorithmVisualizer;