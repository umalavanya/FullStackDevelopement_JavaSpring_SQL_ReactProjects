import { useState } from 'react';

const Practice = () => {
  const [activeTab, setActiveTab] = useState('editor');
  
  return (
    <div className="container">
      <div className="page-header">
        <h1>SQL Practice</h1>
        <p>Practice SQL queries with our interactive editor</p>
      </div>
      
      <div className="practice-container">
        <div className="tabs">
          <button 
            className={`tab-btn ${activeTab === 'editor' ? 'active' : ''}`}
            onClick={() => setActiveTab('editor')}
          >
            Editor
          </button>
          <button 
            className={`tab-btn ${activeTab === 'challenges' ? 'active' : ''}`}
            onClick={() => setActiveTab('challenges')}
          >
            Challenges
          </button>
          <button 
            className={`tab-btn ${activeTab === 'results' ? 'active' : ''}`}
            onClick={() => setActiveTab('results')}
          >
            Results
          </button>
        </div>
        
        <div className="tab-content">
          {activeTab === 'editor' && (
            <div className="editor-preview">
              <h3>SQL Editor Preview</h3>
              <p>The SQL editor with CodeMirror will be implemented here.</p>
              <div className="code-preview">
                SELECT * FROM employees;
              </div>
              <button className="btn btn-primary">Run Query</button>
            </div>
          )}
          
          {activeTab === 'challenges' && (
            <div className="challenges-preview">
              <h3>SQL Challenges</h3>
              <div className="challenge-list">
                <div className="challenge-item">
                  <h4>Select All Employees</h4>
                  <p>Retrieve all columns from the employees table</p>
                  <span className="difficulty beginner">Beginner</span>
                </div>
                <div className="challenge-item">
                  <h4>Filter by Department</h4>
                  <p>Get employees from the Sales department</p>
                  <span className="difficulty beginner">Beginner</span>
                </div>
              </div>
            </div>
          )}
          
          {activeTab === 'results' && (
            <div className="results-preview">
              <h3>Query Results</h3>
              <p>Results from your SQL queries will appear here.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Practice;