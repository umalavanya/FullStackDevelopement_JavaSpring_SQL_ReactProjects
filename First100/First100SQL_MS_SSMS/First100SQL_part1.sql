DROP DATABASE IF EXISTS CompanyDB ;
--------------------- First 100 SQL Part -1 --------------
--===========================================
--Section1: Database & Table creation (1-15)
--===========================================
--Ex1. Create a database named CompanyDB

CREATE DATABASE CompanyDB ;

--Ex2. Use Database ;
USE CompanyDB ;

--Ex3.
/*
Create a table named Employees with columns:

EmployeeID (int, primary key, identity)
FirstName (nvarchar(50), not null)
LastName (nvarchar(50), not null)
Email (nvarchar(100), unique)
Phone (nvarchar(15))
HireDate (date, not null)
Salary (decimal(10,2))
DepartmentID (int)

*/

CREATE TABLE Employees(
EmployeeID INT PRIMARY KEY IDENTITY(1,1),
FirstName NVARCHAR(50) NOT NULL,
LastName NVARCHAR(50) NOT NULL,
Email NVARCHAR(100) UNIQUE,
Phone NVARCHAR(15), 
HireDate DATE NOT NULL,
Salary DECIMAL(10,2),
DepartmentID INT
) ;

--4. 
/*

Create a Departments table with:
DepartmentID (int, primary key, identity)
DepartmentName (nvarchar(100), not null, unique)
Location (nvarchar(100))

*/

CREATE TABLE Departments(
DepartmentID INT PRIMARY KEY IDENTITY(1,1),
DepartmentName NVARCHAR(100) NOT NULL UNIQUE,
Location NVARCHAR(300)
) ;

--5
/*
Add a foreign key constraint to Employees table referencing Departments(DepartmentID).
*/

ALTER TABLE Employees
ADD CONSTRAINT fk_Employees_departmentid
FOREIGN KEY(DepartmentID) REFERENCES Departments(DepartmentID) ;


--6. 
/*

Create a Projects table with:
ProjectID (int, primary key, identity)
ProjectName (nvarchar(100), not null)
StartDate (date)
EndDate (date)
Budget (decimal(15,2))
*/

CREATE TABLE Projects(
	ProjectID INT PRIMARY KEY IDENTITY(1,1),
	ProjectName NVARCHAR(100) NOT NULL,
	StartDate DATE,
	EndDate DATE,
	Budget DECIMAL(15,2)
);

--7. 
/*

Create a junction table EmployeeProjects to handle many-to-many relationship between Employees and Projects.

*/

CREATE TABLE EmployeeProjects(
EmployeeID INT,
ProjectID INT,
AssignmentDate DATE DEFAULT GETDATE(),
HoursWorked DECIMAL(5,2),
PRIMARY KEY(EmployeeID, ProjectID),
FOREIGN KEY (EmployeeID) REFERENCES Employees(EmployeeID),
FOREIGN KEY (ProjectID) REFERENCES Projects(ProjectID)
);

--8.
/*
Add a check constraint to ensure Salary is positive in Employees table.
*/

ALTER TABLE Employees
ADD CONSTRAINT con_check_Employees_Salary_positive
CHECK(Salary > 0) ;

--9.
/*
Add a default constraint to set HireDate as current date if not provided
*/

ALTER TABLE Employees
ADD CONSTRAINT con_df_Employees_HireDate
DEFAULT GETDATE() FOR HireDate ;

--10.
/*
Create  an index on LastName column in Employees table
*/

CREATE INDEX idx_Employees_LastName 
ON Employees(LastName) ;

--11.
/*
Insert 5 departments into Departments table.
*/

INSERT INTO Departments(DepartmentName, Location)
VALUES
('IT', 'New York'),
('HR', 'Chicago'),
('Finance', 'Boston'),
('Marketing', 'Los Angeles'),
('Sales', 'Miami');

--12.
/*
Insert 10 employees into Employees table with different departments
*/

