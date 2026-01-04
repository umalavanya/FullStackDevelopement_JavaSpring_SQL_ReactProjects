--Steo7: Stored Procedures, Functions, and Views

--A. Stored Procedures
-- 1. Basic stored procedure without parameters
CREATE PROCEDURE GetAllEmployees
AS
BEGIN
    SELECT 
        e.FirstName,
        e.LastName,
        e.JobTitle,
        e.Salary,
        d.DepartmentName,
        e.HireDate
    FROM Employees e
    LEFT JOIN Departments d ON e.DepartmentID = d.DepartmentID
    ORDER BY e.LastName, e.FirstName;
END;
GO

-- Execute the procedure
EXEC GetAllEmployees;

-- 2. Stored procedure with input parameters
CREATE PROCEDURE GetEmployeesByDepartment
    @DepartmentID INT,
    @MinSalary DECIMAL(10,2) = 0
AS
BEGIN
    SELECT 
        e.FirstName,
        e.LastName,
        e.JobTitle,
        e.Salary,
        e.HireDate
    FROM Employees e
    WHERE e.DepartmentID = @DepartmentID
      AND e.Salary >= @MinSalary
    ORDER BY e.Salary DESC;
END;
GO

-- Execute with parameters
EXEC GetEmployeesByDepartment @DepartmentID = 1, @MinSalary = 70000;
EXEC GetEmployeesByDepartment @DepartmentID = 2; -- Uses default MinSalary

-- 3. Stored procedure with output parameters
CREATE PROCEDURE GetDepartmentStatistics
    @DepartmentID INT,
    @EmployeeCount INT OUTPUT,
    @TotalSalary DECIMAL(15,2) OUTPUT,
    @AverageSalary DECIMAL(10,2) OUTPUT
AS
BEGIN
    SELECT 
        @EmployeeCount = COUNT(*),
        @TotalSalary = SUM(Salary),
        @AverageSalary = AVG(Salary)
    FROM Employees
    WHERE DepartmentID = @DepartmentID;
    
    -- Return additional info
    SELECT 
        DepartmentName,
        Location
    FROM Departments
    WHERE DepartmentID = @DepartmentID;
END;
GO

-- Execute with output parameters
DECLARE @EmpCount INT, @TotalSal DECIMAL(15,2), @AvgSal DECIMAL(10,2);

EXEC GetDepartmentStatistics 
    @DepartmentID = 1,
    @EmployeeCount = @EmpCount OUTPUT,
    @TotalSalary = @TotalSal OUTPUT,
    @AverageSalary = @AvgSal OUTPUT;

SELECT 
    @EmpCount AS EmployeeCount,
    @TotalSal AS TotalSalary,
    @AvgSal AS AverageSalary;

-- 4. Procedure with multiple result sets
CREATE PROCEDURE GetEmployeeDetails
    @EmployeeID INT
AS
BEGIN
    -- First result set: Basic employee info
    SELECT 
        e.FirstName,
        e.LastName,
        e.Email,
        e.Phone,
        e.JobTitle,
        e.Salary,
        e.HireDate,
        d.DepartmentName,
        mgr.FirstName + ' ' + mgr.LastName AS ManagerName
    FROM Employees e
    LEFT JOIN Departments d ON e.DepartmentID = d.DepartmentID
    LEFT JOIN Employees mgr ON e.ManagerID = mgr.EmployeeID
    WHERE e.EmployeeID = @EmployeeID;
    
    -- Second result set: Project assignments
    SELECT 
        p.ProjectName,
        pa.AssignmentDate,
        pa.HoursWorked
    FROM ProjectAssignments pa
    INNER JOIN Projects p ON pa.ProjectID = p.ProjectID
    WHERE pa.EmployeeID = @EmployeeID
    ORDER BY pa.AssignmentDate DESC;
    
    -- Third result set: Salary history
    SELECT 
        ChangeDate,
        OldSalary,
        NewSalary,
        Reason
    FROM SalaryHistory
    WHERE EmployeeID = @EmployeeID
    ORDER BY ChangeDate DESC;
END;
GO

-- Execute multi-result set procedure
EXEC GetEmployeeDetails @EmployeeID = 1;

-- 5. Procedure with error handling
CREATE PROCEDURE UpdateEmployeeSalary
    @EmployeeID INT,
    @NewSalary DECIMAL(10,2),
    @Reason VARCHAR(100)
