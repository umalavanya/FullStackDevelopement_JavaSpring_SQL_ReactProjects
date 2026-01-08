import { useState } from 'react';
import { Zap, TrendingUp, Target, RefreshCw, Award, Clock } from 'lucide-react';



const QuizSection = () => {
  const [activeQuiz, setActiveQuiz] = useState(null);
  const [quizAnswers, setQuizAnswers] = useState({});
  const [quizResults, setQuizResults] = useState(null);

  const quizzes = [
    {
      id: 'basic-select',
      title: 'Basic SELECT Quiz',
      description: 'Test your knowledge of SELECT statements and basic queries',
      questions: 10,
      time: 15,
      difficulty: 'Beginner',
      completed: true,
      score: 85,
      icon: '🔍'
    },
    {
      id: 'joins',
      title: 'JOIN Operations Quiz',
      description: 'Challenge yourself with various JOIN operations',
      questions: 12,
      time: 20,
      difficulty: 'Intermediate',
      completed: false,
      score: 0,
      icon: '🔗'
    },
    {
      id: 'aggregations',
      title: 'Aggregate Functions Quiz',
      description: 'Test your skills with GROUP BY and aggregate functions',
      questions: 8,
      time: 15,
      difficulty: 'Intermediate',
      completed: true,
      score: 90,
      icon: '📊'
    },
    {
      id: 'subqueries',
      title: 'Subqueries Quiz',
      description: 'Master nested queries and correlated subqueries',
      questions: 15,
      time: 25,
      difficulty: 'Advanced',
      completed: false,
      score: 0,
      icon: '🎯'
    },
    {
      id: 'window-functions',
      title: 'Window Functions Quiz',
      description: 'Advanced quiz on window functions and analytics',
      questions: 10,
      time: 20,
      difficulty: 'Advanced',
      completed: false,
      score: 0,
      icon: '📈'
    },
    {
      id: 'sql-master',
      title: 'SQL Master Challenge',
      description: 'Final comprehensive SQL knowledge test',
      questions: 20,
      time: 30,
      difficulty: 'Expert',
      completed: false,
      score: 0,
      icon: '🏆'
    }
  ];

  const quizQuestions = {
    'basic-select': [
      {
        id: 1,
        question: 'Which SQL keyword is used to retrieve data from a database?',
        options: ['GET', 'SELECT', 'EXTRACT', 'FETCH'],
        correct: 1
      },
      {
        id: 2,
        question: 'What does the asterisk (*) represent in a SELECT statement?',
        options: ['First column', 'All columns', 'Primary key', 'Last column'],
        correct: 1
      },
      {
        id: 3,
        question: 'Which clause is used to filter records in SQL?',
        options: ['FILTER', 'WHERE', 'HAVING', 'CONDITION'],
        correct: 1
      }
    ],
    'joins': [
      {
        id: 1,
        question: 'Which JOIN returns all records when there is a match in either left or right table?',
        options: ['INNER JOIN', 'LEFT JOIN', 'RIGHT JOIN', 'FULL JOIN'],
        correct: 3
      }
    ]
  };

  const startQuiz = (quizId) => {
    setActiveQuiz(quizId);
    setQuizAnswers({});
    setQuizResults(null);
  };

  const submitQuiz = () => {
    const quiz = quizzes.find(q => q.id === activeQuiz);
    const questions = quizQuestions[activeQuiz] || [];
    
    let correct = 0;
    questions.forEach(q => {
      if (quizAnswers[q.id] === q.options[q.correct]) {
        correct++;
      }
    });
    
    const score = Math.round((correct / questions.length) * 100);
    
    setQuizResults({
      score,
      correct,
      total: questions.length,
      timeTaken: '05:30' // Mock time
    });
  };

  const resetQuiz = () => {
    setActiveQuiz(null);
    setQuizAnswers({});
    setQuizResults(null);
  };

  const renderQuizContent = () => {
    if (!activeQuiz) return null;
    
    const quiz = quizzes.find(q => q.id === activeQuiz);
    const questions = quizQuestions[activeQuiz] || [];

    if (quizResults) {
      return (
        <div className="quiz-results">
          <div className="results-header">
            <Award size={48} color="var(--success-color)" />
            <h3>Quiz Completed!</h3>
          </div>
          
          <div className="score-card">
            <div className="score-circle">
              <span className="score-value">{quizResults.score}%</span>
            </div>
            <div className="score-details">
              <div className="score-item">
                <strong>Correct Answers:</strong>
                <span>{quizResults.correct}/{quizResults.total}</span>
              </div>
              <div className="score-item">
                <strong>Time Taken:</strong>
                <span>{quizResults.timeTaken}</span>
              </div>
              <div className="score-item">
                <strong>Performance:</strong>
                <span className={`performance ${quizResults.score >= 80 ? 'excellent' : quizResults.score >= 60 ? 'good' : 'needs-improvement'}`}>
                  {quizResults.score >= 80 ? 'Excellent!' : quizResults.score >= 60 ? 'Good Job' : 'Keep Practicing'}
                </span>
              </div>
            </div>
          </div>

          <div className="results-actions">
            <button onClick={resetQuiz} className="btn btn-primary">
              Try Another Quiz
            </button>
            <button onClick={() => setActiveQuiz(null)} className="btn btn-secondary">
              Back to Quizzes
            </button>
          </div>
        </div>
      );
    }

    return (
      <div className="quiz-questions">
        <div className="quiz-header">
          <h3>{quiz.title}</h3>
          <div className="quiz-meta">
            <span className="questions-count">{questions.length} questions</span>
            <span className="quiz-time">{quiz.time} minutes</span>
          </div>
        </div>

        <div className="questions-list">
          {questions.map((q, idx) => (
            <div key={q.id} className="question-item">
              <div className="question-number">Q{idx + 1}</div>
              <div className="question-content">
                <p>{q.question}</p>
                <div className="options-grid">
                  {q.options.map((option, optIdx) => (
                    <label key={optIdx} className="option-label">
                      <input
                        type="radio"
                        name={`question-${q.id}`}
                        checked={quizAnswers[q.id] === option}
                        onChange={() => setQuizAnswers(prev => ({ ...prev, [q.id]: option }))}
                      />
                      <span className="option-text">{option}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="quiz-actions">
          <button onClick={submitQuiz} className="btn btn-primary">
            Submit Quiz
          </button>
          <button onClick={resetQuiz} className="btn btn-secondary">
            Cancel
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="quiz-container">
      <div className="quiz-header">
        <h2>
          <Zap size={24} />
          Quick Quizzes
        </h2>
        <p>Test specific SQL topics with these focused quizzes</p>
      </div>

      {!activeQuiz ? (
        <>
          <div className="quizzes-grid">
            {quizzes.map((quiz) => (
              <div 
                key={quiz.id} 
                className={`quiz-card ${quiz.completed ? 'completed' : ''}`}
                onClick={() => startQuiz(quiz.id)}
              >
                <div className="quiz-icon">{quiz.icon}</div>
                <div className="quiz-info">
                  <h4>{quiz.title}</h4>
                  <p>{quiz.description}</p>
                  <div className="quiz-meta">
                    <span className="meta-item">
                      <Target size={14} />
                      {quiz.questions} questions
                    </span>
                    <span className="meta-item">
                      <Clock size={14} />
                      {quiz.time} min
                    </span>
                    <span className={`difficulty-badge ${quiz.difficulty.toLowerCase()}`}>
                      {quiz.difficulty}
                    </span>
                  </div>
                </div>
                {quiz.completed && (
                  <div className="quiz-score">
                    <div className="score-badge">{quiz.score}%</div>
                    <TrendingUp size={16} color="var(--success-color)" />
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="quiz-stats">
            <h4>Your Quiz Statistics</h4>
            <div className="stats-grid">
              <div className="stat-item">
                <div className="stat-value">2</div>
                <div className="stat-label">Quizzes Completed</div>
              </div>
              <div className="stat-item">
                <div className="stat-value">87.5%</div>
                <div className="stat-label">Average Score</div>
              </div>
              <div className="stat-item">
                <div className="stat-value">25</div>
                <div className="stat-label">Total Questions</div>
              </div>
              <div className="stat-item">
                <div className="stat-value">45 min</div>
                <div className="stat-label">Time Spent</div>
              </div>
            </div>
          </div>
        </>
      ) : (
        renderQuizContent()
      )}
    </div>
  );
};

export default QuizSection;