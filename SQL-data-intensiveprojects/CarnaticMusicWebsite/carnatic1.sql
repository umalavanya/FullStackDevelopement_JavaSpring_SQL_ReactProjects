-- Create Database
CREATE DATABASE CarnaticMusicDB;
GO

USE CarnaticMusicDB;
GO

-- 1. Users Table (for tracking learning progress)
CREATE TABLE Users (
    UserID INT PRIMARY KEY IDENTITY(1,1),
    Username NVARCHAR(50) UNIQUE NOT NULL,
    Email NVARCHAR(100) UNIQUE NOT NULL,
    PasswordHash NVARCHAR(255) NOT NULL,
    FirstName NVARCHAR(50),
    LastName NVARCHAR(50),
    JoinDate DATETIME DEFAULT GETDATE(),
    Level INT DEFAULT 1, -- Beginner, Intermediate, Advanced
    IsActive BIT DEFAULT 1,
    CONSTRAINT CHK_User_Level CHECK (Level BETWEEN 1 AND 5)
);
GO

-- 2. Sarali Swaras (Basic Swaras/Pitches)
CREATE TABLE SaraliSwaras (
    SwaraID INT PRIMARY KEY IDENTITY(1,1),
    SwaraName NVARCHAR(20) NOT NULL, -- Sa, Ri, Ga, Ma, Pa, Da, Ni
    Notation NVARCHAR(5) NOT NULL, -- S, R1, R2, G1, G2, M1, M2, P, D1, D2, N1, N2
    Octave INT DEFAULT 1,
    Frequency DECIMAL(10,2), -- Frequency in Hz
    Description NVARCHAR(500),
    AudioReference NVARCHAR(500), -- URL to audio file
    CONSTRAINT UQ_SwaraNotation UNIQUE (Notation, Octave)
);
GO

-- 3. Melakartha Ragas
CREATE TABLE MelakarthaRagas (
    RagaID INT PRIMARY KEY,
    RagaName NVARCHAR(100) NOT NULL,
    MelakarthaNumber INT UNIQUE NOT NULL,
    Arohanam NVARCHAR(500) NOT NULL, -- Ascending scale
    Avarohanam NVARCHAR(500) NOT NULL, -- Descending scale
    ParentScale NVARCHAR(50), -- 72 Melakartha system
    Chakra INT, -- 12 chakras with 6 ragas each
    SwarasUsed NVARCHAR(200), -- Swaras used in this raga
    AudioExample NVARCHAR(500),
    Description NVARCHAR(2000),
    DifficultyLevel INT DEFAULT 1, -- 1 to 5
    CONSTRAINT CHK_MelakarthaNumber CHECK (MelakarthaNumber BETWEEN 1 AND 72),
    CONSTRAINT CHK_Chakra CHECK (Chakra BETWEEN 1 AND 12)
);
GO

-- 4. Ragas (All Ragas including Janya ragas)
CREATE TABLE Ragas (
    RagaID INT PRIMARY KEY IDENTITY(1,1),
    RagaName NVARCHAR(100) NOT NULL,
    IsMelakartha BIT DEFAULT 0,
    MelakarthaRagaID INT, -- For Janya ragas
    Arohanam NVARCHAR(500),
    Avarohanam NVARCHAR(500),
    JanyaType NVARCHAR(100), -- Upanga, Bhashanga, Vakra, etc.
    TimeOfDay NVARCHAR(50), -- Morning, Afternoon, Evening, Night
    Mood NVARCHAR(100), -- Devotional, Romantic, Melancholic, etc.
    PopularCompositions NVARCHAR(1000),
    AudioReference NVARCHAR(500),
    DifficultyLevel INT DEFAULT 1,
    FOREIGN KEY (MelakarthaRagaID) REFERENCES MelakarthaRagas(RagaID),
    CONSTRAINT CHK_Difficulty CHECK (DifficultyLevel BETWEEN 1 AND 5)
);
GO

-- 5. Tala System
CREATE TABLE Talas (
    TalaID INT PRIMARY KEY IDENTITY(1,1),
    TalaName NVARCHAR(100) NOT NULL,
    Angas NVARCHAR(500) NOT NULL, -- Structure (Laghu, Druta, Anudruta)
    Aksharas INT NOT NULL, -- Total counts
    Matra INT NOT NULL, -- Total beats
    PopularUse NVARCHAR(500),
    AudioReference NVARCHAR(500), -- Clapping/keeping time audio
    Description NVARCHAR(1000)
);
GO

-- 6. Compositions (Krithis, Varnams, etc.)
CREATE TABLE Compositions (
    CompositionID INT PRIMARY KEY IDENTITY(1,1),
    Title NVARCHAR(200) NOT NULL,
    RagaID INT NOT NULL,
    TalaID INT NOT NULL,
    Composer NVARCHAR(100),
    Language NVARCHAR(50),
    Type NVARCHAR(50), -- Krithi, Varnam, Keerthanai, etc.
    Pallavi NVARCHAR(2000),
    Anupallavi NVARCHAR(2000),
    Charanam NVARCHAR(2000),
    Lyrics NVARCHAR(MAX),
    Notation NVARCHAR(MAX), -- Swara notation
    AudioReference NVARCHAR(500),
    VideoReference NVARCHAR(500),
    DifficultyLevel INT DEFAULT 1,
    CreatedDate DATETIME DEFAULT GETDATE(),
    FOREIGN KEY (RagaID) REFERENCES Ragas(RagaID),
    FOREIGN KEY (TalaID) REFERENCES Talas(TalaID),
    CONSTRAINT CHK_CompDifficulty CHECK (DifficultyLevel BETWEEN 1 AND 5)
);
GO

-- 7. Lessons/Modules
CREATE TABLE Lessons (
    LessonID INT PRIMARY KEY IDENTITY(1,1),
    LessonName NVARCHAR(200) NOT NULL,
    Category NVARCHAR(100), -- Sarali, Janta, Dhatu, Alankaram, etc.
    Level INT DEFAULT 1,
    OrderSequence INT, -- For ordering lessons
    Description NVARCHAR(2000),
    Notation NVARCHAR(MAX),
    AudioReference NVARCHAR(500),
    VideoReference NVARCHAR(500),
    EstimatedMinutes INT DEFAULT 10,
    PrerequisiteLessonID INT, -- For lesson dependencies
    FOREIGN KEY (PrerequisiteLessonID) REFERENCES Lessons(LessonID),
    CONSTRAINT CHK_LessonLevel CHECK (Level BETWEEN 1 AND 5)
);
GO

-- 8. User Progress Tracking
CREATE TABLE UserProgress (
    ProgressID INT PRIMARY KEY IDENTITY(1,1),
    UserID INT NOT NULL,
    LessonID INT,
    CompositionID INT,
    RagaID INT,
    TalaID INT,
    ComponentType NVARCHAR(50) NOT NULL, -- 'Lesson', 'Composition', 'Raga', 'Tala'
    Status NVARCHAR(50) DEFAULT 'Not Started', -- Not Started, In Progress, Completed, Mastered
    ProgressPercentage INT DEFAULT 0,
    StartDate DATETIME,
    LastPracticed DATETIME,
    CompletedDate DATETIME,
    PracticeCount INT DEFAULT 0,
    SelfRating INT, -- 1 to 5
    Notes NVARCHAR(2000),
    FOREIGN KEY (UserID) REFERENCES Users(UserID),
    FOREIGN KEY (LessonID) REFERENCES Lessons(LessonID),
    FOREIGN KEY (CompositionID) REFERENCES Compositions(CompositionID),
    FOREIGN KEY (RagaID) REFERENCES Ragas(RagaID),
    FOREIGN KEY (TalaID) REFERENCES Talas(TalaID),
    CONSTRAINT CHK_ProgressPercentage CHECK (ProgressPercentage BETWEEN 0 AND 100),
    CONSTRAINT CHK_SelfRating CHECK (SelfRating BETWEEN 1 AND 5),
    CONSTRAINT CHK_ComponentType CHECK (ComponentType IN ('Lesson', 'Composition', 'Raga', 'Tala'))
);
GO

-- 9. Practice Sessions
CREATE TABLE PracticeSessions (
    SessionID INT PRIMARY KEY IDENTITY(1,1),
    UserID INT NOT NULL,
    SessionDate DATETIME DEFAULT GETDATE(),
    DurationMinutes INT NOT NULL,
    ComponentType NVARCHAR(50), -- What was practiced
    ComponentID INT, -- ID of the specific component
    Notes NVARCHAR(2000),
    TempoBPM INT, -- Practice tempo
    AccuracyPercentage DECIMAL(5,2), -- If tracked via app
    Mood NVARCHAR(50), -- Practice mood
    FOREIGN KEY (UserID) REFERENCES Users(UserID),
    CONSTRAINT CHK_Duration CHECK (DurationMinutes > 0)
);
GO

-- 10. User Goals
CREATE TABLE UserGoals (
    GoalID INT PRIMARY KEY IDENTITY(1,1),
    UserID INT NOT NULL,
    GoalType NVARCHAR(50) NOT NULL, -- 'MasterRaga', 'LearnComposition', 'PracticeTala', etc.
    TargetID INT, -- ID of the target (RagaID, CompositionID, etc.)
    GoalDescription NVARCHAR(500),
    TargetDate DATE,
    Status NVARCHAR(50) DEFAULT 'Active', -- Active, Completed, Abandoned
    Priority INT DEFAULT 3, -- 1 to 5
    CreatedDate DATETIME DEFAULT GETDATE(),
    CompletedDate DATETIME,
    FOREIGN KEY (UserID) REFERENCES Users(UserID)
);
GO

-- 11. Notation Patterns (for exercises)
CREATE TABLE NotationPatterns (
    PatternID INT PRIMARY KEY IDENTITY(1,1),
    PatternName NVARCHAR(200) NOT NULL,
    PatternType NVARCHAR(100), -- Sarali, Janta, Dhatu, Alankaram, etc.
    RagaID INT,
    TalaID INT,
    Notation NVARCHAR(MAX) NOT NULL,
    Description NVARCHAR(2000),
    DifficultyLevel INT DEFAULT 1,
    AudioReference NVARCHAR(500),
    FOREIGN KEY (RagaID) REFERENCES Ragas(RagaID),
    FOREIGN KEY (TalaID) REFERENCES Talas(TalaID)
);
GO

-- 12. Raga-Tala-Composition Mapping (Many-to-Many)
CREATE TABLE RagaTalaComposition (
    MappingID INT PRIMARY KEY IDENTITY(1,1),
    RagaID INT NOT NULL,
    TalaID INT NOT NULL,
    CompositionID INT,
    FOREIGN KEY (RagaID) REFERENCES Ragas(RagaID),
    FOREIGN KEY (TalaID) REFERENCES Talas(TalaID),
    FOREIGN KEY (CompositionID) REFERENCES Compositions(CompositionID)
);
GO

