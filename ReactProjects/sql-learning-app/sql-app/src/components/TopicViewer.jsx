import { X, CheckCircle, BookOpen, Code } from 'lucide-react';

const TopicViewer = ({ topic, onComplete, onClose }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <div className="topic-header-info">
            <div className="topic-type-indicator">
              {topic.type === 'lesson' ? (
                <BookOpen size={20} />
              ) : (
                <Code size={20} />
              )}
              <span className="topic-type-badge">{topic.type}</span>
            </div>
            <h2>{topic.title}</h2>
            <p className="topic-subtitle">{topic.description}</p>
          </div>
          <button onClick={onClose} className="close-btn">
            <X size={24} />
          </button>
        </div>
        
        <div className="modal-body">
          <div className="topic-content">
            {topic.content && (
              <>
                <div className="section">
                  <h3>
                    <BookOpen size={18} />
                    Theory
                  </h3>
                  <div className="theory-content">
                    {topic.content.theory}
                  </div>
                </div>
                
                {topic.content.examples && topic.content.examples.length > 0 && (
                  <div className="section">
                    <h3>
                      <Code size={18} />
                      Examples
                    </h3>
                    <div className="examples">
                      {topic.content.examples.map((example, index) => (
                        <div key={index} className="example-block">
                          <div className="example-header">
                            <span>Example {index + 1}</span>
                          </div>
                          <pre className="code-block">
                            <code>{example}</code>
                          </pre>
                          <button 
                            className="copy-btn"
                            onClick={() => navigator.clipboard.writeText(example)}
                          >
                            Copy Code
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </>
            )}
            
            {topic.exercises && topic.exercises.length > 0 && (
              <div className="section">
                <h3>
                  <CheckCircle size={18} />
                  Practice Exercises
                </h3>
                <div className="exercises">
                  {topic.exercises.map((exercise, index) => (
                    <div key={index} className="exercise-item">
                      <div className="exercise-number">{index + 1}</div>
                      <div className="exercise-text">{exercise}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            <div className="topic-tips">
              <h4>💡 Tips</h4>
              <ul>
                <li>Try writing the SQL queries yourself</li>
                <li>Experiment with modifying the examples</li>
                <li>Take notes on important concepts</li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="modal-footer">
          <div className="footer-info">
            <span className="duration-badge">
              ⏱️ {topic.duration}
            </span>
          </div>
          <div className="footer-actions">
            <button onClick={onClose} className="btn btn-secondary">
              Close
            </button>
            <button onClick={onComplete} className="btn btn-primary complete-btn">
              <CheckCircle size={20} />
              Mark as Complete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopicViewer;