-- Stored Procedure: Get User Progress Summary
CREATE PROCEDURE GetUserProgressSummary
    @UserID INT
AS
BEGIN
    SELECT 
        u.UserID,
        u.Username,
        u.TotalXP,
        u.StreakDays,
        us.CurrentStreak,
        us.LongestStreak,
        COUNT(DISTINCT up.TopicID) as TopicsStarted,
        COUNT(DISTINCT CASE WHEN up.IsCompleted = 1 THEN up.LessonID END) as LessonsCompleted,
        SUM(CASE WHEN up.IsCompleted = 1 THEN up.Score ELSE 0 END) as TotalScore,
        SUM(up.TimeSpentSeconds) as TotalTimeSpentSeconds
    FROM Users u
    LEFT JOIN UserProgress up ON u.UserID = up.UserID
    LEFT JOIN UserStreaks us ON u.UserID = us.UserID
    WHERE u.UserID = @UserID
    GROUP BY u.UserID, u.Username, u.TotalXP, u.StreakDays, us.CurrentStreak, us.LongestStreak;
END
GO

-- Stored Procedure: Get Topic Progress for User
CREATE PROCEDURE GetUserTopicProgress
    @UserID INT,
    @TopicID INT = NULL
AS
BEGIN
    SELECT 
        t.TopicID,
        t.TopicName,
        t.Icon,
        COUNT(DISTINCT l.LessonID) as TotalLessons,
        COUNT(DISTINCT CASE WHEN up.IsCompleted = 1 THEN up.LessonID END) as CompletedLessons,
        CASE 
            WHEN COUNT(DISTINCT l.LessonID) > 0 
            THEN CAST(COUNT(DISTINCT CASE WHEN up.IsCompleted = 1 THEN up.LessonID END) AS FLOAT) / COUNT(DISTINCT l.LessonID) * 100
            ELSE 0 
        END as CompletionPercentage,
        MAX(up.CompletedAt) as LastCompletedDate
    FROM Topics t
    LEFT JOIN Lessons l ON t.TopicID = l.TopicID
    LEFT JOIN UserProgress up ON l.LessonID = up.LessonID AND up.UserID = @UserID
    WHERE t.IsActive = 1
        AND (@TopicID IS NULL OR t.TopicID = @TopicID)
    GROUP BY t.TopicID, t.TopicName, t.Icon
    ORDER BY t.DisplayOrder;
END
GO

-- Stored Procedure: Record Lesson Completion
CREATE PROCEDURE RecordLessonCompletion
    @UserID INT,
    @LessonID INT,
    @Score INT,
    @TimeSpentSeconds INT
