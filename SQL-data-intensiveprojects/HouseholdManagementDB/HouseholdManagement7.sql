--Step7-- Views for common queries

-- View for Current Month Bills
CREATE VIEW Finance.vw_CurrentMonthBills AS
SELECT 
    bt.BillName,
    b.BillingMonth,
    b.AmountDue,
    b.DueDate,
    b.Status,
    m.FirstName + ' ' + m.LastName AS PaidBy,
    b.PaidDate
FROM Finance.Bills b
INNER JOIN Finance.BillTypes bt ON b.BillTypeID = bt.BillTypeID
LEFT JOIN Household.Members m ON b.PaidByMemberID = m.MemberID
WHERE YEAR(b.BillingMonth) = YEAR(GETDATE())
    AND MONTH(b.BillingMonth) = MONTH(GETDATE());

-- View for Active Shopping List
CREATE VIEW Inventory.vw_ActiveShoppingList AS
SELECT 
    sl.ListName,
    gi.ItemName,
    sli.QuantityNeeded,
    gi.Unit,
    sli.Priority,
    gi.PreferredBrand,
    sli.EstimatedPrice
FROM Inventory.ShoppingListItems sli
INNER JOIN Inventory.ShoppingLists sl ON sli.ListID = sl.ListID
INNER JOIN Inventory.GroceryItems gi ON sli.GroceryID = gi.GroceryID
WHERE sl.IsCompleted = 0
    AND sli.IsPurchased = 0;

-- View for Expiring Items
CREATE VIEW Inventory.vw_ExpiringItems AS
SELECT 
    i.ItemName,
    c.CategoryName,
    i.ExpiryDate,
    DATEDIFF(DAY, GETDATE(), i.ExpiryDate) AS DaysUntilExpiry,
    l.LocationName
FROM Inventory.Items i
INNER JOIN Inventory.Categories c ON i.CategoryID = c.CategoryID
INNER JOIN Inventory.Locations l ON i.LocationID = l.LocationID
WHERE i.ExpiryDate IS NOT NULL
    AND i.ExpiryDate <= DATEADD(DAY, 30, GETDATE())
ORDER BY i.ExpiryDate;

-- View for Pending Tasks by Member
CREATE VIEW Tasks.vw_PendingTasksByMember AS
SELECT 
    m.FirstName + ' ' + m.LastName AS MemberName,
    m.Role,
    ht.TaskTitle,
    tc.CategoryName,
    ht.DueDate,
    ht.Priority,
    DATEDIFF(DAY, GETDATE(), ht.DueDate) AS DaysUntilDue
FROM Tasks.HouseholdTasks ht
INNER JOIN Household.Members m ON ht.AssignedToMemberID = m.MemberID
INNER JOIN Tasks.TaskCategories tc ON ht.TaskCategoryID = tc.TaskCategoryID
WHERE ht.Status IN ('Pending', 'In Progress')
    AND ht.DueDate >= GETDATE()
ORDER BY ht.Priority, ht.DueDate;