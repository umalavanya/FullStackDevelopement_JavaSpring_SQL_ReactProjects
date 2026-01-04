--Step:5 Window Functions - Advanced Analytics

--A. Ranking Functions
-- 1. ROW_NUMBER() - Assign unique sequential number
SELECT 
    FirstName,
    LastName,
    Salary,
    DepartmentID,
    ROW_NUMBER() OVER (ORDER BY Salary DESC) AS SalaryRank
FROM Employees;

-- 2. RANK() - Rank with gaps for ties
SELECT 
    FirstName,
    LastName,
    Salary,
    DepartmentID,
    RANK() OVER (ORDER BY Salary DESC) AS SalaryRank
FROM Employees;

-- 3. DENSE_RANK() - Rank without gaps for ties
SELECT 
    FirstName,
    LastName,
    Salary,
    DepartmentID,
    DENSE_RANK() OVER (ORDER BY Salary DESC) AS SalaryRank
FROM Employees;

-- 4. Ranking within partitions (by department)
SELECT 
    FirstName,
    LastName,
    Salary,
    DepartmentID,
    ROW_NUMBER() OVER (PARTITION BY DepartmentID ORDER BY Salary DESC) AS DeptSalaryRank,
    RANK() OVER (PARTITION BY DepartmentID ORDER BY Salary DESC) AS DeptSalaryRankWithGaps,
    DENSE_RANK() OVER (PARTITION BY DepartmentID ORDER BY Salary DESC) AS DeptSalaryRankNoGaps
FROM Employees
ORDER BY DepartmentID, Salary DESC;

-- 5. NTILE() - Divide into buckets
SELECT 
    FirstName,
    LastName,
    Salary,
    NTILE(4) OVER (ORDER BY Salary DESC) AS SalaryQuartile,
    NTILE(10) OVER (ORDER BY Salary DESC) AS SalaryDecile
FROM Employees;

-- 6. Practical use: Find top 3 earners in each department
WITH RankedEmployees AS (
    SELECT 
        FirstName,
        LastName,
        Salary,
        DepartmentID,
        ROW_NUMBER() OVER (PARTITION BY DepartmentID ORDER BY Salary DESC) AS RankInDept
    FROM Employees
)
SELECT * 
FROM RankedEmployees 
WHERE RankInDept <= 3
ORDER BY DepartmentID, RankInDept;

--B. Aggregate Window Functions
-- 1. Running total/sum
SELECT 
    FirstName,
    LastName,
    HireDate,
    Salary,
    SUM(Salary) OVER (ORDER BY HireDate) AS RunningTotalSalary,
    SUM(Salary) OVER (ORDER BY HireDate ROWS UNBOUNDED PRECEDING) AS ExplicitRunningTotal
FROM Employees
ORDER BY HireDate;

-- 2. Moving average (3-month window)
SELECT 
    FirstName,
    LastName,
    HireDate,
    Salary,
    AVG(Salary) OVER (ORDER BY HireDate ROWS BETWEEN 2 PRECEDING AND CURRENT ROW) AS MovingAvg3Hires
FROM Employees
ORDER BY HireDate;

-- 3. Department-wise running total
SELECT 
    FirstName,
    LastName,
    DepartmentID,
    Salary,
    SUM(Salary) OVER (PARTITION BY DepartmentID ORDER BY HireDate) AS DeptRunningTotal
FROM Employees
ORDER BY DepartmentID, HireDate;

-- 4. Compare employee salary with department average
SELECT 
    FirstName,
    LastName,
    DepartmentID,
    Salary,
    AVG(Salary) OVER (PARTITION BY DepartmentID) AS DeptAvgSalary,
    Salary - AVG(Salary) OVER (PARTITION BY DepartmentID) AS DiffFromDeptAvg,
    (Salary * 100.0) / AVG(Salary) OVER (PARTITION BY DepartmentID) AS PercentOfDeptAvg
FROM Employees
ORDER BY DepartmentID, Salary DESC;

-- 5. Cumulative percentage
SELECT 
    FirstName,
    LastName,
    Salary,
    SUM(Salary) OVER (ORDER BY Salary DESC) AS RunningTotal,
    SUM(Salary) OVER () AS GrandTotal,
    (SUM(Salary) OVER (ORDER BY Salary DESC) * 100.0) / SUM(Salary) OVER () AS CumulativePercentage
FROM Employees
ORDER BY Salary DESC;