-- 13. Favorites/Bookmarks
CREATE TABLE UserFavorites (
    FavoriteID INT PRIMARY KEY IDENTITY(1,1),
    UserID INT NOT NULL,
    ComponentType NVARCHAR(50) NOT NULL,
    ComponentID INT NOT NULL,
    AddedDate DATETIME DEFAULT GETDATE(),
    Notes NVARCHAR(500),
    FOREIGN KEY (UserID) REFERENCES Users(UserID),
    CONSTRAINT UQ_UserFavorite UNIQUE (UserID, ComponentType, ComponentID)
);
GO

-- 14. User Settings/Preferences
CREATE TABLE UserPreferences (
    PreferenceID INT PRIMARY KEY IDENTITY(1,1),
    UserID INT UNIQUE NOT NULL,
    DefaultInstrument NVARCHAR(50) DEFAULT 'Voice',
    NotationStyle NVARCHAR(50) DEFAULT 'Indian', -- Indian or Western
    PracticeReminders BIT DEFAULT 1,
    DailyGoalMinutes INT DEFAULT 30,
    Theme NVARCHAR(50) DEFAULT 'Light',
    FOREIGN KEY (UserID) REFERENCES Users(UserID)
);
GO

-- Indexes for Performance
CREATE INDEX IX_UserProgress_UserID ON UserProgress(UserID);
CREATE INDEX IX_UserProgress_Component ON UserProgress(ComponentType, ComponentID);
CREATE INDEX IX_PracticeSessions_UserID ON PracticeSessions(UserID);
CREATE INDEX IX_PracticeSessions_Date ON PracticeSessions(SessionDate);
CREATE INDEX IX_Compositions_RagaTala ON Compositions(RagaID, TalaID);
CREATE INDEX IX_Lessons_Level ON Lessons(Level, OrderSequence);
CREATE INDEX IX_Ragas_Difficulty ON Ragas(DifficultyLevel);
CREATE INDEX IX_UserGoals_Status ON UserGoals(Status, TargetDate);
GO

-- Views for Common Queries

-- View for user dashboard
CREATE VIEW vw_UserDashboard AS
SELECT 
    u.UserID,
    u.Username,
    u.Level,
    COUNT(DISTINCT CASE WHEN up.Status = 'Completed' THEN up.ProgressID END) AS CompletedItems,
    COUNT(DISTINCT CASE WHEN up.Status = 'In Progress' THEN up.ProgressID END) AS InProgressItems,
    SUM(ps.DurationMinutes) AS TotalPracticeMinutes,
    AVG(up.SelfRating) AS AverageSelfRating
FROM Users u
LEFT JOIN UserProgress up ON u.UserID = up.UserID
LEFT JOIN PracticeSessions ps ON u.UserID = ps.UserID
GROUP BY u.UserID, u.Username, u.Level;
GO

-- View for lesson progress
CREATE VIEW vw_LessonProgress AS
SELECT 
    u.Username,
    l.LessonName,
    l.Level AS LessonLevel,
    up.Status,
    up.ProgressPercentage,
    up.LastPracticed,
    up.PracticeCount
FROM UserProgress up
JOIN Users u ON up.UserID = u.UserID
JOIN Lessons l ON up.LessonID = l.LessonID
WHERE up.ComponentType = 'Lesson';
GO

-- View for raga learning status
CREATE VIEW vw_RagaProgress AS
SELECT 
    u.Username,
    r.RagaName,
    r.DifficultyLevel,
    up.Status,
    up.SelfRating,
    up.LastPracticed,
    up.PracticeCount
FROM UserProgress up
JOIN Users u ON up.UserID = u.UserID
JOIN Ragas r ON up.RagaID = r.RagaID
WHERE up.ComponentType = 'Raga';
GO

-- Stored Procedures

-- Procedure to update user progress
CREATE PROCEDURE sp_UpdateUserProgress
    @UserID INT,
    @ComponentType NVARCHAR(50),
    @ComponentID INT,
    @Status NVARCHAR(50),
    @ProgressPercentage INT,
    @SelfRating INT = NULL,
    @Notes NVARCHAR(2000) = NULL
AS
BEGIN
    SET NOCOUNT ON;
    
    -- Check if progress record exists
    IF EXISTS (SELECT 1 FROM UserProgress 
               WHERE UserID = @UserID 
               AND ComponentType = @ComponentType 
               AND ComponentID = @ComponentID)
    BEGIN
        UPDATE UserProgress
        SET Status = @Status,
            ProgressPercentage = @ProgressPercentage,
            SelfRating = @SelfRating,
            Notes = ISNULL(@Notes, Notes),
            LastPracticed = GETDATE(),
            PracticeCount = PracticeCount + 1,
            CompletedDate = CASE WHEN @Status = 'Completed' AND Status != 'Completed' 
                                THEN GETDATE() ELSE CompletedDate END
        WHERE UserID = @UserID 
          AND ComponentType = @ComponentType 
          AND ComponentID = @ComponentID;
    END
    ELSE
    BEGIN
        INSERT INTO UserProgress (UserID, ComponentType, ComponentID, Status, 
                                 ProgressPercentage, SelfRating, Notes, 
                                 StartDate, LastPracticed, PracticeCount)
        VALUES (@UserID, @ComponentType, @ComponentID, @Status, 
                @ProgressPercentage, @SelfRating, @Notes,
                GETDATE(), GETDATE(), 1);
    END
END;
GO

-- Procedure to log practice session
CREATE PROCEDURE sp_LogPracticeSession
    @UserID INT,
    @DurationMinutes INT,
    @ComponentType NVARCHAR(50) = NULL,
    @ComponentID INT = NULL,
    @Notes NVARCHAR(2000) = NULL,
    @TempoBPM INT = NULL,
    @AccuracyPercentage DECIMAL(5,2) = NULL,
    @Mood NVARCHAR(50) = NULL
AS
BEGIN
    SET NOCOUNT ON;
    
    INSERT INTO PracticeSessions (UserID, SessionDate, DurationMinutes, 
                                 ComponentType, ComponentID, Notes, 
                                 TempoBPM, AccuracyPercentage, Mood)
    VALUES (@UserID, GETDATE(), @DurationMinutes, 
            @ComponentType, @ComponentID, @Notes,
            @TempoBPM, @AccuracyPercentage, @Mood);
    
    -- Update user's last practiced date in progress table if component specified
    IF @ComponentType IS NOT NULL AND @ComponentID IS NOT NULL
    BEGIN
        EXEC sp_UpdateUserProgress 
            @UserID = @UserID,
            @ComponentType = @ComponentType,
            @ComponentID = @ComponentID,
            @Status = 'In Progress',
            @ProgressPercentage = NULL;
    END
END;
GO

-- Function to get user statistics
CREATE FUNCTION fn_GetUserStatistics (@UserID INT)
RETURNS TABLE
AS
RETURN
(
    SELECT 
        (SELECT COUNT(*) FROM UserProgress WHERE UserID = @UserID AND Status = 'Completed') AS TotalCompleted,
        (SELECT COUNT(*) FROM UserProgress WHERE UserID = @UserID AND Status = 'In Progress') AS TotalInProgress,
        (SELECT SUM(DurationMinutes) FROM PracticeSessions WHERE UserID = @UserID) AS TotalPracticeMinutes,
        (SELECT COUNT(DISTINCT CAST(SessionDate AS DATE)) FROM PracticeSessions WHERE UserID = @UserID) AS PracticeDays,
        (SELECT AVG(SelfRating) FROM UserProgress WHERE UserID = @UserID AND SelfRating IS NOT NULL) AS AverageRating
);
GO

-- Insert Sample Data (Optional - for testing)

-- Insert basic swaras
INSERT INTO SaraliSwaras (SwaraName, Notation, Octave, Description) VALUES
('Shadjam', 'S', 1, 'The base note, tonic'),
('Shuddha Rishabham', 'R1', 1, 'First variant of Rishabham'),
('Chatushruti Rishabham', 'R2', 1, 'Second variant of Rishabham'),
('Shuddha Gandharam', 'G1', 1, 'First variant of Gandharam'),
('Shatshruti Rishabham', 'R3', 1, 'Third variant of Rishabham (equivalent to G1)'),
('Antara Gandharam', 'G2', 1, 'Second variant of Gandharam'),
('Shuddha Madhyamam', 'M1', 1, 'First variant of Madhyamam'),
('Prati Madhyamam', 'M2', 1, 'Second variant of Madhyamam'),
('Panchamam', 'P', 1, 'Perfect fifth'),
('Shuddha Dhaivatam', 'D1', 1, 'First variant of Dhaivatam'),
('Chatushruti Dhaivatam', 'D2', 1, 'Second variant of Dhaivatam'),
('Shuddha Nishadam', 'N1', 1, 'First variant of Nishadam'),
('Shatshruti Dhaivatam', 'D3', 1, 'Third variant of Dhaivatam (equivalent to N1)'),
('Kakali Nishadam', 'N2', 1, 'Second variant of Nishadam');
GO

-- Insert basic talas
INSERT INTO Talas (TalaName, Angas, Aksharas, Matra, Description) VALUES
('Adi Tala', 'Laghu(4), Druta(2), Druta(2)', 8, 8, 'Most common tala in Carnatic music'),
('Rupaka Tala', 'Druta(2), Laghu(4)', 6, 6, 'Second most common tala'),
('Misra Chapu', '1,2,1,1,2', 7, 7, 'Asymmetric tala pattern'),
('Khanda Chapu', '1,2,1,2,2', 8, 8, 'Five beat pattern');
GO

-- Insert sample melakartha ragas
INSERT INTO MelakarthaRagas (RagaID, RagaName, MelakarthaNumber, Arohanam, Avarohanam, Chakra) VALUES
(1, 'Kanakangi', 1, 'S R1 G1 M1 P D1 N1 S', 'S N1 D1 P M1 G1 R1 S', 1),
(8, 'Hanumatodi', 8, 'S R1 G2 M1 P D1 N2 S', 'S N2 D1 P M1 G2 R1 S', 2),
(15, 'Mayamalavagowla', 15, 'S R1 G2 M1 P D1 N2 S', 'S N2 D1 P M1 G2 R1 S', 3),
(29, 'Shankarabharanam', 29, 'S R2 G2 M1 P D2 N2 S', 'S N2 D2 P M1 G2 R2 S', 5),
(36, 'Chalanata', 36, 'S R1 G3 M2 P D3 N3 S', 'S N3 D3 P M2 G3 R1 S', 6);
GO

