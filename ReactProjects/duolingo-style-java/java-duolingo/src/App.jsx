import React, { useState, useEffect } from 'react';
import './App.css';
import TopicList from './components/TopicList';
import Lesson from './components/Lesson';
import ProgressTracker from './components/ProgressTracker';
import { javaTopics, lessonsData } from './data/javaTopics';

function App() {
  const [currentTopic, setCurrentTopic] = useState(null);
  const [progress, setProgress] = useState(() => {
    const saved = localStorage.getItem('java-learning-progress');
    return saved ? JSON.parse(saved) : {};
  });
  const [showProgress, setShowProgress] = useState(false);

  // Save progress to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('java-learning-progress', JSON.stringify(progress));
  }, [progress]);

  const startTopic = (topicId) => {
    setCurrentTopic(topicId);
    setShowProgress(false);
  };

  const completeLesson = (topicId, lessonId, score) => {
    const newProgress = { ...progress };
    if (!newProgress[topicId]) {
      newProgress[topicId] = {};
    }
    newProgress[topicId][lessonId] = {
      completed: true,
      score: score,
      completedAt: new Date().toISOString()
    };
    
    // Check if all lessons in topic are completed
    const topic = javaTopics.find(t => t.id === topicId);
    if (topic) {
      const allCompleted = topic.lessonIds.every(lessonId => newProgress[topicId]?.[lessonId]?.completed);
      if (allCompleted && !newProgress[topicId].topicCompleted) {
        newProgress[topicId].topicCompleted = true;
        // Unlock next topic if exists
        const currentIndex = javaTopics.findIndex(t => t.id === topicId);
        if (currentIndex < javaTopics.length - 1) {
          const nextTopic = javaTopics[currentIndex + 1];
          if (!newProgress[nextTopic.id]) {
            newProgress[nextTopic.id] = { unlocked: true };
          }
        }
      }
    }
    
    setProgress(newProgress);
  };

  const resetProgress = () => {
    if (window.confirm('Are you sure you want to reset all progress?')) {
      setProgress({});
      setCurrentTopic(null);
    }
  };

  const getOverallProgress = () => {
    let completedLessons = 0;
    let totalLessons = 0;
    
    javaTopics.forEach(topic => {
      totalLessons += topic.lessonIds.length;
      if (progress[topic.id]) {
        topic.lessonIds.forEach(lessonId => {
          if (progress[topic.id][lessonId]?.completed) {
            completedLessons++;
          }
        });
      }
    });
    
    return {
      completedLessons,
      totalLessons,
      percentage: Math.round((completedLessons / totalLessons) * 100) || 0
    };
  };

  return (
    <div className="app">
      <header className="app-header">
        <div className="header-content">
          <h1>🐜 Java Path</h1>
          <p className="subtitle">Learn Java like a Duolingo!</p>
        </div>
        <div className="header-stats" onClick={() => setShowProgress(!showProgress)}>
          <div className="stats-item">
            <span className="stats-value">{getOverallProgress().percentage}%</span>
            <span className="stats-label">Complete</span>
          </div>
          <div className="streak">🔥 7 day streak</div>
        </div>
      </header>

      <main className="app-main">
        {showProgress ? (
          <ProgressTracker 
            progress={progress} 
            overallProgress={getOverallProgress()}
            onReset={resetProgress}
            onContinue={() => setShowProgress(false)}
          />
        ) : currentTopic ? (
          <Lesson
            topicId={currentTopic}
            lessons={lessonsData[currentTopic] || []}
            progress={progress[currentTopic] || {}}
            onComplete={completeLesson}
            onBack={() => setCurrentTopic(null)}
          />
        ) : (
          <TopicList
            topics={javaTopics}
            progress={progress}
            onSelectTopic={startTopic}
            overallProgress={getOverallProgress()}
          />
        )}
      </main>

      <footer className="app-footer">
        <p>Keep coding daily to maintain your streak! 🚀</p>
      </footer>
    </div>
  );
}

export default App;