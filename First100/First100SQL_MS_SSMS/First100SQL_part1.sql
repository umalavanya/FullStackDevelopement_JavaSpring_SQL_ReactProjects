DROP DATABASE IF EXISTS CompanyDB ;
--------------------- First 100 SQL Part -1 ------------------
--Section1: Database & Table creation (1-15)
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