-- Insert sample lessons
INSERT INTO Lessons (LessonName, Category, Level, OrderSequence, Description) VALUES
('Sarali Varisai 1', 'Sarali', 1, 1, 'Basic ascending and descending swaras'),
('Sarali Varisai 2', 'Sarali', 1, 2, 'Stepwise patterns'),
('Janta Varisai 1', 'Janta', 1, 3, 'Double swara patterns'),
('Dhatu Varisai 1', 'Dhatu', 2, 4, 'Jumping patterns'),
('Alankaram in Mayamalavagowla', 'Alankaram', 2, 5, 'Basic ornamentation patterns');
GO


-- 15. Instruments Table (for different instrument learning)
CREATE TABLE Instruments (
    InstrumentID INT PRIMARY KEY IDENTITY(1,1),
    InstrumentName NVARCHAR(100) NOT NULL,
    Category NVARCHAR(50), -- String, Percussion, Wind, Voice
    Description NVARCHAR(1000),
    IconClass NVARCHAR(100), -- For UI icons
    IsPopular BIT DEFAULT 0
);
GO

-- 16. Instrument Specific Lessons
CREATE TABLE InstrumentLessons (
    InstrumentLessonID INT PRIMARY KEY IDENTITY(1,1),
    InstrumentID INT NOT NULL,
    LessonID INT NOT NULL,
    InstrumentSpecificNotation NVARCHAR(MAX),
    FingeringChart NVARCHAR(500), -- Image/PDF URL
    SpecialInstructions NVARCHAR(2000),
    FOREIGN KEY (InstrumentID) REFERENCES Instruments(InstrumentID),
    FOREIGN KEY (LessonID) REFERENCES Lessons(LessonID),
    CONSTRAINT UQ_InstrumentLesson UNIQUE (InstrumentID, LessonID)
);
GO

-- 17. Exercises (Daily practice exercises)
CREATE TABLE Exercises (
    ExerciseID INT PRIMARY KEY IDENTITY(1,1),
    ExerciseName NVARCHAR(200) NOT NULL,
    Category NVARCHAR(100), -- Vocal, Finger, Breathing, Rhythm
    Description NVARCHAR(2000),
    DurationMinutes INT DEFAULT 10,
    DifficultyLevel INT DEFAULT 1,
    VideoReference NVARCHAR(500),
    AudioReference NVARCHAR(500),
    Benefits NVARCHAR(1000)
);
GO

-- 18. User Exercise Log
CREATE TABLE UserExerciseLog (
    LogID INT PRIMARY KEY IDENTITY(1,1),
    UserID INT NOT NULL,
    ExerciseID INT NOT NULL,
    SessionDate DATE NOT NULL,
    DurationMinutes INT,
    Repetitions INT,
    Notes NVARCHAR(1000),
    FOREIGN KEY (UserID) REFERENCES Users(UserID),
    FOREIGN KEY (ExerciseID) REFERENCES Exercises(ExerciseID),
    CONSTRAINT UQ_DailyExercise UNIQUE (UserID, ExerciseID, SessionDate)
);
GO

-- 19. Raga Practice Patterns
CREATE TABLE RagaPracticePatterns (
    PatternID INT PRIMARY KEY IDENTITY(1,1),
    RagaID INT NOT NULL,
    PatternName NVARCHAR(200) NOT NULL,
    PatternType NVARCHAR(100), -- Arohanam, Avarohanam, Janta, Dhatu, Gamaka
    Notation NVARCHAR(MAX) NOT NULL,
    TempoBPM INT DEFAULT 60,
    DurationSeconds INT,
    DifficultyLevel INT DEFAULT 1,
    Purpose NVARCHAR(500), -- Memory, Speed, Expression
    FOREIGN KEY (RagaID) REFERENCES Ragas(RagaID)
);
GO

-- 20. Composition Sections (for breaking down compositions)
CREATE TABLE CompositionSections (
    SectionID INT PRIMARY KEY IDENTITY(1,1),
    CompositionID INT NOT NULL,
    SectionName NVARCHAR(100) NOT NULL, -- Pallavi, Anupallavi, Charanam
    SectionOrder INT NOT NULL,
    Lyrics NVARCHAR(MAX),
    Notation NVARCHAR(MAX),
    AudioReference NVARCHAR(500),
    PracticeTips NVARCHAR(2000),
    FOREIGN KEY (CompositionID) REFERENCES Compositions(CompositionID),
    CONSTRAINT UQ_CompositionSection UNIQUE (CompositionID, SectionOrder)
);
GO

-- 21. User Composition Progress (detailed tracking)
CREATE TABLE UserCompositionProgress (
    ProgressID INT PRIMARY KEY IDENTITY(1,1),
    UserID INT NOT NULL,
    CompositionID INT NOT NULL,
    SectionID INT, -- NULL means overall composition
    TempoBPM INT,
    AccuracyPercentage DECIMAL(5,2),
    RecordingURL NVARCHAR(500), -- User's recording
    TeacherFeedback NVARCHAR(2000),
    SelfRating INT,
    PracticeDate DATETIME DEFAULT GETDATE(),
    FOREIGN KEY (UserID) REFERENCES Users(UserID),
    FOREIGN KEY (CompositionID) REFERENCES Compositions(CompositionID),
    FOREIGN KEY (SectionID) REFERENCES CompositionSections(SectionID)
);
GO

-- 22. Tala Exercises (Rhythm practice)
CREATE TABLE TalaExercises (
    ExerciseID INT PRIMARY KEY IDENTITY(1,1),
    TalaID INT NOT NULL,
    ExerciseName NVARCHAR(200) NOT NULL,
    ExerciseType NVARCHAR(100), -- HandClap, Counting, Konnakol
    Pattern NVARCHAR(MAX) NOT NULL,
    TempoBPM INT DEFAULT 60,
    DifficultyLevel INT DEFAULT 1,
    AudioReference NVARCHAR(500),
    VideoReference NVARCHAR(500),
    FOREIGN KEY (TalaID) REFERENCES Talas(TalaID)
);
GO

-- 23. Gamakas (Ornamentations)
CREATE TABLE Gamakas (
    GamakaID INT PRIMARY KEY IDENTITY(1,1),
    GamakaName NVARCHAR(100) NOT NULL,
    Symbol NVARCHAR(10), -- Notation symbol
    Description NVARCHAR(2000),
    AudioExample NVARCHAR(500),
    VideoExample NVARCHAR(500),
    CommonRagas NVARCHAR(500) -- Ragas where this gamaka is prominent
);
GO

-- 24. Raga Gamaka Mapping
CREATE TABLE RagaGamakaMapping (
    MappingID INT PRIMARY KEY IDENTITY(1,1),
    RagaID INT NOT NULL,
    GamakaID INT NOT NULL,
    Swara NVARCHAR(5), -- Which swara has this gamaka
    ImportanceLevel INT DEFAULT 1, -- 1 to 3
    Notes NVARCHAR(1000),
    FOREIGN KEY (RagaID) REFERENCES Ragas(RagaID),
    FOREIGN KEY (GamakaID) REFERENCES Gamakas(GamakaID),
    CONSTRAINT UQ_RagaGamaka UNIQUE (RagaID, GamakaID, Swara)
);
GO

-- 25. Practice Plans (Structured practice routines)
CREATE TABLE PracticePlans (
    PlanID INT PRIMARY KEY IDENTITY(1,1),
    PlanName NVARCHAR(200) NOT NULL,
    Level INT DEFAULT 1,
    TotalWeeks INT DEFAULT 4,
    DailyPracticeMinutes INT DEFAULT 30,
    Description NVARCHAR(2000),
    CreatedBy INT, -- UserID of creator (NULL for system plans)
    IsPublic BIT DEFAULT 0,
    CreatedDate DATETIME DEFAULT GETDATE(),
    FOREIGN KEY (CreatedBy) REFERENCES Users(UserID)
);
GO

-- 26. Practice Plan Items
CREATE TABLE PracticePlanItems (
    ItemID INT PRIMARY KEY IDENTITY(1,1),
    PlanID INT NOT NULL,
    DayNumber INT, -- Day in the plan (1, 2, 3...)
    ComponentType NVARCHAR(50), -- Lesson, Exercise, Composition, Raga
    ComponentID INT,
    DurationMinutes INT,
    OrderSequence INT,
    Notes NVARCHAR(1000),
    FOREIGN KEY (PlanID) REFERENCES PracticePlans(PlanID)
);
GO

-- 27. User Practice Plans (Users following plans)
CREATE TABLE UserPracticePlans (
    UserPlanID INT PRIMARY KEY IDENTITY(1,1),
    UserID INT NOT NULL,
    PlanID INT NOT NULL,
    StartDate DATE NOT NULL,
    CurrentDay INT DEFAULT 1,
    IsActive BIT DEFAULT 1,
    CompletedDate DATE,
    FOREIGN KEY (UserID) REFERENCES Users(UserID),
    FOREIGN KEY (PlanID) REFERENCES PracticePlans(PlanID),
    CONSTRAINT UQ_UserActivePlan UNIQUE (UserID) WHERE IsActive = 1
);
GO

-- 28. Challenges (Time-bound learning challenges)
CREATE TABLE Challenges (
    ChallengeID INT PRIMARY KEY IDENTITY(1,1),
    ChallengeName NVARCHAR(200) NOT NULL,
    Description NVARCHAR(2000),
    ChallengeType NVARCHAR(50), -- Raga, Composition, Tala
    TargetComponentID INT,
    DurationDays INT DEFAULT 7,
    StartDate DATE,
    EndDate DATE,
    RewardPoints INT DEFAULT 100,
    MaxParticipants INT,
    IsActive BIT DEFAULT 1
);
GO

-- 29. User Challenges
CREATE TABLE UserChallenges (
    UserChallengeID INT PRIMARY KEY IDENTITY(1,1),
    UserID INT NOT NULL,
    ChallengeID INT NOT NULL,
    JoinDate DATETIME DEFAULT GETDATE(),
    CompletedDate DATETIME,
    Status NVARCHAR(50) DEFAULT 'Joined', -- Joined, InProgress, Completed, Failed
    Score INT DEFAULT 0,
    FOREIGN KEY (UserID) REFERENCES Users(UserID),
    FOREIGN KEY (ChallengeID) REFERENCES Challenges(ChallengeID)
);
GO

-- 30. Achievements/Badges
CREATE TABLE Achievements (
    AchievementID INT PRIMARY KEY IDENTITY(1,1),
    AchievementName NVARCHAR(200) NOT NULL,
    Description NVARCHAR(500),
    IconURL NVARCHAR(500),
    CriteriaType NVARCHAR(50), -- PracticeDays, Completions, Speed, Accuracy
    CriteriaValue INT,
    Points INT DEFAULT 10
);
GO

