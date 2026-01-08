import { Heart, Code, Github, Linkedin, Mail, Globe } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="app-footer">
      <div className="footer-content">
        <div className="footer-section">
          <div className="footer-logo">
            <h3>SQL Master</h3>
            <p>Master SQL through interactive learning</p>
          </div>
          <p className="footer-description">
            An interactive platform for learning SQL with practical exercises, 
            real-world challenges, and comprehensive progress tracking.
          </p>
        </div>

        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul className="footer-links">
            <li><a href="/">Home</a></li>
            <li><a href="/learning-path">Learning Path</a></li>
            <li><a href="/practice">Practice</a></li>
            <li><a href="/self-evaluation">Self Evaluation</a></li>
            <li><a href="/progress">Progress</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Resources</h4>
          <ul className="footer-links">
            <li><a href="/docs">Documentation</a></li>
            <li><a href="/tutorials">Tutorials</a></li>
            <li><a href="/cheatsheet">SQL Cheat Sheet</a></li>
            <li><a href="/blog">Blog</a></li>
            <li><a href="/faq">FAQ</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Connect</h4>
          <div className="social-links">
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="social-link">
              <Github size={20} />
              <span>GitHub</span>
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="social-link">
              <Linkedin size={20} />
              <span>LinkedIn</span>
            </a>
            <a href="mailto:contact@sqlmaster.com" className="social-link">
              <Mail size={20} />
              <span>Email</span>
            </a>
            <a href="https://portfolio.com" target="_blank" rel="noopener noreferrer" className="social-link">
              <Globe size={20} />
              <span>Portfolio</span>
            </a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="copyright">
          <p>
            © {currentYear} SQL Master. Made with 
            <Heart size={14} className="heart-icon" /> 
            by 
            <span className="developer-name"> Uma Lavanya</span>
          </p>
          <p className="developer-info">
            <Code size={14} /> Full Stack Developer | Java Spring | SQL | React
          </p>
        </div>

        <div className="footer-legal">
          <a href="/privacy">Privacy Policy</a>
          <a href="/terms">Terms of Service</a>
          <a href="/cookies">Cookie Policy</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;