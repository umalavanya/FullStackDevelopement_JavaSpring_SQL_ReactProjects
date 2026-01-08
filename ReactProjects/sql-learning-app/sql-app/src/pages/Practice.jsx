import { useState } from 'react';
import SqlEditor from '../components/SqlEditor';
import DatabaseSchema from '../components/DatabaseSchema';
import { sampleDatabase, executeSql } from '../data/sampleDatabase';
import { Target, Database, Award } from 'lucide-react';

const Practice = () => {
  const [results, setResults] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('editor');
  const [challenges, setChallenges] = useState([
    {
      id: 1,
      title: 'Select All Employees',
      description: 'Retrieve all columns from the employees table',
      difficulty: 'Beginner',
      initialCode: 'SELECT * FROM employees;',
      completed: false,
      hint: 'Use SELECT * to get all columns'
    },
    {
      id: 2,
      title: 'Filter by Department',
      description: 'Get employees from the Sales department',
      difficulty: 'Beginner',
      initialCode: "SELECT * FROM employees WHERE department = 'Sales';",
      completed: false,
      hint: 'Use WHERE clause with department column'
    },
    {
      id: 3,
      title: 'Order by Salary',
      description: 'Get employees sorted by salary in descending order',
      difficulty: 'Beginner',
      initialCode: 'SELECT * FROM employees ORDER BY salary DESC;',
      completed: false,
      hint: 'Use ORDER BY salary DESC'
    },
    {
      id: 4,
      title: 'Show All Tables',
      description: 'List all tables in the database',
      difficulty: 'Beginner',
      initialCode: 'SHOW TABLES;',
      completed: false,
      hint: 'Use SHOW TABLES command'
    }
  ]);
  const [activeChallenge, setActiveChallenge] = useState(challenges[0]);

  const handleRunQuery = (sqlCode) => {
    setIsLoading(true);
    
    // Simulate network delay
    setTimeout(() => {
      const result = executeSql(sqlCode, sampleDatabase);
      setResults(result);
      setIsLoading(false);
      
      // Check if challenge is completed
      if (activeChallenge && !activeChallenge.completed) {
        const expectedResult = executeSql(activeChallenge.initialCode, sampleDatabase);
        if (JSON.stringify(result.rows) === JSON.stringify(expectedResult.rows)) {
          setChallenges(prev => prev.map(challenge => 
            challenge.id === activeChallenge.id 
              ? { ...challenge, completed: true }
              : challenge
          ));
          alert('🎉 Challenge completed successfully!');
        }
      }
    }, 500);
  };

  const handleReset = () => {
    setResults(null);
  };

  const handleChallengeSelect = (challenge) => {
    setActiveChallenge(challenge);
    setResults(null);
  };

  return (
    <div className="container">
      <div className="page-header">
        <h1>SQL Practice</h1>
        <p>Practice SQL queries with our interactive editor and sample database</p>
      </div>

      <div className="practice-layout">
        <div className="practice-sidebar">
          <div className="sidebar-section">
            <h3>
              <Target size={20} />
              Challenges
            </h3>
            <div className="challenges-list">
              {challenges.map((challenge) => (
                <div
                  key={challenge.id}
                  className={`challenge-card ${activeChallenge.id === challenge.id ? 'active' : ''} ${challenge.completed ? 'completed' : ''}`}
                  onClick={() => handleChallengeSelect(challenge)}
                >
                  <div className="challenge-header">
                    <span className="challenge-title">{challenge.title}</span>
                    <span className={`difficulty-badge ${challenge.difficulty.toLowerCase()}`}>
                      {challenge.difficulty}
                    </span>
                  </div>
                  <p className="challenge-description">{challenge.description}</p>
                  {challenge.completed && (
                    <div className="challenge-completed">
                      <Award size={16} />
                      Completed
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="sidebar-section">
            <h3>
              <Database size={20} />
              Database Schema
            </h3>
            <DatabaseSchema database={sampleDatabase} />
          </div>
        </div>

        <div className="practice-main">
          <div className="challenge-info">
            <div className="challenge-info-header">
              <h2>{activeChallenge.title}</h2>
              <button 
                onClick={() => alert(`Hint: ${activeChallenge.hint}`)}
                className="btn btn-secondary btn-small"
              >
                Show Hint
              </button>
            </div>
            <p>{activeChallenge.description}</p>
            <div className="challenge-meta">
              <span className={`difficulty-badge ${activeChallenge.difficulty.toLowerCase()}`}>
                {activeChallenge.difficulty}
              </span>
              <span className="completion-status">
                {activeChallenge.completed ? '✅ Completed' : '⏳ In Progress'}
              </span>
            </div>
          </div>

          <div className="tabs">
            <button
              className={`tab-btn ${activeTab === 'editor' ? 'active' : ''}`}
              onClick={() => setActiveTab('editor')}
            >
              Editor
            </button>
            <button
              className={`tab-btn ${activeTab === 'results' ? 'active' : ''}`}
              onClick={() => setActiveTab('results')}
              disabled={!results}
            >
              Results {results && `(${results.rows ? results.rows.length : 0})`}
            </button>
          </div>

          <div className="tab-content">
            {activeTab === 'editor' && (
              <SqlEditor
                initialCode={activeChallenge.initialCode}
                onRun={handleRunQuery}
                onReset={handleReset}
                results={results}
                isLoading={isLoading}
              />
            )}
            {activeTab === 'results' && results && (
              <div className="results-container">
                {results.error ? (
                  <div className="error-message">
                    <h4>Error</h4>
                    <p>{results.error}</p>
                  </div>
                ) : (
                  <div className="results-summary">
                    <h4>✅ Query executed successfully!</h4>
                    <p>Rows returned: {results.rows ? results.rows.length : 0}</p>
                    {results.rows && results.rows.length > 0 && (
                      <div className="results-table-container">
                        <table className="results-table">
                          <thead>
                            <tr>
                              {Object.keys(results.rows[0]).map((column, index) => (
                                <th key={index}>{column}</th>
                              ))}
                            </tr>
                          </thead>
                          <tbody>
                            {results.rows.map((row, rowIndex) => (
                              <tr key={rowIndex}>
                                {Object.values(row).map((value, colIndex) => (
                                  <td key={colIndex}>{String(value)}</td>
                                ))}
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Practice;