AS
BEGIN
    SET NOCOUNT ON;
    BEGIN TRY
        BEGIN TRANSACTION;
        
        -- Insert into salary history
        INSERT INTO SalaryHistory (EmployeeID, OldSalary, NewSalary, ChangeDate, Reason)
        SELECT 
            @EmployeeID,
            Salary,
            @NewSalary,
            GETDATE(),
            @Reason
        FROM Employees
        WHERE EmployeeID = @EmployeeID;
        
        IF @@ROWCOUNT = 0
        BEGIN
            THROW 50001, 'Employee not found', 1;
        END
        
        -- Update employee salary
        UPDATE Employees
        SET Salary = @NewSalary
        WHERE EmployeeID = @EmployeeID;
        
        COMMIT TRANSACTION;
        
        SELECT 'Salary updated successfully' AS Result;
        
    END TRY
    BEGIN CATCH
        IF @@TRANCOUNT > 0
            ROLLBACK TRANSACTION;
        
        SELECT 
            ERROR_NUMBER() AS ErrorNumber,
            ERROR_MESSAGE() AS ErrorMessage,
            ERROR_SEVERITY() AS ErrorSeverity;
    END CATCH
END;
GO

-- Test the procedure
EXEC UpdateEmployeeSalary 
    @EmployeeID = 1,
    @NewSalary = 90000,
    @Reason = 'Performance Bonus';

-- Check the result
SELECT * FROM SalaryHistory WHERE EmployeeID = 1;


--B. User-Defined Functions

-- 1. Scalar function (returns single value)
CREATE FUNCTION CalculateAnnualBonus
    (
    @Salary DECIMAL(10,2),
    @PerformanceRating INT
    )
RETURNS DECIMAL(10,2)
AS
BEGIN
    DECLARE @Bonus DECIMAL(10,2);
    
    -- Calculate bonus based on performance rating
    SET @Bonus = CASE 
        WHEN @PerformanceRating >= 9 THEN @Salary * 0.20
        WHEN @PerformanceRating >= 7 THEN @Salary * 0.15
        WHEN @PerformanceRating >= 5 THEN @Salary * 0.10
        ELSE @Salary * 0.05
    END;
    
    RETURN @Bonus;
END;
GO

-- Use the scalar function
SELECT 
    FirstName,
    LastName,
    Salary,
    dbo.CalculateAnnualBonus(Salary, 8) AS Bonus,
    Salary + dbo.CalculateAnnualBonus(Salary, 8) AS TotalCompensation
FROM Employees
WHERE DepartmentID = 1;

-- 2. Table-valued function (inline)
CREATE FUNCTION GetEmployeesBySalaryRange
    (
    @MinSalary DECIMAL(10,2),
    @MaxSalary DECIMAL(10,2)
    )
RETURNS TABLE
AS
RETURN
(
    SELECT 
        e.FirstName,
        e.LastName,
        e.JobTitle,
        e.Salary,
        d.DepartmentName,
        e.HireDate
    FROM Employees e
    LEFT JOIN Departments d ON e.DepartmentID = d.DepartmentID
    WHERE e.Salary BETWEEN @MinSalary AND @MaxSalary
);
GO

-- Use the inline table-valued function
SELECT * FROM dbo.GetEmployeesBySalaryRange(70000, 85000)
ORDER BY Salary DESC;

-- 3. Multi-statement table-valued function
CREATE FUNCTION GetDepartmentReport
    (
    @DepartmentID INT
    )
RETURNS @Report TABLE
(
    EmployeeName VARCHAR(101),
    JobTitle VARCHAR(50),
    Salary DECIMAL(10,2),
    HireDate DATE,
    YearsOfService INT,
    SalaryRank INT
)
AS
BEGIN
    INSERT INTO @Report
    SELECT 
        e.FirstName + ' ' + e.LastName AS EmployeeName,
        e.JobTitle,
        e.Salary,
        e.HireDate,
        DATEDIFF(YEAR, e.HireDate, GETDATE()) AS YearsOfService,
        RANK() OVER (ORDER BY e.Salary DESC) AS SalaryRank
    FROM Employees e
    WHERE e.DepartmentID = @DepartmentID;
    
    RETURN;
END;
GO

-- Use the multi-statement table-valued function
SELECT * FROM dbo.GetDepartmentReport(1)
ORDER BY SalaryRank;

-- 4. Function to calculate working hours
CREATE FUNCTION CalculateWorkingHours
    (
    @CheckInTime TIME,
    @CheckOutTime TIME
    )