-- 31. User Achievements
CREATE TABLE UserAchievements (
    UserAchievementID INT PRIMARY KEY IDENTITY(1,1),
    UserID INT NOT NULL,
    AchievementID INT NOT NULL,
    EarnedDate DATETIME DEFAULT GETDATE(),
    FOREIGN KEY (UserID) REFERENCES Users(UserID),
    FOREIGN KEY (AchievementID) REFERENCES Achievements(AchievementID),
    CONSTRAINT UQ_UserAchievement UNIQUE (UserID, AchievementID)
);
GO

-- 32. Community Posts (Forum/Discussion)
CREATE TABLE CommunityPosts (
    PostID INT PRIMARY KEY IDENTITY(1,1),
    UserID INT NOT NULL,
    Title NVARCHAR(200) NOT NULL,
    Content NVARCHAR(MAX) NOT NULL,
    PostType NVARCHAR(50), -- Question, Tip, Performance, Discussion
    RagaID INT,
    CompositionID INT,
    TalaID INT,
    IsPublic BIT DEFAULT 1,
    CreatedDate DATETIME DEFAULT GETDATE(),
    UpdatedDate DATETIME,
    ViewCount INT DEFAULT 0,
    FOREIGN KEY (UserID) REFERENCES Users(UserID),
    FOREIGN KEY (RagaID) REFERENCES Ragas(RagaID),
    FOREIGN KEY (CompositionID) REFERENCES Compositions(CompositionID),
    FOREIGN KEY (TalaID) REFERENCES Talas(TalaID)
);
GO

-- 33. Post Comments
CREATE TABLE PostComments (
    CommentID INT PRIMARY KEY IDENTITY(1,1),
    PostID INT NOT NULL,
    UserID INT NOT NULL,
    CommentText NVARCHAR(MAX) NOT NULL,
    CreatedDate DATETIME DEFAULT GETDATE(),
    IsAnswer BIT DEFAULT 0, -- Marked as correct answer
    ParentCommentID INT, -- For nested comments
    FOREIGN KEY (PostID) REFERENCES CommunityPosts(PostID),
    FOREIGN KEY (UserID) REFERENCES Users(UserID),
    FOREIGN KEY (ParentCommentID) REFERENCES PostComments(CommentID)
);
GO

-- 34. User Connections (Following system)
CREATE TABLE UserConnections (
    ConnectionID INT PRIMARY KEY IDENTITY(1,1),
    FollowerID INT NOT NULL,
    FollowingID INT NOT NULL,
    ConnectionDate DATETIME DEFAULT GETDATE(),
    FOREIGN KEY (FollowerID) REFERENCES Users(UserID),
    FOREIGN KEY (FollowingID) REFERENCES Users(UserID),
    CONSTRAINT UQ_UserConnection UNIQUE (FollowerID, FollowingID),
    CONSTRAINT CHK_NotSelfFollow CHECK (FollowerID != FollowingID)
);
GO

-- 35. User Feed (Activity feed)
CREATE TABLE UserFeed (
    FeedID INT PRIMARY KEY IDENTITY(1,1),
    UserID INT NOT NULL, -- User who performed the action
    ActivityType NVARCHAR(50) NOT NULL, -- Practice, Achievement, Post, Progress
    ActivityID INT, -- ID of the specific activity record
    ActivityData NVARCHAR(1000), -- JSON or text summary
    CreatedDate DATETIME DEFAULT GETDATE(),
    IsPublic BIT DEFAULT 1,
    FOREIGN KEY (UserID) REFERENCES Users(UserID)
);
GO

-- 36. Notifications
CREATE TABLE Notifications (
    NotificationID INT PRIMARY KEY IDENTITY(1,1),
    UserID INT NOT NULL,
    NotificationType NVARCHAR(50), -- Reminder, Achievement, Comment, Challenge
    Title NVARCHAR(200) NOT NULL,
    Message NVARCHAR(1000) NOT NULL,
    ReferenceType NVARCHAR(50),
    ReferenceID INT,
    IsRead BIT DEFAULT 0,
    CreatedDate DATETIME DEFAULT GETDATE(),
    ExpiryDate DATETIME,
    FOREIGN KEY (UserID) REFERENCES Users(UserID)
);
GO

-- 37. User Statistics (Denormalized for performance)
CREATE TABLE UserStatistics (
    UserID INT PRIMARY KEY,
    TotalPracticeMinutes INT DEFAULT 0,
    PracticeDays INT DEFAULT 0,
    CurrentStreak INT DEFAULT 0,
    LongestStreak INT DEFAULT 0,
    CompositionsLearned INT DEFAULT 0,
    RagasLearned INT DEFAULT 0,
    AchievementsCount INT DEFAULT 0,
    LastPracticeDate DATE,
    FOREIGN KEY (UserID) REFERENCES Users(UserID)
);
GO

-- Triggers for maintaining statistics and feeds

-- Trigger to update user statistics after practice session
CREATE TRIGGER trg_UpdateStatistics_AfterPractice
ON PracticeSessions
AFTER INSERT
AS
BEGIN
    SET NOCOUNT ON;
    
    DECLARE @UserID INT, @SessionDate DATE, @DurationMinutes INT;
    
    SELECT @UserID = UserID, 
           @SessionDate = CAST(SessionDate AS DATE),
           @DurationMinutes = DurationMinutes
    FROM inserted;
    
    -- Update or insert user statistics
    IF EXISTS (SELECT 1 FROM UserStatistics WHERE UserID = @UserID)
    BEGIN
        UPDATE UserStatistics
        SET TotalPracticeMinutes = TotalPracticeMinutes + @DurationMinutes,
            LastPracticeDate = @SessionDate,
            PracticeDays = CASE 
                WHEN DATEDIFF(DAY, LastPracticeDate, @SessionDate) = 1 
                THEN PracticeDays + 1 
                ELSE PracticeDays + 1 END,
            CurrentStreak = CASE 
                WHEN DATEDIFF(DAY, LastPracticeDate, @SessionDate) = 1 
                THEN CurrentStreak + 1 
                ELSE 1 END,
            LongestStreak = CASE 
                WHEN CurrentStreak + 1 > LongestStreak 
                THEN CurrentStreak + 1 
                ELSE LongestStreak END
        WHERE UserID = @UserID;
    END
    ELSE
    BEGIN
        INSERT INTO UserStatistics (UserID, TotalPracticeMinutes, PracticeDays, 
                                   CurrentStreak, LongestStreak, LastPracticeDate)
        VALUES (@UserID, @DurationMinutes, 1, 1, 1, @SessionDate);
    END
    
    -- Add to user feed
    INSERT INTO UserFeed (UserID, ActivityType, ActivityData, CreatedDate)
    VALUES (@UserID, 'Practice', 
            CONCAT('Practiced for ', @DurationMinutes, ' minutes'),
            GETDATE());
END;
GO

-- Trigger to update statistics when composition is completed
CREATE TRIGGER trg_UpdateCompletions
ON UserProgress
AFTER UPDATE
AS
BEGIN
    SET NOCOUNT ON;
    
    IF UPDATE(Status)
    BEGIN
        DECLARE @UserID INT, @ComponentType NVARCHAR(50), @OldStatus NVARCHAR(50), @NewStatus NVARCHAR(50);
        
        SELECT @UserID = i.UserID,
               @ComponentType = i.ComponentType,
               @OldStatus = d.Status,
               @NewStatus = i.Status
        FROM inserted i
        JOIN deleted d ON i.ProgressID = d.ProgressID;
        
        -- Update statistics when item is completed
        IF @OldStatus != 'Completed' AND @NewStatus = 'Completed'
        BEGIN
            IF @ComponentType = 'Composition'
            BEGIN
                UPDATE UserStatistics
                SET CompositionsLearned = CompositionsLearned + 1
                WHERE UserID = @UserID;
            END
            ELSE IF @ComponentType = 'Raga'
            BEGIN
                UPDATE UserStatistics
                SET RagasLearned = RagasLearned + 1
                WHERE UserID = @UserID;
            END
            
            -- Add to feed
            INSERT INTO UserFeed (UserID, ActivityType, ActivityData, CreatedDate)
            VALUES (@UserID, 'Progress', 
                    CONCAT('Completed a ', @ComponentType),
                    GETDATE());
        END
    END
END;
GO

-- More Views for Reporting

-- View for practice calendar
CREATE VIEW vw_PracticeCalendar AS
SELECT 
    u.UserID,
    u.Username,
    CAST(ps.SessionDate AS DATE) AS PracticeDate,
    SUM(ps.DurationMinutes) AS TotalMinutes,
    COUNT(*) AS SessionCount,
    STRING_AGG(ps.ComponentType, ', ') AS ComponentsPracticed
FROM Users u
JOIN PracticeSessions ps ON u.UserID = ps.UserID
GROUP BY u.UserID, u.Username, CAST(ps.SessionDate AS DATE);
GO

-- View for learning timeline
CREATE VIEW vw_LearningTimeline AS
SELECT 
    u.UserID,
    u.Username,
    up.StartDate,
    up.CompletedDate,
    up.ComponentType,
    CASE 
        WHEN up.ComponentType = 'Lesson' THEN l.LessonName
        WHEN up.ComponentType = 'Composition' THEN c.Title
        WHEN up.ComponentType = 'Raga' THEN r.RagaName
        WHEN up.ComponentType = 'Tala' THEN t.TalaName
    END AS ComponentName,
    up.Status,
    up.SelfRating
FROM UserProgress up
JOIN Users u ON up.UserID = u.UserID
LEFT JOIN Lessons l ON up.LessonID = l.LessonID AND up.ComponentType = 'Lesson'
LEFT JOIN Compositions c ON up.CompositionID = c.CompositionID AND up.ComponentType = 'Composition'
LEFT JOIN Ragas r ON up.RagaID = r.RagaID AND up.ComponentType = 'Raga'
LEFT JOIN Talas t ON up.TalaID = t.TalaID AND up.ComponentType = 'Tala'
WHERE up.StartDate IS NOT NULL;
GO

-- View for recommended next lessons
CREATE VIEW vw_RecommendedLessons AS
SELECT 
    u.UserID,
    l.LessonID,
    l.LessonName,
    l.Level,
    l.Category,
    ROW_NUMBER() OVER (PARTITION BY u.UserID ORDER BY l.Level, l.OrderSequence) AS RecommendationOrder
