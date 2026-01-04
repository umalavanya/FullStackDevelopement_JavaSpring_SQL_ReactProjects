--Step4: GROUP BY AGGREGATE FUNCTIONS, and HAVING Clause

--A.Basic Aggregate FUNCTIONS 
-- 1. COUNT - Count total employees
SELECT COUNT(*) AS TotalEmployees FROM Employees;

-- 2. COUNT with DISTINCT
SELECT COUNT(DISTINCT DepartmentID) AS UniqueDepartments FROM Employees;

-- 3. SUM - Total salary expenditure
SELECT SUM(Salary) AS TotalSalaryExpenditure FROM Employees;

-- 4. AVG - Average salary
SELECT AVG(Salary) AS AverageSalary FROM Employees;

-- 5. MIN and MAX
SELECT 
    MIN(Salary) AS MinimumSalary,
    MAX(Salary) AS MaximumSalary,
    MIN(HireDate) AS EarliestHire,
    MAX(HireDate) AS LatestHire
FROM Employees;

-- 6. Aggregate with WHERE
SELECT 
    AVG(Salary) AS ITAverageSalary
FROM Employees
WHERE DepartmentID = 1;

-- 7. Multiple aggregates
SELECT 
    COUNT(*) AS EmployeeCount,
    AVG(Salary) AS AvgSalary,
    SUM(Salary) AS TotalSalary,
    MIN(Salary) AS MinSalary,
    MAX(Salary) AS MaxSalary
FROM Employees;


--B. GROUP BY basics
-- 1. Group by department - count employees
SELECT 
    DepartmentID,
    COUNT(*) AS EmployeeCount
FROM Employees
GROUP BY DepartmentID
ORDER BY EmployeeCount DESC;

-- 2. Group by department with department names
SELECT 
    d.DepartmentName,
    COUNT(e.EmployeeID) AS EmployeeCount
FROM Departments d
LEFT JOIN Employees e ON d.DepartmentID = e.DepartmentID
GROUP BY d.DepartmentName
ORDER BY EmployeeCount DESC;

-- 3. Group by multiple columns
SELECT 
    DepartmentID,
    JobTitle,
    COUNT(*) AS Count,
    AVG(Salary) AS AverageSalary
FROM Employees
GROUP BY DepartmentID, JobTitle
ORDER BY DepartmentID, AverageSalary DESC;

-- 4. Group by year of hire
SELECT 
    YEAR(HireDate) AS HireYear,
    COUNT(*) AS EmployeesHired
FROM Employees
GROUP BY YEAR(HireDate)
ORDER BY HireYear;

-- 5. Group by month (across all years)
SELECT 
    MONTH(HireDate) AS HireMonth,
    COUNT(*) AS EmployeesHired
FROM Employees
GROUP BY MONTH(HireDate)
ORDER BY HireMonth;

-- 6. Group by with calculations
SELECT 
    DepartmentID,
    COUNT(*) AS TotalEmployees,
    SUM(Salary) AS TotalDepartmentSalary,
    AVG(Salary) AS AverageDepartmentSalary,
    MAX(Salary) AS HighestSalary,
    MIN(Salary) AS LowestSalary
FROM Employees
GROUP BY DepartmentID
ORDER BY TotalDepartmentSalary DESC;

--C.HAVING Clause (Filtering Groups)

-- 1. Basic HAVING - departments with more than 3 employees
SELECT 
    DepartmentID,
    COUNT(*) AS EmployeeCount
FROM Employees
GROUP BY DepartmentID
HAVING COUNT(*) > 3;

-- 2. HAVING with aggregate conditions
SELECT 
    DepartmentID,
    AVG(Salary) AS AverageSalary
FROM Employees
GROUP BY DepartmentID
HAVING AVG(Salary) > 70000;

-- 3. HAVING with multiple conditions
SELECT 
    JobTitle,
    COUNT(*) AS Count,
    AVG(Salary) AS AvgSalary
FROM Employees
GROUP BY JobTitle
HAVING COUNT(*) >= 2 AND AVG(Salary) > 70000;

