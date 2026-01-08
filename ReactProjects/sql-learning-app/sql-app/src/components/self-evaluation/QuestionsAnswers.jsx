import { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp, Check, X } from 'lucide-react';

const QuestionsAnswers = () => {
  const [expandedId, setExpandedId] = useState(null);
  const [userAnswers, setUserAnswers] = useState({});
  const [showAnswers, setShowAnswers] = useState({});

  const questions = [
    {
      id: 1,
      question: 'What is the difference between INNER JOIN and LEFT JOIN?',
      category: 'JOIN Operations',
      difficulty: 'Beginner',
      answer: 'INNER JOIN returns only matching rows from both tables, while LEFT JOIN returns all rows from the left table and matching rows from the right table (NULLs for non-matching).',
      explanation: 'INNER JOIN is used when you only want records that have matches in both tables. LEFT JOIN is useful when you want all records from the left table regardless of whether they have matches in the right table.',
      example: 'INNER JOIN: Customers with orders\nLEFT JOIN: All customers, even those without orders'
    },
    {
      id: 2,
      question: 'Explain the difference between WHERE and HAVING clauses.',
      category: 'Filtering',
      difficulty: 'Intermediate',
      answer: 'WHERE filters rows before grouping, HAVING filters groups after GROUP BY.',
      explanation: 'WHERE clause is used to filter individual rows before any grouping occurs. HAVING clause is used to filter groups after the GROUP BY clause has been applied. HAVING can use aggregate functions, WHERE cannot.',
      example: 'WHERE: salary > 50000\nHAVING: COUNT(*) > 5'
    },
    {
      id: 3,
      question: 'What are SQL indexes and why are they important?',
      category: 'Performance',
      difficulty: 'Intermediate',
      answer: 'Indexes are database structures that improve query performance by allowing faster data retrieval.',
      explanation: 'Indexes work like a book index, allowing the database to find data without scanning the entire table. They speed up SELECT queries but slow down INSERT, UPDATE, and DELETE operations.',
      example: 'CREATE INDEX idx_email ON users(email);'
    },
    {
      id: 4,
      question: 'Explain the ACID properties in database transactions.',
      category: 'Transactions',
      difficulty: 'Advanced',
      answer: 'Atomicity, Consistency, Isolation, Durability - properties that ensure reliable transaction processing.',
      explanation: 'Atomicity: All or nothing execution. Consistency: Database remains in valid state. Isolation: Concurrent transactions don\'t interfere. Durability: Committed transactions persist.',
      example: 'Bank transfer must be atomic (both debit and credit succeed or fail together)'
    },
    {
      id: 5,
      question: 'What is the difference between DELETE, TRUNCATE, and DROP?',
      category: 'DDL/DML',
      difficulty: 'Beginner',
      answer: 'DELETE removes rows with logging, TRUNCATE removes all rows quickly, DROP removes entire table.',
      explanation: 'DELETE is DML, can be rolled back, supports WHERE. TRUNCATE is DDL, faster, resets identity. DROP removes table structure completely.',
      example: 'DELETE: Remove specific customers\nTRUNCATE: Clear all orders\nDROP: Remove temporary table'
    }
  ];

  const toggleQuestion = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const handleAnswerSubmit = (questionId, answer) => {
    setUserAnswers(prev => ({ ...prev, [questionId]: answer }));
  };

  const toggleShowAnswer = (questionId) => {
    setShowAnswers(prev => ({ ...prev, [questionId]: !prev[questionId] }));
  };

  return (
    <div className="qa-container">
      <div className="qa-header">
        <h2>
          <HelpCircle size={24} />
          SQL Questions & Answers
        </h2>
        <p>Test your theoretical knowledge with these common SQL interview questions</p>
      </div>

      <div className="qa-filters">
        <div className="filter-buttons">
          <button className="filter-btn active">All</button>
          <button className="filter-btn">Beginner</button>
          <button className="filter-btn">Intermediate</button>
          <button className="filter-btn">Advanced</button>
        </div>
        <div className="qa-stats">
          <span className="stat-item">
            Answered: {Object.keys(userAnswers).length}/{questions.length}
          </span>
        </div>
      </div>

      <div className="questions-list">
        {questions.map((q) => (
          <div key={q.id} className="question-card">
            <div 
              className="question-header"
              onClick={() => toggleQuestion(q.id)}
            >
              <div className="question-title">
                <span className="question-number">Q{q.id}</span>
                <h4>{q.question}</h4>
              </div>
              <div className="question-meta">
                <span className={`difficulty-badge ${q.difficulty.toLowerCase()}`}>
                  {q.difficulty}
                </span>
                <span className="question-category">{q.category}</span>
                {expandedId === q.id ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </div>
            </div>

            {expandedId === q.id && (
              <div className="question-content">
                <div className="answer-section">
                  <div className="answer-input">
                    <h5>Your Answer:</h5>
                    <textarea
                      value={userAnswers[q.id] || ''}
                      onChange={(e) => handleAnswerSubmit(q.id, e.target.value)}
                      placeholder="Type your answer here..."
                      rows={4}
                      className="answer-textarea"
                    />
                    <div className="answer-actions">
                      <button 
                        onClick={() => toggleShowAnswer(q.id)}
                        className="btn btn-secondary"
                      >
                        {showAnswers[q.id] ? 'Hide Answer' : 'Show Correct Answer'}
                      </button>
                      <button 
                        onClick={() => handleAnswerSubmit(q.id, '')}
                        className="btn btn-secondary"
                      >
                        Clear
                      </button>
                    </div>
                  </div>

                  {showAnswers[q.id] && (
                    <div className="correct-answer">
                      <h5>
                        <Check size={16} color="var(--success-color)" />
                        Correct Answer:
                      </h5>
                      <p>{q.answer}</p>
                      
                      <div className="answer-details">
                        <h6>Explanation:</h6>
                        <p>{q.explanation}</p>
                        
                        <h6>Example:</h6>
                        <pre className="example-code">{q.example}</pre>
                      </div>
                    </div>
                  )}
                </div>

                <div className="self-assessment">
                  <h5>Self Assessment:</h5>
                  <div className="assessment-buttons">
                    <button className="assessment-btn correct">
                      <Check size={16} />
                      I knew this
                    </button>
                    <button className="assessment-btn partial">
                      ~
                      Partially knew
                    </button>
                    <button className="assessment-btn incorrect">
                      <X size={16} />
                      Didn't know
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="qa-progress">
        <h4>Your Progress</h4>
        <div className="progress-bars">
          <div className="progress-item">
            <div className="progress-label">Beginner Questions</div>
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: '60%' }}></div>
            </div>
            <div className="progress-value">3/5</div>
          </div>
          <div className="progress-item">
            <div className="progress-label">Intermediate Questions</div>
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: '40%' }}></div>
            </div>
            <div className="progress-value">2/5</div>
          </div>
          <div className="progress-item">
            <div className="progress-label">Advanced Questions</div>
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: '20%' }}></div>
            </div>
            <div className="progress-value">1/5</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuestionsAnswers;