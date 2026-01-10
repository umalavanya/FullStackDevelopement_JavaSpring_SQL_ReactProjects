--Step9: Indexes for Performance

-- Create indexes for better performance
CREATE INDEX IX_Members_Role ON Household.Members(Role);
CREATE INDEX IX_Items_Category ON Inventory.Items(CategoryID);
CREATE INDEX IX_Items_Expiry ON Inventory.Items(ExpiryDate) WHERE ExpiryDate IS NOT NULL;
CREATE INDEX IX_Tasks_Status_DueDate ON Tasks.HouseholdTasks(Status, DueDate);
CREATE INDEX IX_Bills_Status_DueDate ON Finance.Bills(Status, DueDate);
CREATE INDEX IX_ShoppingLists_IsCompleted ON Inventory.ShoppingLists(IsCompleted);
CREATE INDEX IX_VehicleExpenses_Vehicle_Date ON Finance.VehicleExpenses(VehicleID, ExpenseDate);
CREATE INDEX IX_Documents_Expiry ON Inventory.ImportantDocuments(ExpiryDate) WHERE ExpiryDate IS NOT NULL;