--Step6: PIVOT, UNPIVOT, and Dynamic SQL
--A.PIVOT Operations

-- 1. Basic PIVOT: Department-wise employee count
SELECT DepartmentName, [IT], [HR], [Finance], [Marketing], [Sales], [Operations], [Research]
FROM (
    SELECT 
        d.DepartmentName,
        e.EmployeeID
    FROM Employees e
    INNER JOIN Departments d ON e.DepartmentID = d.DepartmentID
) AS SourceTable
PIVOT (
    COUNT(EmployeeID)
    FOR DepartmentName IN ([IT], [HR], [Finance], [Marketing], [Sales], [Operations], [Research])
) AS PivotTable;

-- 2. PIVOT with aggregation: Total salary by department per job title
SELECT JobTitle, [IT], [HR], [Finance], [Marketing], [Sales], [Operations], [Research]
FROM (
    SELECT 
        e.JobTitle,
        d.DepartmentName,
        e.Salary
    FROM Employees e
    INNER JOIN Departments d ON e.DepartmentID = d.DepartmentID
) AS SourceTable
PIVOT (
    SUM(Salary)
    FOR DepartmentName IN ([IT], [HR], [Finance], [Marketing], [Sales], [Operations], [Research])
) AS PivotTable
ORDER BY JobTitle;

-- 3. PIVOT with multiple aggregations (using CTE)
WITH EmployeeData AS (
    SELECT 
        d.DepartmentName,
        e.JobTitle,
        e.Salary,
        e.EmployeeID
    FROM Employees e
    INNER JOIN Departments d ON e.DepartmentID = d.DepartmentID
)
SELECT 
    JobTitle,
    [IT_Count], [IT_TotalSalary],
    [HR_Count], [HR_TotalSalary],
    [Finance_Count], [Finance_TotalSalary]
FROM (
    SELECT 
        JobTitle,
        DepartmentName + '_Count' AS DeptMetric,
        COUNT(EmployeeID) AS Value
    FROM EmployeeData
    GROUP BY JobTitle, DepartmentName
    
    UNION ALL
    
    SELECT 
        JobTitle,
        DepartmentName + '_TotalSalary' AS DeptMetric,
        SUM(Salary) AS Value
    FROM EmployeeData
    GROUP BY JobTitle, DepartmentName
) AS SourceTable
PIVOT (
    SUM(Value)
    FOR DeptMetric IN (
        [IT_Count], [IT_TotalSalary],
        [HR_Count], [HR_TotalSalary],
        [Finance_Count], [Finance_TotalSalary]
    )
) AS PivotTable
WHERE JobTitle IS NOT NULL
ORDER BY JobTitle;

-- 4. Monthly hire count PIVOT
SELECT 
    YEAR(HireDate) AS HireYear,
    [1] AS Jan, [2] AS Feb, [3] AS Mar, [4] AS Apr,
    [5] AS May, [6] AS Jun, [7] AS Jul, [8] AS Aug,
    [9] AS Sep, [10] AS Oct, [11] AS Nov, [12] AS Dec
FROM (
    SELECT 
        YEAR(HireDate) AS HireYear,
        MONTH(HireDate) AS HireMonth,
        EmployeeID
    FROM Employees
) AS SourceTable
PIVOT (
    COUNT(EmployeeID)
    FOR HireMonth IN ([1], [2], [3], [4], [5], [6], [7], [8], [9], [10], [11], [12])
) AS PivotTable
ORDER BY HireYear;

-- 5. Dynamic PIVOT (when you don't know column names in advance)
DECLARE @columns NVARCHAR(MAX), @sql NVARCHAR(MAX);

-- Get unique department names
SELECT @columns = COALESCE(@columns + ', ', '') + QUOTENAME(DepartmentName)
FROM Departments
ORDER BY DepartmentName;

-- Build dynamic SQL
SET @sql = '
SELECT JobTitle, ' + @columns + '
FROM (
    SELECT 
        e.JobTitle,
        d.DepartmentName,
        e.Salary
    FROM Employees e
    INNER JOIN Departments d ON e.DepartmentID = d.DepartmentID
) AS SourceTable
PIVOT (
    SUM(Salary)
    FOR DepartmentName IN (' + @columns + ')
) AS PivotTable
WHERE JobTitle IS NOT NULL
ORDER BY JobTitle;';

-- Execute dynamic SQL
EXEC sp_executesql @sql;


--B. UNPIVOT Operations

-- First, let's create a pivoted table to work with
CREATE TABLE #DepartmentSummary (
    Metric VARCHAR(50),
    IT DECIMAL(15,2),
    HR DECIMAL(15,2),
    Finance DECIMAL(15,2),
    Marketing DECIMAL(15,2),
    Sales DECIMAL(15,2)
);

