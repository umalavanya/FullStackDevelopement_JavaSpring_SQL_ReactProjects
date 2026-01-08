import { useState } from 'react';
import { Clock, AlertCircle, CheckCircle, FileText } from 'lucide-react';

const MockExam = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(1800); // 30 minutes in seconds
  const [examStarted, setExamStarted] = useState(false);
  const [examSubmitted, setExamSubmitted] = useState(false);

  const questions = [
    {
      id: 1,
      type: 'multiple-choice',
      question: 'Which SQL statement is used to extract data from a database?',
      options: [
        'GET',
        'EXTRACT', 
        'SELECT',
        'OPEN'
      ],
      correct: 2,
      points: 5,
      explanation: 'SELECT is used to query data from a database.'
    },
    {
      id: 2,
      type: 'true-false',
      question: 'The WHERE clause is used to filter rows after grouping.',
      options: [
        'True',
        'False'
      ],
      correct: 1,
      points: 3,
      explanation: 'False. WHERE filters rows before grouping. HAVING filters after grouping.'
    },
    {
      id: 3,
      type: 'sql-write',
      question: 'Write a SQL query to find all employees with salary greater than 50000.',
      points: 10,
      correctAnswer: 'SELECT * FROM employees WHERE salary > 50000;',
      explanation: 'This query uses WHERE clause with comparison operator to filter employees.'
    },
    {
      id: 4,
      type: 'multiple-choice',
      question: 'Which JOIN returns all records from the left table?',
      options: [
        'INNER JOIN',
        'LEFT JOIN',
        'RIGHT JOIN',
        'FULL JOIN'
      ],
      correct: 1,
      points: 5,
      explanation: 'LEFT JOIN returns all records from the left table and matched records from the right.'
    },
    {
      id: 5,
      type: 'sql-write',
      question: 'Write a query to count employees in each department.',
      points: 10,
      correctAnswer: 'SELECT department, COUNT(*) FROM employees GROUP BY department;',
      explanation: 'This uses GROUP BY to aggregate employees by department.'
    }
  ];

  const startExam = () => {
    setExamStarted(true);
    // Start timer
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          submitExam();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleAnswer = (questionId, answer) => {
    setAnswers(prev => ({ ...prev, [questionId]: answer }));
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const prevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const submitExam = () => {
    setExamSubmitted(true);
    calculateScore();
  };

  const calculateScore = () => {
    let score = 0;
    let maxScore = questions.reduce((sum, q) => sum + q.points, 0);
    
    questions.forEach(q => {
      if (q.type === 'sql-write') {
        // Simplified check for SQL questions
        if (answers[q.id] && answers[q.id].includes('SELECT') && answers[q.id].includes('WHERE')) {
          score += q.points;
        }
      } else if (answers[q.id] === q.options[q.correct]) {
        score += q.points;
      }
    });
    
    return { score, maxScore, percentage: Math.round((score / maxScore) * 100) };
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const currentQ = questions[currentQuestion];

  return (
    <div className="mock-exam-container">
      <div className="exam-header">
        <h2>
          <FileText size={24} />
          SQL Mock Exam
        </h2>
        <p>Simulate a real SQL interview with this timed exam</p>
      </div>

      {!examStarted ? (
        <div className="exam-intro">
          <div className="exam-info-card">
            <h3>Exam Details</h3>
            <div className="exam-details">
              <div className="detail-item">
                <Clock size={20} />
                <div>
                  <strong>Duration:</strong> 30 minutes
                </div>
              </div>
              <div className="detail-item">
                <FileText size={20} />
                <div>
                  <strong>Questions:</strong> {questions.length} questions
                </div>
              </div>
              <div className="detail-item">
                <AlertCircle size={20} />
                <div>
                  <strong>Total Points:</strong> {questions.reduce((sum, q) => sum + q.points, 0)}
                </div>
              </div>
            </div>
            
            <div className="exam-instructions">
              <h4>Instructions:</h4>
              <ul>
                <li>Complete all questions within the time limit</li>
                <li>Multiple choice questions have single correct answers</li>
                <li>Write SQL queries in the provided text areas</li>
                <li>You can navigate between questions</li>
                <li>Submit when finished or when time runs out</li>
              </ul>
            </div>

            <button onClick={startExam} className="btn btn-primary btn-start">
              Start Exam
            </button>
          </div>
        </div>
      ) : !examSubmitted ? (
        <div className="exam-in-progress">
          <div className="exam-timer">
            <Clock size={20} />
            <span className="time-display">{formatTime(timeLeft)}</span>
            <span className="time-label">remaining</span>
          </div>

          <div className="exam-progress">
            <div className="progress-bar">
              <div 
                className="progress-fill"
                style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
              ></div>
            </div>
            <div className="progress-text">
              Question {currentQuestion + 1} of {questions.length}
            </div>
          </div>

          <div className="question-navigation">
            {questions.map((q, idx) => (
              <button
                key={q.id}
                className={`nav-btn ${currentQuestion === idx ? 'active' : ''} ${answers[q.id] ? 'answered' : ''}`}
                onClick={() => setCurrentQuestion(idx)}
              >
                {idx + 1}
              </button>
            ))}
          </div>

          <div className="exam-question">
            <div className="question-header">
              <h3>Question {currentQuestion + 1}</h3>
              <span className="question-points">{currentQ.points} points</span>
            </div>
            
            <div className="question-content">
              <p>{currentQ.question}</p>
              
              {currentQ.type === 'multiple-choice' || currentQ.type === 'true-false' ? (
                <div className="options-list">
                  {currentQ.options.map((option, idx) => (
                    <label key={idx} className="option-item">
                      <input
                        type="radio"
                        name={`question-${currentQ.id}`}
                        checked={answers[currentQ.id] === option}
                        onChange={() => handleAnswer(currentQ.id, option)}
                      />
                      <span className="option-text">{option}</span>
                    </label>
                  ))}
                </div>
              ) : (
                <div className="sql-answer">
                  <textarea
                    value={answers[currentQ.id] || ''}
                    onChange={(e) => handleAnswer(currentQ.id, e.target.value)}
                    placeholder="Write your SQL query here..."
                    rows={6}
                    className="sql-textarea"
                  />
                  <div className="sql-hint">
                    <AlertCircle size={16} />
                    <span>Make sure to end your query with a semicolon</span>
                  </div>
                </div>
              )}
            </div>

            <div className="question-navigation-buttons">
              <button onClick={prevQuestion} disabled={currentQuestion === 0} className="btn btn-secondary">
                Previous
              </button>
              <button onClick={nextQuestion} disabled={currentQuestion === questions.length - 1} className="btn btn-secondary">
                Next
              </button>
              {currentQuestion === questions.length - 1 && (
                <button onClick={submitExam} className="btn btn-primary">
                  Submit Exam
                </button>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="exam-results">
          <div className="results-header">
            <h3>Exam Results</h3>
            <CheckCircle size={48} color="var(--success-color)" />
          </div>
          
          {(() => {
            const { score, maxScore, percentage } = calculateScore();
            return (
              <>
                <div className="score-display">
                  <div className="score-circle">
                    <span className="score-percentage">{percentage}%</span>
                    <span className="score-text">Score</span>
                  </div>
                  <div className="score-details">
                    <div className="score-item">
                      <strong>Correct Answers:</strong>
                      <span>{score}/{maxScore} points</span>
                    </div>
                    <div className="score-item">
                      <strong>Time Taken:</strong>
                      <span>{formatTime(1800 - timeLeft)}</span>
                    </div>
                    <div className="score-item">
                      <strong>Performance:</strong>
                      <span className={`performance-label ${percentage >= 70 ? 'good' : percentage >= 50 ? 'average' : 'poor'}`}>
                        {percentage >= 70 ? 'Excellent' : percentage >= 50 ? 'Average' : 'Needs Improvement'}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="question-review">
                  <h4>Review Your Answers</h4>
                  {questions.map((q, idx) => (
                    <div key={q.id} className="review-item">
                      <div className="review-question">
                        <strong>Q{idx + 1}:</strong> {q.question}
                      </div>
                      <div className="review-answer">
                        <div>
                          <strong>Your Answer:</strong> {answers[q.id] || 'Not answered'}
                        </div>
                        <div>
                          <strong>Correct Answer:</strong> {q.type === 'sql-write' ? q.correctAnswer : q.options[q.correct]}
                        </div>
                      </div>
                      <div className="review-explanation">
                        <strong>Explanation:</strong> {q.explanation}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="results-actions">
                  <button onClick={() => window.location.reload()} className="btn btn-primary">
                    Retake Exam
                  </button>
                  <button className="btn btn-secondary">
                    Review Weak Areas
                  </button>
                  <button className="btn btn-secondary">
                    Download Results
                  </button>
                </div>
              </>
            );
          })()}
        </div>
      )}
    </div>
  );
};

export default MockExam;