// src/pages/Practice.jsx
import { useState } from 'react';
import '../styles/Practice.css';

const Practice = () => {
  const [code, setCode] = useState(`function binarySearch(arr, target) {
    let left = 0;
    let right = arr.length - 1;
    
    while (left <= right) {
        let mid = Math.floor((left + right) / 2);
        
        if (arr[mid] === target) {
            return mid;
        }
        
        if (arr[mid] < target) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }
    
    return -1;
}`);

  const [output, setOutput] = useState('');
  const [selectedProblem, setSelectedProblem] = useState(0);

  const problems = [
    {
      id: 1,
      title: 'Binary Search',
      difficulty: 'Easy',
      description: 'Implement binary search to find an element in a sorted array.',
      functionSignature: 'function binarySearch(arr, target)',
      testCases: [
        { input: { arr: [1, 2, 3, 4, 5], target: 3 }, expected: 2 },
        { input: { arr: [1, 2, 3, 4, 5], target: 6 }, expected: -1 },
        { input: { arr: [], target: 1 }, expected: -1 }
      ]
    },
    {
      id: 2,
      title: 'Bubble Sort',
      difficulty: 'Easy',
      description: 'Implement bubble sort to sort an array in ascending order.',
      functionSignature: 'function bubbleSort(arr)',
      testCases: [
        { input: { arr: [5, 3, 8, 1, 2] }, expected: [1, 2, 3, 5, 8] },
        { input: { arr: [1, 2, 3, 4, 5] }, expected: [1, 2, 3, 4, 5] },
        { input: { arr: [5, 4, 3, 2, 1] }, expected: [1, 2, 3, 4, 5] }
      ]
    },
    {
      id: 3,
      title: 'Reverse Linked List',
      difficulty: 'Medium',
      description: 'Reverse a singly linked list.',
      functionSignature: 'function reverseLinkedList(head)',
      testCases: [
        { 
          input: { head: { val: 1, next: { val: 2, next: { val: 3, next: null } } } }, 
          expected: { val: 3, next: { val: 2, next: { val: 1, next: null } } }
        }
      ]
    }
  ];

  const runCode = () => {
    try {
      // Create a sandboxed function
      const func = new Function('arr', 'target', `
        ${code}
        return binarySearch(arr, target);
      `);
      
      const currentProblem = problems[selectedProblem];
      const results = [];
      
      currentProblem.testCases.forEach((testCase, index) => {
        const result = func(testCase.input.arr, testCase.input.target);
        const passed = JSON.stringify(result) === JSON.stringify(testCase.expected);
        
        results.push({
          testCase: index + 1,
          input: JSON.stringify(testCase.input),
          expected: JSON.stringify(testCase.expected),
          output: JSON.stringify(result),
          passed: passed
        });
      });
      
      setOutput(JSON.stringify(results, null, 2));
    } catch (error) {
      setOutput(`Error: ${error.message}`);
    }
  };

  return (
    <div className="practice-page">
      <h1>Practice Problems</h1>
      
      <div className="practice-container">
        <div className="problems-sidebar">
          <h3>Problems</h3>
          <div className="problems-list">
            {problems.map((problem, index) => (
              <div
                key={problem.id}
                className={`problem-item ${selectedProblem === index ? 'active' : ''}`}
                onClick={() => setSelectedProblem(index)}
              >
                <div className="problem-header">
                  <h4>{problem.title}</h4>
                  <span className={`difficulty-badge ${problem.difficulty.toLowerCase()}`}>
                    {problem.difficulty}
                  </span>
                </div>
                <p className="problem-desc">{problem.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="practice-main">
          <div className="problem-statement">
            <h2>{problems[selectedProblem].title}</h2>
            <div className="problem-difficulty">
              Difficulty: <span className={`difficulty ${problems[selectedProblem].difficulty.toLowerCase()}`}>
                {problems[selectedProblem].difficulty}
              </span>
            </div>
            <p>{problems[selectedProblem].description}</p>
            
            <div className="function-signature">
              <h4>Function Signature:</h4>
              <code>{problems[selectedProblem].functionSignature}</code>
            </div>
            
            <div className="test-cases">
              <h4>Test Cases:</h4>
              {problems[selectedProblem].testCases.map((testCase, index) => (
                <div key={index} className="test-case">
                  <div className="test-case-header">
                    <span>Test Case {index + 1}</span>
                  </div>
                  <div className="test-case-content">
                    <div className="test-input">
                      <strong>Input:</strong> {JSON.stringify(testCase.input)}
                    </div>
                    <div className="test-expected">
                      <strong>Expected:</strong> {JSON.stringify(testCase.expected)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="code-editor-section">
            <div className="editor-header">
              <h3>Code Editor</h3>
              <button onClick={runCode} className="run-button">
                Run Code
              </button>
            </div>
            <textarea
              className="code-editor"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              spellCheck="false"
            />
            
            <div className="output-section">
              <h3>Output</h3>
              <pre className="output">{output}</pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Practice;