FROM Users u
CROSS JOIN Lessons l
WHERE NOT EXISTS (
    SELECT 1 FROM UserProgress up 
    WHERE up.UserID = u.UserID 
    AND up.LessonID = l.LessonID
    AND up.Status IN ('Completed', 'In Progress')
)
AND l.Level <= u.Level + 1
AND (l.PrerequisiteLessonID IS NULL OR EXISTS (
    SELECT 1 FROM UserProgress up2
    WHERE up2.UserID = u.UserID
    AND up2.LessonID = l.PrerequisiteLessonID
    AND up2.Status = 'Completed'
));
GO

-- More Sample Data

-- Insert instruments
INSERT INTO Instruments (InstrumentName, Category, IsPopular) VALUES
('Voice', 'Voice', 1),
('Violin', 'String', 1),
('Veena', 'String', 1),
('Mridangam', 'Percussion', 1),
('Ghatam', 'Percussion', 0),
('Flute', 'Wind', 1),
('Keyboard', 'String', 0),
('Nadaswaram', 'Wind', 0);
GO

-- Insert gamakas
INSERT INTO Gamakas (GamakaName, Symbol, Description) VALUES
('Kampita', '~', 'Oscillation around a note'),
('Sphurita', '^', 'Quick touch of higher note'),
('Pratyahata', '>', 'Stressed note followed by release'),
('Andolita', '≈', 'Swinging motion between notes'),
('Tripuchcha', '!', 'Three consecutive touches'),
('Ahata', '*', 'Struck from below'),
('Moorchana', '#', 'Glide through notes');
GO

-- Insert achievements
INSERT INTO Achievements (AchievementName, Description, CriteriaType, CriteriaValue, Points) VALUES
('First Steps', 'Complete your first lesson', 'Completions', 1, 10),
('Dedicated Learner', 'Practice for 7 consecutive days', 'PracticeDays', 7, 50),
('Raga Explorer', 'Learn 5 different ragas', 'Completions', 5, 100),
('Composition Master', 'Master 3 compositions', 'Completions', 3, 150),
('Speed Demon', 'Practice at 120 BPM', 'Speed', 120, 75),
('Perfect Pitch', 'Achieve 95% accuracy', 'Accuracy', 95, 200),
('Community Helper', 'Answer 10 forum questions', 'Completions', 10, 100);
GO

-- Insert sample practice plans
INSERT INTO PracticePlans (PlanName, Level, TotalWeeks, DailyPracticeMinutes, Description, IsPublic) VALUES
('Beginner 30-Day Challenge', 1, 4, 30, 'Complete beginner course in 30 days', 1),
('Raga Mastery Program', 3, 8, 45, 'Deep dive into 5 important ragas', 1),
('Composition Intensive', 2, 6, 40, 'Learn 3 major compositions', 1),
('Rhythm Foundation', 1, 2, 20, 'Master basic talas and rhythm', 1);
GO

-- Functions

-- Function to calculate practice streak
CREATE FUNCTION fn_CalculateStreak (@UserID INT)
RETURNS INT
AS
BEGIN
    DECLARE @CurrentStreak INT = 0;
    DECLARE @LastPracticeDate DATE;
    
    SELECT @LastPracticeDate = MAX(CAST(SessionDate AS DATE))
    FROM PracticeSessions
    WHERE UserID = @UserID;
    
    IF @LastPracticeDate IS NULL
        RETURN 0;
    
    -- Check consecutive days backward from last practice date
    WHILE EXISTS (
        SELECT 1 FROM PracticeSessions 
        WHERE UserID = @UserID 
        AND CAST(SessionDate AS DATE) = DATEADD(DAY, -@CurrentStreak, @LastPracticeDate)
    )
    BEGIN
        SET @CurrentStreak = @CurrentStreak + 1;
    END
    
    RETURN @CurrentStreak;
END;
GO

-- Function to get daily practice goal status
CREATE FUNCTION fn_GetDailyGoalStatus (@UserID INT, @Date DATE = NULL)
RETURNS TABLE
AS
RETURN
(
    SELECT 
        @UserID AS UserID,
        ISNULL(SUM(ps.DurationMinutes), 0) AS ActualMinutes,
        ISNULL(up.DailyGoalMinutes, 30) AS GoalMinutes,
        CASE 
            WHEN ISNULL(SUM(ps.DurationMinutes), 0) >= ISNULL(up.DailyGoalMinutes, 30) 
            THEN 1 
            ELSE 0 
        END AS GoalAchieved
    FROM Users u
    LEFT JOIN PracticeSessions ps ON u.UserID = ps.UserID 
        AND CAST(ps.SessionDate AS DATE) = ISNULL(@Date, CAST(GETDATE() AS DATE))
    LEFT JOIN UserPreferences up ON u.UserID = up.UserID
    WHERE u.UserID = @UserID
    GROUP BY u.UserID, up.DailyGoalMinutes
);
GO

-- Stored Procedures

-- Procedure to generate daily practice reminder
CREATE PROCEDURE sp_GenerateDailyReminder
    @UserID INT
AS
BEGIN
    SET NOCOUNT ON;
    
    DECLARE @GoalMinutes INT, @PracticeMinutes INT, @Streak INT;
    
    -- Get user's daily goal
    SELECT @GoalMinutes = ISNULL(DailyGoalMinutes, 30)
    FROM UserPreferences 
    WHERE UserID = @UserID;
    
    IF @GoalMinutes IS NULL
        SET @GoalMinutes = 30;
    
    -- Get today's practice minutes
    SELECT @PracticeMinutes = ISNULL(SUM(DurationMinutes), 0)
    FROM PracticeSessions
    WHERE UserID = @UserID
    AND CAST(SessionDate AS DATE) = CAST(GETDATE() AS DATE);
    
    -- Get current streak
    SELECT @Streak = dbo.fn_CalculateStreak(@UserID);
    
    -- Check if goal not met and no notification sent today
    IF @PracticeMinutes < @GoalMinutes 
        AND NOT EXISTS (
            SELECT 1 FROM Notifications 
            WHERE UserID = @UserID 
            AND NotificationType = 'Reminder'
            AND CAST(CreatedDate AS DATE) = CAST(GETDATE() AS DATE)
        )
    BEGIN
        INSERT INTO Notifications (UserID, NotificationType, Title, Message, CreatedDate, ExpiryDate)
        VALUES (
            @UserID,
            'Reminder',
            'Daily Practice Reminder',
            CONCAT('You have practiced ', @PracticeMinutes, '/', @GoalMinutes, 
                   ' minutes today. Keep your ', @Streak, '-day streak going!'),
            GETDATE(),
            DATEADD(HOUR, 24, GETDATE())
        );
    END
END;
GO

-- Procedure to assign achievement
CREATE PROCEDURE sp_AssignAchievement
    @UserID INT,
    @AchievementID INT
AS
BEGIN
    SET NOCOUNT ON;
    
    IF NOT EXISTS (
        SELECT 1 FROM UserAchievements 
        WHERE UserID = @UserID AND AchievementID = @AchievementID
    )
    BEGIN
        BEGIN TRY
            BEGIN TRANSACTION;
            
            INSERT INTO UserAchievements (UserID, AchievementID)
            VALUES (@UserID, @AchievementID);
            
            -- Add notification
            DECLARE @AchievementName NVARCHAR(200);
            SELECT @AchievementName = AchievementName FROM Achievements WHERE AchievementID = @AchievementID;
            
            INSERT INTO Notifications (UserID, NotificationType, Title, Message, CreatedDate, ExpiryDate)
            VALUES (
                @UserID,
                'Achievement',
                'Achievement Unlocked!',
                CONCAT('Congratulations! You unlocked "', @AchievementName, '" achievement.'),
                GETDATE(),
                DATEADD(DAY, 7, GETDATE())
            );
            
            -- Add to feed
            INSERT INTO UserFeed (UserID, ActivityType, ActivityData, CreatedDate)
            VALUES (@UserID, 'Achievement', 
                    CONCAT('Unlocked "', @AchievementName, '" achievement'),
                    GETDATE());
            
            COMMIT TRANSACTION;
        END TRY
        BEGIN CATCH
            ROLLBACK TRANSACTION;
            THROW;
        END CATCH
    END
END;
GO

-- Procedure to check and award achievements
CREATE PROCEDURE sp_CheckAchievements
    @UserID INT
AS
BEGIN
    SET NOCOUNT ON;
    
    -- Check for First Steps achievement
    IF (SELECT COUNT(*) FROM UserProgress 
        WHERE UserID = @UserID AND Status = 'Completed') >= 1
    BEGIN
        EXEC sp_AssignAchievement @UserID = @UserID, @AchievementID = 1;
    END
    
    -- Check for Dedicated Learner achievement
    DECLARE @PracticeDays INT;
    SELECT @PracticeDays = PracticeDays FROM UserStatistics WHERE UserID = @UserID;
    
    IF @PracticeDays >= 7
    BEGIN
        EXEC sp_AssignAchievement @UserID = @UserID, @AchievementID = 2;
    END
    
    -- Check for Raga Explorer achievement
    DECLARE @RagasLearned INT;
    SELECT @RagasLearned = RagasLearned FROM UserStatistics WHERE UserID = @UserID;
    
    IF @RagasLearned >= 5
    BEGIN
        EXEC sp_AssignAchievement @UserID = @UserID, @AchievementID = 3;
    END
END;
GO

-- Indexes for new tables
CREATE INDEX IX_UserProgress_Composition ON UserCompositionProgress(UserID, CompositionID);
CREATE INDEX IX_PracticeSessions_Component ON PracticeSessions(ComponentType, ComponentID);
CREATE INDEX IX_CommunityPosts_Type ON CommunityPosts(PostType, CreatedDate);
CREATE INDEX IX_Notifications_User ON Notifications(UserID, IsRead, CreatedDate);
CREATE INDEX IX_UserFeed_User ON UserFeed(UserID, CreatedDate);
CREATE INDEX IX_UserChallenges_Status ON UserChallenges(UserID, Status);
CREATE INDEX IX_PracticePlanItems_Plan ON PracticePlanItems(PlanID, DayNumber);
GO

-- Create full-text search catalog for compositions and lyrics
CREATE FULLTEXT CATALOG CarnaticMusicCatalog AS DEFAULT;
GO

CREATE FULLTEXT INDEX ON Compositions(Title, Lyrics, Notation)
KEY INDEX PK__Composit__3214EC273A81B327
ON CarnaticMusicCatalog
WITH CHANGE_TRACKING AUTO;
GO

CREATE FULLTEXT INDEX ON Ragas(RagaName, Description)
KEY INDEX PK__Ragas__3214EC27453F5D90
ON CarnaticMusicCatalog
WITH CHANGE_TRACKING AUTO;
GO

