import React from 'react';

const TopicList = ({ topics, progress, onSelectTopic, overallProgress }) => {
  const isTopicUnlocked = (topic, index) => {
    if (index === 0) return true;
    const prevTopic = topics[index - 1];
    return progress[prevTopic.id]?.topicCompleted;
  };

  const getTopicProgress = (topicId, lessonIds) => {
    if (!progress[topicId]) return { completed: 0, total: lessonIds.length, percentage: 0 };
    
    const completed = lessonIds.filter(lessonId => progress[topicId][lessonId]?.completed).length;
    const percentage = Math.round((completed / lessonIds.length) * 100);
    
    return { completed, total: lessonIds.length, percentage };
  };

  return (
    <div className="topics-container">
      <div className="topics-header">
        <h2>Java Learning Path</h2>
        <p>Complete topics in order to unlock the next ones!</p>
        
        <div className="progress-summary">
          <div className="progress-item">
            <div className="stats-value">{overallProgress.completedLessons}</div>
            <div className="stats-label">Lessons Completed</div>
          </div>
          <div className="progress-item">
            <div className="stats-value">{overallProgress.totalLessons}</div>
            <div className="stats-label">Total Lessons</div>
          </div>
          <div className="progress-item">
            <div className="stats-value">{overallProgress.percentage}%</div>
            <div className="stats-label">Overall Progress</div>
          </div>
        </div>
      </div>

      <div className="topics-grid">
        {topics.map((topic, index) => {
          const unlocked = isTopicUnlocked(topic, index);
          const topicProgress = getTopicProgress(topic.id, topic.lessonIds);
          const completed = progress[topic.id]?.topicCompleted;
          
          return (
            <div 
              key={topic.id}
              className={`topic-card ${!unlocked ? 'locked' : ''} ${completed ? 'completed' : ''}`}
              onClick={() => unlocked && onSelectTopic(topic.id)}
            >
              <div className="topic-header">
                <div className="topic-title">
                  <div className="topic-icon">
                    {topic.icon}
                  </div>
                  <div className="topic-name">
                    <h3>{topic.name}</h3>
                    <p>{topic.description}</p>
                  </div>
                </div>
                
                <div className="topic-progress">
                  <div className="progress-bar">
                    <div 
                      className="progress-fill" 
                      style={{ width: `${topicProgress.percentage}%` }}
                    ></div>
                  </div>
                  <div className="progress-text">
                    {topicProgress.completed}/{topicProgress.total} lessons
                  </div>
                </div>
              </div>
              
              <div className={`topic-status ${completed ? 'status-completed' : 'status-locked'}`}>
                {completed ? '✓ Completed' : unlocked ? 'Start Learning' : 'Locked'}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TopicList;