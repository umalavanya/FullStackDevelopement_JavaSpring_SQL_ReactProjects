// src/components/DataStructureVisualizer/DataStructureVisualizer.jsx
import { useState } from 'react';
import '../../styles/DataStructureVisualizer.css';

const DataStructureVisualizer = ({ type }) => {
  const [array, setArray] = useState([5, 2, 8, 1, 9, 3]);
  const [linkedList, setLinkedList] = useState([
    { value: 1, next: 1 },
    { value: 2, next: 2 },
    { value: 3, next: 3 },
    { value: 4, next: null }
  ]);
  const [treeData, setTreeData] = useState({
    value: 10,
    left: {
      value: 5,
      left: { value: 2, left: null, right: null },
      right: { value: 7, left: null, right: null }
    },
    right: {
      value: 15,
      left: { value: 12, left: null, right: null },
      right: { value: 20, left: null, right: null }
    }
  });

  const renderArray = () => (
    <div className="array-visualizer">
      <h3>Array Visualization</h3>
      <div className="array-container">
        {array.map((item, index) => (
          <div key={index} className="array-element">
            <div className="element-value">{item}</div>
            <div className="element-index">{index}</div>
          </div>
        ))}
      </div>
      <div className="array-controls">
        <button onClick={() => setArray([...array, Math.floor(Math.random() * 100)])}>
          Add Element
        </button>
        <button onClick={() => setArray(array.slice(0, -1))}>
          Remove Last
        </button>
        <button onClick={() => setArray([...array].sort((a, b) => a - b))}>
          Sort Array
        </button>
      </div>
    </div>
  );

  const renderLinkedList = () => (
    <div className="linkedlist-visualizer">
      <h3>Linked List Visualization</h3>
      <div className="linkedlist-container">
        {linkedList.map((node, index) => (
          <div key={index} className="linkedlist-node">
            <div className="node-value">{node.value}</div>
            <div className="node-next">next →</div>
            {index < linkedList.length - 1 && (
              <div className="node-pointer">→</div>
            )}
          </div>
        ))}
      </div>
      <div className="linkedlist-controls">
        <button onClick={() => {
          const newValue = Math.floor(Math.random() * 100);
          setLinkedList([...linkedList, { value: newValue, next: null }]);
        }}>
          Add Node
        </button>
      </div>
    </div>
  );

  const renderTree = (node, depth = 0) => {
    if (!node) return null;
    
    return (
      <div className="tree-node-container">
        <div className="tree-node">
          <div className="tree-value">{node.value}</div>
        </div>
        {(node.left || node.right) && (
          <div className="tree-children">
            {node.left && (
              <div className="tree-left">
                <div className="tree-line"></div>
                {renderTree(node.left, depth + 1)}
              </div>
            )}
            {node.right && (
              <div className="tree-right">
                <div className="tree-line"></div>
                {renderTree(node.right, depth + 1)}
              </div>
            )}
          </div>
        )}
      </div>
    );
  };

  const renderBinaryTree = () => (
    <div className="tree-visualizer">
      <h3>Binary Search Tree</h3>
      <div className="tree-container">
        {renderTree(treeData)}
      </div>
    </div>
  );

  switch (type) {
    case 'array':
      return renderArray();
    case 'linkedlist':
      return renderLinkedList();
    case 'tree':
      return renderBinaryTree();
    default:
      return renderArray();
  }
};

export default DataStructureVisualizer;