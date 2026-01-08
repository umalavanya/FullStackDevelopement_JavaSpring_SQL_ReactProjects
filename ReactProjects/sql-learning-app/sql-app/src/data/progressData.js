export const progressData = {
  userStats: {
    totalTopics: 9,
    completedTopics: 1,
    totalChallenges: 12,
    completedChallenges: 0,
    totalHours: 1,
    streakDays: 1,
    accuracyRate: 0,
    lastActive: new Date().toISOString(),
  },
  
  weeklyActivity: [
    { day: 'Mon', topics: 1, challenges: 0, hours: 0.5 },
    { day: 'Tue', topics: 0, challenges: 0, hours: 0 },
    { day: 'Wed', topics: 0, challenges: 0, hours: 0 },
    { day: 'Thu', topics: 0, challenges: 0, hours: 0 },
    { day: 'Fri', topics: 0, challenges: 0, hours: 0 },
    { day: 'Sat', topics: 0, challenges: 0, hours: 0 },
    { day: 'Sun', topics: 0, challenges: 0, hours: 0.5 },
  ],
  
  skillProgress: [
    { skill: 'SELECT Queries', level: 1, progress: 80 },
    { skill: 'WHERE Clause', level: 1, progress: 40 },
    { skill: 'JOIN Operations', level: 0, progress: 0 },
    { skill: 'Aggregations', level: 0, progress: 0 },
    { skill: 'Subqueries', level: 0, progress: 0 },
    { skill: 'Indexes', level: 0, progress: 0 },
  ],
  
  achievements: [
    { id: 1, name: 'First Query', description: 'Run your first SQL query', icon: '🚀', earned: true, date: new Date().toISOString() },
    { id: 2, name: 'Quick Learner', description: 'Complete 3 topics in one day', icon: '⚡', earned: false },
    { id: 3, name: 'SQL Explorer', description: 'Try all sample databases', icon: '🧭', earned: false },
    { id: 4, name: 'Challenge Master', description: 'Complete 5 challenges', icon: '🏆', earned: false },
    { id: 5, name: 'Perfect Week', description: 'Practice for 7 days straight', icon: '📅', earned: false },
    { id: 6, name: 'Data Wizard', description: 'Master all SQL skills', icon: '🧙', earned: false },
  ],
  
  recentActivity: [
    { type: 'topic', title: 'What is SQL?', action: 'completed', time: '2 hours ago' },
    { type: 'practice', title: 'SELECT Statement', action: 'attempted', time: '1 hour ago' },
    { type: 'challenge', title: 'Basic Queries', action: 'started', time: '30 minutes ago' },
  ],
};

export const calculateStats = (userProgress) => {
  return {
    ...progressData.userStats,
    completedTopics: userProgress.completedTopics.length,
    completionRate: Math.round((userProgress.completedTopics.length / progressData.userStats.totalTopics) * 100),
  };
};