INSERT INTO #DepartmentSummary VALUES
('EmployeeCount', 5, 3, 3, 3, 2),
('TotalSalary', 443000, 192000, 227000, 215000, 168000),
('AvgSalary', 88600, 64000, 75667, 71667, 84000);

-- 1. Basic UNPIVOT
SELECT Metric, Department, Value
FROM #DepartmentSummary
UNPIVOT (
    Value FOR Department IN (IT, HR, Finance, Marketing, Sales)
) AS UnpivotTable;

-- 2. UNPIVOT with filtering
SELECT Metric, Department, Value
FROM #DepartmentSummary
UNPIVOT (
    Value FOR Department IN (IT, HR, Finance, Marketing, Sales)
) AS UnpivotTable
WHERE Metric = 'TotalSalary'
ORDER BY Value DESC;

-- 3. UNPIVOT from a PIVOT result (round trip)
-- Create a pivot first
SELECT DepartmentName, [Software Engineer], [HR Manager], [Financial Analyst]
INTO #PivotResult
FROM (
    SELECT 
        d.DepartmentName,
        e.JobTitle,
        e.Salary
    FROM Employees e
    INNER JOIN Departments d ON e.DepartmentID = d.DepartmentID
    WHERE e.JobTitle IN ('Software Engineer', 'HR Manager', 'Financial Analyst')
) AS SourceTable
PIVOT (
    SUM(Salary)
    FOR JobTitle IN ([Software Engineer], [HR Manager], [Financial Analyst])
) AS PivotTable;

-- Now UNPIVOT it back
SELECT DepartmentName, JobTitle, Salary
FROM #PivotResult
UNPIVOT (
    Salary FOR JobTitle IN ([Software Engineer], [HR Manager], [Financial Analyst])
) AS UnpivotTable
ORDER BY DepartmentName, JobTitle;

-- Clean up temporary tables
DROP TABLE #DepartmentSummary;
DROP TABLE #PivotResult;

-- 4. UNPIVOT with multiple value columns (simulated)
CREATE TABLE #EmployeeStats (
    EmployeeID INT,
    Q1_Sales DECIMAL(10,2),
    Q2_Sales DECIMAL(10,2),
    Q3_Sales DECIMAL(10,2),
    Q4_Sales DECIMAL(10,2)
);

INSERT INTO #EmployeeStats VALUES
(1, 15000, 18000, 22000, 19000),
(2, 12000, 14000, 16000, 18000),
(3, 20000, 21000, 19000, 22000);

SELECT EmployeeID, Quarter, Sales
FROM #EmployeeStats
UNPIVOT (
    Sales FOR Quarter IN (Q1_Sales, Q2_Sales, Q3_Sales, Q4_Sales)
) AS UnpivotTable;

DROP TABLE #EmployeeStats;

--C. Dynamic SQL Fundamentals
-- 1. Basic dynamic SQL
DECLARE @TableName NVARCHAR(128) = 'Employees';
DECLARE @ColumnName NVARCHAR(128) = 'FirstName';
DECLARE @sql NVARCHAR(MAX);

SET @sql = 'SELECT TOP 5 ' + QUOTENAME(@ColumnName) + ' FROM ' + QUOTENAME(@TableName);
EXEC sp_executesql @sql;

-- 2. Dynamic SQL with parameters (SAFE from SQL injection)
DECLARE @DeptID INT = 1;
DECLARE @MinSalary DECIMAL(10,2) = 70000;

SET @sql = '
SELECT FirstName, LastName, Salary, DepartmentID
FROM Employees
WHERE DepartmentID = @DeptParam 
  AND Salary > @SalaryParam
ORDER BY Salary DESC';

EXEC sp_executesql 
    @sql,
    N'@DeptParam INT, @SalaryParam DECIMAL(10,2)',
    @DeptParam = @DeptID,
    @SalaryParam = @MinSalary;

-- 3. Building dynamic WHERE clause
DECLARE @WhereClause NVARCHAR(MAX) = '';
DECLARE @JobTitle NVARCHAR(50) = 'Manager';
DECLARE @HireYear INT = 2020;

IF @JobTitle IS NOT NULL
    SET @WhereClause = @WhereClause + ' AND JobTitle LIKE ''%'' + @JobTitleParam + ''%''';
IF @HireYear IS NOT NULL
    SET @WhereClause = @WhereClause + ' AND YEAR(HireDate) = @HireYearParam';

