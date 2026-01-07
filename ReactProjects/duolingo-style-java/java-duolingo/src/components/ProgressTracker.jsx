import React from 'react';
import { javaTopics } from '../data/javaTopics';

const ProgressTracker = ({ progress, overallProgress, onReset, onContinue }) => {
  return (
    <div className="progress-tracker">
      <div className="progress-summary-card">
        <h2>Your Learning Progress</h2>
        
        <div className="progress-circle">
          <svg width="150" height="150" viewBox="0 0 150 150">
            <circle
              className="circle-bg"
              cx="75"
              cy="75"
              r="65"
            />
            <circle
              className="circle-progress"
              cx="75"
              cy="75"
              r="65"
              strokeDasharray="408.4"
              strokeDashoffset={408.4 - (overallProgress.percentage / 100) * 408.4}
            />
            <text x="75" y="80" textAnchor="middle" className="circle-text">
              {overallProgress.percentage}%
            </text>
          </svg>
        </div>
        
        <p>{overallProgress.completedLessons} of {overallProgress.totalLessons} lessons completed</p>
        <div className="streak">🔥 Current Streak: 7 days</div>
      </div>

      <div className="detailed-progress">
        <h3>Topic Progress</h3>
        {javaTopics.map(topic => {
          const topicProgress = progress[topic.id] || {};
          const completedLessons = topic.lessonIds.filter(
            lessonId => topicProgress[lessonId]?.completed
          ).length;
          const totalLessons = topic.lessonIds.length;
          const percentage = Math.round((completedLessons / totalLessons) * 100) || 0;
          
          return (
            <div key={topic.id} className="progress-item-detail">
              <div className="progress-topic">
                <div className="topic-icon">{topic.icon}</div>
                <div>
                  <h4>{topic.name}</h4>
                  <p>{completedLessons}/{totalLessons} lessons</p>
                </div>
              </div>
              <div className="progress-percentage">
                {percentage}%
              </div>
            </div>
          );
        })}
      </div>

      <div className="tracker-controls">
        <button onClick={onContinue} className="control-button primary">
          Continue Learning
        </button>
        <button onClick={onReset} className="control-button secondary">
          Reset Progress
        </button>
      </div>
    </div>
  );
};

export default ProgressTracker;