-- 38. User Learning Style Preferences
CREATE TABLE LearningPreferences (
    PreferenceID INT PRIMARY KEY IDENTITY(1,1),
    UserID INT UNIQUE NOT NULL,
    LearningStyle NVARCHAR(50) DEFAULT 'Visual', -- Visual, Auditory, Kinesthetic
    PreferredNotation NVARCHAR(50) DEFAULT 'Indian', -- Indian, Western, Both
    ShowTransliteration BIT DEFAULT 1,
    AutoPlayAudio BIT DEFAULT 1,
    ShowFingeringDiagrams BIT DEFAULT 1,
    PracticeReminderTime TIME DEFAULT '18:00:00',
    WeeklyGoalHours INT DEFAULT 3,
    FOREIGN KEY (UserID) REFERENCES Users(UserID)
);
GO

-- 39. Audio Recording Submissions
CREATE TABLE UserRecordings (
    RecordingID INT PRIMARY KEY IDENTITY(1,1),
    UserID INT NOT NULL,
    ComponentType NVARCHAR(50) NOT NULL,
    ComponentID INT NOT NULL,
    RecordingURL NVARCHAR(500) NOT NULL,
    RecordingDate DATETIME DEFAULT GETDATE(),
    DurationSeconds INT,
    TempoBPM INT,
    IsPublic BIT DEFAULT 0,
    Title NVARCHAR(200),
    Description NVARCHAR(1000),
    LikesCount INT DEFAULT 0,
    PlayCount INT DEFAULT 0,
    FOREIGN KEY (UserID) REFERENCES Users(UserID),
    CONSTRAINT CHK_Recording_Duration CHECK (DurationSeconds > 0)
);
GO

-- 40. Recording Feedback
CREATE TABLE RecordingFeedback (
    FeedbackID INT PRIMARY KEY IDENTITY(1,1),
    RecordingID INT NOT NULL,
    UserID INT NOT NULL, -- User giving feedback
    TeacherUserID INT, -- If feedback from a teacher
    Rating INT, -- 1-5 stars
    Comments NVARCHAR(2000),
    TimestampSeconds INT, -- For time-specific feedback
    IsPublic BIT DEFAULT 1,
    CreatedDate DATETIME DEFAULT GETDATE(),
    FOREIGN KEY (RecordingID) REFERENCES UserRecordings(RecordingID),
    FOREIGN KEY (UserID) REFERENCES Users(UserID),
    FOREIGN KEY (TeacherUserID) REFERENCES Users(UserID),
    CONSTRAINT CHK_Rating CHECK (Rating BETWEEN 1 AND 5)
);
GO

-- 41. Metronome Settings Presets
CREATE TABLE MetronomePresets (
    PresetID INT PRIMARY KEY IDENTITY(1,1),
    UserID INT NOT NULL,
    PresetName NVARCHAR(100) NOT NULL,
    TempoBPM INT DEFAULT 60,
    TimeSignature NVARCHAR(10) DEFAULT '4/4',
    AccentPattern NVARCHAR(100), -- JSON pattern for accents
    Subdivisions INT DEFAULT 1,
    CreatedDate DATETIME DEFAULT GETDATE(),
    FOREIGN KEY (UserID) REFERENCES Users(UserID)
);
GO

-- 42. Practice Session Analysis
CREATE TABLE SessionAnalysis (
    AnalysisID INT PRIMARY KEY IDENTITY(1,1),
    SessionID INT NOT NULL,
    ComponentType NVARCHAR(50),
    ComponentID INT,
    StartTime DATETIME,
    EndTime DATETIME,
    TempoVariation DECIMAL(5,2), -- Percentage variation
    AccuracyScore DECIMAL(5,2),
    RhythmConsistency DECIMAL(5,2),
    PitchAccuracy DECIMAL(5,2),
    AnalysisData NVARCHAR(MAX), -- JSON with detailed analysis
    CreatedDate DATETIME DEFAULT GETDATE(),
    FOREIGN KEY (SessionID) REFERENCES PracticeSessions(SessionID)
);
GO

-- 43. Learning Milestones
CREATE TABLE LearningMilestones (
    MilestoneID INT PRIMARY KEY IDENTITY(1,1),
    UserID INT NOT NULL,
    MilestoneType NVARCHAR(50), -- FirstRaga, FirstComposition, SpeedBreakthrough
    ComponentType NVARCHAR(50),
    ComponentID INT,
    AchievementDate DATETIME DEFAULT GETDATE(),
    Notes NVARCHAR(1000),
    FOREIGN KEY (UserID) REFERENCES Users(UserID)
);
GO

-- 44. Tag System for Content
CREATE TABLE Tags (
    TagID INT PRIMARY KEY IDENTITY(1,1),
    TagName NVARCHAR(100) UNIQUE NOT NULL,
    TagCategory NVARCHAR(50), -- RagaType, TalaType, Difficulty, Mood
    Description NVARCHAR(500)
);
GO

-- 45. Content Tagging
CREATE TABLE ContentTags (
    ContentTagID INT PRIMARY KEY IDENTITY(1,1),
    TagID INT NOT NULL,
    ContentType NVARCHAR(50) NOT NULL, -- Raga, Composition, Lesson
    ContentID INT NOT NULL,
    AddedDate DATETIME DEFAULT GETDATE(),
    FOREIGN KEY (TagID) REFERENCES Tags(TagID),
    CONSTRAINT UQ_ContentTag UNIQUE (TagID, ContentType, ContentID)
);
GO

-- 46. User Content Interactions
CREATE TABLE UserInteractions (
    InteractionID INT PRIMARY KEY IDENTITY(1,1),
    UserID INT NOT NULL,
    ContentType NVARCHAR(50) NOT NULL,
    ContentID INT NOT NULL,
    InteractionType NVARCHAR(50) NOT NULL, -- View, Like, Bookmark, Share
    InteractionDate DATETIME DEFAULT GETDATE(),
    DurationSeconds INT, -- For view interactions
    FOREIGN KEY (UserID) REFERENCES Users(UserID),
    CONSTRAINT UQ_UserInteraction UNIQUE (UserID, ContentType, ContentID, InteractionType, CAST(InteractionDate AS DATE))
);
GO

-- 47. Content Difficulty Ratings (Crowdsourced)
CREATE TABLE DifficultyRatings (
    RatingID INT PRIMARY KEY IDENTITY(1,1),
    ContentType NVARCHAR(50) NOT NULL,
    ContentID INT NOT NULL,
    UserID INT NOT NULL,
    DifficultyRating INT NOT NULL, -- 1-10
    Comments NVARCHAR(1000),
    RatedDate DATETIME DEFAULT GETDATE(),
    FOREIGN KEY (UserID) REFERENCES Users(UserID),
    CONSTRAINT CHK_DifficultyRating CHECK (DifficultyRating BETWEEN 1 AND 10)
);
GO

-- 48. Content Playlists
CREATE TABLE Playlists (
    PlaylistID INT PRIMARY KEY IDENTITY(1,1),
    UserID INT NOT NULL,
    PlaylistName NVARCHAR(200) NOT NULL,
    Description NVARCHAR(1000),
    IsPublic BIT DEFAULT 0,
    CreatedDate DATETIME DEFAULT GETDATE(),
    FOREIGN KEY (UserID) REFERENCES Users(UserID)
);
GO

-- 49. Playlist Items
CREATE TABLE PlaylistItems (
    PlaylistItemID INT PRIMARY KEY IDENTITY(1,1),
    PlaylistID INT NOT NULL,
    ContentType NVARCHAR(50) NOT NULL,
    ContentID INT NOT NULL,
    OrderSequence INT,
    AddedDate DATETIME DEFAULT GETDATE(),
    Notes NVARCHAR(500),
    FOREIGN KEY (PlaylistID) REFERENCES Playlists(PlaylistID)
);
GO

-- 50. Scheduled Practice Sessions
CREATE TABLE ScheduledSessions (
    ScheduleID INT PRIMARY KEY IDENTITY(1,1),
    UserID INT NOT NULL,
    ScheduleName NVARCHAR(200),
    ComponentType NVARCHAR(50),
    ComponentID INT,
    ScheduledDate DATE NOT NULL,
    ScheduledTime TIME,
    DurationMinutes INT DEFAULT 30,
    RecurrencePattern NVARCHAR(50), -- Daily, Weekly, None
    IsCompleted BIT DEFAULT 0,
    CreatedDate DATETIME DEFAULT GETDATE(),
    FOREIGN KEY (UserID) REFERENCES Users(UserID)
);
GO

-- More Optimized Views for Web Application

-- View for dashboard with all stats
CREATE VIEW vw_UserDashboardEnhanced AS
SELECT 
    u.UserID,
    u.Username,
    u.Level,
    us.TotalPracticeMinutes,
    us.PracticeDays,
    us.CurrentStreak,
    us.LongestStreak,
    us.CompositionsLearned,
    us.RagasLearned,
    us.AchievementsCount,
    (SELECT COUNT(*) FROM UserProgress WHERE UserID = u.UserID AND Status = 'Completed') AS TotalCompleted,
    (SELECT COUNT(*) FROM UserProgress WHERE UserID = u.UserID AND Status = 'In Progress') AS TotalInProgress,
    (SELECT AVG(SelfRating) FROM UserProgress WHERE UserID = u.UserID AND SelfRating IS NOT NULL) AS AverageSelfRating,
    (SELECT COUNT(*) FROM UserChallenges WHERE UserID = u.UserID AND Status = 'Completed') AS ChallengesCompleted,
    dbo.fn_CalculateStreak(u.UserID) AS CurrentStreakCalculated
FROM Users u
LEFT JOIN UserStatistics us ON u.UserID = us.UserID;
GO

-- View for practice analytics
CREATE VIEW vw_PracticeAnalytics AS
SELECT 
    u.UserID,
    DATEPART(YEAR, ps.SessionDate) AS PracticeYear,
    DATEPART(MONTH, ps.SessionDate) AS PracticeMonth,
    DATEPART(WEEK, ps.SessionDate) AS PracticeWeek,
    COUNT(*) AS SessionCount,
    SUM(ps.DurationMinutes) AS TotalMinutes,
    AVG(ps.DurationMinutes) AS AvgSessionMinutes,
    MIN(ps.DurationMinutes) AS MinSessionMinutes,
    MAX(ps.DurationMinutes) AS MaxSessionMinutes,
    STRING_AGG(DISTINCT ps.ComponentType, ', ') AS ComponentsPracticed
FROM Users u
JOIN PracticeSessions ps ON u.UserID = ps.UserID
GROUP BY u.UserID, 
    DATEPART(YEAR, ps.SessionDate),
    DATEPART(MONTH, ps.SessionDate),
    DATEPART(WEEK, ps.SessionDate);
GO