SET @sql = '
SELECT FirstName, LastName, JobTitle, HireDate, Salary
FROM Employees
WHERE 1=1' + @WhereClause + '
ORDER BY HireDate';

EXEC sp_executesql 
    @sql,
    N'@JobTitleParam NVARCHAR(50), @HireYearParam INT',
    @JobTitleParam = @JobTitle,
    @HireYearParam = @HireYear;

-- 4. Dynamic column selection
DECLARE @Columns NVARCHAR(MAX) = 'FirstName, LastName, Salary, HireDate';

SET @sql = '
SELECT ' + @Columns + '
FROM Employees
WHERE DepartmentID = 1
ORDER BY Salary DESC';

EXEC sp_executesql @sql;

-- 5. Dynamic ORDER BY
DECLARE @SortColumn NVARCHAR(50) = 'Salary';
DECLARE @SortDirection NVARCHAR(4) = 'DESC';

SET @sql = '
SELECT FirstName, LastName, JobTitle, Salary, HireDate
FROM Employees
ORDER BY ' + QUOTENAME(@SortColumn) + ' ' + @SortDirection;

EXEC sp_executesql @sql;

--D. Advanced Dynamic SQL Applications
-- 1. Dynamic PIVOT with parameters
CREATE PROCEDURE GetDepartmentSummary
    @Metric NVARCHAR(50) = 'Count' -- 'Count' or 'Salary'
AS
BEGIN
    DECLARE @columns NVARCHAR(MAX), @sql NVARCHAR(MAX);
    
    -- Get department names
    SELECT @columns = COALESCE(@columns + ', ', '') + QUOTENAME(DepartmentName)
    FROM Departments
    ORDER BY DepartmentName;
    
    -- Build dynamic SQL based on metric
    IF @Metric = 'Count'
    BEGIN
        SET @sql = '
        SELECT JobTitle, ' + @columns + '
        FROM (
            SELECT 
                e.JobTitle,
                d.DepartmentName,
                1 AS Value
            FROM Employees e
            INNER JOIN Departments d ON e.DepartmentID = d.DepartmentID
        ) AS SourceTable
        PIVOT (
            COUNT(Value)
            FOR DepartmentName IN (' + @columns + ')
        ) AS PivotTable
        WHERE JobTitle IS NOT NULL
        ORDER BY JobTitle;';
    END
    ELSE IF @Metric = 'Salary'
    BEGIN
        SET @sql = '
        SELECT JobTitle, ' + @columns + '
        FROM (
            SELECT 
                e.JobTitle,
                d.DepartmentName,
                e.Salary AS Value
            FROM Employees e
            INNER JOIN Departments d ON e.DepartmentID = d.DepartmentID
        ) AS SourceTable
        PIVOT (
            SUM(Value)
            FOR DepartmentName IN (' + @columns + ')
        ) AS PivotTable
        WHERE JobTitle IS NOT NULL
        ORDER BY JobTitle;';
    END
    
    EXEC sp_executesql @sql;
END;
GO

-- Test the stored procedure
EXEC GetDepartmentSummary @Metric = 'Count';
EXEC GetDepartmentSummary @Metric = 'Salary';

-- 2. Dynamic search procedure (like a search API)
CREATE PROCEDURE SearchEmployees
    @SearchText NVARCHAR(100) = NULL,
    @DepartmentID INT = NULL,
    @MinSalary DECIMAL(10,2) = NULL,
    @MaxSalary DECIMAL(10,2) = NULL,
    @HireDateFrom DATE = NULL,
    @HireDateTo DATE = NULL,
    @SortBy NVARCHAR(50) = 'LastName',
    @SortDirection NVARCHAR(4) = 'ASC',
    @PageNumber INT = 1,
    @PageSize INT = 10