RETURNS DECIMAL(5,2)
AS
BEGIN
    DECLARE @Hours DECIMAL(5,2);
    
    IF @CheckInTime IS NULL OR @CheckOutTime IS NULL
        SET @Hours = 0;
    ELSE
        SET @Hours = DATEDIFF(MINUTE, @CheckInTime, @CheckOutTime) / 60.0;
    
    RETURN @Hours;
END;
GO

-- Use the function
SELECT 
    EmployeeID,
    AttendanceDate,
    CheckInTime,
    CheckOutTime,
    dbo.CalculateWorkingHours(CheckInTime, CheckOutTime) AS WorkingHours
FROM Attendance
WHERE EmployeeID = 1;


--C. Views

-- 1. Basic view
CREATE VIEW vw_EmployeeDetails
AS
SELECT 
    e.EmployeeID,
    e.FirstName + ' ' + e.LastName AS FullName,
    e.Email,
    e.Phone,
    e.JobTitle,
    e.Salary,
    e.HireDate,
    d.DepartmentName,
    d.Location,
    mgr.FirstName + ' ' + mgr.LastName AS ManagerName
FROM Employees e
LEFT JOIN Departments d ON e.DepartmentID = d.DepartmentID
LEFT JOIN Employees mgr ON e.ManagerID = mgr.EmployeeID;
GO

-- Query the view
SELECT * FROM vw_EmployeeDetails
WHERE DepartmentName = 'IT'
ORDER BY Salary DESC;

-- 2. View with calculated columns
CREATE VIEW vw_EmployeePerformance
AS
SELECT 
    e.EmployeeID,
    e.FirstName + ' ' + e.LastName AS EmployeeName,
    e.JobTitle,
    e.Salary,
    d.DepartmentName,
    DATEDIFF(YEAR, e.HireDate, GETDATE()) AS YearsOfService,
    COUNT(pa.AssignmentID) AS ProjectCount,
    SUM(ISNULL(pa.HoursWorked, 0)) AS TotalHoursWorked,
    CASE 
        WHEN COUNT(pa.AssignmentID) = 0 THEN 'No Projects'
        WHEN COUNT(pa.AssignmentID) <= 2 THEN 'Standard'
        ELSE 'High Performer'
    END AS ProjectEngagement
FROM Employees e
LEFT JOIN Departments d ON e.DepartmentID = d.DepartmentID
LEFT JOIN ProjectAssignments pa ON e.EmployeeID = pa.EmployeeID
GROUP BY 
    e.EmployeeID, e.FirstName, e.LastName, e.JobTitle, 
    e.Salary, d.DepartmentName, e.HireDate;
GO

-- Query the performance view
SELECT * FROM vw_EmployeePerformance
WHERE YearsOfService >= 2
ORDER BY TotalHoursWorked DESC;

-- 3. Indexed view (with SCHEMABINDING)
CREATE VIEW vw_DepartmentSummary
WITH SCHEMABINDING
AS
SELECT 
    d.DepartmentID,
    d.DepartmentName,
    COUNT_BIG(*) AS EmployeeCount,
    SUM(e.Salary) AS TotalSalary,
    AVG(e.Salary) AS AverageSalary
FROM dbo.Departments d
INNER JOIN dbo.Employees e ON d.DepartmentID = e.DepartmentID
GROUP BY d.DepartmentID, d.DepartmentName;
GO

-- Create an index on the view
CREATE UNIQUE CLUSTERED INDEX IX_vw_DepartmentSummary 
ON vw_DepartmentSummary (DepartmentID);
GO

-- Query the indexed view (faster performance)
SELECT * FROM vw_DepartmentSummary
ORDER BY TotalSalary DESC;

-- 4. View for reporting
CREATE VIEW vw_MonthlyAttendanceReport
AS
SELECT 
    e.EmployeeID,
    e.FirstName + ' ' + e.LastName AS EmployeeName,
    d.DepartmentName,
    YEAR(a.AttendanceDate) AS Year,
    MONTH(a.AttendanceDate) AS Month,
    DATENAME(MONTH, a.AttendanceDate) AS MonthName,
    COUNT(CASE WHEN a.Status = 'Present' THEN 1 END) AS PresentDays,
    COUNT(CASE WHEN a.Status = 'Late' THEN 1 END) AS LateDays,
    COUNT(CASE WHEN a.Status = 'Absent' THEN 1 END) AS AbsentDays,
    COUNT(*) AS TotalDays,
    SUM(dbo.CalculateWorkingHours(a.CheckInTime, a.CheckOutTime)) AS TotalHours
FROM Employees e
LEFT JOIN Departments d ON e.DepartmentID = d.DepartmentID
LEFT JOIN Attendance a ON e.EmployeeID = a.EmployeeID
WHERE a.AttendanceDate IS NOT NULL
GROUP BY 
    e.EmployeeID, e.FirstName, e.LastName, d.DepartmentName,
    YEAR(a.AttendanceDate), MONTH(a.AttendanceDate), DATENAME(MONTH, a.AttendanceDate);
GO

-- Query the attendance report
SELECT * FROM vw_MonthlyAttendanceReport
WHERE Year = 2023 AND Month = 3
ORDER BY DepartmentName, EmployeeName;

--D. Advanced Stored Procedures
-- 1. Procedure with optional parameters and dynamic sorting
CREATE PROCEDURE GetEmployeesAdvanced
    @DepartmentID INT = NULL,
    @JobTitle NVARCHAR(50) = NULL,
    @HireDateFrom DATE = NULL,
    @HireDateTo DATE = NULL,
    @SortColumn NVARCHAR(50) = 'LastName',
    @SortDirection NVARCHAR(4) = 'ASC'
AS
BEGIN
    SET NOCOUNT ON;
    
    DECLARE @sql NVARCHAR(MAX);
    DECLARE @params NVARCHAR(MAX);
    
    SET @sql = '
    SELECT 
        e.EmployeeID,
        e.FirstName,
        e.LastName,
        e.JobTitle,
        e.Salary,
        e.HireDate,
        d.DepartmentName,
        mgr.FirstName + '' '' + mgr.LastName AS ManagerName
    FROM Employees e
    LEFT JOIN Departments d ON e.DepartmentID = d.DepartmentID
    LEFT JOIN Employees mgr ON e.ManagerID = mgr.EmployeeID
    WHERE 1=1';
    
    IF @DepartmentID IS NOT NULL
        SET @sql = @sql + ' AND e.DepartmentID = @DeptID';
    
    IF @JobTitle IS NOT NULL
        SET @sql = @sql + ' AND e.JobTitle LIKE ''%'' + @JobTitle + ''%''';
    
    IF @HireDateFrom IS NOT NULL
        SET @sql = @sql + ' AND e.HireDate >= @HireFrom';
    
    IF @HireDateTo IS NOT NULL
        SET @sql = @sql + ' AND e.HireDate <= @HireTo';
    
    SET @sql = @sql + ' ORDER BY ' + QUOTENAME(@SortColumn) + ' ' + @SortDirection;
    
    SET @params = N'
        @DeptID INT,
        @JobTitle NVARCHAR(50),
        @HireFrom DATE,
        @HireTo DATE';
    
    EXEC sp_executesql @sql, @params,
        @DeptID = @DepartmentID,
        @JobTitle = @JobTitle,
        @HireFrom = @HireDateFrom,
        @HireTo = @HireDateTo;
END;
GO

-- Test the advanced procedure
EXEC GetEmployeesAdvanced 
    @DepartmentID = 1,
    @JobTitle = 'Engineer',
    @SortColumn = 'Salary',
    @SortDirection = 'DESC';

-- 2. Procedure for bulk operations
CREATE PROCEDURE BulkUpdateSalaries
    @PercentageIncrease DECIMAL(5,2),
    @DepartmentID INT = NULL,
    @EffectiveDate DATE
AS
BEGIN
    SET NOCOUNT ON;
    BEGIN TRY
        BEGIN TRANSACTION;
        
        -- Update salaries
        UPDATE e
        SET Salary = Salary * (1 + @PercentageIncrease / 100)
        OUTPUT 
            inserted.EmployeeID,
            deleted.Salary AS OldSalary,
            inserted.Salary AS NewSalary,
            @EffectiveDate AS ChangeDate,
            'Bulk Update: ' + CAST(@PercentageIncrease AS VARCHAR) + '% increase' AS Reason
        INTO SalaryHistory (EmployeeID, OldSalary, NewSalary, ChangeDate, Reason)
        FROM Employees e
        WHERE (@DepartmentID IS NULL OR e.DepartmentID = @DepartmentID)
          AND e.EmployeeID IS NOT NULL;
        
        COMMIT TRANSACTION;
        
        SELECT @@ROWCOUNT AS EmployeesUpdated;
        
    END TRY
    BEGIN CATCH
        IF @@TRANCOUNT > 0
            ROLLBACK TRANSACTION;
        
        THROW;
    END CATCH
END;
GO

