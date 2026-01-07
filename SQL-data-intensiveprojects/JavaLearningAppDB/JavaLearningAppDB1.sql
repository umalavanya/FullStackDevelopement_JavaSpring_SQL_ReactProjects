-- Create the database
CREATE DATABASE JavaLearningDB;
GO

USE JavaLearningDB;
GO

-- Table: Users (for future authentication/expansion)
CREATE TABLE Users (
    UserID INT IDENTITY(1,1) PRIMARY KEY,
    Username NVARCHAR(50) UNIQUE NOT NULL,
    Email NVARCHAR(100) UNIQUE NOT NULL,
    PasswordHash NVARCHAR(255), -- For future authentication
    StreakDays INT DEFAULT 0,
    TotalXP INT DEFAULT 0,
    CreatedAt DATETIME DEFAULT GETDATE(),
    LastLogin DATETIME,
    IsActive BIT DEFAULT 1
);
GO

-- Table: Topics
CREATE TABLE Topics (
    TopicID INT IDENTITY(1,1) PRIMARY KEY,
    TopicName NVARCHAR(100) NOT NULL,
    TopicDescription NVARCHAR(500),
    Icon NVARCHAR(20),
    DisplayOrder INT NOT NULL,
    IsActive BIT DEFAULT 1,
    CreatedAt DATETIME DEFAULT GETDATE(),
    UpdatedAt DATETIME DEFAULT GETDATE()
);
GO

-- Table: Lessons
CREATE TABLE Lessons (
    LessonID INT IDENTITY(1,1) PRIMARY KEY,
    TopicID INT NOT NULL,
    LessonTitle NVARCHAR(200) NOT NULL,
    LessonContent NVARCHAR(MAX),
    CodeExample NVARCHAR(MAX),
    ExampleText NVARCHAR(500),
    DisplayOrder INT NOT NULL,
    DifficultyLevel INT DEFAULT 1, -- 1: Beginner, 2: Intermediate, 3: Advanced
    EstimatedMinutes INT DEFAULT 10,
    IsActive BIT DEFAULT 1,
    CreatedAt DATETIME DEFAULT GETDATE(),
    UpdatedAt DATETIME DEFAULT GETDATE(),
    FOREIGN KEY (TopicID) REFERENCES Topics(TopicID) ON DELETE CASCADE
);
GO

-- Table: QuizQuestions
CREATE TABLE QuizQuestions (
    QuestionID INT IDENTITY(1,1) PRIMARY KEY,
    LessonID INT NOT NULL,
    QuestionText NVARCHAR(MAX) NOT NULL,
    QuestionType NVARCHAR(20) DEFAULT 'multiple-choice', -- 'multiple-choice', 'code-completion', 'true-false'
    Points INT DEFAULT 10,
    DisplayOrder INT NOT NULL,
    IsActive BIT DEFAULT 1,
    CreatedAt DATETIME DEFAULT GETDATE(),
    FOREIGN KEY (LessonID) REFERENCES Lessons(LessonID) ON DELETE CASCADE
);
GO

-- Table: QuestionOptions
CREATE TABLE QuestionOptions (
    OptionID INT IDENTITY(1,1) PRIMARY KEY,
    QuestionID INT NOT NULL,
    OptionText NVARCHAR(MAX) NOT NULL,
    IsCorrect BIT DEFAULT 0,
    DisplayOrder INT NOT NULL,
    CreatedAt DATETIME DEFAULT GETDATE(),
    FOREIGN KEY (QuestionID) REFERENCES QuizQuestions(QuestionID) ON DELETE CASCADE
);
GO

-- Table: UserProgress (Track overall user progress)
CREATE TABLE UserProgress (
    ProgressID INT IDENTITY(1,1) PRIMARY KEY,
    UserID INT NOT NULL,
    TopicID INT NOT NULL,
    LessonID INT NOT NULL,
    QuestionID INT,
    IsCompleted BIT DEFAULT 0,
    Score INT DEFAULT 0,
    Attempts INT DEFAULT 0,
    LastAttempt DATETIME,
    CompletedAt DATETIME,
    TimeSpentSeconds INT DEFAULT 0,
    FOREIGN KEY (UserID) REFERENCES Users(UserID),
    FOREIGN KEY (TopicID) REFERENCES Topics(TopicID),
    FOREIGN KEY (LessonID) REFERENCES Lessons(LessonID),
    FOREIGN KEY (QuestionID) REFERENCES QuizQuestions(QuestionID)
);
GO

-- Table: UserStreaks (Track daily learning streaks)
CREATE TABLE UserStreaks (
    StreakID INT IDENTITY(1,1) PRIMARY KEY,
    UserID INT NOT NULL,
    CurrentStreak INT DEFAULT 0,
    LongestStreak INT DEFAULT 0,
    LastLearningDate DATE,
    CreatedAt DATETIME DEFAULT GETDATE(),
    UpdatedAt DATETIME DEFAULT GETDATE(),
    FOREIGN KEY (UserID) REFERENCES Users(UserID)
);
GO

-- Table: UserAchievements (For gamification)
CREATE TABLE UserAchievements (
    AchievementID INT IDENTITY(1,1) PRIMARY KEY,
    UserID INT NOT NULL,
    AchievementType NVARCHAR(50), -- 'topic_complete', 'streak_7', 'perfect_score', etc.
    AchievementName NVARCHAR(100),
    AchievementDescription NVARCHAR(500),
    AchievedAt DATETIME DEFAULT GETDATE(),
    FOREIGN KEY (UserID) REFERENCES Users(UserID)
);
GO

-- Table: DailyGoals
CREATE TABLE DailyGoals (
    GoalID INT IDENTITY(1,1) PRIMARY KEY,
    UserID INT NOT NULL,
    TargetLessons INT DEFAULT 1,
    CurrentLessons INT DEFAULT 0,
    GoalDate DATE DEFAULT CAST(GETDATE() AS DATE),
    IsCompleted BIT DEFAULT 0,
    CreatedAt DATETIME DEFAULT GETDATE(),
    FOREIGN KEY (UserID) REFERENCES Users(UserID)
);
GO

-- Create indexes for better query performance
CREATE INDEX IX_Topics_DisplayOrder ON Topics(DisplayOrder);
CREATE INDEX IX_Lessons_TopicID_DisplayOrder ON Lessons(TopicID, DisplayOrder);
CREATE INDEX IX_QuizQuestions_LessonID ON QuizQuestions(LessonID);
CREATE INDEX IX_QuestionOptions_QuestionID ON QuestionOptions(QuestionID);
CREATE INDEX IX_UserProgress_UserID_TopicID ON UserProgress(UserID, TopicID);
CREATE INDEX IX_UserProgress_UserID_LessonID ON UserProgress(UserID, LessonID);
CREATE INDEX IX_UserProgress_UserID_CompletedAt ON UserProgress(UserID, CompletedAt);
CREATE INDEX IX_UserStreaks_UserID ON UserStreaks(UserID);
CREATE INDEX IX_DailyGoals_UserID_GoalDate ON DailyGoals(UserID, GoalDate);
GO