-- 6. First and last value in window
SELECT 
    FirstName,
    LastName,
    HireDate,
    Salary,
    FIRST_VALUE(Salary) OVER (ORDER BY HireDate) AS FirstHireSalary,
    LAST_VALUE(Salary) OVER (ORDER BY HireDate ROWS BETWEEN UNBOUNDED PRECEDING AND UNBOUNDED FOLLOWING) AS CurrentLastSalary,
    LAG(Salary) OVER (ORDER BY HireDate) AS PreviousSalary,
    LEAD(Salary) OVER (ORDER BY HireDate) AS NextSalary
FROM Employees
ORDER BY HireDate;

--C. LAG() and LEAD() Functions
-- 1. Compare with previous row
SELECT 
    FirstName,
    LastName,
    HireDate,
    Salary,
    LAG(Salary) OVER (ORDER BY HireDate) AS PreviousSalary,
    Salary - LAG(Salary) OVER (ORDER BY HireDate) AS SalaryIncreaseFromPrevious,
    LAG(Salary, 2) OVER (ORDER BY HireDate) AS TwoHiresAgoSalary
FROM Employees
ORDER BY HireDate;

-- 2. Compare with next row
SELECT 
    FirstName,
    LastName,
    HireDate,
    Salary,
    LEAD(Salary) OVER (ORDER BY HireDate) AS NextSalary,
    LEAD(Salary) OVER (ORDER BY HireDate) - Salary AS NextSalaryDifference
FROM Employees
ORDER BY HireDate;

-- 3. Partitioned LAG/LEAD (by department)
SELECT 
    FirstName,
    LastName,
    DepartmentID,
    HireDate,
    Salary,
    LAG(Salary) OVER (PARTITION BY DepartmentID ORDER BY HireDate) AS PrevDeptSalary,
    LEAD(Salary) OVER (PARTITION BY DepartmentID ORDER BY HireDate) AS NextDeptSalary
FROM Employees
ORDER BY DepartmentID, HireDate;

-- 4. Calculate salary growth percentage
SELECT 
    FirstName,
    LastName,
    HireDate,
    Salary,
    LAG(Salary) OVER (ORDER BY HireDate) AS PreviousSalary,
    CASE 
        WHEN LAG(Salary) OVER (ORDER BY HireDate) IS NOT NULL 
        THEN ROUND(((Salary - LAG(Salary) OVER (ORDER BY HireDate)) * 100.0 / LAG(Salary) OVER (ORDER BY HireDate)), 2)
        ELSE NULL 
    END AS SalaryGrowthPercent
FROM Employees
ORDER BY HireDate;

--E. Practice Problems (LeetCode Style)
-- Problem 1: Find employees earning more than department average (Using Window)
SELECT *
FROM (
    SELECT 
        EmployeeID,
        FirstName,
        LastName,
        DepartmentID,
        Salary,
        AVG(Salary) OVER (PARTITION BY DepartmentID) AS DeptAvgSalary
    FROM Employees
) AS emp_with_avg
WHERE Salary > DeptAvgSalary
ORDER BY DepartmentID, Salary DESC;

-- Problem 2: Find the cumulative distribution of salaries
SELECT 
    FirstName,
    LastName,
    Salary,
    CUME_DIST() OVER (ORDER BY Salary) AS CumulativeDistribution,
    PERCENT_RANK() OVER (ORDER BY Salary) AS PercentRank
FROM Employees
ORDER BY Salary;

-- Problem 3: Find salary gaps in each department
SELECT 
    DepartmentID,
    FirstName,
    LastName,
    Salary,
    LAG(Salary) OVER (PARTITION BY DepartmentID ORDER BY Salary) AS PreviousSalary,
    Salary - LAG(Salary) OVER (PARTITION BY DepartmentID ORDER BY Salary) AS SalaryGap
FROM Employees
WHERE DepartmentID IS NOT NULL
ORDER BY DepartmentID, Salary;

-- Problem 4: Calculate moving average of project hours
SELECT 
    p.ProjectName,
    pa.AssignmentDate,
    pa.HoursWorked,
    AVG(pa.HoursWorked) OVER (
        PARTITION BY pa.ProjectID 
        ORDER BY pa.AssignmentDate 
        ROWS BETWEEN 2 PRECEDING AND CURRENT ROW
    ) AS MovingAvg3Assignments
FROM ProjectAssignments pa
INNER JOIN Projects p ON pa.ProjectID = p.ProjectID
ORDER BY pa.ProjectID, pa.AssignmentDate;

