import { useState } from 'react';
import { Code, Target, TrendingUp, Clock, CheckCircle } from 'lucide-react';

const LeetCodeProblems = () => {
  const [problems, setProblems] = useState([
    {
      id: 1,
      title: 'Second Highest Salary',
      description: 'Write a SQL query to get the second highest salary from the Employee table.',
      difficulty: 'Easy',
      category: 'SELECT',
      timeLimit: 15,
      solved: true,
      acceptance: '75%',
      companies: ['Amazon', 'Google', 'Microsoft'],
    },
    {
      id: 2,
      title: 'Department Top Three Salaries',
      description: 'Find employees who earn the top three salaries in each department.',
      difficulty: 'Hard',
      category: 'Window Functions',
      timeLimit: 30,
      solved: false,
      acceptance: '45%',
      companies: ['Facebook', 'Apple', 'Netflix'],
    },
    {
      id: 3,
      title: 'Duplicate Emails',
      description: 'Find all duplicate emails in a table.',
      difficulty: 'Easy',
      category: 'GROUP BY',
      timeLimit: 10,
      solved: true,
      acceptance: '82%',
      companies: ['Amazon', 'Adobe'],
    },
    {
      id: 4,
      title: 'Customers Who Never Order',
      description: 'Find all customers who never placed an order.',
      difficulty: 'Easy',
      category: 'JOIN',
      timeLimit: 12,
      solved: false,
      acceptance: '68%',
      companies: ['Google', 'Microsoft'],
    },
    {
      id: 5,
      title: 'Rank Scores',
      description: 'Write a SQL query to rank scores.',
      difficulty: 'Medium',
      category: 'Window Functions',
      timeLimit: 20,
      solved: false,
      acceptance: '55%',
      companies: ['Facebook', 'Amazon', 'Uber'],
    },
    {
      id: 6,
      title: 'Consecutive Numbers',
      description: 'Find all numbers that appear at least three times consecutively.',
      difficulty: 'Medium',
      category: 'Self Join',
      timeLimit: 25,
      solved: false,
      acceptance: '48%',
      companies: ['Google', 'Apple'],
    },
  ]);

  const [selectedProblem, setSelectedProblem] = useState(null);
  const [userSolution, setUserSolution] = useState('');
  const [showSolution, setShowSolution] = useState(false);

  // Initialize selected problem
  if (!selectedProblem && problems.length > 0) {
    setSelectedProblem(problems[0]);
  }

  const handleSolve = (problemId) => {
    const problem = problems.find(p => p.id === problemId);
    setSelectedProblem(problem);
    setUserSolution('');
    setShowSolution(false);
  };

  const handleSubmit = () => {
    // In a real app, this would validate the solution
    alert('Solution submitted! Checking...');
    setProblems(prev => prev.map(p => 
      p.id === selectedProblem.id ? { ...p, solved: true } : p
    ));
  };

  const solvedCount = problems.filter(p => p.solved).length;

  return (
    <div className="leetcode-container">
      <div className="leetcode-header">
        <h2>
          <Code size={24} />
          LeetCode SQL Problems
        </h2>
        <div className="leetcode-stats">
          <span className="solved-count">
            {solvedCount}/{problems.length} solved
          </span>
        </div>
      </div>

      <div className="leetcode-layout">
        <div className="problems-list">
          <div className="problems-header">
            <h3>Problems</h3>
            <div className="difficulty-filters">
              <button className="diff-btn easy">Easy</button>
              <button className="diff-btn medium">Medium</button>
              <button className="diff-btn hard">Hard</button>
            </div>
          </div>
          
          <div className="problems-grid">
            {problems.map((problem) => (
              <div 
                key={problem.id} 
                className={`problem-card ${selectedProblem && selectedProblem.id === problem.id ? 'active' : ''} ${problem.solved ? 'solved' : ''}`}
                onClick={() => handleSolve(problem.id)}
              >
                <div className="problem-header">
                  <div className="problem-title">
                    {problem.solved && <CheckCircle size={16} color="var(--success-color)" />}
                    <h4>{problem.title}</h4>
                  </div>
                  <span className={`difficulty-badge ${problem.difficulty.toLowerCase()}`}>
                    {problem.difficulty}
                  </span>
                </div>
                <p className="problem-description">{problem.description}</p>
                
                <div className="problem-meta">
                  <div className="meta-item">
                    <Clock size={14} />
                    <span>{problem.timeLimit}m</span>
                  </div>
                  <div className="meta-item">
                    <TrendingUp size={14} />
                    <span>{problem.acceptance}</span>
                  </div>
                  <div className="meta-item">
                    <Target size={14} />
                    <span>{problem.category}</span>
                  </div>
                </div>
                
                <div className="problem-companies">
                  {problem.companies.map((company, idx) => (
                    <span key={idx} className="company-tag">{company}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="problem-workspace">
          {selectedProblem && (
            <>
              <div className="workspace-header">
                <h3>{selectedProblem.title}</h3>
                <div className="problem-info">
                  <span className={`difficulty-badge ${selectedProblem.difficulty.toLowerCase()}`}>
                    {selectedProblem.difficulty}
                  </span>
                  <span className="time-limit">
                    <Clock size={14} />
                    {selectedProblem.timeLimit} minutes
                  </span>
                  <span className="acceptance">
                    <TrendingUp size={14} />
                    {selectedProblem.acceptance} acceptance
                  </span>
                </div>
              </div>

              <div className="problem-description-detailed">
                <h4>Problem Description</h4>
                <p>{selectedProblem.description}</p>
                
                <div className="example-section">
                  <h5>Example:</h5>
                  <div className="example-table">
                    <pre>{`Input: 
Employee table:
+----+--------+
| id | salary |
+----+--------+
| 1  | 100    |
| 2  | 200    |
| 3  | 300    |
+----+--------+

Output:
+---------------------+
| SecondHighestSalary |
+---------------------+
| 200                 |
+---------------------+`}</pre>
                  </div>
                </div>
              </div>

              <div className="solution-editor">
                <div className="editor-header">
                  <h4>Your Solution</h4>
                  <button 
                    onClick={() => setShowSolution(!showSolution)}
                    className="btn btn-secondary btn-small"
                  >
                    {showSolution ? 'Hide Solution' : 'Show Solution'}
                  </button>
                </div>
                
                <textarea
                  value={userSolution}
                  onChange={(e) => setUserSolution(e.target.value)}
                  placeholder="Write your SQL solution here..."
                  className="solution-textarea"
                  rows={8}
                />
                
                <div className="solution-actions">
                  <button onClick={handleSubmit} className="btn btn-primary">
                    Submit Solution
                  </button>
                  <button 
                    onClick={() => setUserSolution('SELECT * FROM employees;')}
                    className="btn btn-secondary"
                  >
                    Test Sample
                  </button>
                  <button 
                    onClick={() => setUserSolution('')}
                    className="btn btn-secondary"
                  >
                    Clear
                  </button>
                </div>

                {showSolution && (
                  <div className="hint-section">
                    <h5>💡 Solution Hint</h5>
                    <pre className="hint-code">
                      {`-- Hint: Use LIMIT and OFFSET or subquery
SELECT MAX(salary) AS SecondHighestSalary
FROM Employee
WHERE salary < (SELECT MAX(salary) FROM Employee);`}
                    </pre>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default LeetCodeProblems;