AS
BEGIN
    BEGIN TRY
        BEGIN TRANSACTION;
        
        -- Update or insert progress
        IF EXISTS (SELECT 1 FROM UserProgress WHERE UserID = @UserID AND LessonID = @LessonID)
        BEGIN
            UPDATE UserProgress 
            SET IsCompleted = 1,
                Score = @Score,
                Attempts = Attempts + 1,
                LastAttempt = GETDATE(),
                CompletedAt = GETDATE(),
                TimeSpentSeconds = TimeSpentSeconds + @TimeSpentSeconds
            WHERE UserID = @UserID AND LessonID = @LessonID;
        END
        ELSE
        BEGIN
            DECLARE @TopicID INT = (SELECT TopicID FROM Lessons WHERE LessonID = @LessonID);
            
            INSERT INTO UserProgress (UserID, TopicID, LessonID, IsCompleted, Score, Attempts, LastAttempt, CompletedAt, TimeSpentSeconds)
            VALUES (@UserID, @TopicID, @LessonID, 1, @Score, 1, GETDATE(), GETDATE(), @TimeSpentSeconds);
        END
        
        -- Update user total XP
        UPDATE Users 
        SET TotalXP = TotalXP + @Score,
            StreakDays = StreakDays + 1  -- Simple streak update, you might want more complex logic
        WHERE UserID = @UserID;
        
        -- Update streak information
        IF EXISTS (SELECT 1 FROM UserStreaks WHERE UserID = @UserID)
        BEGIN
            UPDATE UserStreaks 
            SET CurrentStreak = CurrentStreak + 1,
                LongestStreak = CASE WHEN CurrentStreak + 1 > LongestStreak THEN CurrentStreak + 1 ELSE LongestStreak END,
                LastLearningDate = CAST(GETDATE() AS DATE),
                UpdatedAt = GETDATE()
            WHERE UserID = @UserID;
        END
        ELSE
        BEGIN
            INSERT INTO UserStreaks (UserID, CurrentStreak, LongestStreak, LastLearningDate)
            VALUES (@UserID, 1, 1, CAST(GETDATE() AS DATE));
        END
        
        -- Check for achievements
        DECLARE @LessonsCompleted INT;
        SELECT @LessonsCompleted = COUNT(*) 
        FROM UserProgress 
        WHERE UserID = @UserID AND IsCompleted = 1;
        
        IF @LessonsCompleted = 1
        BEGIN
            INSERT INTO UserAchievements (UserID, AchievementType, AchievementName, AchievementDescription)
            VALUES (@UserID, 'first_lesson', 'First Lesson Complete!', 'Completed your first Java lesson');
        END
        
        IF @LessonsCompleted = 5
        BEGIN
            INSERT INTO UserAchievements (UserID, AchievementType, AchievementName, AchievementDescription)
            VALUES (@UserID, 'five_lessons', 'Quick Learner', 'Completed 5 lessons');
        END
        
        COMMIT TRANSACTION;
        
        SELECT 'Success' as Status, 'Lesson completion recorded' as Message;
    END TRY
    BEGIN CATCH
        ROLLBACK TRANSACTION;
        SELECT 'Error' as Status, ERROR_MESSAGE() as Message;
    END CATCH
END
GO

-- Stored Procedure: Get Next Lesson for User
CREATE PROCEDURE GetNextLesson
    @UserID INT
AS
BEGIN
    -- Find the first incomplete lesson in the first incomplete topic
    SELECT TOP 1 
        t.TopicID,
        t.TopicName,
        l.LessonID,
        l.LessonTitle,
        l.DisplayOrder as LessonOrder
    FROM Topics t
    INNER JOIN Lessons l ON t.TopicID = l.TopicID
    WHERE t.IsActive = 1
        AND l.IsActive = 1
        AND l.LessonID NOT IN (
            SELECT LessonID 
            FROM UserProgress 
            WHERE UserID = @UserID AND IsCompleted = 1
        )
        AND t.TopicID NOT IN (
            -- Only include topics where all previous topics are completed
            SELECT t2.TopicID
            FROM Topics t2
            WHERE EXISTS (
                SELECT 1
                FROM Topics t3
                WHERE t3.DisplayOrder < t2.DisplayOrder
                    AND t3.TopicID NOT IN (
                        SELECT up.TopicID
                        FROM UserProgress up
                        WHERE up.UserID = @UserID
                        GROUP BY up.TopicID
                        HAVING COUNT(DISTINCT CASE WHEN up.IsCompleted = 1 THEN up.LessonID END) = (
                            SELECT COUNT(*) 
                            FROM Lessons l3 
                            WHERE l3.TopicID = up.TopicID
                        )
                    )
            )
        )
    ORDER BY t.DisplayOrder, l.DisplayOrder;
END
GO

-- Stored Procedure: Get Lesson with Questions
CREATE PROCEDURE GetLessonWithQuestions
    @LessonID INT
