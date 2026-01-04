--Step1: 

-- Create Database
CREATE DATABASE EmployeeManagementSystem;
GO

USE EmployeeManagementSystem;
GO

-- 1. Departments Table
CREATE TABLE Departments (
    DepartmentID INT PRIMARY KEY IDENTITY(1,1),
    DepartmentName VARCHAR(50) NOT NULL,
    Location VARCHAR(50),
    Budget DECIMAL(15,2)
);

-- 2. Employees Table
CREATE TABLE Employees (
    EmployeeID INT PRIMARY KEY IDENTITY(1,1),
    FirstName VARCHAR(50) NOT NULL,
    LastName VARCHAR(50) NOT NULL,
    Email VARCHAR(100) UNIQUE,
    Phone VARCHAR(15),
    HireDate DATE NOT NULL,
    JobTitle VARCHAR(50),
    Salary DECIMAL(10,2),
    DepartmentID INT,
    ManagerID INT,
    CONSTRAINT FK_Department FOREIGN KEY (DepartmentID) 
        REFERENCES Departments(DepartmentID),
    CONSTRAINT FK_Manager FOREIGN KEY (ManagerID) 
        REFERENCES Employees(EmployeeID)
);

-- 3. Projects Table
CREATE TABLE Projects (
    ProjectID INT PRIMARY KEY IDENTITY(1,1),
    ProjectName VARCHAR(100) NOT NULL,
    StartDate DATE,
    EndDate DATE,
    Budget DECIMAL(15,2),
    DepartmentID INT,
    CONSTRAINT FK_Project_Department FOREIGN KEY (DepartmentID) 
        REFERENCES Departments(DepartmentID)
);

-- 4. ProjectAssignments Table (Many-to-Many Relationship)
CREATE TABLE ProjectAssignments (
    AssignmentID INT PRIMARY KEY IDENTITY(1,1),
    EmployeeID INT,
    ProjectID INT,
    AssignmentDate DATE,
    HoursWorked DECIMAL(5,2),
    CONSTRAINT FK_Assignment_Employee FOREIGN KEY (EmployeeID) 
        REFERENCES Employees(EmployeeID),
    CONSTRAINT FK_Assignment_Project FOREIGN KEY (ProjectID) 
        REFERENCES Projects(ProjectID)
);

-- 5. Attendance Table
CREATE TABLE Attendance (
    AttendanceID INT PRIMARY KEY IDENTITY(1,1),
    EmployeeID INT,
    AttendanceDate DATE,
    CheckInTime TIME,
    CheckOutTime TIME,
    Status VARCHAR(20),
    CONSTRAINT FK_Attendance_Employee FOREIGN KEY (EmployeeID) 
        REFERENCES Employees(EmployeeID)
);

-- 6. SalaryHistory Table
CREATE TABLE SalaryHistory (
    HistoryID INT PRIMARY KEY IDENTITY(1,1),
    EmployeeID INT,
    OldSalary DECIMAL(10,2),
    NewSalary DECIMAL(10,2),
    ChangeDate DATE,
    Reason VARCHAR(100),
    CONSTRAINT FK_SalaryHistory_Employee FOREIGN KEY (EmployeeID) 
        REFERENCES Employees(EmployeeID)
);

--------------------------------------------------
SELECT * FROM INFORMATION_SCHEMA.TABLES;

EXEC sp_help 'Employees';
--------------------------------------------------


--Step2: 

-- 1. Insert into Departments
INSERT INTO Departments (DepartmentName, Location, Budget) VALUES
('IT', 'New York', 500000.00),
('HR', 'Chicago', 200000.00),
('Finance', 'Boston', 450000.00),
('Marketing', 'Los Angeles', 300000.00),
('Sales', 'Miami', 400000.00),
('Operations', 'Seattle', 350000.00),
('Research', 'Austin', 280000.00);

-- 2. Insert into Employees (Note: Some ManagerIDs will be null initially)
INSERT INTO Employees (FirstName, LastName, Email, Phone, HireDate, JobTitle, Salary, DepartmentID, ManagerID) VALUES
('John', 'Doe', 'john.doe@company.com', '555-0101', '2018-06-15', 'Software Engineer', 85000.00, 1, NULL),
('Jane', 'Smith', 'jane.smith@company.com', '555-0102', '2019-03-22', 'HR Manager', 75000.00, 2, NULL),
('Robert', 'Johnson', 'robert.j@company.com', '555-0103', '2017-11-10', 'Financial Analyst', 72000.00, 3, NULL),
('Emily', 'Davis', 'emily.davis@company.com', '555-0104', '2020-01-30', 'Marketing Specialist', 65000.00, 4, NULL),
('Michael', 'Brown', 'michael.b@company.com', '555-0105', '2016-08-05', 'Sales Director', 95000.00, 5, NULL),
('Sarah', 'Wilson', 'sarah.wilson@company.com', '555-0106', '2021-05-18', 'IT Manager', 90000.00, 1, 1),
('David', 'Taylor', 'david.t@company.com', '555-0107', '2019-09-12', 'Operations Lead', 68000.00, 6, NULL),
('Lisa', 'Anderson', 'lisa.a@company.com', '555-0108', '2020-07-22', 'Research Scientist', 82000.00, 7, NULL),
('James', 'Thomas', 'james.thomas@company.com', '555-0109', '2018-02-14', 'Senior Developer', 95000.00, 1, 6),
('Patricia', 'Jackson', 'patricia.j@company.com', '555-0110', '2022-03-10', 'HR Associate', 58000.00, 2, 2),
('Richard', 'White', 'richard.white@company.com', '555-0111', '2017-12-01', 'Accountant', 70000.00, 3, 3),
('Mary', 'Harris', 'mary.harris@company.com', '555-0112', '2019-04-25', 'Marketing Coordinator', 62000.00, 4, 4),
('Charles', 'Martin', 'charles.m@company.com', '555-0113', '2020-11-30', 'Sales Executive', 73000.00, 5, 5),
('Jennifer', 'Thompson', 'jennifer.t@company.com', '555-0114', '2021-08-15', 'System Admin', 78000.00, 1, 6),
('Daniel', 'Garcia', 'daniel.g@company.com', '555-0115', '2018-09-05', 'Operations Analyst', 67000.00, 6, 7),
('Elizabeth', 'Martinez', 'elizabeth.m@company.com', '555-0116', '2022-01-20', 'Junior Researcher', 60000.00, 7, 8),
('Matthew', 'Robinson', 'matthew.r@company.com', '555-0117', '2019-06-10', 'QA Engineer', 75000.00, 1, 6),
('Susan', 'Clark', 'susan.clark@company.com', '555-0118', '2020-03-15', 'Recruiter', 59000.00, 2, 2),
('Kevin', 'Rodriguez', 'kevin.r@company.com', '555-0119', '2021-02-28', 'Financial Controller', 85000.00, 3, 3),
('Nancy', 'Lewis', 'nancy.lewis@company.com', '555-0120', '2017-07-01', 'Marketing Manager', 88000.00, 4, 4);

-- Update ManagerIDs to create hierarchy (after all employees are inserted)
UPDATE Employees SET ManagerID = 6 WHERE EmployeeID IN (1, 9, 14, 17);
UPDATE Employees SET ManagerID = 2 WHERE EmployeeID IN (10, 18);
UPDATE Employees SET ManagerID = 3 WHERE EmployeeID IN (11, 19);
UPDATE Employees SET ManagerID = 4 WHERE EmployeeID IN (12, 20);
UPDATE Employees SET ManagerID = 5 WHERE EmployeeID = 13;
UPDATE Employees SET ManagerID = 7 WHERE EmployeeID = 15;
UPDATE Employees SET ManagerID = 8 WHERE EmployeeID = 16;

-- 3. Insert into Projects
INSERT INTO Projects (ProjectName, StartDate, EndDate, Budget, DepartmentID) VALUES
('Website Redesign', '2023-01-15', '2023-06-30', 150000.00, 1),
('Employee Portal', '2023-03-01', '2023-12-31', 200000.00, 1),
('Payroll System Upgrade', '2023-02-10', '2023-09-30', 120000.00, 3),
('Marketing Campaign Q3', '2023-07-01', '2023-12-15', 180000.00, 4),
('Sales CRM Implementation', '2023-04-15', '2023-11-30', 220000.00, 5),
('Office Relocation', '2023-05-01', '2023-08-31', 90000.00, 6),
('Product Research 2023', '2023-01-01', '2023-12-31', 250000.00, 7),
('Mobile App Development', '2023-06-01', '2024-02-28', 300000.00, 1);