-- Test bulk update
EXEC BulkUpdateSalaries 
    @PercentageIncrease = 5.0,
    @DepartmentID = 1,
    @EffectiveDate = '2023-12-01';

-- Check the results
SELECT * FROM SalaryHistory WHERE Reason LIKE 'Bulk Update%';

--E. Practice Problems (LeetCode Style)
-- Problem 1: Create a function to calculate employee tenure category
CREATE FUNCTION GetTenureCategory
    (
    @HireDate DATE
    )
RETURNS VARCHAR(20)
AS
BEGIN
    DECLARE @Years INT = DATEDIFF(YEAR, @HireDate, GETDATE());
    DECLARE @Category VARCHAR(20);
    
    SET @Category = CASE
        WHEN @Years < 1 THEN 'New Hire'
        WHEN @Years BETWEEN 1 AND 3 THEN 'Junior'
        WHEN @Years BETWEEN 4 AND 7 THEN 'Mid-Level'
        WHEN @Years BETWEEN 8 AND 15 THEN 'Senior'
        ELSE 'Veteran'
    END;
    
    RETURN @Category;
END;
GO

-- Test the function
SELECT 
    FirstName,
    LastName,
    HireDate,
    dbo.GetTenureCategory(HireDate) AS TenureCategory
FROM Employees
ORDER BY HireDate;

-- Problem 2: Create a view showing project profitability
CREATE VIEW vw_ProjectProfitability
AS
SELECT 
    p.ProjectID,
    p.ProjectName,
    d.DepartmentName,
    p.StartDate,
    p.EndDate,
    p.Budget,
    SUM(pa.HoursWorked * 50) AS EstimatedCost, -- Assuming $50/hour rate
    p.Budget - SUM(pa.HoursWorked * 50) AS Profit,
    CASE 
        WHEN SUM(pa.HoursWorked * 50) = 0 THEN 0
        ELSE ((p.Budget - SUM(pa.HoursWorked * 50)) * 100.0) / p.Budget
    END AS ProfitMargin
FROM Projects p
LEFT JOIN Departments d ON p.DepartmentID = d.DepartmentID
LEFT JOIN ProjectAssignments pa ON p.ProjectID = pa.ProjectID
GROUP BY p.ProjectID, p.ProjectName, d.DepartmentName, 
         p.StartDate, p.EndDate, p.Budget;
GO

-- Query the profitability view
SELECT * FROM vw_ProjectProfitability
ORDER BY ProfitMargin DESC;

-- Problem 3: Create a procedure to generate payroll report
CREATE PROCEDURE GeneratePayrollReport
    @PayPeriodStart DATE,
    @PayPeriodEnd DATE
AS
BEGIN
    -- Employee payroll summary
    SELECT 
        e.EmployeeID,
        e.FirstName + ' ' + e.LastName AS EmployeeName,
        d.DepartmentName,
        e.Salary,
        e.Salary / 24 AS BiWeeklySalary, -- Assuming 24 pay periods
        COUNT(DISTINCT a.AttendanceDate) AS DaysWorked,
        SUM(dbo.CalculateWorkingHours(a.CheckInTime, a.CheckOutTime)) AS TotalHours
    FROM Employees e
    LEFT JOIN Departments d ON e.DepartmentID = d.DepartmentID
    LEFT JOIN Attendance a ON e.EmployeeID = a.EmployeeID
        AND a.AttendanceDate BETWEEN @PayPeriodStart AND @PayPeriodEnd
        AND a.Status IN ('Present', 'Late')
    GROUP BY e.EmployeeID, e.FirstName, e.LastName, 
             d.DepartmentName, e.Salary;
    
    -- Department summary
    SELECT 
        d.DepartmentName,
        COUNT(DISTINCT e.EmployeeID) AS EmployeeCount,
        SUM(e.Salary / 24) AS TotalBiWeeklyPayroll,
        AVG(e.Salary) AS AverageSalary
    FROM Employees e
    LEFT JOIN Departments d ON e.DepartmentID = d.DepartmentID
    GROUP BY d.DepartmentName
    ORDER BY TotalBiWeeklyPayroll DESC;
END;
GO

-- Test payroll report
EXEC GeneratePayrollReport 
    @PayPeriodStart = '2023-03-01',
    @PayPeriodEnd = '2023-03-15';

-- Problem 4: Create a function to find nth highest salary
CREATE FUNCTION GetNthHighestSalary
    (
    @N INT
    )