AS
BEGIN
    -- Get lesson details
    SELECT 
        l.LessonID,
        l.LessonTitle,
        l.LessonContent,
        l.CodeExample,
        l.ExampleText,
        l.DifficultyLevel,
        l.EstimatedMinutes,
        t.TopicName,
        t.Icon
    FROM Lessons l
    INNER JOIN Topics t ON l.TopicID = t.TopicID
    WHERE l.LessonID = @LessonID;
    
    -- Get quiz questions for this lesson
    SELECT 
        q.QuestionID,
        q.QuestionText,
        q.QuestionType,
        q.Points,
        q.DisplayOrder
    FROM QuizQuestions q
    WHERE q.LessonID = @LessonID
    ORDER BY q.DisplayOrder;
    
    -- Get options for each question
    SELECT 
        qo.QuestionID,
        qo.OptionID,
        qo.OptionText,
        qo.DisplayOrder
    FROM QuestionOptions qo
    INNER JOIN QuizQuestions q ON qo.QuestionID = q.QuestionID
    WHERE q.LessonID = @LessonID
    ORDER BY q.QuestionID, qo.DisplayOrder;
END
GO

-- View: User Learning Overview
CREATE VIEW UserLearningOverview AS
SELECT 
    u.UserID,
    u.Username,
    u.TotalXP,
    u.StreakDays,
    us.CurrentStreak,
    us.LongestStreak,
    COUNT(DISTINCT up.TopicID) as TopicsStarted,
    COUNT(DISTINCT CASE WHEN up.IsCompleted = 1 THEN up.LessonID END) as LessonsCompleted,
    SUM(up.TimeSpentSeconds) / 60 as TotalMinutesLearned,
    MAX(up.CompletedAt) as LastLessonDate
FROM Users u
LEFT JOIN UserProgress up ON u.UserID = up.UserID
LEFT JOIN UserStreaks us ON u.UserID = us.UserID
GROUP BY u.UserID, u.Username, u.TotalXP, u.StreakDays, us.CurrentStreak, us.LongestStreak;
GO

-- View: Topic Completion Stats
CREATE VIEW TopicCompletionStats AS
SELECT 
    t.TopicID,
    t.TopicName,
    COUNT(DISTINCT l.LessonID) as TotalLessons,
    COUNT(DISTINCT up.LessonID) as LessonsWithProgress,
    COUNT(DISTINCT CASE WHEN up.IsCompleted = 1 THEN up.LessonID END) as CompletedLessons,
    AVG(CASE WHEN up.IsCompleted = 1 THEN up.Score END) as AverageScore
FROM Topics t
LEFT JOIN Lessons l ON t.TopicID = l.TopicID
LEFT JOIN UserProgress up ON l.LessonID = up.LessonID
GROUP BY t.TopicID, t.TopicName;
GO

-- View: Daily Learning Activity
CREATE VIEW DailyLearningActivity AS
SELECT 
    CAST(up.CompletedAt AS DATE) as LearningDate,
    u.UserID,
    u.Username,
    COUNT(DISTINCT up.LessonID) as LessonsCompleted,
    SUM(up.Score) as DailyXP,
    SUM(up.TimeSpentSeconds) / 60 as MinutesSpent
FROM UserProgress up
INNER JOIN Users u ON up.UserID = u.UserID
WHERE up.IsCompleted = 1
GROUP BY CAST(up.CompletedAt AS DATE), u.UserID, u.Username;
GO


-- Trigger: Update UpdatedAt timestamp on Topics
CREATE TRIGGER trg_Topics_UpdatedAt
ON Topics
AFTER UPDATE
AS
BEGIN
    UPDATE Topics
    SET UpdatedAt = GETDATE()
    FROM Topics t
    INNER JOIN inserted i ON t.TopicID = i.TopicID;
END
GO

-- Trigger: Update UpdatedAt timestamp on Lessons
CREATE TRIGGER trg_Lessons_UpdatedAt
ON Lessons
AFTER UPDATE
AS
BEGIN
    UPDATE Lessons
    SET UpdatedAt = GETDATE()
    FROM Lessons l
    INNER JOIN inserted i ON l.LessonID = i.LessonID;
END
GO