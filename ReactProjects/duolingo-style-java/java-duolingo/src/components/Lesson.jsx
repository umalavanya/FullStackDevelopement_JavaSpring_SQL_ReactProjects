import React, { useState, useEffect } from 'react';

const Lesson = ({ topicId, lessons, progress, onComplete, onBack }) => {
  const [currentLessonIndex, setCurrentLessonIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [score, setScore] = useState(0);
  const [lessonCompleted, setLessonCompleted] = useState(false);

  const currentLesson = lessons[currentLessonIndex];
  const isLastLesson = currentLessonIndex === lessons.length - 1;

  useEffect(() => {
    // Reset state when lesson changes
    setSelectedOption(null);
    setShowFeedback(false);
    setLessonCompleted(false);
  }, [currentLessonIndex]);

  const handleOptionSelect = (optionId) => {
    if (showFeedback) return;
    setSelectedOption(optionId);
  };

  const checkAnswer = () => {
    const correct = selectedOption === currentLesson.correctAnswer;
    setIsCorrect(correct);
    setShowFeedback(true);
    
    if (correct) {
      const points = 10 + (Math.random() * 5); // 10-15 points
      setScore(prev => Math.round(prev + points));
    }
  };

  const handleNext = () => {
    if (!isLastLesson) {
      setCurrentLessonIndex(prev => prev + 1);
    } else {
      setLessonCompleted(true);
    }
  };

  const handleCompleteTopic = () => {
    onComplete(topicId, currentLesson.id, score);
  };

  if (!currentLesson) {
    return (
      <div className="lesson-container">
        <p>No lessons available for this topic.</p>
        <button onClick={onBack} className="control-button secondary">Back to Topics</button>
      </div>
    );
  }

  if (lessonCompleted) {
    return (
      <div className="lesson-container">
        <div className="lesson-complete">
          <h2>🎉 Lesson Complete!</h2>
          <p>Great job! You've completed this lesson.</p>
          <div className="score-display">+{score} XP</div>
          <p className="streak-added">🔥 +1 to your streak!</p>
          <button 
            onClick={handleCompleteTopic}
            className="control-button primary"
          >
            {isLastLesson ? 'Complete Topic' : 'Continue'}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="lesson-container">
      <div className="lesson-header">
        <button onClick={onBack} className="back-button">
          ← Back to Topics
        </button>
        <div className="lesson-progress">
          Lesson {currentLessonIndex + 1} of {lessons.length}
        </div>
      </div>

      <div className="lesson-content">
        <div className="content-section">
          <h3>{currentLesson.title}</h3>
          <div className="explanation-text">
            {currentLesson.content}
          </div>
          
          {currentLesson.codeExample && (
            <pre className="code-block">
              <code>{currentLesson.codeExample}</code>
            </pre>
          )}
          
          {currentLesson.example && (
            <div className="example">
              <p><strong>Example:</strong> {currentLesson.example}</p>
            </div>
          )}
        </div>

        <div className="quiz-section">
          <div className="quiz-question">{currentLesson.question}</div>
          
          <div className="quiz-options">
            {currentLesson.options.map((option, index) => {
              const optionId = index + 1;
              let optionClass = 'quiz-option';
              if (selectedOption === optionId) optionClass += ' selected';
              if (showFeedback) {
                if (optionId === currentLesson.correctAnswer) {
                  optionClass += ' correct';
                } else if (selectedOption === optionId && !isCorrect) {
                  optionClass += ' incorrect';
                }
              }
              
              return (
                <button
                  key={optionId}
                  className={optionClass}
                  onClick={() => handleOptionSelect(optionId)}
                  disabled={showFeedback}
                >
                  {option}
                </button>
              );
            })}
          </div>

          {showFeedback && (
            <div className={`quiz-feedback ${isCorrect ? 'feedback-correct' : 'feedback-incorrect'}`}>
              {isCorrect ? '✅ Correct! Well done!' : '❌ Not quite right. Try again!'}
              {!isCorrect && <p style={{ marginTop: '0.5rem' }}>The correct answer is: {currentLesson.options[currentLesson.correctAnswer - 1]}</p>}
            </div>
          )}

          <div className="quiz-controls">
            {!showFeedback ? (
              <button
                onClick={checkAnswer}
                disabled={!selectedOption}
                className="control-button primary"
              >
                Check Answer
              </button>
            ) : (
              <button
                onClick={handleNext}
                className="control-button primary"
              >
                {isLastLesson ? 'Complete Lesson' : 'Next Lesson →'}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Lesson;