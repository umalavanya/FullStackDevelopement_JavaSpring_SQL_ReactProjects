import { useState } from 'react';
import { Brain, BookOpen, Clock, Award, BarChart, CheckCircle, XCircle } from 'lucide-react';
import LeetCodeProblems from '../components/self-evaluation/LeetCodeProblems';
import QuestionsAnswers from '../components/self-evaluation/QuestionsAnswers';
import MockExam from '../components/self-evaluation/MockExam';
import QuizSection from '../components/self-evaluation/QuizSection';

const SelfEvaluation = () => {
  const [activeTab, setActiveTab] = useState('leetcode');

  const tabs = [
    { id: 'leetcode', label: 'LeetCode Problems', icon: Brain },
    { id: 'qa', label: 'Q&A Section', icon: BookOpen },
    { id: 'exam', label: 'Mock Exam', icon: Clock },
    { id: 'quiz', label: 'Quick Quizzes', icon: Award },
  ];

  const stats = {
    totalProblems: 25,
    solvedProblems: 3,
    averageScore: 65,
    streak: 2,
  };

  return (
    <div className="container">
      <div className="page-header">
        <h1>Self Evaluation</h1>
        <p>Test your SQL knowledge with various challenges and assessments</p>
      </div>

      <div className="stats-grid">
        <div className="stat-card-eval">
          <div className="stat-icon-eval">
            <Brain size={24} />
          </div>
          <div className="stat-content">
            <div className="stat-value-eval">{stats.solvedProblems}/{stats.totalProblems}</div>
            <div className="stat-label-eval">Problems Solved</div>
          </div>
        </div>
        
        <div className="stat-card-eval">
          <div className="stat-icon-eval">
            <BarChart size={24} />
          </div>
          <div className="stat-content">
            <div className="stat-value-eval">{stats.averageScore}%</div>
            <div className="stat-label-eval">Average Score</div>
          </div>
        </div>
        
        <div className="stat-card-eval">
          <div className="stat-icon-eval">
            <Award size={24} />
          </div>
          <div className="stat-content">
            <div className="stat-value-eval">{stats.streak} days</div>
            <div className="stat-label-eval">Practice Streak</div>
          </div>
        </div>
        
        <div className="stat-card-eval">
          <div className="stat-icon-eval">
            <Clock size={24} />
          </div>
          <div className="stat-content">
            <div className="stat-value-eval">02:30</div>
            <div className="stat-label-eval">Avg. Time/Problem</div>
          </div>
        </div>
      </div>

      <div className="eval-tabs">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              className={`eval-tab ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              <Icon size={20} />
              {tab.label}
            </button>
          );
        })}
      </div>

      <div className="eval-content">
        {activeTab === 'leetcode' && <LeetCodeProblems />}
        {activeTab === 'qa' && <QuestionsAnswers />}
        {activeTab === 'exam' && <MockExam />}
        {activeTab === 'quiz' && <QuizSection />}
      </div>

      <div className="eval-tips">
        <h3>💡 Tips for Effective Self-Evaluation</h3>
        <div className="tips-grid">
          <div className="tip-card">
            <CheckCircle size={20} color="var(--success-color)" />
            <h4>Consistent Practice</h4>
            <p>Solve at least one problem daily to build muscle memory</p>
          </div>
          <div className="tip-card">
            <Clock size={20} color="var(--warning-color)" />
            <h4>Time Management</h4>
            <p>Practice with time limits to simulate real interviews</p>
          </div>
          <div className="tip-card">
            <BookOpen size={20} color="var(--primary-color)" />
            <h4>Review Solutions</h4>
            <p>Always review optimal solutions to learn better approaches</p>
          </div>
          <div className="tip-card">
            <BarChart size={20} color="var(--accent-color)" />
            <h4>Track Progress</h4>
            <p>Monitor your improvement areas and focus on weaknesses</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SelfEvaluation;