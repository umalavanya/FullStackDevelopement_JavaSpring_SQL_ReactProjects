import { sqlCurriculum } from '../data/sqlCurriculum';
import { CheckCircle, Lock, PlayCircle } from 'lucide-react';

const Roadmap = ({ userProgress, onTopicClick }) => {
  const isTopicAccessible = (topic, moduleIndex, topicIndex) => {
    // First topic of first module is always accessible
    if (moduleIndex === 0 && topicIndex === 0) return true;
    
    // Check if previous topic is completed
    if (topicIndex > 0) {
      const prevTopic = sqlCurriculum.modules[moduleIndex].topics[topicIndex - 1];
      return userProgress.completedTopics.includes(prevTopic.id);
    }
    
    // Check if previous module's last topic is completed
    if (moduleIndex > 0) {
      const prevModule = sqlCurriculum.modules[moduleIndex - 1];
      const lastTopicId = prevModule.topics[prevModule.topics.length - 1].id;
      return userProgress.completedTopics.includes(lastTopicId);
    }
    
    return false;
  };

  return (
    <div className="roadmap-container">
      {sqlCurriculum.modules.map((module, moduleIndex) => (
        <div key={module.id} className="module-section">
          <div className="module-header" style={{ borderLeftColor: module.color }}>
            <div className="module-icon" style={{ backgroundColor: module.color }}>
              {module.icon}
            </div>
            <div>
              <h3>{module.title}</h3>
              <p className="module-description">{module.description}</p>
            </div>
          </div>
          
          <div className="topics-path">
            {module.topics.map((topic, topicIndex) => {
              const isCompleted = userProgress.completedTopics.includes(topic.id);
              const isAccessible = isTopicAccessible(topic, moduleIndex, topicIndex);
              const isLocked = !isAccessible && !isCompleted;
              
              return (
                <div key={topic.id} className="topic-node-wrapper">
                  {/* Connection line */}
                  {topicIndex > 0 && (
                    <div className={`connection-line ${isCompleted ? 'completed' : ''}`}></div>
                  )}
                  
                  <div 
                    className={`topic-node ${isCompleted ? 'completed' : ''} ${isLocked ? 'locked' : 'accessible'}`}
                    onClick={() => !isLocked && onTopicClick(topic)}
                    style={{ 
                      cursor: isLocked ? 'not-allowed' : 'pointer',
                      backgroundColor: isCompleted ? module.color : 'var(--card-bg)'
                    }}
                  >
                    <div className="topic-icon">
                      {isCompleted ? (
                        <CheckCircle size={20} />
                      ) : isLocked ? (
                        <Lock size={20} />
                      ) : (
                        <PlayCircle size={20} />
                      )}
                    </div>
                    <div className="topic-info">
                      <h4>{topic.title}</h4>
                      <p>{topic.description}</p>
                      <div className="topic-meta">
                        <span className="topic-type">{topic.type}</span>
                        <span className="topic-duration">{topic.duration}</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          
          {/* Module connector */}
          {moduleIndex < sqlCurriculum.modules.length - 1 && (
            <div className="module-connector">
              <div className="connector-line"></div>
              <div className="connector-arrow">↓</div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Roadmap;