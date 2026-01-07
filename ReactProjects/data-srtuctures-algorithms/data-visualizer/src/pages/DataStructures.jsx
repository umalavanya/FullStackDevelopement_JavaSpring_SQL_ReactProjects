// src/pages/DataStructures.jsx
import { useState } from 'react';
import DataStructureVisualizer from '../components/DataStructureVisualizer/DataStructureVisualizer';
import '../styles/DataStructures.css';

const DataStructures = () => {
  const [selectedDS, setSelectedDS] = useState('array');

  const dataStructures = [
    { id: 'array', name: 'Array', description: 'Contiguous memory locations' },
    { id: 'linkedlist', name: 'Linked List', description: 'Nodes with pointers' },
    { id: 'stack', name: 'Stack', description: 'LIFO structure' },
    { id: 'queue', name: 'Queue', description: 'FIFO structure' },
    { id: 'tree', name: 'Binary Tree', description: 'Hierarchical structure' },
    { id: 'graph', name: 'Graph', description: 'Nodes and edges' },
    { id: 'hash', name: 'Hash Table', description: 'Key-value pairs' },
    { id: 'heap', name: 'Heap', description: 'Complete binary tree' }
  ];

  return (
    <div className="data-structures-page">
      <h1>Data Structures</h1>
      
      <div className="ds-container">
        <div className="ds-sidebar">
          <h3>Select Data Structure</h3>
          <ul className="ds-list">
            {dataStructures.map(ds => (
              <li
                key={ds.id}
                className={`ds-item ${selectedDS === ds.id ? 'active' : ''}`}
                onClick={() => setSelectedDS(ds.id)}
              >
                <div className="ds-name">{ds.name}</div>
                <div className="ds-desc">{ds.description}</div>
              </li>
            ))}
          </ul>
        </div>

        <div className="ds-visualizer">
          <DataStructureVisualizer type={selectedDS} />
          
          <div className="ds-info">
            <h3>Operations & Complexity</h3>
            <table className="complexity-table">
              <thead>
                <tr>
                  <th>Operation</th>
                  <th>Average Case</th>
                  <th>Worst Case</th>
                  <th>Space</th>
                </tr>
              </thead>
              <tbody>
                {selectedDS === 'array' && (
                  <>
                    <tr><td>Access</td><td>O(1)</td><td>O(1)</td><td>O(n)</td></tr>
                    <tr><td>Search</td><td>O(n)</td><td>O(n)</td><td>-</td></tr>
                    <tr><td>Insertion</td><td>O(n)</td><td>O(n)</td><td>-</td></tr>
                    <tr><td>Deletion</td><td>O(n)</td><td>O(n)</td><td>-</td></tr>
                  </>
                )}
                {selectedDS === 'linkedlist' && (
                  <>
                    <tr><td>Access</td><td>O(n)</td><td>O(n)</td><td>O(n)</td></tr>
                    <tr><td>Search</td><td>O(n)</td><td>O(n)</td><td>-</td></tr>
                    <tr><td>Insertion</td><td>O(1)</td><td>O(1)</td><td>-</td></tr>
                    <tr><td>Deletion</td><td>O(1)</td><td>O(1)</td><td>-</td></tr>
                  </>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataStructures;