/*
MusicStoreDB Exercises
Level 1: Beginner SQL Exercises (Basic SELECT, WHERE, JOIN)
Exercise 1.1: Basic Data Retrieval
sql
-- 1. List all customers (users) with their email and phone number
-- 2. Show all active products with their prices, sorted by price descending
-- 3. Display all orders placed in June 2023
-- 4. Find all products that cost more than $1000
-- 5. Show all categories and their parent categories (if any)
Exercise 1.2: Basic Filtering and Sorting
sql
-- 1. Find all electric guitars under $1000
-- 2. Show all pending orders (not shipped or delivered)
-- 3. Display all products that are currently on sale (IsOnSale = 1)
-- 4. Find all customers from California (State = 'CA')
-- 5. Show all product reviews with 4 or 5 star ratings
Exercise 1.3: Basic Joins
sql
-- 1. Show product names with their brand names
-- 2. Display orders with customer names and order dates
-- 3. Show all products in the "Guitars" category
-- 4. Display product reviews with product names and user emails
-- 5. Show inventory quantities with product names and warehouse locations
Level 2: Intermediate SQL Exercises (Aggregations, GROUP BY, Subqueries)
Exercise 2.1: Aggregate Functions
sql
-- 1. Calculate total sales amount for 2023
-- 2. Find average order value
-- 3. Count number of products per category
-- 4. Calculate total inventory value (sum of quantity * cost price)
-- 5. Find the most expensive product in each category
Exercise 2.2: GROUP BY and HAVING
sql
-- 1. Show total sales amount per month in 2023
-- 2. Find customers who have placed more than 2 orders
-- 3. Calculate average rating for each product (only include products with at least 3 reviews)
-- 4. Show total sales per product category
-- 5. Find warehouses with less than 50 total items in stock
Exercise 2.3: Subqueries and CTEs
sql
-- 1. Find products that have never been ordered
-- 2. Show customers who haven't placed any orders
-- 3. Find products with above-average prices
-- 4. Display the top 5 best-selling products by quantity
-- 5. Find orders where the total amount is greater than the customer's average order value
Level 3: Advanced SQL Exercises (Complex Joins, Window Functions, Performance)
Exercise 3.1: Complex Joins
sql
-- 1. Show complete order details including customer info, shipping address, and items
-- 2. Display products with their specifications, images, and current inventory
-- 3. Find orders that have returns, show return reasons and refund amounts
-- 4. Show purchase orders with supplier details and line items
-- 5. Display customer purchase history including all order items
Exercise 3.2: Window Functions
sql
-- 1. Rank products by sales within each category
-- 2. Calculate running total of sales by month
-- 3. Find the top 3 most expensive orders for each customer
-- 4. Compare each product's price to the average price in its category
-- 5. Number each order per customer (1st order, 2nd order, etc.)
Exercise 3.3: Performance and Optimization
sql
-- 1. Create a view showing product availability across all warehouses
-- 2. Write a stored procedure to get customer's order history
-- 3. Create an index to optimize searching products by name and category
-- 4. Write a trigger to update inventory when an order is shipped
-- 5. Create a materialized view for monthly sales reports
Level 4: Business Intelligence Exercises (Analytics, Reports)
Exercise 4.1: Sales Analytics
sql
-- 1. Calculate month-over-month sales growth percentage
-- 2. Find customer lifetime value (total spent per customer)
-- 3. Calculate customer retention rate (customers who ordered in consecutive months)
-- 4. Identify top 10% of customers by purchase value
-- 5. Calculate average days between customer orders
Exercise 4.2: Inventory Analytics
sql
-- 1. Identify slow-moving products (products with no sales in last 90 days)
-- 2. Calculate inventory turnover ratio for each product
-- 3. Find products that need reordering (quantity below reorder point)
-- 4. Calculate days of supply for each product
-- 5. Identify dead stock (products with no sales and high inventory)
Exercise 4.3: Customer Analytics
sql
-- 1. Segment customers by purchase frequency (active, occasional, inactive)
-- 2. Calculate customer acquisition cost (if you had marketing cost data)
-- 3. Identify customers at risk of churning (no purchases in 60+ days)
-- 4. Find products frequently bought together
-- 5. Calculate average customer lifespan
Level 5: Real-World Business Scenarios
Exercise 5.1: Operational Reports
sql
-- 1. Generate daily sales report for store managers
-- 2. Create inventory alert report for warehouse managers
-- 3. Generate commission report for sales staff
-- 4. Create supplier performance report (delivery times, quality)
-- 5. Generate customer service report (returns, complaints)
Exercise 5.2: Marketing Analysis
sql
-- 1. Analyze effectiveness of discount codes
-- 2. Identify best-selling product combinations for bundles
-- 3. Calculate customer lifetime value by acquisition source
-- 4. Analyze seasonality in product sales
-- 5. Identify up-sell and cross-sell opportunities
Exercise 5.3: Financial Analysis
sql
-- 1. Calculate gross profit margin per product
-- 2. Analyze return rates and reasons
-- 3. Calculate inventory carrying costs
-- 4. Analyze payment method preferences and costs
-- 5. Calculate shipping cost as percentage of sales
Level 6: Database Management & Optimization
Exercise 6.1: Database Design
sql
-- 1. Normalize the product specifications table further
-- 2. Design a table for product bundles/packages
-- 3. Create a table for customer loyalty points
-- 4. Design a table for scheduled price changes
-- 5. Create a table for product rental/lease options
Exercise 6.2: Performance Tuning
sql
-- 1. Analyze query performance using execution plans
-- 2. Create appropriate indexes for frequently queried columns
-- 3. Implement partitioning for the orders table by year
-- 4. Optimize the sales report query
-- 5. Implement query caching strategies
Exercise 6.3: Data Integrity & Security
sql
-- 1. Create check constraints for business rules
-- 2. Implement audit triggers for sensitive tables
-- 3. Create stored procedures for data modification
-- 4. Design user role-based access control
-- 5. Implement data encryption for sensitive information
Challenge Exercises (Mix of All Levels)
Challenge 1: Complete Business Dashboard
sql
-- Create a comprehensive dashboard query that shows:
-- 1. Today's sales
-- 2. Current month vs previous month growth
-- 3. Top 5 selling products
-- 4. Low stock alerts
-- 5. Recent customer reviews
-- 6. Pending orders
-- 7. Returns waiting for processing
Challenge 2: Predictive Analysis
sql
-- Using historical data, try to predict:
-- 1. Which products will need restocking next month
-- 2. Expected sales for the upcoming holiday season
-- 3. Customers likely to make another purchase soon
-- 4. Products that may become best-sellers
-- 5. Optimal discount rates for clearance items
Challenge 3: Data Migration & Integration
sql
-- 1. Import new product data from a CSV file
-- 2. Merge duplicate customer records
-- 3. Update prices based on supplier cost increases
-- 4. Archive old orders (older than 2 years)
-- 5. Sync inventory with physical count results
Practical Application Exercises
Exercise A: Customer Support Scenario
sql
-- A customer calls saying their order hasn't arrived.
-- Write queries to:
-- 1. Find the customer's order details
-- 2. Check order status and shipping information
-- 3. Look up tracking information
-- 4. Check if there were any delays or issues
-- 5. Find similar cases for pattern recognition
Exercise B: Inventory Management Scenario
sql
-- The warehouse manager needs to prepare for holiday season.
-- Write queries to:
-- 1. Identify top-selling products from last holiday season
-- 2. Check current stock levels
-- 3. Calculate required safety stock
-- 4. Generate purchase order suggestions
-- 5. Optimize warehouse layout based on sales velocity
Exercise C: Marketing Campaign Scenario
sql
-- Planning a back-to-school promotion for music students.
-- Write queries to:
-- 1. Identify student customers
-- 2. Find popular products among students
-- 3. Analyze previous promotion performance
-- 4. Calculate expected response rate
-- 5. Estimate campaign ROI
Solutions Framework (Structure - Not Actual Solutions)
sql
-- Example solution structure for Exercise 1.1, Question 1:
/*
SELECT 
    UserID,
    FirstName + ' ' + LastName AS FullName,
    Email,
    Phone,
    CreatedAt AS MemberSince
FROM Users 
WHERE RoleID = (SELECT RoleID FROM UserRoles WHERE RoleName = 'Customer')
ORDER BY CreatedAt DESC;
*/

-- Example solution structure for Exercise 2.1, Question 1:
/*
SELECT 
    SUM(TotalAmount) AS TotalSales2023
FROM Orders 
WHERE YEAR(OrderDate) = 2023 
    AND OrderStatus NOT IN ('Cancelled', 'Returned');
*/

-- Example solution structure for Exercise 3.2, Question 1:
/*
WITH ProductSales AS (
    SELECT 
        p.ProductID,
        p.ProductName,
        c.CategoryName,
        SUM(oi.Quantity * oi.UnitPrice) AS TotalSales,
        RANK() OVER (PARTITION BY c.CategoryID ORDER BY SUM(oi.Quantity * oi.UnitPrice) DESC) AS SalesRank
    FROM Products p
    JOIN Categories c ON p.CategoryID = c.CategoryID
    JOIN OrderItems oi ON p.ProductID = oi.ProductID
    JOIN Orders o ON oi.OrderID = o.OrderID
    WHERE o.OrderStatus NOT IN ('Cancelled', 'Returned')
    GROUP BY p.ProductID, p.ProductName, c.CategoryName, c.CategoryID
)
SELECT * FROM ProductSales WHERE SalesRank <= 5;
*/
Learning Objectives Checklist
For each exercise, students should be able to:

Write correct SQL syntax

Use appropriate JOIN types

Apply WHERE conditions correctly

Implement GROUP BY and aggregation

Write efficient subqueries

Use window functions when needed

Optimize query performance

Interpret business requirements

Present results clearly

Validate data accuracy

Additional Practice Ideas
Create Your Own Exercises: Based on the database schema, create 5 new exercises

Performance Benchmarking: Time your queries and try to optimize them

Data Visualization: Export query results and create charts in Excel/Power BI

Presentation Practice: Present your findings as if to a business stakeholder

Peer Review: Exchange solutions with classmates and provide feedback

Tips for Success
Start Simple: Begin with basic SELECT statements before complex joins

Test Incrementally: Build queries step by step, testing each addition

Use Comments: Document your thought process with comments

Check Data Types: Ensure you're comparing compatible data types

Validate Results: Do sanity checks - do the numbers make sense?

Optimize Last: Get it working correctly first, then optimize for performance

Learn from Errors: SQL errors are learning opportunities - understand what went wrong
*/