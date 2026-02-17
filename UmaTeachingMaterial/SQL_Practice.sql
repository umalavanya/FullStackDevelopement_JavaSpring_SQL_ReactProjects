CREATE DATABASE teachingPracticeDB ;
USE teachingPracticeDB ;


--Create Department table

CREATE TABLE Departments (
	DeptID INT PRIMARY KEY,
	DeptName VARCHAR(50) NOT NULL,
	Location VARCHAR(50)
) ;