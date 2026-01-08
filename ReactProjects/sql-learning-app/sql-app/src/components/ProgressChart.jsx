const ProgressChart = ({ data, type = 'bar', title }) => {
  const maxValue = Math.max(...data.map(item => item.topics + item.challenges));
  
  return (
    <div className="progress-chart">
      <h4>{title}</h4>
      <div className="chart-container">
        {data.map((item, index) => (
          <div key={index} className="chart-item">
            <div className="chart-bars">
              <div 
                className="chart-bar topics-bar"
                style={{ height: `${(item.topics / maxValue) * 100}%` }}
                title={`${item.topics} topics`}
              ></div>
              <div 
                className="chart-bar challenges-bar"
                style={{ height: `${(item.challenges / maxValue) * 100}%` }}
                title={`${item.challenges} challenges`}
              ></div>
            </div>
            <div className="chart-label">{item.day}</div>
            <div className="chart-tooltip">
              <div>{item.day}</div>
              <div>Topics: {item.topics}</div>
              <div>Challenges: {item.challenges}</div>
              <div>Hours: {item.hours}</div>
            </div>
          </div>
        ))}
      </div>
      <div className="chart-legend">
        <div className="legend-item">
          <div className="legend-color topics-color"></div>
          <span>Topics</span>
        </div>
        <div className="legend-item">
          <div className="legend-color challenges-color"></div>
          <span>Challenges</span>
        </div>
      </div>
    </div>
  );
};

export default ProgressChart;