-- 4. Insert into ProjectAssignments
INSERT INTO ProjectAssignments (EmployeeID, ProjectID, AssignmentDate, HoursWorked) VALUES
(1, 1, '2023-01-20', 120.5),
(9, 1, '2023-01-20', 95.0),
(14, 1, '2023-02-01', 80.0),
(1, 2, '2023-03-05', 200.0),
(17, 2, '2023-03-05', 150.5),
(9, 8, '2023-06-10', 180.0),
(14, 8, '2023-06-10', 160.0),
(11, 3, '2023-02-15', 140.0),
(19, 3, '2023-02-15', 175.0),
(12, 4, '2023-07-05', 125.5),
(20, 4, '2023-07-05', 190.0),
(13, 5, '2023-04-20', 210.0),
(15, 6, '2023-05-10', 95.0),
(16, 7, '2023-01-10', 300.0),
(6, 1, '2023-01-20', 40.0),
(6, 2, '2023-03-05', 60.0),
(2, 6, '2023-05-10', 30.0),
(3, 3, '2023-02-15', 25.0);

-- 5. Insert into Attendance (for a week in March 2023)
INSERT INTO Attendance (EmployeeID, AttendanceDate, CheckInTime, CheckOutTime, Status) VALUES
(1, '2023-03-01', '09:05:00', '17:30:00', 'Present'),
(1, '2023-03-02', '08:55:00', '17:45:00', 'Present'),
(1, '2023-03-03', '09:10:00', '17:20:00', 'Present'),
(1, '2023-03-06', '09:00:00', '17:40:00', 'Present'),
(2, '2023-03-01', '08:45:00', '17:50:00', 'Present'),
(2, '2023-03-02', '08:50:00', '17:55:00', 'Present'),
(2, '2023-03-03', '09:15:00', '17:25:00', 'Late'),
(2, '2023-03-06', '08:40:00', '17:30:00', 'Present'),
(6, '2023-03-01', '08:30:00', '18:00:00', 'Present'),
(6, '2023-03-02', '08:35:00', '18:10:00', 'Present'),
(6, '2023-03-03', '08:40:00', '17:50:00', 'Present'),
(6, '2023-03-06', '08:45:00', '18:05:00', 'Present'),
(9, '2023-03-01', '09:20:00', '17:15:00', 'Late'),
(9, '2023-03-02', '09:00:00', '17:30:00', 'Present'),
(9, '2023-03-03', '08:55:00', '17:40:00', 'Present'),
(9, '2023-03-06', '09:10:00', '17:20:00', 'Present'),
(14, '2023-03-01', '08:50:00', '17:45:00', 'Present'),
(14, '2023-03-02', '08:55:00', '17:50:00', 'Present'),
(14, '2023-03-03', NULL, NULL, 'Absent'),
(14, '2023-03-06', '09:05:00', '17:35:00', 'Present');

-- 6. Insert into SalaryHistory
INSERT INTO SalaryHistory (EmployeeID, OldSalary, NewSalary, ChangeDate, Reason) VALUES
(1, 80000.00, 85000.00, '2022-06-15', 'Annual Raise'),
(2, 70000.00, 75000.00, '2022-03-22', 'Promotion'),
(6, 85000.00, 90000.00, '2022-05-18', 'Promotion to Manager'),
(9, 90000.00, 95000.00, '2022-02-14', 'Performance Bonus'),
(14, 75000.00, 78000.00, '2022-08-15', 'Skill Enhancement'),
(19, 80000.00, 85000.00, '2022-02-28', 'Promotion'),
(20, 85000.00, 88000.00, '2022-07-01', 'Market Adjustment');


---------------------------------------------------------------
SELECT COUNT(*) AS TotalEmployees FROM Employees;
SELECT * FROM Departments ORDER BY DepartmentName;
SELECT TOP 5 * FROM Employees ORDER BY HireDate DESC;

---------------------------------------------------------------
-- Get all IT department employees
SELECT * FROM Employees WHERE DepartmentID = 1;

-- Get employees hired in 2020 or later
SELECT FirstName, LastName, HireDate FROM Employees 
WHERE HireDate >= '2020-01-01';

