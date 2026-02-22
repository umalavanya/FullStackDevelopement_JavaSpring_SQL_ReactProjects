CREATE DATABASE teachingPracticeDB ;
USE teachingPracticeDB ;


--Create Department table

CREATE TABLE Departments (
	DeptID INT PRIMARY KEY,
	DeptName VARCHAR(50) NOT NULL,
	Location VARCHAR(50)
) ;


CREATE TABLE Employees (
    EmpID INT PRIMARY KEY,
    EmpName VARCHAR(50),
    Gender VARCHAR(10),
    Salary DECIMAL(10,2),
    HireDate DATE,
    DeptID INT,
    FOREIGN KEY (DeptID) REFERENCES Departments(DeptID)
);

CREATE TABLE Projects (
    ProjectID INT PRIMARY KEY,
    ProjectName VARCHAR(50),
    Budget DECIMAL(12,2),
    DeptID INT,
    FOREIGN KEY (DeptID) REFERENCES Departments(DeptID)
);


---Insert Data into the tables --------------


INSERT INTO Departments VALUES
(1, 'HR', 'New York'),
(2, 'IT', 'Chicago'),
(3, 'Finance', 'Boston'),
(4, 'Marketing', 'Dallas');

INSERT INTO Employees VALUES
(101, 'John', 'Male', 50000, '2020-01-15', 2),
(102, 'Alice', 'Female', 60000, '2019-03-10', 1),
(103, 'Bob', 'Male', 45000, '2021-07-22', 3),
(104, 'David', 'Male', 70000, '2018-09-12', 2),
(105, 'Emma', 'Female', 55000, '2022-02-18', 4),
(106, 'Sophia', 'Female', 65000, '2017-11-05', 3),
(107, 'Michael', 'Male', 48000, '2023-01-20', 1);


INSERT INTO Projects VALUES
(1, 'Website Development', 200000, 2),
(2, 'Recruitment Drive', 50000, 1),
(3, 'Budget Analysis', 120000, 3),
(4, 'Product Launch', 150000, 4);


------------------ LEVEL 1 ----------------
--1. Show all Employees

SELECT * FROM Employees ;

--2.Display only employee names and salaries

SELECT 
	EmpName as EmployeeName,
	Salary 
FROM 
	Employees ;

--3. Show employees earning more than 50000


SELECT 
	EmpName as EmployeeName,
	Salary 
FROM 
	Employees 
WHERE 
    Salary > 50000 ;
--4. Show employees hired after 2020

SELECT 
	EmpName as EmployeeName,
	YEAR(HireDate) AS Year 
FROM 
	Employees 
WHERE 
	YEAR(HireDate) > 2020 ;

--5. Show employees working in Department ID = 2

SELECT * FROM Employees WHERE DeptID = 2 ;

--------------------------Level 2--------------------

--6. Show female employees
SELECT * FROM Employees ;
SELECT * FROM Employees WHERE Gender = 'Female';

--7. Show employees with salary between 45,000 and 65,000.

