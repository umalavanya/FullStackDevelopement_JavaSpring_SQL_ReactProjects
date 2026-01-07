-- 1. Get all topics with progress for a specific user
EXEC GetUserTopicProgress @UserID = 1;

-- 2. Get user progress summary
EXEC GetUserProgressSummary @UserID = 1;

-- 3. Get next lesson for a user
EXEC GetNextLesson @UserID = 1;

-- 4. Record lesson completion
EXEC RecordLessonCompletion 
    @UserID = 1,
    @LessonID = 1,
    @Score = 25,
    @TimeSpentSeconds = 300;

-- 5. Get lesson with all questions
EXEC GetLessonWithQuestions @LessonID = 1;

-- 6. Get daily goals for a user
SELECT * FROM DailyGoals WHERE UserID = 1 AND GoalDate = CAST(GETDATE() AS DATE);

-- 7. Get user achievements
SELECT * FROM UserAchievements WHERE UserID = 1 ORDER BY AchievedAt DESC;

-- 8. Check if topic is unlocked (all previous topics completed)
SELECT 
    t.TopicID,
    t.TopicName,
    CASE 
        WHEN t.DisplayOrder = 1 THEN 1 -- First topic is always unlocked
        ELSE 
            CASE WHEN (
                SELECT COUNT(*)
                FROM Topics t2
                WHERE t2.DisplayOrder < t.DisplayOrder
                    AND t2.TopicID NOT IN (
                        SELECT up.TopicID
                        FROM UserProgress up
                        WHERE up.UserID = 1
                        GROUP BY up.TopicID
                        HAVING COUNT(DISTINCT CASE WHEN up.IsCompleted = 1 THEN up.LessonID END) = (
                            SELECT COUNT(*) 
                            FROM Lessons l 
                            WHERE l.TopicID = up.TopicID
                        )
                    )
            ) = 0 THEN 1 ELSE 0 END
    END as IsUnlocked
FROM Topics t
ORDER BY t.DisplayOrder;