-- Problem 5: Find employees with salary higher than previous and next employee
WITH SalaryNeighbors AS (
    SELECT 
        EmployeeID,
        FirstName,
        LastName,
        Salary,
        LAG(Salary) OVER (ORDER BY Salary) AS PrevSalary,
        LEAD(Salary) OVER (ORDER BY Salary) AS NextSalary
    FROM Employees
)
SELECT *
FROM SalaryNeighbors
WHERE Salary > COALESCE(PrevSalary, 0) AND Salary > COALESCE(NextSalary, 0);

-- Problem 6: Calculate percentage of total salary per department
SELECT 
    d.DepartmentName,
    e.FirstName,
    e.LastName,
    e.Salary,
    SUM(e.Salary) OVER (PARTITION BY e.DepartmentID) AS DeptTotalSalary,
    (e.Salary * 100.0) / SUM(e.Salary) OVER (PARTITION BY e.DepartmentID) AS PercentOfDeptTotal,
    (e.Salary * 100.0) / SUM(e.Salary) OVER () AS PercentOfCompanyTotal
FROM Employees e
INNER JOIN Departments d ON e.DepartmentID = d.DepartmentID
ORDER BY e.DepartmentID, e.Salary DESC;

-- Problem 7: Find consecutive attendance records
-- First, add more attendance data
INSERT INTO Attendance (EmployeeID, AttendanceDate, CheckInTime, CheckOutTime, Status)
VALUES 
(1, '2023-03-07', '09:00:00', '17:30:00', 'Present'),
(1, '2023-03-08', '08:55:00', '17:45:00', 'Present'),
(1, '2023-03-09', '09:05:00', '17:35:00', 'Present'),
(1, '2023-03-10', NULL, NULL, 'Absent'),
(1, '2023-03-13', '09:00:00', '17:30:00', 'Present'),
(1, '2023-03-14', '08:50:00', '17:40:00', 'Present');

WITH AttendanceGroups AS (
    SELECT 
        EmployeeID,
        AttendanceDate,
        Status,
        ROW_NUMBER() OVER (PARTITION BY EmployeeID ORDER BY AttendanceDate) AS rn1,
        ROW_NUMBER() OVER (PARTITION BY EmployeeID, Status ORDER BY AttendanceDate) AS rn2,
        DATEADD(DAY, -ROW_NUMBER() OVER (PARTITION BY EmployeeID, Status ORDER BY AttendanceDate), AttendanceDate) AS GroupIdentifier
    FROM Attendance
    WHERE EmployeeID = 1
)
SELECT 
    EmployeeID,
    MIN(AttendanceDate) AS StartDate,
    MAX(AttendanceDate) AS EndDate,
    Status,
    COUNT(*) AS ConsecutiveDays
FROM AttendanceGroups
GROUP BY EmployeeID, Status, GroupIdentifier
HAVING COUNT(*) > 1
ORDER BY StartDate;

--F. Hands-on Exercises
/*

Calculate the median salary for each department

Find employees whose salary is in the top 10% of their department

Calculate the 7-day moving average of hours worked for each project

Find the salary difference between each employee and the next highest paid employee in their department

Identify employees who have had a salary increase of more than 10% from their previous salary (using SalaryHistory)

Calculate a rolling 3-month total of new hires per department

Find the longest streak of consecutive "Present" attendance for each employee

*/

--G. Performance Tips for Window Functions
-- 1. Indexing for window functions
-- Create indexes on columns used in PARTITION BY and ORDER BY
CREATE INDEX IX_Employees_Dept_Salary ON Employees(DepartmentID, Salary);
CREATE INDEX IX_Employees_HireDate ON Employees(HireDate);

-- 2. Use CTEs for complex window calculations
WITH SalaryAnalysis AS (
    SELECT 
        EmployeeID,
        FirstName,
        LastName,
        DepartmentID,
        Salary,
        AVG(Salary) OVER (PARTITION BY DepartmentID) AS DeptAvg,
        RANK() OVER (PARTITION BY DepartmentID ORDER BY Salary DESC) AS DeptRank
    FROM Employees
)
SELECT * 
FROM SalaryAnalysis 
WHERE DeptRank <= 3 
   AND Salary > DeptAvg;

-- 3. Avoid unnecessary window functions
-- Instead of this:
SELECT 
    *,
    SUM(Salary) OVER (PARTITION BY DepartmentID) AS DeptTotal
FROM Employees;

-- Consider this if you only need aggregates:
SELECT 
    DepartmentID,
    SUM(Salary) AS DeptTotal
FROM Employees
GROUP BY DepartmentID;

/*

Practice Tasks:

Execute each query section (A through E)

Try to write solutions for the hands-on exercises

Experiment with different window frame specifications

Compare performance of window functions vs. traditional GROUP BY

Practice combining multiple window functions in single queries

*/