INSERT INTO Employees (FirstName, LastName, Email, Phone, HireDate, Salary, DepartmentID)
VALUES
('John', 'Doe', 'john.doe@email.com', '123-456-7890', '2020-01-15', 60000, 1),
('Jane', 'Smith', 'jane.smith@email.com', '123-456-7891', '2019-03-22', 75000, 2),
('Bob', 'Johnson', 'bob.johnson@email.com', '123-456-7892', '2021-07-10', 55000, 3),
('Alice', 'Williams', 'alice.williams@email.com', '123-456-7893', '2018-11-05', 80000, 1),
('Charlie', 'Brown', 'charlie.brown@email.com', '123-456-7894', '2022-02-28', 48000, 4),
('Diana', 'Miller', 'diana.miller@email.com', '123-456-7895', '2020-09-14', 65000, 2),
('Evan', 'Davis', 'evan.davis@email.com', '123-456-7896', '2017-12-01', 90000, 3),
('Fiona', 'Garcia', 'fiona.garcia@email.com', '123-456-7897', '2021-04-18', 52000, 5),
('George', 'Martinez', 'george.martinez@email.com', '123-456-7898', '2019-08-30', 72000, 4),
('Helen', 'Lee', 'helen.lee@email.com', '123-456-7899', '2022-01-10', 58000, 1);


--13.
/*
Insert 5 projects into Projects table.
*/

INSERT INTO Projects (ProjectName, StartDate, EndDate, Budget)
VALUES
('Website Redesign', '2023-01-15', '2023-06-30', 50000),
('CRM Implementation', '2023-03-01', '2023-12-31', 150000),
('Mobile App Development', '2023-02-01', '2023-09-30', 80000),
('Data Migration', '2023-04-15', '2023-08-15', 40000),
('Security Upgrade', '2023-05-01', '2023-10-31', 60000);

--14. 
/*
Assign employees to projects in EmployeeProjects table.
*/
INSERT INTO EmployeeProjects (EmployeeID, ProjectID, HoursWorked)
VALUES
(1, 1, 120.5),
(1, 2, 80.0),
(2, 1, 95.0),
(3, 3, 150.0),
(4, 2, 200.0),
(5, 4, 75.5),
(6, 1, 110.0),
(7, 5, 180.0),
(8, 3, 90.0),
(9, 4, 125.0),
(10, 5, 140.0);


--15
/*
Add a new column ManagerID to Employees for self-referencing
*/

ALTER TABLE Employees
ADD ManagerID INT NULL ;

ALTER TABLE Employees
ADD CONSTRAINT FK_Employees_Manager
FOREIGN KEY(ManagerID) REFERENCES Employees(EmployeeID) ;

--===========================================
--Section 2: Basic SELECT Queries (Exercises 16-30)

--16.
/*
Select all columns from Employees table
*/

SELECT * FROM Employees ;

--17.
/*
Select only FirstName, LastName, and Salary from Employees.
*/

SELECT 
	FirstName,
	LastName,
	Salary
FROM 
	Employees ;

--18. 
/*
Select employees with salary greater than 60000.
*/

SELECT *
FROM Employees
WHERE Salary > 60000 ;


--19.
/*
Select employees hired after January 1, 2020.
*/
SELECT * FROM Employees
WHERE HireDate > '2020-01-01' ;

--20.
/*
Select employees whose last name starts with 'S'.
*/

SELECT * FROM Employees
WHERE LastName LIKE 'S%' ;

--21
/*
Select employees with salary between 50000 and 70000
*/

SELECT * FROM Employees 
WHERE Salary BETWEEN 50000 AND 70000 ;


--22.
/*
Select employees from IT department (DepartmentID = 1).
*/

SELECT * FROM Employees
WHERE DepartmentID = 1 ;

--23.
/*
Select distinct departments from Employees
*/

SELECT DISTINCT DepartmentID FROM Employees ;

--24.
/*
Select employees ordered by salary in descending order.
*/

SELECT * FROM Employees
ORDER BY Salary DESC ;

--25
/*
Select top 3 highest pain employees
*/

SELECT TOP 3 * FROM Employees
ORDER By Salary DESC ;

--26
/*
Select employees order by last name then first name
*/

SELECT * FROM Employees
ORDER BY LastName, FirstName ;


--27
/*
Select employees with email ending with '@email.com'
*/

SELECT * FROM Employees
WHERE Email LIKE '%@email.com' ;

--28.
/*
Select employees with the phone number containing '456'
*/

SELECT * FROM Employees
WHERE Phone LIKE '%456%' ;

--29.
/*
Select employees hired in the year 2021
*/

SELECT * FROM Employees
WHERE DATEPART(YEAR, HireDate) = 2021 ;


--30.
/*
Select employees with salary not equal to 60000
*/

SELECT * FROM Employees
WHERE NOT Salary = 60000 ;


--==========================================
--Section 3: Joins (Exercises 31-40)
--==========================================
