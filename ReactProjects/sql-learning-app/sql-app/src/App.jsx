import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import './styles/global.css';
import Dashboard from './pages/Dashboard';
import LearningPath from './pages/LearningPath';
import Practice from './pages/Practice';
import Progress from './pages/Progress';
import Layout from './components/Layout';

function App() {
  return (
    <ThemeProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/learning-path" element={<LearningPath />} />
            <Route path="/practice" element={<Practice />} />
            <Route path="/progress" element={<Progress />} />
          </Routes>
        </Layout>
      </Router>
    </ThemeProvider>
  );
}

export default App;