--Step8: Indexes, Performance Tuning, and Optimiation
--A. Understanding Indexes
-- 1. View existing indexes
-- For a specific table
EXEC sp_helpindex 'Employees';
EXEC sp_helpindex 'Departments';

-- Using system views
SELECT 
    t.name AS TableName,
    i.name AS IndexName,
    i.type_desc AS IndexType,
    COL_NAME(ic.object_id, ic.column_id) AS ColumnName,
    ic.is_included_column AS IsIncludedColumn,
    i.is_unique AS IsUnique
FROM sys.tables t
INNER JOIN sys.indexes i ON t.object_id = i.object_id
INNER JOIN sys.index_columns ic ON i.object_id = ic.object_id 
    AND i.index_id = ic.index_id
WHERE t.name = 'Employees'
ORDER BY i.name, ic.key_ordinal;

-- 2. Create basic indexes
-- Single column index
CREATE INDEX IX_Employees_DepartmentID ON Employees(DepartmentID);

-- Composite index (multiple columns)
CREATE INDEX IX_Employees_HireDate_Dept ON Employees(HireDate, DepartmentID);

-- Unique index (enforces uniqueness)
CREATE UNIQUE INDEX UQ_Employees_Email ON Employees(Email);

-- Filtered index (for specific data subset)
CREATE INDEX IX_Employees_ActiveHighSalary 
ON Employees(Salary) 
WHERE Salary > 80000;

-- 3. Create covering index (includes all columns needed by query)
CREATE INDEX IX_Employees_Covering 
ON Employees(DepartmentID)
INCLUDE (FirstName, LastName, Salary, HireDate);