-- Count employees per department
SELECT d.DepartmentName, COUNT(e.EmployeeID) AS EmployeeCount
FROM Departments d
LEFT JOIN Employees e ON d.DepartmentID = e.DepartmentID
GROUP BY d.DepartmentName;
--------------------------------------------------------------

--Step3: 

--A. Basic Selecet Operations

-- 1. Select all columns from a table
SELECT * FROM Employees;

-- 2. Select specific columns
SELECT FirstName, LastName, Email, HireDate 
FROM Employees;

-- 3. Using column aliases
SELECT 
    FirstName AS 'First Name',
    LastName AS 'Last Name',
    Salary AS 'Annual Salary',
    HireDate AS 'Date Hired'
FROM Employees;

-- 4. Using DISTINCT to remove duplicates
SELECT DISTINCT JobTitle FROM Employees;

-- 5. Using TOP to limit results
SELECT TOP 5 FirstName, LastName, Salary 
FROM Employees 
ORDER BY Salary DESC;

-- 6. Using TOP with PERCENT
SELECT TOP 30 PERCENT FirstName, LastName, HireDate 
FROM Employees 
ORDER BY HireDate;

-- 7. Using calculated columns
SELECT 
    FirstName,
    LastName,
    Salary,
    Salary / 12 AS MonthlySalary,
    Salary * 0.1 AS BonusEstimate
FROM Employees;

--B. WHERE clause with different Operators

-- 1. Basic WHERE clause
SELECT * FROM Employees WHERE DepartmentID = 1;

-- 2. Comparison operators (> < >= <= <>)
SELECT FirstName, LastName, Salary 
FROM Employees 
WHERE Salary > 80000;

-- 3. BETWEEN operator
SELECT FirstName, LastName, HireDate 
FROM Employees 
WHERE HireDate BETWEEN '2020-01-01' AND '2021-12-31';

-- 4. IN operator
SELECT FirstName, LastName, JobTitle 
FROM Employees 
WHERE JobTitle IN ('Software Engineer', 'Senior Developer', 'System Admin');

-- 5. LIKE operator with wildcards
SELECT FirstName, LastName, Email 
FROM Employees 
WHERE Email LIKE '%@company.com';

-- 6. Multiple conditions with AND/OR
SELECT FirstName, LastName, Salary, DepartmentID 
FROM Employees 
WHERE (Salary > 70000 AND DepartmentID = 1) 
   OR (Salary > 80000 AND DepartmentID = 3);

-- 7. NULL checks
SELECT FirstName, LastName, ManagerID 
FROM Employees 
WHERE ManagerID IS NULL;

-- 8. NOT operator
SELECT FirstName, LastName, DepartmentID 
FROM Employees 
WHERE DepartmentID NOT IN (2, 4);

-- 9. Date functions in WHERE
SELECT FirstName, LastName, HireDate 
FROM Employees 
WHERE YEAR(HireDate) = 2020;

--C. ORDER BY with Multiple Columns

-- 1. Single column ordering
SELECT FirstName, LastName, Salary 
FROM Employees 
ORDER BY Salary DESC;

-- 2. Multiple column ordering
SELECT FirstName, LastName, HireDate, DepartmentID 
FROM Employees 
ORDER BY DepartmentID ASC, HireDate DESC;

-- 3. ORDER BY with column position
SELECT FirstName, LastName, Salary, HireDate 
FROM Employees 
ORDER BY 3 DESC, 4 ASC;

-- 4. ORDER BY with CASE statement
SELECT FirstName, LastName, JobTitle, Salary 
FROM Employees 
ORDER BY 
    CASE 
        WHEN JobTitle LIKE '%Manager%' THEN 1
        WHEN JobTitle LIKE '%Senior%' THEN 2
        ELSE 3
    END,
    Salary DESC;

--D. JOIN Operations

-- 1. INNER JOIN (Get employees with department info)
SELECT 
    e.FirstName,
    e.LastName,
    e.JobTitle,
    e.Salary,
    d.DepartmentName,
    d.Location
FROM Employees e
INNER JOIN Departments d ON e.DepartmentID = d.DepartmentID;

-- 2. LEFT JOIN (All employees, even without department assignment)
SELECT 
    e.FirstName,
    e.LastName,
    e.JobTitle,
    d.DepartmentName