RETURNS DECIMAL(10,2)
AS
BEGIN
    DECLARE @Result DECIMAL(10,2);
    
    WITH RankedSalaries AS (
        SELECT 
            Salary,
            DENSE_RANK() OVER (ORDER BY Salary DESC) AS SalaryRank
        FROM Employees
        WHERE Salary IS NOT NULL
    )
    SELECT @Result = Salary
    FROM RankedSalaries
    WHERE SalaryRank = @N;
    
    RETURN @Result;
END;
GO

-- Test the function
SELECT dbo.GetNthHighestSalary(1) AS HighestSalary;
SELECT dbo.GetNthHighestSalary(2) AS SecondHighestSalary;
SELECT dbo.GetNthHighestSalary(3) AS ThirdHighestSalary;

-- Problem 5: Create an audit trail procedure
CREATE TABLE AuditLog (
    AuditID INT IDENTITY(1,1) PRIMARY KEY,
    TableName NVARCHAR(128),
    ActionType NVARCHAR(10),
    RecordID INT,
    OldData NVARCHAR(MAX),
    NewData NVARCHAR(MAX),
    ChangedBy NVARCHAR(128),
    ChangedDate DATETIME DEFAULT GETDATE()
);

CREATE PROCEDURE LogEmployeeChange
    @EmployeeID INT,
    @ActionType NVARCHAR(10),
    @ChangedBy NVARCHAR(128)
AS
BEGIN
    DECLARE @OldData NVARCHAR(MAX), @NewData NVARCHAR(MAX);
    
    -- Get old data (before change)
    SELECT @OldData = 
        'FirstName: ' + ISNULL(FirstName, '') + '; ' +
        'LastName: ' + ISNULL(LastName, '') + '; ' +
        'Salary: ' + CAST(ISNULL(Salary, 0) AS NVARCHAR) + '; ' +
        'DepartmentID: ' + CAST(ISNULL(DepartmentID, 0) AS NVARCHAR)
    FROM Employees
    WHERE EmployeeID = @EmployeeID;
    
    -- Get new data (after change - will be captured by trigger)
    INSERT INTO AuditLog (TableName, ActionType, RecordID, ChangedBy)
    VALUES ('Employees', @ActionType, @EmployeeID, @ChangedBy);
END;
GO


--F. hands On Exercises
/*
Create a stored procedure that generates an organizational hierarchy report

Write a function that calculates project completion percentage based on current date

Create a view that shows employee utilization (hours worked vs available hours)

Build a procedure that imports employee data from a temporary table with validation

Create a function to generate employee email addresses based on first and last name

Write a view that shows department budget utilization (salaries vs budget)

Create a procedure that archives old attendance records to a history table

*/

--G.Performance and Maintenance
-- 1. View system stored procedures for monitoring
EXEC sp_helptext 'GetAllEmployees'; -- View procedure definition
EXEC sp_depends 'vw_EmployeeDetails'; -- See dependencies
EXEC sp_help 'Employees'; -- View table structure

-- 2. Modify existing stored procedure
ALTER PROCEDURE GetAllEmployees
    @IncludeInactive BIT = 0
AS
BEGIN
    SELECT 
        e.FirstName,
        e.LastName,
        e.JobTitle,
        e.Salary,
        d.DepartmentName,
        e.HireDate,
        CASE 
            WHEN e.EmployeeID IN (SELECT DISTINCT ManagerID FROM Employees WHERE ManagerID IS NOT NULL)
            THEN 'Yes'
            ELSE 'No'
        END AS IsManager
    FROM Employees e
    LEFT JOIN Departments d ON e.DepartmentID = d.DepartmentID
    ORDER BY e.LastName, e.FirstName;
END;
GO

-- 3. Drop objects when needed
-- DROP PROCEDURE IF EXISTS GetAllEmployees;
-- DROP FUNCTION IF EXISTS CalculateAnnualBonus;
-- DROP VIEW IF EXISTS vw_EmployeeDetails;

-- 4. Create procedure with recompile option (for dynamic data)
CREATE PROCEDURE GetDynamicEmployeeReport
    @DepartmentID INT
WITH RECOMPILE
AS
BEGIN
    SELECT * FROM vw_EmployeeDetails
    WHERE DepartmentID = @DepartmentID;
END;
GO

-- 5. Encrypt procedure definition
CREATE PROCEDURE GetEncryptedData
    @EmployeeID INT
WITH ENCRYPTION
AS
BEGIN
    SELECT Salary, Email FROM Employees WHERE EmployeeID = @EmployeeID;
END;
GO