AS
BEGIN
    DECLARE @sql NVARCHAR(MAX);
    DECLARE @WhereClause NVARCHAR(MAX) = '';
    DECLARE @OrderByClause NVARCHAR(200);
    DECLARE @PagingClause NVARCHAR(200);
    DECLARE @Params NVARCHAR(MAX);
    
    -- Build WHERE clause
    IF @SearchText IS NOT NULL
        SET @WhereClause = @WhereClause + ' AND (FirstName LIKE ''%'' + @SearchTextParam + ''%'' 
                          OR LastName LIKE ''%'' + @SearchTextParam + ''%'' 
                          OR Email LIKE ''%'' + @SearchTextParam + ''%'')';
    
    IF @DepartmentID IS NOT NULL
        SET @WhereClause = @WhereClause + ' AND e.DepartmentID = @DeptIDParam';
    
    IF @MinSalary IS NOT NULL
        SET @WhereClause = @WhereClause + ' AND e.Salary >= @MinSalaryParam';
    
    IF @MaxSalary IS NOT NULL
        SET @WhereClause = @WhereClause + ' AND e.Salary <= @MaxSalaryParam';
    
    IF @HireDateFrom IS NOT NULL
        SET @WhereClause = @WhereClause + ' AND e.HireDate >= @HireFromParam';
    
    IF @HireDateTo IS NOT NULL
        SET @WhereClause = @WhereClause + ' AND e.HireDate <= @HireToParam';
    
    -- Build ORDER BY clause
    SET @OrderByClause = ' ORDER BY ' + QUOTENAME(@SortBy) + ' ' + @SortDirection;
    
    -- Build paging clause
    SET @PagingClause = ' OFFSET (' + CAST(@PageNumber - 1 AS NVARCHAR) + ' * ' + CAST(@PageSize AS NVARCHAR) + 
                       ') ROWS FETCH NEXT ' + CAST(@PageSize AS NVARCHAR) + ' ROWS ONLY';
    
    -- Build complete SQL
    SET @sql = '
    SELECT 
        e.EmployeeID,
        e.FirstName,
        e.LastName,
        e.Email,
        e.HireDate,
        e.JobTitle,
        e.Salary,
        d.DepartmentName,
        (SELECT COUNT(*) FROM Employees e2 
         WHERE 1=1' + @WhereClause + ') AS TotalCount
    FROM Employees e
    LEFT JOIN Departments d ON e.DepartmentID = d.DepartmentID
    WHERE 1=1' + @WhereClause + 
    @OrderByClause + @PagingClause;
    
    -- Set parameters
    SET @Params = N'
        @SearchTextParam NVARCHAR(100),
        @DeptIDParam INT,
        @MinSalaryParam DECIMAL(10,2),
        @MaxSalaryParam DECIMAL(10,2),
        @HireFromParam DATE,
        @HireToParam DATE';
    
    -- Execute
    EXEC sp_executesql 
        @sql,
        @Params,
        @SearchTextParam = @SearchText,
        @DeptIDParam = @DepartmentID,
        @MinSalaryParam = @MinSalary,
        @MaxSalaryParam = @MaxSalary,
        @HireFromParam = @HireDateFrom,
        @HireToParam = @HireDateTo;
END;
GO

-- Test the search procedure
EXEC SearchEmployees 
    @SearchText = 'John',
    @MinSalary = 80000,
    @SortBy = 'Salary',
    @SortDirection = 'DESC',
    @PageNumber = 1,
    @PageSize = 5;

--E. Practice Problems (LeetCode Style)

-- Problem 1: Create a matrix of employee count by department and job title
DECLARE @DeptColumns NVARCHAR(MAX), @sql NVARCHAR(MAX);

SELECT @DeptColumns = COALESCE(@DeptColumns + ', ', '') + QUOTENAME(DepartmentName)
FROM Departments
ORDER BY DepartmentName;

SET @sql = '
SELECT JobTitle, ' + @DeptColumns + '
FROM (
    SELECT 
        e.JobTitle,
        d.DepartmentName,
        e.EmployeeID
    FROM Employees e
    INNER JOIN Departments d ON e.DepartmentID = d.DepartmentID
) AS SourceTable
PIVOT (
    COUNT(EmployeeID)
    FOR DepartmentName IN (' + @DeptColumns + ')
) AS PivotTable
WHERE JobTitle IS NOT NULL
ORDER BY JobTitle;';

EXEC sp_executesql @sql;

-- Problem 2: Transform attendance data from rows to columns (wide format)
SELECT 
    EmployeeID,
    [2023-03-01], [2023-03-02], [2023-03-03], [2023-03-06]
FROM (
    SELECT 
        EmployeeID,
        CAST(AttendanceDate AS NVARCHAR(10)) AS AttDate,
        Status
    FROM Attendance
    WHERE EmployeeID IN (1, 2, 6)
) AS SourceTable
PIVOT (
    MAX(Status)
    FOR AttDate IN ([2023-03-01], [2023-03-02], [2023-03-03], [2023-03-06])
) AS PivotTable
ORDER BY EmployeeID;

-- Problem 3: Dynamic UNPIVOT for any table
CREATE PROCEDURE UnpivotTable
    @TableName NVARCHAR(128),
    @IdColumn NVARCHAR(128)
