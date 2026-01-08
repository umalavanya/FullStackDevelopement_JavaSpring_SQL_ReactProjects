import { useState } from 'react';
import Roadmap from '../components/Roadmap';
import TopicViewer from '../components/TopicViewer';

const LearningPath = () => {
  const [userProgress, setUserProgress] = useState({
    completedTopics: [1], // Topic 1 is completed by default
    completedExercises: [],
    totalTimeSpent: 45
  });

  const [selectedTopic, setSelectedTopic] = useState(null);

  const handleTopicClick = (topic) => {
    setSelectedTopic(topic);
  };

  const handleCompleteTopic = (topicId) => {
    if (!userProgress.completedTopics.includes(topicId)) {
      setUserProgress(prev => ({
        ...prev,
        completedTopics: [...prev.completedTopics, topicId],
        totalTimeSpent: prev.totalTimeSpent + 30
      }));
    }
    setSelectedTopic(null);
  };

  return (
    <div className="container">
      <div className="page-header">
        <h1>Learning Path</h1>
        <p>Follow the roadmap to master SQL step by step</p>
      </div>

      <div className="progress-stats">
        <div className="stat-card">
          <div className="stat-value">{userProgress.completedTopics.length}</div>
          <div className="stat-label">Topics Completed</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{Math.floor(userProgress.totalTimeSpent / 60)}h {userProgress.totalTimeSpent % 60}m</div>
          <div className="stat-label">Time Spent</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">
            {Math.round((userProgress.completedTopics.length / 9) * 100)}%
          </div>
          <div className="stat-label">Overall Progress</div>
        </div>
      </div>

      <Roadmap 
        userProgress={userProgress} 
        onTopicClick={handleTopicClick}
      />

      {selectedTopic && (
        <TopicViewer
          topic={selectedTopic}
          onComplete={() => handleCompleteTopic(selectedTopic.id)}
          onClose={() => setSelectedTopic(null)}
        />
      )}
    </div>
  );
};

export default LearningPath;