FROM Employees e
LEFT JOIN Departments d ON e.DepartmentID = d.DepartmentID;

-- 3. RIGHT JOIN (All departments, even without employees)
SELECT 
    d.DepartmentName,
    d.Location,
    e.FirstName,
    e.LastName
FROM Employees e
RIGHT JOIN Departments d ON e.DepartmentID = d.DepartmentID;

-- 4. FULL OUTER JOIN (All records from both tables)
SELECT 
    e.FirstName,
    e.LastName,
    d.DepartmentName
FROM Employees e
FULL OUTER JOIN Departments d ON e.DepartmentID = d.DepartmentID;

-- 5. Self Join (Employees with their managers)
SELECT 
    emp.FirstName + ' ' + emp.LastName AS EmployeeName,
    emp.JobTitle AS EmployeeTitle,
    mgr.FirstName + ' ' + mgr.LastName AS ManagerName,
    mgr.JobTitle AS ManagerTitle
FROM Employees emp
LEFT JOIN Employees mgr ON emp.ManagerID = mgr.EmployeeID;

-- 6. Multiple Joins (Employees with department and project assignments)
SELECT 
    e.FirstName,
    e.LastName,
    d.DepartmentName,
    p.ProjectName,
    pa.AssignmentDate,
    pa.HoursWorked
FROM Employees e
INNER JOIN Departments d ON e.DepartmentID = d.DepartmentID
LEFT JOIN ProjectAssignments pa ON e.EmployeeID = pa.EmployeeID
LEFT JOIN Projects p ON pa.ProjectID = p.ProjectID;

-- 7. CROSS JOIN (Cartesian product - useful for generating combinations)
SELECT 
    e.FirstName,
    d.DepartmentName
FROM Employees e
CROSS JOIN Departments d
WHERE e.DepartmentID = 1;

--E. Practice Problems (LeetCode Style)

-- Problem 1: Find employees earning more than their managers
SELECT 
    e.FirstName AS EmployeeName,
    e.Salary AS EmployeeSalary,
    m.FirstName AS ManagerName,
    m.Salary AS ManagerSalary
FROM Employees e
INNER JOIN Employees m ON e.ManagerID = m.EmployeeID
WHERE e.Salary > m.Salary;

-- Problem 2: Find departments with above average budget
SELECT 
    DepartmentName,
    Budget,
    (SELECT AVG(Budget) FROM Departments) AS AverageBudget
FROM Departments
WHERE Budget > (SELECT AVG(Budget) FROM Departments);

-- Problem 3: Find employees who have worked on multiple projects
SELECT 
    e.FirstName,
    e.LastName,
    COUNT(pa.ProjectID) AS ProjectCount
FROM Employees e
INNER JOIN ProjectAssignments pa ON e.EmployeeID = pa.EmployeeID
GROUP BY e.EmployeeID, e.FirstName, e.LastName
HAVING COUNT(pa.ProjectID) > 1;

-- Problem 4: Find the second highest salary
SELECT MAX(Salary) AS SecondHighestSalary
FROM Employees
WHERE Salary < (SELECT MAX(Salary) FROM Employees);

-- Problem 5: Department wise highest salary
SELECT 
    d.DepartmentName,
    MAX(e.Salary) AS HighestSalary
FROM Employees e
INNER JOIN Departments d ON e.DepartmentID = d.DepartmentID
GROUP BY d.DepartmentName;

-- Problem 6: Employees without project assignments
SELECT 
    e.FirstName,
    e.LastName,
    e.JobTitle
FROM Employees e
LEFT JOIN ProjectAssignments pa ON e.EmployeeID = pa.EmployeeID
WHERE pa.AssignmentID IS NULL;

-- Problem 7: Find duplicate emails (if any)
SELECT Email, COUNT(*) AS Count
FROM Employees
GROUP BY Email
HAVING COUNT(*) > 1;

/*

Find all employees in IT department earning more than $80,000

List employees hired in 2019 with their department names

Find employees who are managers (appear in ManagerID column)

Get department names along with their employee count, ordered by count descending

Find projects that haven't been assigned to any employee

List all employees and their project assignments (if any), showing NULL for employees without assignments

Find the employee with the longest tenure in each department

*/