AS
BEGIN
    DECLARE @columns NVARCHAR(MAX), @sql NVARCHAR(MAX);
    
    -- Get all columns except the ID column
    SELECT @columns = COALESCE(@columns + ', ', '') + QUOTENAME(COLUMN_NAME)
    FROM INFORMATION_SCHEMA.COLUMNS
    WHERE TABLE_NAME = @TableName
      AND COLUMN_NAME <> @IdColumn
    ORDER BY ORDINAL_POSITION;
    
    SET @sql = '
    SELECT ' + QUOTENAME(@IdColumn) + ', ColumnName, Value
    FROM ' + QUOTENAME(@TableName) + '
    UNPIVOT (
        Value FOR ColumnName IN (' + @columns + ')
    ) AS UnpivotTable';
    
    EXEC sp_executesql @sql;
END;
GO

-- Create a test table
CREATE TABLE #TestPivot (
    EmployeeID INT,
    Q1 INT,
    Q2 INT,
    Q3 INT,
    Q4 INT
);

INSERT INTO #TestPivot VALUES
(1, 100, 150, 200, 180),
(2, 120, 130, 140, 160);

EXEC UnpivotTable '#TestPivot', 'EmployeeID';

DROP TABLE #TestPivot;

-- Problem 4: Generate dynamic crosstab report
DECLARE @YearColumns NVARCHAR(MAX), @ReportSQL NVARCHAR(MAX);

-- Get distinct years
SELECT @YearColumns = COALESCE(@YearColumns + ', ', '') + QUOTENAME(YEAR(HireDate))
FROM (
    SELECT DISTINCT YEAR(HireDate) AS HireDate
    FROM Employees
) AS Years
ORDER BY HireDate;

SET @ReportSQL = '
SELECT DepartmentName, ' + @YearColumns + '
FROM (
    SELECT 
        d.DepartmentName,
        YEAR(e.HireDate) AS HireYear,
        e.EmployeeID
    FROM Employees e
    INNER JOIN Departments d ON e.DepartmentID = d.DepartmentID
) AS SourceTable
PIVOT (
    COUNT(EmployeeID)
    FOR HireYear IN (' + @YearColumns + ')
) AS PivotTable
ORDER BY DepartmentName;';

EXEC sp_executesql @ReportSQL;

--F. Hands on exercises
/* 
Create a dynamic pivot that shows average salary by department for each year

Write a procedure that accepts a table name and returns its data in unpivoted format

Create a monthly attendance report in matrix format (Employees as rows, Dates as columns)

Build a dynamic search function that can search across multiple columns with partial matches

Transform the ProjectAssignments table to show hours worked per employee per project as columns

Create a procedure that generates department comparison reports with configurable metrics

Implement dynamic column selection for employee exports

*/

--G. Security and Best Practices

-- 1. Always use parameterized queries to prevent SQL injection
-- BAD (Vulnerable):
DECLARE @userInput NVARCHAR(100) = 'Smith''; DROP TABLE Employees; --';
DECLARE @badSql NVARCHAR(MAX) = 'SELECT * FROM Employees WHERE LastName = ''' + @userInput + '''';
-- EXEC(@badSql); -- DON'T DO THIS!

-- GOOD (Parameterized):
DECLARE @goodSql NVARCHAR(MAX) = 'SELECT * FROM Employees WHERE LastName = @LastNameParam';
EXEC sp_executesql @goodSql, N'@LastNameParam NVARCHAR(100)', @LastNameParam = @userInput;

-- 2. Use QUOTENAME for object names
DECLARE @TableName NVARCHAR(128) = 'My Table';
DECLARE @ColumnName NVARCHAR(128) = 'Column Name';

-- Bad
SET @sql = 'SELECT * FROM ' + @TableName;

-- Good
SET @sql = 'SELECT * FROM ' + QUOTENAME(@TableName);

-- 3. Validate input parameters
CREATE PROCEDURE SafeDynamicQuery
    @TableName NVARCHAR(128),
    @ColumnName NVARCHAR(128)
AS
BEGIN
    -- Validate table exists
    IF NOT EXISTS (SELECT 1 FROM INFORMATION_SCHEMA.TABLES 
                   WHERE TABLE_NAME = @TableName)
    BEGIN
        RAISERROR('Table does not exist', 16, 1);
        RETURN;
    END
    
    -- Validate column exists in table
    IF NOT EXISTS (SELECT 1 FROM INFORMATION_SCHEMA.COLUMNS 
                   WHERE TABLE_NAME = @TableName 
                     AND COLUMN_NAME = @ColumnName)
    BEGIN
        RAISERROR('Column does not exist in table', 16, 1);
        RETURN;
    END
    
    DECLARE @sql NVARCHAR(MAX);
    SET @sql = 'SELECT TOP 10 ' + QUOTENAME(@ColumnName) + 
               ' FROM ' + QUOTENAME(@TableName);
    
    EXEC sp_executesql @sql;
END;
GO