-- 4. HAVING with SUM
SELECT 
    ProjectID,
    SUM(HoursWorked) AS TotalHours
FROM ProjectAssignments
GROUP BY ProjectID
HAVING SUM(HoursWorked) > 200;

-- 5. Complex HAVING with subquery
SELECT 
    DepartmentID,
    COUNT(*) AS EmployeeCount,
    AVG(Salary) AS AvgSalary
FROM Employees
GROUP BY DepartmentID
HAVING AVG(Salary) > (
    SELECT AVG(Salary) FROM Employees
);

-- 6. HAVING vs WHERE - difference demonstration
-- WHERE filters rows before grouping
SELECT DepartmentID, AVG(Salary) AS AvgSalary
FROM Employees
WHERE HireDate > '2020-01-01'
GROUP BY DepartmentID;

-- HAVING filters groups after grouping
SELECT DepartmentID, AVG(Salary) AS AvgSalary
FROM Employees
GROUP BY DepartmentID
HAVING AVG(Salary) > 70000;

--D. Advanced GROUP BY Scenarios
-- 1. GROUP BY with ROLLUP (subtotals)
SELECT 
    DepartmentID,
    JobTitle,
    COUNT(*) AS EmployeeCount,
    AVG(Salary) AS AverageSalary
FROM Employees
GROUP BY ROLLUP(DepartmentID, JobTitle)
ORDER BY DepartmentID, JobTitle;

-- 2. GROUP BY with CUBE (all combinations)
SELECT 
    DepartmentID,
    YEAR(HireDate) AS HireYear,
    COUNT(*) AS EmployeeCount
FROM Employees
GROUP BY CUBE(DepartmentID, YEAR(HireDate))
ORDER BY DepartmentID, HireYear;

-- 3. GROUP BY with GROUPING SETS
SELECT 
    DepartmentID,
    JobTitle,
    COUNT(*) AS EmployeeCount
FROM Employees
GROUP BY GROUPING SETS (
    (DepartmentID, JobTitle),
    (DepartmentID),
    (JobTitle),
    ()
)
ORDER BY DepartmentID, JobTitle;

-- 4. GROUP BY with CASE statements
SELECT 
    CASE 
        WHEN Salary < 60000 THEN 'Low'
        WHEN Salary BETWEEN 60000 AND 80000 THEN 'Medium'
        ELSE 'High'
    END AS SalaryRange,
    COUNT(*) AS EmployeeCount,
    AVG(Salary) AS AverageSalary
FROM Employees
GROUP BY 
    CASE 
        WHEN Salary < 60000 THEN 'Low'
        WHEN Salary BETWEEN 60000 AND 80000 THEN 'Medium'
        ELSE 'High'
    END
ORDER BY AverageSalary DESC;

-- 5. Time-based grouping (by quarter)
SELECT 
    d.DepartmentName,
    DATEPART(QUARTER, e.HireDate) AS HireQuarter,
    COUNT(*) AS HiresCount
FROM Employees e
INNER JOIN Departments d ON e.DepartmentID = d.DepartmentID
GROUP BY d.DepartmentName, DATEPART(QUARTER, e.HireDate)
ORDER BY d.DepartmentName, HireQuarter;

--E.Practice Problems (LeetCode Style)

-- Problem 1: Find departments where total salary exceeds department budget
SELECT 
    d.DepartmentName,
    SUM(e.Salary) AS TotalSalary,
    d.Budget,
    CASE 
        WHEN SUM(e.Salary) > d.Budget THEN 'Over Budget'
        ELSE 'Within Budget'
    END AS BudgetStatus
FROM Employees e
INNER JOIN Departments d ON e.DepartmentID = d.DepartmentID
GROUP BY d.DepartmentName, d.Budget
HAVING SUM(e.Salary) > d.Budget;

-- Problem 2: Find duplicate employee names
SELECT 
    FirstName,
    LastName,
    COUNT(*) AS Occurrences
FROM Employees
GROUP BY FirstName, LastName
HAVING COUNT(*) > 1;