-- 4. Create indexed view (we created earlier, but let's add more)
CREATE VIEW vw_EmployeeCountByDeptYear
WITH SCHEMABINDING
AS
SELECT 
    DepartmentID,
    YEAR(HireDate) AS HireYear,
    COUNT_BIG(*) AS EmployeeCount
FROM dbo.Employees
GROUP BY DepartmentID, YEAR(HireDate);
GO

CREATE UNIQUE CLUSTERED INDEX IX_vw_EmployeeCountByDeptYear
ON vw_EmployeeCountByDeptYear(DepartmentID, HireYear);
GO

-- 5. Full-text index (for text searching)
-- First enable full-text if not already enabled
EXEC sp_fulltext_database 'enable';

-- Create full-text catalog
CREATE FULLTEXT CATALOG ftCatalog AS DEFAULT;

-- Create full-text index
CREATE FULLTEXT INDEX ON Employees(FirstName, LastName, JobTitle)
KEY INDEX PK__Employee__7AD04FF1C1F8DC7B -- Primary key name
ON ftCatalog
WITH CHANGE_TRACKING AUTO;
GO

-- Search using full-text
SELECT * FROM Employees
WHERE CONTAINS((FirstName, LastName), '"John" OR "Smith"');

-- 6. Spatial index (if using spatial data)
-- Create geography column for demonstration
ALTER TABLE Departments
ADD LocationGeo geography NULL;
GO

-- Update with sample data
UPDATE Departments SET LocationGeo = 
    geography::Point(40.7128, -74.0060, 4326) WHERE DepartmentName = 'IT';
UPDATE Departments SET LocationGeo = 
    geography::Point(41.8781, -87.6298, 4326) WHERE DepartmentName = 'HR';

-- Create spatial index
CREATE SPATIAL INDEX IX_Departments_Location
ON Departments(LocationGeo)
WITH (BOUNDING_BOX = (-180, -90, 180, 90));

-- Query using spatial index
SELECT DepartmentName, Location
FROM Departments
WHERE LocationGeo.STDistance(geography::Point(40.7128, -74.0060, 4326)) <= 100000;

--B. Query Performance Analysis
-- 1. SET STATISTICS options
SET STATISTICS IO ON;  -- Shows disk I/O
SET STATISTICS TIME ON; -- Shows time statistics

-- Run a query to see statistics
SELECT 
    d.DepartmentName,
    COUNT(e.EmployeeID) AS EmployeeCount,
    AVG(e.Salary) AS AvgSalary
FROM Employees e
INNER JOIN Departments d ON e.DepartmentID = d.DepartmentID
WHERE e.HireDate > '2020-01-01'
GROUP BY d.DepartmentName
ORDER BY EmployeeCount DESC;

SET STATISTICS IO OFF;
SET STATISTICS TIME OFF;

-- 2. Show actual execution plan (Ctrl + M in SSMS)
-- Or use:
SET SHOWPLAN_TEXT ON;
GO
-- Your query here
SELECT * FROM Employees WHERE DepartmentID = 1;
GO
SET SHOWPLAN_TEXT OFF;

-- 3. Use DMVs to analyze query performance
-- Top 10 most expensive queries
SELECT TOP 10
    qs.execution_count,
    qs.total_worker_time/1000 AS total_cpu_time_ms,
    qs.total_elapsed_time/1000 AS total_duration_ms,
    qs.total_logical_reads,
    qs.total_physical_reads,
    SUBSTRING(st.text, (qs.statement_start_offset/2) + 1,
        ((CASE qs.statement_end_offset
            WHEN -1 THEN DATALENGTH(st.text)
            ELSE qs.statement_end_offset
        END - qs.statement_start_offset)/2) + 1) AS query_text,
    DB_NAME(qp.dbid) AS database_name
FROM sys.dm_exec_query_stats qs
CROSS APPLY sys.dm_exec_sql_text(qs.sql_handle) st
CROSS APPLY sys.dm_exec_query_plan(qs.plan_handle) qp
ORDER BY qs.total_worker_time DESC;

-- 4. Missing index recommendations
SELECT 
    migs.avg_total_user_cost * (migs.avg_user_impact / 100.0) * (migs.user_seeks + migs.user_scans) AS improvement_measure,
    DB_NAME(mid.database_id) AS database_name,
    mid.[statement] AS table_name,
    mid.equality_columns,
    mid.inequality_columns,
    mid.included_columns,
    migs.unique_compiles,
    migs.user_seeks,
    migs.user_scans,
    migs.last_user_seek,
    migs.avg_total_user_cost,
    migs.avg_user_impact
FROM sys.dm_db_missing_index_details mid
INNER JOIN sys.dm_db_missing_index_groups mig ON mid.index_handle = mig.index_handle
INNER JOIN sys.dm_db_missing_index_group_stats migs ON mig.index_group_handle = migs.group_handle
WHERE DB_NAME(mid.database_id) = 'EmployeeManagementSystem'
ORDER BY improvement_measure DESC;

-- 5. Index usage statistics
SELECT 
    OBJECT_NAME(s.object_id) AS TableName,
    i.name AS IndexName,
    i.type_desc AS IndexType,
    s.user_seeks,
    s.user_scans,
    s.user_lookups,
    s.user_updates,
    s.last_user_seek,
    s.last_user_scan
FROM sys.dm_db_index_usage_stats s
INNER JOIN sys.indexes i ON s.object_id = i.object_id AND s.index_id = i.index_id
WHERE OBJECT_NAME(s.object_id) = 'Employees'
ORDER BY s.user_seeks + s.user_scans DESC;

--C. Query Optimization Techniques
-- 1. Use EXISTS instead of IN for large datasets
-- Less efficient for large subqueries
SELECT * FROM Employees 
WHERE DepartmentID IN (SELECT DepartmentID FROM Departments WHERE Budget > 300000);

-- More efficient
SELECT e.* FROM Employees e
WHERE EXISTS (
    SELECT 1 FROM Departments d 
    WHERE d.DepartmentID = e.DepartmentID AND d.Budget > 300000
);

-- 2. Avoid SELECT * - specify only needed columns
-- Less efficient
SELECT * FROM Employees WHERE DepartmentID = 1;

-- More efficient
SELECT EmployeeID, FirstName, LastName, Salary 
FROM Employees WHERE DepartmentID = 1;

-- 3. Use appropriate join types
-- Cartesian product (avoid unless needed)
SELECT * FROM Employees, Departments;

-- Proper joins
SELECT * FROM Employees e
INNER JOIN Departments d ON e.DepartmentID = d.DepartmentID;

-- 4. Use UNION ALL instead of UNION when possible (if duplicates don't matter)
-- UNION removes duplicates (more expensive)
SELECT DepartmentID FROM Employees WHERE Salary > 70000
UNION
SELECT DepartmentID FROM Departments WHERE Budget > 300000;

-- UNION ALL keeps duplicates (faster)
SELECT DepartmentID FROM Employees WHERE Salary > 70000
UNION ALL
SELECT DepartmentID FROM Departments WHERE Budget > 300000;

-- 5. Optimize WHERE clause order
-- SQL Server optimizer is smart, but sometimes order matters
-- Put most restrictive conditions first
SELECT * FROM Employees
WHERE Salary > 80000  -- More restrictive
  AND DepartmentID = 1 -- Less restrictive
  AND HireDate > '2020-01-01';

-- 6. Use computed columns with indexes
ALTER TABLE Employees
ADD AnnualBonus AS (Salary * 0.1) PERSISTED;
GO

CREATE INDEX IX_Employees_AnnualBonus ON Employees(AnnualBonus);
GO

-- 7. Partition large tables (conceptual example)
-- Create partition function
CREATE PARTITION FUNCTION pf_HireDate (DATE)
AS RANGE RIGHT FOR VALUES 
('2018-01-01', '2019-01-01', '2020-01-01', '2021-01-01');
GO

-- Create partition scheme
CREATE PARTITION SCHEME ps_HireDate
AS PARTITION pf_HireDate
ALL TO ([PRIMARY]);
GO

-- Create partitioned table (would need to recreate table)
-- This is conceptual - in practice you'd partition existing tables

--D. Advanced Optimization Examples

-- 1. Force index usage (use with caution!)
SELECT * FROM Employees WITH (INDEX(IX_Employees_DepartmentID))
WHERE DepartmentID = 1;

-- 2. Use query hints
SELECT * FROM Employees 
WHERE DepartmentID = 1
OPTION (RECOMPILE); -- Forces new execution plan

-- 3. Optimize correlated subqueries
-- Original (might be slow)
SELECT 
    e.FirstName,
    e.LastName,
    e.Salary,
    (SELECT AVG(Salary) FROM Employees WHERE DepartmentID = e.DepartmentID) AS DeptAvg
FROM Employees e;

-- Optimized using window function
SELECT 
    FirstName,
    LastName,
    Salary,
    AVG(Salary) OVER (PARTITION BY DepartmentID) AS DeptAvg
FROM Employees;

-- 4. Optimize aggregate queries
-- Original
SELECT 
    DepartmentID,
    AVG(Salary) AS AvgSalary
FROM Employees
GROUP BY DepartmentID
HAVING AVG(Salary) > 70000;

-- With filtered index support
CREATE INDEX IX_Employees_HighSalaryDept 
ON Employees(DepartmentID, Salary) 
WHERE Salary > 70000;

-- 5. Use table variables vs temp tables appropriately
-- For small datasets (< 100 rows)
DECLARE @SmallTable TABLE (
    EmployeeID INT,
    FirstName VARCHAR(50)
);

-- For larger datasets or when you need indexes
CREATE TABLE #LargeTable (
    EmployeeID INT PRIMARY KEY,
    FirstName VARCHAR(50),
    Salary DECIMAL(10,2)
);

CREATE INDEX IX_Temp_Salary ON #LargeTable(Salary);

-- 6. Optimize string operations
-- Less efficient
SELECT * FROM Employees 
WHERE LEFT(FirstName, 1) = 'J';

-- More efficient
SELECT * FROM Employees 
WHERE FirstName LIKE 'J%';

-- Even better with full-text index
SELECT * FROM Employees 
WHERE CONTAINS(FirstName, '"J*"');

--E. Practice Focus (Performance Focus)

-- Problem 1: Identify slow-running queries and optimize them
-- First, let's create a poorly performing query
SELECT 
    e1.FirstName,
    e1.LastName,
    e1.Salary,
    (SELECT COUNT(*) FROM Employees e2 WHERE e2.Salary > e1.Salary) AS HigherEarners,
    (SELECT AVG(Salary) FROM Employees e3 WHERE e3.DepartmentID = e1.DepartmentID) AS DeptAvg
FROM Employees e1
WHERE e1.EmployeeID IN (
    SELECT EmployeeID FROM ProjectAssignments WHERE HoursWorked > 100
)
ORDER BY e1.LastName;

-- Optimized version
WITH DeptAverages AS (
    SELECT 
        DepartmentID,
        AVG(Salary) AS AvgSalary
    FROM Employees
    GROUP BY DepartmentID
),
SalaryRanks AS (
    SELECT 
        Salary,
        ROW_NUMBER() OVER (ORDER BY Salary DESC) AS SalaryRank
    FROM Employees
    GROUP BY Salary
),
ProjectEmployees AS (
    SELECT DISTINCT EmployeeID
    FROM ProjectAssignments
    WHERE HoursWorked > 100
)
SELECT 
    e.FirstName,
    e.LastName,
    e.Salary,
    (SELECT COUNT(*) FROM SalaryRanks sr WHERE sr.Salary > e.Salary) AS HigherEarners,
    da.AvgSalary AS DeptAvg
FROM Employees e
INNER JOIN ProjectEmployees pe ON e.EmployeeID = pe.EmployeeID
LEFT JOIN DeptAverages da ON e.DepartmentID = da.DepartmentID
ORDER BY e.LastName;

-- Create supporting indexes
CREATE INDEX IX_ProjectAssignments_Hours ON ProjectAssignments(HoursWorked) INCLUDE (EmployeeID);
CREATE INDEX IX_Employees_Salary ON Employees(Salary);

-- Problem 2: Optimize search procedure
CREATE PROCEDURE OptimizedEmployeeSearch
    @SearchTerm NVARCHAR(100) = NULL,
    @DepartmentID INT = NULL,
    @PageNumber INT = 1,
    @PageSize INT = 20
AS
BEGIN
    SET NOCOUNT ON;
    
    -- Use covering index pattern
    SELECT 
        e.EmployeeID,
        e.FirstName,
        e.LastName,
        e.JobTitle,
        e.Salary,
        d.DepartmentName,
        e.HireDate
    FROM Employees e WITH (INDEX(IX_Employees_Covering))
    LEFT JOIN Departments d ON e.DepartmentID = d.DepartmentID
    WHERE (@SearchTerm IS NULL 
           OR e.FirstName LIKE @SearchTerm + '%'
           OR e.LastName LIKE @SearchTerm + '%')
      AND (@DepartmentID IS NULL OR e.DepartmentID = @DepartmentID)
    ORDER BY e.LastName, e.FirstName
    OFFSET (@PageNumber - 1) * @PageSize ROWS
    FETCH NEXT @PageSize ROWS ONLY
    OPTION (RECOMPILE); -- Fresh plan for each search
    
    -- Return total count for pagination
    SELECT COUNT(*) AS TotalCount
    FROM Employees e
    WHERE (@SearchTerm IS NULL 
           OR e.FirstName LIKE @SearchTerm + '%'
           OR e.LastName LIKE @SearchTerm + '%')
      AND (@DepartmentID IS NULL OR e.DepartmentID = @DepartmentID);
END;
GO

-- Problem 3: Create optimized reporting query
-- Before optimization
SELECT 
    d.DepartmentName,
    YEAR(e.HireDate) AS HireYear,
    COUNT(*) AS HireCount,
    AVG(e.Salary) AS AvgSalary
FROM Employees e
INNER JOIN Departments d ON e.DepartmentID = d.DepartmentID
WHERE e.HireDate >= '2018-01-01'
GROUP BY d.DepartmentName, YEAR(e.HireDate)
HAVING COUNT(*) > 1
ORDER BY d.DepartmentName, HireYear;

-- Create optimized indexes
CREATE INDEX IX_Employees_HireDate_Dept_Salary 
ON Employees(HireDate, DepartmentID) 
INCLUDE (Salary);

-- Optimized query
WITH DepartmentHires AS (
    SELECT 
        DepartmentID,
        YEAR(HireDate) AS HireYear,
        COUNT(*) AS HireCount,
        AVG(Salary) AS AvgSalary
    FROM Employees WITH (INDEX(IX_Employees_HireDate_Dept_Salary))
    WHERE HireDate >= '2018-01-01'
    GROUP BY DepartmentID, YEAR(HireDate)
    HAVING COUNT(*) > 1
)
SELECT 
    d.DepartmentName,
    dh.HireYear,
    dh.HireCount,
    dh.AvgSalary
FROM DepartmentHires dh
INNER JOIN Departments d ON dh.DepartmentID = d.DepartmentID
ORDER BY d.DepartmentName, dh.HireYear;

-- Problem 4: Monitor and optimize index usage
-- Check for unused indexes
SELECT 
    OBJECT_NAME(i.object_id) AS TableName,
    i.name AS IndexName,
    i.type_desc AS IndexType,
    ps.row_count AS RowCount,
    ps.used_page_count * 8 AS UsedSpaceKB,
    CASE 
        WHEN ISNULL(us.user_seeks, 0) + ISNULL(us.user_scans, 0) + ISNULL(us.user_lookups, 0) = 0 
        THEN 'UNUSED'
        ELSE 'USED'
    END AS UsageStatus
FROM sys.indexes i
LEFT JOIN sys.dm_db_index_usage_stats us ON i.object_id = us.object_id 
    AND i.index_id = us.index_id
    AND us.database_id = DB_ID()
LEFT JOIN sys.dm_db_partition_stats ps ON i.object_id = ps.object_id 
    AND i.index_id = ps.index_id
WHERE OBJECT_NAME(i.object_id) = 'Employees'
  AND i.type_desc IN ('CLUSTERED', 'NONCLUSTERED')
ORDER BY UsageStatus, UsedSpaceKB DESC;


--F. Hands-on Exercises

/*

Identify and create missing indexes for the most frequent queries
Optimize a query that uses multiple correlated subqueries
Create a maintenance procedure that rebuilds fragmented indexes
Design a partitioning strategy for the Attendance table by date
Optimize a query that searches across multiple text columns
Create filtered indexes for active vs inactive employees
Implement query store to capture and analyze query performance

*/

--G. Monitoring and Maintenance
-- 1. Create performance monitoring table
CREATE TABLE PerformanceLog (
    LogID INT IDENTITY(1,1) PRIMARY KEY,
    LogDate DATETIME DEFAULT GETDATE(),
    QueryText NVARCHAR(MAX),
    DurationMs INT,
    CPUms INT,
    LogicalReads INT,
    PhysicalReads INT
);

-- 2. Create procedure to log slow queries
CREATE PROCEDURE LogSlowQuery
    @QueryText NVARCHAR(MAX),
    @DurationMs INT,
    @CPUms INT,
    @LogicalReads INT,
    @PhysicalReads INT
AS
BEGIN
    INSERT INTO PerformanceLog (QueryText, DurationMs, CPUms, LogicalReads, PhysicalReads)
    VALUES (@QueryText, @DurationMs, @CPUms, @LogicalReads, @PhysicalReads);
END;
GO

-- 3. Set up alerts for long-running queries
-- This would typically be done via SQL Server Agent
-- But here's a conceptual example
CREATE PROCEDURE CheckForLongRunningQueries
    @ThresholdSeconds INT = 30
AS
BEGIN
    SELECT 
        session_id,
        start_time,
        status,
        command,
        DB_NAME(database_id) AS DatabaseName,
        wait_type,
        wait_time,
        blocking_session_id,
        text AS QueryText,
        DATEDIFF(SECOND, start_time, GETDATE()) AS SecondsRunning
    FROM sys.dm_exec_requests r
    CROSS APPLY sys.dm_exec_sql_text(r.sql_handle) t
    WHERE r.status NOT IN ('background', 'sleeping')
      AND DATEDIFF(SECOND, start_time, GETDATE()) > @ThresholdSeconds
      AND r.command NOT IN ('AWAITING COMMAND', 'TASK MANAGER', 'LOCK MONITOR');
END;
GO

-- 4. Create index usage report
CREATE VIEW vw_IndexUsageReport
AS
SELECT 
    DB_NAME() AS DatabaseName,
    OBJECT_NAME(i.object_id) AS TableName,
    i.name AS IndexName,
    i.type_desc AS IndexType,
    COALESCE(us.user_seeks, 0) AS UserSeeks,
    COALESCE(us.user_scans, 0) AS UserScans,
    COALESCE(us.user_lookups, 0) AS UserLookups,
    COALESCE(us.user_updates, 0) AS UserUpdates,
    ps.row_count AS RowCount,
    (ps.used_page_count * 8) / 1024.0 AS SizeMB,
    CASE 
        WHEN COALESCE(us.user_seeks, 0) + COALESCE(us.user_scans, 0) + COALESCE(us.user_lookups, 0) = 0 
        THEN 'UNUSED'
        WHEN COALESCE(us.user_updates, 0) > (COALESCE(us.user_seeks, 0) + COALESCE(us.user_scans, 0)) * 10
        THEN 'HIGH MAINTENANCE'
        ELSE 'HEALTHY'
    END AS HealthStatus
FROM sys.indexes i
LEFT JOIN sys.dm_db_index_usage_stats us ON i.object_id = us.object_id 
    AND i.index_id = us.index_id
    AND us.database_id = DB_ID()
LEFT JOIN sys.dm_db_partition_stats ps ON i.object_id = ps.object_id 
    AND i.index_id = ps.index_id
WHERE i.object_id > 100
  AND i.type_desc IN ('CLUSTERED', 'NONCLUSTERED');
GO

-- 5. Database size monitoring
SELECT 
    DB_NAME() AS DatabaseName,
    SUM(size * 8 / 1024) AS SizeMB,
    SUM(CASE WHEN type_desc = 'ROWS' THEN size * 8 / 1024 ELSE 0 END) AS DataSizeMB,
    SUM(CASE WHEN type_desc = 'LOG' THEN size * 8 / 1024 ELSE 0 END) AS LogSizeMB
FROM sys.database_files
GROUP BY type_desc;