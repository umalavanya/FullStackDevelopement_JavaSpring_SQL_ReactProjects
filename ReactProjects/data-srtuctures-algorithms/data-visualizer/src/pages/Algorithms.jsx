// src/pages/Algorithms.jsx
import { useState } from 'react';
import AlgorithmVisualizer from '../components/AlgorithmVisualizer/AgorithmVisualizer';
import '../styles/Algorithms.css';

const Algorithms = () => {
  const [selectedAlgorithm, setSelectedAlgorithm] = useState('bubble');

  const algorithms = [
    { id: 'bubble', name: 'Bubble Sort', complexity: 'O(n²)', description: 'Simple comparison-based sorting' },
    { id: 'quick', name: 'Quick Sort', complexity: 'O(n log n)', description: 'Divide and conquer algorithm' },
    { id: 'merge', name: 'Merge Sort', complexity: 'O(n log n)', description: 'Divide and conquer with merging' },
    { id: 'insertion', name: 'Insertion Sort', complexity: 'O(n²)', description: 'Builds sorted array one item at a time' },
    { id: 'selection', name: 'Selection Sort', complexity: 'O(n²)', description: 'Repeatedly finds minimum element' },
    { id: 'linear', name: 'Linear Search', complexity: 'O(n)', description: 'Sequentially checks each element' },
    { id: 'binary', name: 'Binary Search', complexity: 'O(log n)', description: 'Search in sorted array by dividing' },
    { id: 'bfs', name: 'BFS', complexity: 'O(V+E)', description: 'Breadth First Search for graphs' },
    { id: 'dfs', name: 'DFS', complexity: 'O(V+E)', description: 'Depth First Search for graphs' },
  ];

  const algorithmInfo = {
    bubble: {
      bestCase: 'O(n)',
      averageCase: 'O(n²)',
      worstCase: 'O(n²)',
      spaceComplexity: 'O(1)',
      description: 'Bubble Sort is a simple sorting algorithm that repeatedly steps through the list, compares adjacent elements and swaps them if they are in the wrong order.',
      applications: 'Educational purposes, small datasets'
    },
    quick: {
      bestCase: 'O(n log n)',
      averageCase: 'O(n log n)',
      worstCase: 'O(n²)',
      spaceComplexity: 'O(log n)',
      description: 'Quick Sort is a divide-and-conquer algorithm. It works by selecting a "pivot" element and partitioning the array around the pivot.',
      applications: 'Large datasets, in-place sorting'
    },
    merge: {
      bestCase: 'O(n log n)',
      averageCase: 'O(n log n)',
      worstCase: 'O(n log n)',
      spaceComplexity: 'O(n)',
      description: 'Merge Sort is a stable, divide-and-conquer algorithm that divides the array into halves, sorts them, and merges them back.',
      applications: 'Linked lists, external sorting'
    }
  };

  return (
    <div className="algorithms-page">
      <h1>Algorithms Visualizer</h1>
      
      <div className="algorithms-container">
        <div className="algorithms-sidebar">
          <h3>Select Algorithm</h3>
          <div className="algorithm-categories">
            <h4>Sorting Algorithms</h4>
            {algorithms.slice(0, 5).map(algo => (
              <div
                key={algo.id}
                className={`algorithm-card ${selectedAlgorithm === algo.id ? 'active' : ''}`}
                onClick={() => setSelectedAlgorithm(algo.id)}
              >
                <div className="algorithm-header">
                  <h4>{algo.name}</h4>
                  <span className="complexity-badge">{algo.complexity}</span>
                </div>
                <p className="algorithm-desc">{algo.description}</p>
              </div>
            ))}
            
            <h4>Search Algorithms</h4>
            {algorithms.slice(5, 7).map(algo => (
              <div
                key={algo.id}
                className={`algorithm-card ${selectedAlgorithm === algo.id ? 'active' : ''}`}
                onClick={() => setSelectedAlgorithm(algo.id)}
              >
                <div className="algorithm-header">
                  <h4>{algo.name}</h4>
                  <span className="complexity-badge">{algo.complexity}</span>
                </div>
                <p className="algorithm-desc">{algo.description}</p>
              </div>
            ))}
            
            <h4>Graph Algorithms</h4>
            {algorithms.slice(7).map(algo => (
              <div
                key={algo.id}
                className={`algorithm-card ${selectedAlgorithm === algo.id ? 'active' : ''}`}
                onClick={() => setSelectedAlgorithm(algo.id)}
              >
                <div className="algorithm-header">
                  <h4>{algo.name}</h4>
                  <span className="complexity-badge">{algo.complexity}</span>
                </div>
                <p className="algorithm-desc">{algo.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="algorithm-main">
          <div className="algorithm-visualization">
            <AlgorithmVisualizer algorithm={selectedAlgorithm} />
          </div>
          
          <div className="algorithm-details">
            <h3>Algorithm Details</h3>
            {algorithmInfo[selectedAlgorithm] && (
              <div className="details-content">
                <div className="complexity-grid">
                  <div className="complexity-item">
                    <span className="label">Best Case:</span>
                    <span className="value best">{algorithmInfo[selectedAlgorithm].bestCase}</span>
                  </div>
                  <div className="complexity-item">
                    <span className="label">Average Case:</span>
                    <span className="value average">{algorithmInfo[selectedAlgorithm].averageCase}</span>
                  </div>
                  <div className="complexity-item">
                    <span className="label">Worst Case:</span>
                    <span className="value worst">{algorithmInfo[selectedAlgorithm].worstCase}</span>
                  </div>
                  <div className="complexity-item">
                    <span className="label">Space Complexity:</span>
                    <span className="value space">{algorithmInfo[selectedAlgorithm].spaceComplexity}</span>
                  </div>
                </div>
                
                <div className="algorithm-description">
                  <h4>How it works:</h4>
                  <p>{algorithmInfo[selectedAlgorithm].description}</p>
                </div>
                
                <div className="algorithm-applications">
                  <h4>Applications:</h4>
                  <p>{algorithmInfo[selectedAlgorithm].applications}</p>
                </div>
                
                <div className="pseudocode">
                  <h4>Pseudocode:</h4>
                  <pre>
                    {selectedAlgorithm === 'bubble' && 
`procedure bubbleSort(A : list)
    n = length(A)
    for i from 0 to n-1
        for j from 0 to n-i-2
            if A[j] > A[j+1]
                swap(A[j], A[j+1])
            end if
        end for
    end for
end procedure`}
                    {selectedAlgorithm === 'quick' &&
`procedure quickSort(A, low, high)
    if low < high
        pivot_index = partition(A, low, high)
        quickSort(A, low, pivot_index - 1)
        quickSort(A, pivot_index + 1, high)
    end if
end procedure

procedure partition(A, low, high)
    pivot = A[high]
    i = low - 1
    for j from low to high-1
        if A[j] < pivot
            i = i + 1
            swap(A[i], A[j])
        end if
    end for
    swap(A[i+1], A[high])
    return i + 1
end procedure`}
                  </pre>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Algorithms;