-- View for content recommendations based on user progress
CREATE VIEW vw_PersonalizedRecommendations AS
WITH UserProgressCTE AS (
    SELECT 
        up.UserID,
        up.ComponentType,
        up.ComponentID,
        up.Status,
        up.LastPracticed
    FROM UserProgress up
    WHERE up.Status IN ('Completed', 'In Progress')
),
RagaRecommendations AS (
    SELECT 
        up.UserID,
        r.RagaID,
        r.RagaName,
        r.DifficultyLevel,
        COUNT(DISTINCT rc.CompositionID) AS CompositionCount,
        ROW_NUMBER() OVER (PARTITION BY up.UserID ORDER BY r.DifficultyLevel, COUNT(DISTINCT rc.CompositionID) DESC) AS RecRank
    FROM UserProgressCTE up
    JOIN Ragas r ON up.ComponentType = 'Raga' AND up.ComponentID = r.RagaID
    LEFT JOIN Compositions rc ON r.RagaID = rc.RagaID
    WHERE up.Status = 'Completed'
    GROUP BY up.UserID, r.RagaID, r.RagaName, r.DifficultyLevel
)
SELECT 
    ur.UserID,
    'Raga' AS RecommendationType,
    rr.RagaID AS RecommendedID,
    rr.RagaName AS RecommendedName,
    'Based on your completed ragas' AS Reason,
    rr.RecRank
FROM UserProgressCTE up
CROSS JOIN RagaRecommendations rr
WHERE up.UserID = rr.UserID
AND rr.RecRank <= 5
UNION ALL
SELECT 
    u.UserID,
    'Lesson' AS RecommendationType,
    l.LessonID AS RecommendedID,
    l.LessonName AS RecommendedName,
    'Next lesson in your level' AS Reason,
    ROW_NUMBER() OVER (PARTITION BY u.UserID ORDER BY l.Level, l.OrderSequence) AS RecRank
FROM Users u
CROSS JOIN Lessons l
WHERE l.Level <= u.Level + 1
AND NOT EXISTS (
    SELECT 1 FROM UserProgress up 
    WHERE up.UserID = u.UserID 
    AND up.LessonID = l.LessonID
)
AND (l.PrerequisiteLessonID IS NULL OR EXISTS (
    SELECT 1 FROM UserProgress up2
    WHERE up2.UserID = u.UserID
    AND up2.LessonID = l.PrerequisiteLessonID
    AND up2.Status = 'Completed'
));
GO

-- View for community activity
CREATE VIEW vw_CommunityActivity AS
SELECT 
    'Post' AS ActivityType,
    cp.PostID AS ActivityID,
    cp.UserID,
    u.Username,
    cp.Title AS ActivityTitle,
    cp.Content AS ActivityDetails,
    cp.CreatedDate,
    cp.ViewCount,
    (SELECT COUNT(*) FROM PostComments pc WHERE pc.PostID = cp.PostID) AS CommentCount
FROM CommunityPosts cp
JOIN Users u ON cp.UserID = u.UserID
WHERE cp.IsPublic = 1
UNION ALL
SELECT 
    'Recording' AS ActivityType,
    ur.RecordingID AS ActivityID,
    ur.UserID,
    u.Username,
    ur.Title AS ActivityTitle,
    ur.Description AS ActivityDetails,
    ur.RecordingDate AS CreatedDate,
    ur.PlayCount AS ViewCount,
    ur.LikesCount AS CommentCount
FROM UserRecordings ur
JOIN Users u ON ur.UserID = u.UserID
WHERE ur.IsPublic = 1
ORDER BY CreatedDate DESC;
GO

-- API-Optimized Views (JSON ready)

-- View for user profile API
CREATE VIEW vw_API_UserProfile AS
SELECT 
    u.UserID,
    u.Username,
    u.Email,
    u.FirstName,
    u.LastName,
    u.Level,
    u.JoinDate,
    us.TotalPracticeMinutes,
    us.PracticeDays,
    us.CurrentStreak,
    us.CompositionsLearned,
    us.RagasLearned,
    us.AchievementsCount,
    up.DefaultInstrument,
    up.NotationStyle,
    up.DailyGoalMinutes,
    lp.LearningStyle,
    lp.PreferredNotation
FROM Users u
LEFT JOIN UserStatistics us ON u.UserID = us.UserID
LEFT JOIN UserPreferences up ON u.UserID = up.UserID
LEFT JOIN LearningPreferences lp ON u.UserID = lp.UserID;
GO

-- View for lesson details API
CREATE VIEW vw_API_LessonDetails AS
SELECT 
    l.LessonID,
    l.LessonName,
    l.Category,
    l.Level,
    l.OrderSequence,
    l.Description,
    l.Notation,
    l.AudioReference,
    l.VideoReference,
    l.EstimatedMinutes,
    pl.LessonName AS PrerequisiteLessonName,
    (SELECT COUNT(*) FROM UserProgress up WHERE up.LessonID = l.LessonID) AS TotalLearners,
    (SELECT AVG(SelfRating) FROM UserProgress up WHERE up.LessonID = l.LessonID AND SelfRating IS NOT NULL) AS AverageRating,
    JSON_QUERY((
        SELECT TagName
        FROM ContentTags ct
        JOIN Tags t ON ct.TagID = t.TagID
        WHERE ct.ContentType = 'Lesson' AND ct.ContentID = l.LessonID
        FOR JSON PATH
    )) AS Tags
FROM Lessons l
LEFT JOIN Lessons pl ON l.PrerequisiteLessonID = pl.LessonID;
GO

-- View for raga details API
CREATE VIEW vw_API_RagaDetails AS
SELECT 
    r.RagaID,
    r.RagaName,
    r.IsMelakartha,
    mr.RagaName AS MelakarthaName,
    r.Arohanam,
    r.Avarohanam,
    r.JanyaType,
    r.TimeOfDay,
    r.Mood,
    r.PopularCompositions,
    r.AudioReference,
    r.DifficultyLevel,
    (SELECT COUNT(*) FROM Compositions c WHERE c.RagaID = r.RagaID) AS CompositionCount,
    JSON_QUERY((
        SELECT g.GamakaName, rgm.Swara, rgm.ImportanceLevel
        FROM RagaGamakaMapping rgm
        JOIN Gamakas g ON rgm.GamakaID = g.GamakaID
        WHERE rgm.RagaID = r.RagaID
        FOR JSON PATH
    )) AS Gamakas,
    JSON_QUERY((
        SELECT t.TagName
        FROM ContentTags ct
        JOIN Tags t ON ct.TagID = t.TagID
        WHERE ct.ContentType = 'Raga' AND ct.ContentID = r.RagaID
        FOR JSON PATH
    )) AS Tags
FROM Ragas r
LEFT JOIN MelakarthaRagas mr ON r.MelakarthaRagaID = mr.RagaID;
GO

-- Advanced Stored Procedures

-- Procedure to get user's weekly practice summary
CREATE PROCEDURE sp_GetWeeklySummary
    @UserID INT,
    @WeekOffset INT = 0 -- 0 for current week, -1 for last week, etc.
AS
BEGIN
    SET NOCOUNT ON;
    
    DECLARE @StartDate DATE, @EndDate DATE;
    
    -- Calculate week boundaries
    SET @StartDate = DATEADD(WEEK, @WeekOffset, DATEADD(DAY, 1-DATEPART(WEEKDAY, GETDATE()), GETDATE()));
    SET @EndDate = DATEADD(DAY, 6, @StartDate);
    
    SELECT 
        @StartDate AS WeekStart,
        @EndDate AS WeekEnd,
        ISNULL(SUM(ps.DurationMinutes), 0) AS TotalMinutes,
        COUNT(DISTINCT CAST(ps.SessionDate AS DATE)) AS PracticeDays,
        ISNULL(AVG(ps.DurationMinutes), 0) AS AverageDailyMinutes,
        STRING_AGG(DISTINCT ps.ComponentType, ', ') WITHIN GROUP (ORDER BY ps.ComponentType) AS ComponentsPracticed,
        JSON_QUERY((
            SELECT 
                DATENAME(WEEKDAY, CAST(ps2.SessionDate AS DATE)) AS Day,
                SUM(ps2.DurationMinutes) AS Minutes,
                COUNT(*) AS Sessions
            FROM PracticeSessions ps2
            WHERE ps2.UserID = @UserID
            AND CAST(ps2.SessionDate AS DATE) BETWEEN @StartDate AND @EndDate
            GROUP BY CAST(ps2.SessionDate AS DATE)
            FOR JSON PATH
        )) AS DailyBreakdown
    FROM PracticeSessions ps
    WHERE ps.UserID = @UserID
    AND CAST(ps.SessionDate AS DATE) BETWEEN @StartDate AND @EndDate;
END;
GO

-- Procedure to update user level based on progress
CREATE PROCEDURE sp_UpdateUserLevel
    @UserID INT
AS
BEGIN
    SET NOCOUNT ON;
    
    DECLARE @CurrentLevel INT, @NewLevel INT;
    DECLARE @CompletedItems INT, @PracticeHours DECIMAL(10,2);
    
    SELECT @CurrentLevel = Level FROM Users WHERE UserID = @UserID;
    
    -- Calculate metrics
    SELECT @CompletedItems = COUNT(*) 
    FROM UserProgress 
    WHERE UserID = @UserID AND Status = 'Completed';
    
    SELECT @PracticeHours = ISNULL(SUM(DurationMinutes), 0) / 60.0
    FROM PracticeSessions 
    WHERE UserID = @UserID;
    
    -- Determine new level based on progress
    SET @NewLevel = @CurrentLevel;
    
    IF @PracticeHours >= 100 AND @CompletedItems >= 20
        SET @NewLevel = 5; -- Expert
    ELSE IF @PracticeHours >= 50 AND @CompletedItems >= 10
        SET @NewLevel = 4; -- Advanced
    ELSE IF @PracticeHours >= 25 AND @CompletedItems >= 5
        SET @NewLevel = 3; -- Intermediate
    ELSE IF @PracticeHours >= 10 AND @CompletedItems >= 2
        SET @NewLevel = 2; -- Beginner+
    ELSE
        SET @NewLevel = 1; -- Beginner
    
    -- Update if level changed
    IF @NewLevel != @CurrentLevel
    BEGIN
        UPDATE Users SET Level = @NewLevel WHERE UserID = @UserID;
        
        -- Add milestone
        INSERT INTO LearningMilestones (UserID, MilestoneType, AchievementDate, Notes)
        VALUES (@UserID, 'LevelUp', GETDATE(), 
                CONCAT('Advanced from Level ', @CurrentLevel, ' to Level ', @NewLevel));
        
        -- Add notification
        INSERT INTO Notifications (UserID, NotificationType, Title, Message, CreatedDate)
        VALUES (@UserID, 'Achievement', 'Level Up!',
                CONCAT('Congratulations! You have reached Level ', @NewLevel, '!'),
                GETDATE());
    END
