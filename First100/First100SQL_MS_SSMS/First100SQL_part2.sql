-------------- 100 Questions ans answers -------------

------------------  Set up the database ---------------
CREATE DATABASE SQLMastery;
GO
USE SQLMastery;
GO


----------------- Customers Table ----------------
CREATE TABLE Customers (
    CustomerID INT PRIMARY KEY,
    CustomerName VARCHAR(50),
    City VARCHAR(50),
    Email VARCHAR(100),
    CreatedDate DATE
);

INSERT INTO Customers VALUES
(1, 'Ravi', 'Hyderabad', 'ravi@gmail.com', '2023-01-10'),
(2, 'Anita', 'Bangalore', 'anita@gmail.com', '2023-02-15'),
(3, 'John', 'New York', 'john@gmail.com', '2023-03-01'),
(4, 'Sara', 'London', 'sara@gmail.com', '2023-01-25'),
(5, 'Kiran', 'Hyderabad', 'kiran@gmail.com', '2023-04-10');

------------------- Products Table -----------------
CREATE TABLE Products (
    ProductID INT PRIMARY KEY,
    ProductName VARCHAR(50),
    Category VARCHAR(50),
    Price DECIMAL(10,2)
);

INSERT INTO Products VALUES
(101, 'Laptop', 'Electronics', 75000),
(102, 'Mobile', 'Electronics', 40000),
(103, 'Headphones', 'Accessories', 2000),
(104, 'Keyboard', 'Accessories', 1500),
(105, 'Monitor', 'Electronics', 12000);

---------------------- Orders Table ------------------
CREATE TABLE Orders (
    OrderID INT PRIMARY KEY,
    CustomerID INT,
    OrderDate DATE,
    FOREIGN KEY (CustomerID) REFERENCES Customers(CustomerID)
);

INSERT INTO Orders VALUES
(1001, 1, '2023-05-01'),
(1002, 2, '2023-05-03'),
(1003, 1, '2023-05-10'),
(1004, 3, '2023-06-01'),
(1005, 5, '2023-06-05');

------------------------- OrderDetails Table --------------------
CREATE TABLE OrderDetails (
    OrderDetailID INT PRIMARY KEY,
    OrderID INT,
    ProductID INT,
    Quantity INT,
    FOREIGN KEY (OrderID) REFERENCES Orders(OrderID),
    FOREIGN KEY (ProductID) REFERENCES Products(ProductID)
);

INSERT INTO OrderDetails VALUES
(1, 1001, 101, 1),
(2, 1001, 103, 2),
(3, 1002, 102, 1),
(4, 1003, 104, 1),
(5, 1003, 105, 2),
(6, 1004, 101, 1),
(7, 1005, 103, 3);

-------------- Employees Table -------------------
CREATE TABLE Employees (
    EmpID INT PRIMARY KEY,
    EmpName VARCHAR(50),
    ManagerID INT,
    Department VARCHAR(50),
    Salary INT
);

INSERT INTO Employees VALUES
(1, 'CEO', NULL, 'Management', 200000),
(2, 'Manager1', 1, 'IT', 120000),
(3, 'Manager2', 1, 'HR', 110000),
(4, 'Dev1', 2, 'IT', 80000),
(5, 'Dev2', 2, 'IT', 85000),
(6, 'HR1', 3, 'HR', 70000);

---------------------------------------------------------

--1. Display all customers from Hyderabad

SELECT
	CustomerID,
	CustomerName,
	City,
	Email,
	CreatedDate	
FROM 
	Customers 
WHERE 
	City  = 'Hyderabad' ;


-- 2. List all products priced above Rs 10,000/-

SELECT 
	ProductID,
	ProductName,
	Category,
	Price
FROM	
	Products
WHERE 
	Price > 10000 ;

--3. Find all orders placed in May 2023

SELECT
	OrderID,
	CustomerID,
	OrderDate
FROM 
	Orders
WHERE 
	OrderDate BETWEEN '2023-05-01' AND '2023-05-31';


--4. Count total number of customers

SELECT 
	COUNT(*) AS Total_customers
FROM 
	Customers ;

--5. Show product name and price sorted by price descending

SELECT 
	ProductName,
	Price
FROM 
	Products
ORDER BY Price DESC ;

--6. Show CustomerName, OrderID, OrderDate

SELECT 
	c.CustomerName,
	o.OrderID,
	o.OrderDate
FROM Customers c
INNER JOIN Orders o ON c.CustomerID = o.CustomerID ;

--7. List All products ordered with total quatity sold

SELECT
	p.ProductName,
	SUM(od.Quantity) AS TotalQuantitySold
FROM
	Products p
INNER JOIN OrderDetails od
	ON p.ProductID = od.ProductID
GROUP BY p.ProductName ;

--8. Find total amount spent for customer



