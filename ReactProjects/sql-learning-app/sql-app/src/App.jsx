import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './components/PrivateRoute';
import './styles/global.css';

// Pages
import Dashboard from './pages/Dashboard';
import LearningPath from './pages/LearningPath';
import Practice from './pages/Practice';
import Progress from './pages/Progress';
import SelfEvaluation from './pages/SelfEvaluation';
import Login from './pages/Login';
import Profile from './pages/Profile';

// Layout Components
import MainLayout from './components/MainLayout';
import AuthLayout from './components/AuthLayout';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <Routes>
            {/* Auth routes (no header/footer) */}
            <Route element={<AuthLayout />}>
              <Route path="/login" element={<Login />} />
            </Route>

            {/* Protected routes with main layout */}
            <Route element={<PrivateRoute><MainLayout /></PrivateRoute>}>
              <Route path="/" element={<Dashboard />} />
              <Route path="/learning-path" element={<LearningPath />} />
              <Route path="/practice" element={<Practice />} />
              <Route path="/progress" element={<Progress />} />
              <Route path="/self-evaluation" element={<SelfEvaluation />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/settings" element={<div>Settings Page</div>} />
            </Route>

            {/* Catch all route */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;