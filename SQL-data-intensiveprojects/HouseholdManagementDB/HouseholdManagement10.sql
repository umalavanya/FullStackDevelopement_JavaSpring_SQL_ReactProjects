--step10 -Sample queries for common operations
-- Query 1: Get all items by category
SELECT 
    c.CategoryName,
    i.ItemName,
    i.Quantity,
    l.LocationName,
    m.FirstName + ' ' + m.LastName AS Owner
FROM Inventory.Items i
INNER JOIN Inventory.Categories c ON i.CategoryID = c.CategoryID
INNER JOIN Inventory.Locations l ON i.LocationID = l.LocationID
LEFT JOIN Household.Members m ON i.OwnerMemberID = m.MemberID
ORDER BY c.CategoryName, i.ItemName;

-- Query 2: Monthly expense summary
SELECT 
    DATENAME(MONTH, b.BillingMonth) + ' ' + DATENAME(YEAR, b.BillingMonth) AS MonthYear,
    SUM(b.AmountPaid) AS TotalPaid,
    COUNT(*) AS NumberOfBills
FROM Finance.Bills b
WHERE b.Status = 'Paid'
    AND YEAR(b.BillingMonth) = YEAR(GETDATE())
GROUP BY b.BillingMonth
ORDER BY b.BillingMonth;

-- Query 3: Family member task load
SELECT 
    m.FirstName + ' ' + m.LastName AS MemberName,
    COUNT(ht.TaskID) AS TotalTasks,
    SUM(CASE WHEN ht.Status = 'Pending' THEN 1 ELSE 0 END) AS PendingTasks,
    SUM(CASE WHEN ht.Status = 'Completed' THEN 1 ELSE 0 END) AS CompletedTasks
FROM Household.Members m
LEFT JOIN Tasks.HouseholdTasks ht ON m.MemberID = ht.AssignedToMemberID
WHERE m.IsActive = 1
GROUP BY m.MemberID, m.FirstName, m.LastName
ORDER BY m.Role;

-- Query 4: Low inventory items
SELECT 
    gi.ItemName,
    gi.UsualQuantity,
    gi.Unit,
    gi.ReorderLevel,
    sli.QuantityNeeded AS InShoppingList,
    DATEDIFF(DAY, gi.LastPurchasedDate, GETDATE()) AS DaysSinceLastPurchase
FROM Inventory.GroceryItems gi
LEFT JOIN Inventory.ShoppingListItems sli ON gi.GroceryID = sli.GroceryID
    AND sli.IsPurchased = 0
WHERE gi.IsEssential = 1
ORDER BY gi.LastPurchasedDate;

-- Query 5: Vehicle maintenance schedule
SELECT 
    v.Make + ' ' + v.Model AS Vehicle,
    v.CurrentMileage,
    v.NextServiceDue,
    v.NextServiceDue - v.CurrentMileage AS MilesUntilService,
    v.LastServiceDate,
    DATEADD(MONTH, 6, v.LastServiceDate) AS NextServiceByDate
FROM Finance.Vehicles v
WHERE v.LastServiceDate IS NOT NULL;