-- Problem 3: Find projects with total hours worked > 300
SELECT 
    p.ProjectName,
    SUM(pa.HoursWorked) AS TotalHoursWorked
FROM Projects p
INNER JOIN ProjectAssignments pa ON p.ProjectID = pa.ProjectID
GROUP BY p.ProjectName
HAVING SUM(pa.HoursWorked) > 300
ORDER BY TotalHoursWorked DESC;

-- Problem 4: Get department with highest average salary
SELECT TOP 1
    d.DepartmentName,
    AVG(e.Salary) AS AverageSalary
FROM Employees e
INNER JOIN Departments d ON e.DepartmentID = d.DepartmentID
GROUP BY d.DepartmentName
ORDER BY AverageSalary DESC;

-- Problem 5: Find employees who worked on weekend (Saturday/Sunday attendance)
-- First, let's add some weekend attendance data
INSERT INTO Attendance (EmployeeID, AttendanceDate, CheckInTime, CheckOutTime, Status)
VALUES 
(1, '2023-03-04', '10:00:00', '15:00:00', 'Weekend'),
(2, '2023-03-05', '09:30:00', '14:00:00', 'Weekend');

SELECT 
    e.FirstName,
    e.LastName,
    COUNT(a.AttendanceID) AS WeekendDaysWorked
FROM Employees e
INNER JOIN Attendance a ON e.EmployeeID = a.EmployeeID
WHERE DATEPART(WEEKDAY, a.AttendanceDate) IN (1, 7) -- Sunday=1, Saturday=7
   OR a.Status = 'Weekend'
GROUP BY e.EmployeeID, e.FirstName, e.LastName
HAVING COUNT(a.AttendanceID) > 0;

-- Problem 6: Get monthly hire trend
SELECT 
    YEAR(HireDate) AS Year,
    MONTH(HireDate) AS Month,
    DATENAME(MONTH, HireDate) AS MonthName,
    COUNT(*) AS Hires
FROM Employees
GROUP BY YEAR(HireDate), MONTH(HireDate), DATENAME(MONTH, HireDate)
ORDER BY Year, Month;

-- Problem 7: Find managers with most direct reports
SELECT 
    mgr.FirstName + ' ' + mgr.LastName AS ManagerName,
    COUNT(emp.EmployeeID) AS DirectReports
FROM Employees emp
INNER JOIN Employees mgr ON emp.ManagerID = mgr.EmployeeID
GROUP BY mgr.EmployeeID, mgr.FirstName, mgr.LastName
HAVING COUNT(emp.EmployeeID) > 0
ORDER BY DirectReports DESC;

--F. Hands-on Exercises
/*

Find the average salary for each job title, but only show titles with more than 1 employee

Calculate the total budget utilization percentage for each department (Total Salaries / Budget)

Find projects that have employees from multiple departments working on them

Get the year with the highest number of hires

Calculate the average hours worked per project assignment

Find departments where the highest salary is more than twice the lowest salary

Get a monthly report of attendance (count of present, late, absent per month)

*/

--G.Perforamnace Considerations

-- 1. Use WHERE before GROUP BY when possible (reduces rows processed)
-- Less efficient:
SELECT DepartmentID, AVG(Salary) 
FROM Employees
GROUP BY DepartmentID
HAVING DepartmentID IN (1, 2, 3);

-- More efficient:
SELECT DepartmentID, AVG(Salary) 
FROM Employees
WHERE DepartmentID IN (1, 2, 3)
GROUP BY DepartmentID;

-- 2. Use COUNT(1) vs COUNT(*) vs COUNT(column)
-- COUNT(*) - counts all rows including NULLs
-- COUNT(column) - counts non-null values in that column
-- COUNT(1) - same as COUNT(*)

-- 3. Indexing for GROUP BY performance
-- Create indexes on columns used in GROUP BY
CREATE INDEX IX_Employees_DepartmentID ON Employees(DepartmentID);
CREATE INDEX IX_Employees_HireDate ON Employees(HireDate);