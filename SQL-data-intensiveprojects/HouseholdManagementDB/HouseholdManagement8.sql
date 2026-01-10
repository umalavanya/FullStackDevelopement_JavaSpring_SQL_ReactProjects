--Step8: Stored procedures

-- Procedure to add grocery to shopping list
CREATE PROCEDURE Inventory.sp_AddToShoppingList
    @ListID INT,
    @GroceryID INT,
    @QuantityNeeded DECIMAL(10,2) = 1,
    @Priority INT = 3,
    @Notes NVARCHAR(500) = NULL
AS
BEGIN
    SET NOCOUNT ON;
    
    INSERT INTO Inventory.ShoppingListItems (ListID, GroceryID, QuantityNeeded, Priority, Notes)
    VALUES (@ListID, @GroceryID, @QuantityNeeded, @Priority, @Notes);
    
    UPDATE Inventory.GroceryItems
    SET LastPurchasedDate = GETDATE()
    WHERE GroceryID = @GroceryID;
END;
GO

-- Procedure to mark bill as paid
CREATE PROCEDURE Finance.sp_MarkBillPaid
    @BillID INT,
    @AmountPaid DECIMAL(10,2),
    @PaidDate DATE,
    @PaidByMemberID INT,
    @PaymentMethod NVARCHAR(50)
AS
BEGIN
    SET NOCOUNT ON;
    
    UPDATE Finance.Bills
    SET 
        AmountPaid = @AmountPaid,
        PaidDate = @PaidDate,
        PaidByMemberID = @PaidByMemberID,
        PaymentMethod = @PaymentMethod,
        Status = 'Paid'
    WHERE BillID = @BillID;
END;
GO

-- Procedure to create recurring tasks
CREATE PROCEDURE Tasks.sp_CreateRecurringTask
    @TaskTitle NVARCHAR(200),
    @Description NVARCHAR(1000),
    @TaskCategoryID INT,
    @AssignedToMemberID INT,
    @CreatedByMemberID INT,
    @DueDate DATE,
    @Priority INT = 3,
    @RecurrencePattern NVARCHAR(50),
    @EstimatedDurationMinutes INT = NULL
AS
BEGIN
    SET NOCOUNT ON;
    
    INSERT INTO Tasks.HouseholdTasks (
        TaskTitle, Description, TaskCategoryID, AssignedToMemberID, 
        CreatedByMemberID, DueDate, Priority, RecurrencePattern, 
        EstimatedDurationMinutes, Status
    )
    VALUES (
        @TaskTitle, @Description, @TaskCategoryID, @AssignedToMemberID,
        @CreatedByMemberID, @DueDate, @Priority, @RecurrencePattern,
        @EstimatedDurationMinutes, 'Pending'
    );
END;
GO

-- Procedure to generate monthly bills
CREATE PROCEDURE Finance.sp_GenerateMonthlyBills
    @BillingMonth DATE
AS
BEGIN
    SET NOCOUNT ON;
    
    DECLARE @DueDate DATE;
    
    INSERT INTO Finance.Bills (BillTypeID, BillingMonth, AmountDue, DueDate, Status)
    SELECT 
        BillTypeID,
        @BillingMonth,
        AverageAmount,
        DATEADD(DAY, DueDay - 1, @BillingMonth) AS DueDate,
        'Pending'
    FROM Finance.BillTypes
    WHERE PaymentFrequency = 'Monthly'
        AND IsRecurring = 1;
END;
GO