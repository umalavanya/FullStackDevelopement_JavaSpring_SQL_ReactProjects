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


