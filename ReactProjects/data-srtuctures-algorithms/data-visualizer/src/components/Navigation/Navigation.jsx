// src/components/Navigation/Navigation.jsx
import { Link } from 'react-router-dom';
import { FaHome, FaCode, FaProjectDiagram, FaPlay } from 'react-icons/fa';
import '../../styles/Navigation.css';

const Navigation = () => {
  return (
    <nav className="navbar">
      <div className="nav-container">
        <div className="nav-brand">
          <h1>DSA Visualizer</h1>
        </div>
        <ul className="nav-menu">
          <li>
            <Link to="/">
              <FaHome /> Home
            </Link>
          </li>
          <li>
            <Link to="/data-structures">
              <FaProjectDiagram /> Data Structures
            </Link>
          </li>
          <li>
            <Link to="/algorithms">
              <FaCode /> Algorithms
            </Link>
          </li>
          <li>
            <Link to="/practice">
              <FaPlay /> Practice
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navigation;