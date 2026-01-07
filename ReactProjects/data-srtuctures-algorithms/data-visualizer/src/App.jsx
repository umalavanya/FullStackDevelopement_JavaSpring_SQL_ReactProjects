// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation/Navigation';
import Home from './pages/Home';
import DataStructures from './pages/DataStructures';
import Algorithms from './pages/Algorithms';
import Practice from './pages/Practice';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app">
        <Navigation />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/data-structures" element={<DataStructures />} />
            <Route path="/algorithms" element={<Algorithms />} />
            <Route path="/practice" element={<Practice />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;