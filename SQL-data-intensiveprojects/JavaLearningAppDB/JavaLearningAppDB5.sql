-- Clean up old progress data (keep only last 90 days)
DELETE FROM UserProgress 
WHERE CompletedAt < DATEADD(DAY, -90, GETDATE());

-- Update statistics for query optimization
UPDATE STATISTICS Users;
UPDATE STATISTICS Topics;
UPDATE STATISTICS Lessons;
UPDATE STATISTICS UserProgress;

-- Backup script (run as a SQL Agent Job)
BACKUP DATABASE JavaLearningDB
TO DISK = 'D:\Backups\JavaLearningDB.bak'
WITH INIT, COMPRESSION;

-- Index maintenance
ALTER INDEX ALL ON UserProgress REORGANIZE;
ALTER INDEX ALL ON Lessons REBUILD;