END;
GO

-- Procedure to generate practice plan for user
CREATE PROCEDURE sp_GeneratePracticePlan
    @UserID INT,
    @DurationDays INT = 7,
    @DailyMinutes INT = 30
AS
BEGIN
    SET NOCOUNT ON;
    
    DECLARE @PlanID INT;
    
    -- Create new practice plan
    INSERT INTO PracticePlans (PlanName, Level, TotalWeeks, DailyPracticeMinutes, Description, CreatedBy, IsPublic)
    SELECT 
        CONCAT('Personalized Plan for ', Username),
        Level,
        CEILING(@DurationDays / 7.0),
        @DailyMinutes,
        'Auto-generated practice plan based on your progress',
        @UserID,
        0
    FROM Users WHERE UserID = @UserID;
    
    SET @PlanID = SCOPE_IDENTITY();
    
    -- Add items to plan
    DECLARE @Day INT = 1;
    DECLARE @MinutesRemaining INT = @DailyMinutes;
    
    -- Add warm-up exercises
    WHILE @Day <= @DurationDays
    BEGIN
        -- Add sarali varisai for first 10 minutes
        INSERT INTO PracticePlanItems (PlanID, DayNumber, ComponentType, ComponentID, DurationMinutes, OrderSequence)
        VALUES (@PlanID, @Day, 'Lesson', 1, 10, 1); -- Sarali Varisai 1
        
        SET @MinutesRemaining = @DailyMinutes - 10;
        
        -- Add current in-progress items
        INSERT INTO PracticePlanItems (PlanID, DayNumber, ComponentType, ComponentID, DurationMinutes, OrderSequence)
        SELECT TOP 2
            @PlanID,
            @Day,
            up.ComponentType,
            up.ComponentID,
            @MinutesRemaining / 2,
            ROW_NUMBER() OVER (ORDER BY up.LastPracticed) + 1
        FROM UserProgress up
        WHERE up.UserID = @UserID 
        AND up.Status = 'In Progress'
        ORDER BY up.LastPracticed;
        
        SET @Day = @Day + 1;
    END
    
    -- Assign plan to user
    INSERT INTO UserPracticePlans (UserID, PlanID, StartDate, IsActive)
    VALUES (@UserID, @PlanID, GETDATE(), 1);
    
    SELECT @PlanID AS GeneratedPlanID;
END;
GO

-- Function to calculate estimated time to mastery
CREATE FUNCTION fn_EstimateMasteryTime (
    @UserLevel INT,
    @ComponentDifficulty INT,
    @PracticeFrequency INT -- Days per week
)
RETURNS DECIMAL(10,2)
AS
BEGIN
    DECLARE @BaseHours DECIMAL(10,2);
    
    -- Base hours needed based on difficulty
    SET @BaseHours = CASE @ComponentDifficulty
        WHEN 1 THEN 5.0
        WHEN 2 THEN 10.0
        WHEN 3 THEN 20.0
        WHEN 4 THEN 40.0
        WHEN 5 THEN 80.0
        ELSE 10.0
    END;
    
    -- Adjust based on user level
    SET @BaseHours = @BaseHours * (1.0 - (@UserLevel - 1) * 0.1);
    
    -- Adjust based on practice frequency
    IF @PracticeFrequency < 2
        SET @BaseHours = @BaseHours * 1.5;
    ELSE IF @PracticeFrequency > 5
        SET @BaseHours = @BaseHours * 0.8;
    
    RETURN @BaseHours;
END;
GO

-- Event Scheduler Table for Background Jobs
CREATE TABLE ScheduledJobs (
    JobID INT PRIMARY KEY IDENTITY(1,1),
    JobType NVARCHAR(100) NOT NULL,
    JobData NVARCHAR(MAX),
    ScheduledTime DATETIME NOT NULL,
    Status NVARCHAR(50) DEFAULT 'Pending', -- Pending, Running, Completed, Failed
    RetryCount INT DEFAULT 0,
    MaxRetries INT DEFAULT 3,
    CreatedDate DATETIME DEFAULT GETDATE(),
    LastAttempt DATETIME,
    ErrorMessage NVARCHAR(MAX)
);
GO

-- Create indexes for performance
CREATE INDEX IX_UserRecordings_User ON UserRecordings(UserID, RecordingDate);
CREATE INDEX IX_RecordingFeedback_Recording ON RecordingFeedback(RecordingID, CreatedDate);
CREATE INDEX IX_ContentTags_Content ON ContentTags(ContentType, ContentID);
CREATE INDEX IX_UserInteractions_Content ON UserInteractions(ContentType, ContentID, InteractionDate);
CREATE INDEX IX_ScheduledJobs_Status ON ScheduledJobs(Status, ScheduledTime);
CREATE INDEX IX_PracticeSessions_DateRange ON PracticeSessions(UserID, SessionDate);
CREATE INDEX IX_UserProgress_StatusDate ON UserProgress(UserID, Status, LastPracticed);
GO

-- Create computed columns for frequently accessed data
ALTER TABLE Users
ADD DisplayName AS ISNULL(FirstName + ' ' + LastName, Username);
GO

ALTER TABLE PracticeSessions
ADD PracticeDate AS CAST(SessionDate AS DATE);
GO

ALTER TABLE UserProgress
ADD DaysSinceLastPractice AS 
    CASE 
        WHEN LastPracticed IS NULL THEN NULL
        ELSE DATEDIFF(DAY, LastPracticed, GETDATE())
    END;
GO

-- Sample data insertion for testing
INSERT INTO Tags (TagName, TagCategory, Description) VALUES
('Devotional', 'Mood', 'Ragas suitable for devotional music'),
('Romantic', 'Mood', 'Ragas expressing romantic emotions'),
('Morning', 'Time', 'Ragas traditionally sung in morning'),
('Evening', 'Time', 'Ragas traditionally sung in evening'),
('Varnam', 'CompositionType', 'Type of composition for practice'),
('Krithi', 'CompositionType', 'Main compositional form in Carnatic music'),
('Beginner', 'Difficulty', 'Suitable for beginners'),
('Advanced', 'Difficulty', 'Requires advanced skills'),
('SpeedPractice', 'PracticeType', 'Exercises for speed development'),
('GamakaRich', 'Technique', 'Contains many ornamentations');
GO

-- Insert sample learning preferences
INSERT INTO LearningPreferences (UserID, LearningStyle, PreferredNotation, WeeklyGoalHours) VALUES
(1, 'Visual', 'Indian', 5),
(1, 'Auditory', 'Both', 7);
GO

-- Insert sample metronome presets
INSERT INTO MetronomePresets (UserID, PresetName, TempoBPM, TimeSignature) VALUES
(1, 'Slow Practice', 60, '4/4'),
(1, 'Medium Speed', 80, '4/4'),
(1, 'Performance Tempo', 120, '4/4'),
(1, 'Tala Practice', 60, '8/8');
GO

-- Create audit log for important changes
CREATE TABLE AuditLog (
    AuditID INT PRIMARY KEY IDENTITY(1,1),
    TableName NVARCHAR(100) NOT NULL,
    RecordID INT NOT NULL,
    ActionType NVARCHAR(50) NOT NULL, -- INSERT, UPDATE, DELETE
    OldData NVARCHAR(MAX),
    NewData NVARCHAR(MAX),
    ChangedBy INT, -- UserID who made change
    ChangedDate DATETIME DEFAULT GETDATE(),
    IPAddress NVARCHAR(50),
    FOREIGN KEY (ChangedBy) REFERENCES Users(UserID)
);
GO

-- Trigger for audit logging on important tables
CREATE TRIGGER trg_Audit_Users
ON Users
AFTER UPDATE
AS
BEGIN
    SET NOCOUNT ON;
    
    INSERT INTO AuditLog (TableName, RecordID, ActionType, OldData, NewData, ChangedBy)
    SELECT 
        'Users',
        i.UserID,
        'UPDATE',
        (SELECT d.* FOR JSON PATH, WITHOUT_ARRAY_WRAPPER),
        (SELECT i.* FOR JSON PATH, WITHOUT_ARRAY_WRAPPER),
        i.UserID -- In real app, get from session
    FROM inserted i
    JOIN deleted d ON i.UserID = d.UserID;
END;
GO

-- Create spatial index for location-based features (if needed)
-- ALTER TABLE Users ADD Location GEOGRAPHY;
-- CREATE SPATIAL INDEX IX_Users_Location ON Users(Location);
GO

-- Create partition function and scheme for large tables (for scalability)
CREATE PARTITION FUNCTION pf_PracticeSessionsDate (DATE)
AS RANGE RIGHT FOR VALUES (
    '2024-01-01', '2024-07-01', '2025-01-01', '2025-07-01'
);
GO

CREATE PARTITION SCHEME ps_PracticeSessionsDate
AS PARTITION pf_PracticeSessionsDate
ALL TO ([PRIMARY]);
GO

-- Note: To apply partitioning, you would need to:
-- 1. Drop existing indexes on PracticeSessions
-- 2. Recreate table on partition scheme
-- 3. This is shown here as reference for production scaling

-- Create synonyms for easier access
CREATE SYNONYM syn_Users FOR Users;
CREATE SYNONYM syn_Ragas FOR Ragas;
CREATE SYNONYM syn_Compositions FOR Compositions;
CREATE SYNONYM syn_Progress FOR UserProgress;
GO

-- Create sequence for generating IDs (alternative to IDENTITY)
CREATE SEQUENCE seq_ContentID
    AS INT
    START WITH 1000
    INCREMENT BY 1
    MINVALUE 1000
    MAXVALUE 999999
    CYCLE;
GO

-- Example of using sequence
CREATE TABLE TestContent (
    ContentID INT PRIMARY KEY DEFAULT (NEXT VALUE FOR seq_ContentID),
    ContentName NVARCHAR(100)
);
GO

-- Cleanup script template (for development)
CREATE PROCEDURE sp_CleanupTestData
    @DaysOld INT = 30
AS
BEGIN
    SET NOCOUNT ON;
    
    -- Archive old sessions before deleting
    INSERT INTO PracticeSessions_Archive
    SELECT * FROM PracticeSessions 
    WHERE SessionDate < DATEADD(DAY, -@DaysOld, GETDATE());
    
    -- Delete old data
    DELETE FROM PracticeSessions 
    WHERE SessionDate < DATEADD(DAY, -@DaysOld, GETDATE());
    
    -- Update statistics
    EXEC sp_update_stats;
END;
GO