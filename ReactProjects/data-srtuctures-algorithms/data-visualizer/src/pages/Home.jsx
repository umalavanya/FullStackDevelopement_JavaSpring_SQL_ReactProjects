// src/pages/Home.jsx
import { Link } from 'react-router-dom';
import { 
  FaLinkedinIn, 
  FaSortAmountUp, 
  FaSitemap, 
  FaChartBar 
} from 'react-icons/fa';
import '../Styles/Home.css';

const Home = () => {
  return (
    <div className="home-page">
      <section className="hero">
        <h1>Interactive Data Structures & Algorithms Visualizer</h1>
        <p>Learn and visualize complex DSA concepts with interactive examples</p>
      </section>

      <section className="features">
        <div className="feature-card">
          <FaSitemap className="feature-icon" />
          <h3>Data Structures</h3>
          <p>Visualize Arrays, Linked Lists, Trees, Graphs, and more</p>
          <Link to="/data-structures" className="feature-btn">Explore</Link>
        </div>

        <div className="feature-card">
          <FaSortAmountUp className="feature-icon" />
          <h3>Algorithms</h3>
          <p>Step-by-step visualization of sorting, searching, and graph algorithms</p>
          <Link to="/algorithms" className="feature-btn">Learn</Link>
        </div>

        <div className="feature-card">
          <FaLinkedinIn className="feature-icon" />
          <h3>Complexity Analysis</h3>
          <p>Understand time and space complexity with interactive charts</p>
          <Link to="/algorithms" className="feature-btn">Analyze</Link>
        </div>

        <div className="feature-card">
          <FaChartBar className="feature-icon" />
          <h3>Practice Problems</h3>
          <p>Test your knowledge with interactive coding challenges</p>
          <Link to="/practice" className="feature-btn">Practice</Link>
        </div>
      </section>
    </div>
  );
};

export default Home;