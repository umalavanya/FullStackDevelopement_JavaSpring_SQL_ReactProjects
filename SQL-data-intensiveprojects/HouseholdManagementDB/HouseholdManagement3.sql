--Step3: Finance Management Tables

-- Monthly Bills
CREATE TABLE Finance.BillTypes (
    BillTypeID INT IDENTITY(1,1) PRIMARY KEY,
    BillName NVARCHAR(100) NOT NULL UNIQUE,
    PaymentFrequency NVARCHAR(20) DEFAULT 'Monthly', -- Monthly, Quarterly, Yearly
    DueDay INT, -- Day of month when due
    AverageAmount DECIMAL(10,2),
    IsRecurring BIT DEFAULT 1
);

CREATE TABLE Finance.Bills (
    BillID INT IDENTITY(1,1) PRIMARY KEY,
    BillTypeID INT NOT NULL,
    BillingMonth DATE NOT NULL, -- First day of the billing month
    AmountDue DECIMAL(10,2) NOT NULL,
    AmountPaid DECIMAL(10,2) NULL,
    DueDate DATE NOT NULL,
    PaidDate DATE NULL,
    PaidByMemberID INT NULL,
    PaymentMethod NVARCHAR(50),
    Status NVARCHAR(20) DEFAULT 'Pending', -- Pending, Paid, Overdue
    Notes NVARCHAR(500),
    FOREIGN KEY (BillTypeID) REFERENCES Finance.BillTypes(BillTypeID),
    FOREIGN KEY (PaidByMemberID) REFERENCES Household.Members(MemberID)
);

-- Car Management
CREATE TABLE Finance.Vehicles (
    VehicleID INT IDENTITY(1,1) PRIMARY KEY,
    Make NVARCHAR(50) NOT NULL,
    Model NVARCHAR(50) NOT NULL,
    Year INT NOT NULL,
    LicensePlate NVARCHAR(20) UNIQUE,
    OwnerMemberID INT NOT NULL,
    PurchaseDate DATE,
    PurchasePrice DECIMAL(10,2),
    CurrentMileage INT,
    LastServiceDate DATE,
    NextServiceDue INT, -- Mileage for next service
    InsurancePolicyNumber NVARCHAR(100),
    InsuranceExpiry DATE,
    FOREIGN KEY (OwnerMemberID) REFERENCES Household.Members(MemberID)
);

-- Vehicle Expenses
CREATE TABLE Finance.VehicleExpenses (
    ExpenseID INT IDENTITY(1,1) PRIMARY KEY,
    VehicleID INT NOT NULL,
    ExpenseDate DATE NOT NULL,
    ExpenseType NVARCHAR(50) NOT NULL, -- Fuel, Service, Repair, Insurance, Tax
    Amount DECIMAL(10,2) NOT NULL,
    OdometerReading INT NULL,
    Description NVARCHAR(500),
    ReceiptImagePath NVARCHAR(500),
    PaidByMemberID INT NULL,
    FOREIGN KEY (VehicleID) REFERENCES Finance.Vehicles(VehicleID),
    FOREIGN KEY (PaidByMemberID) REFERENCES Household.Members(MemberID)
);

-- Monthly Budget
CREATE TABLE Finance.BudgetCategories (
    BudgetCategoryID INT IDENTITY(1,1) PRIMARY KEY,
    CategoryName NVARCHAR(100) NOT NULL UNIQUE,
    Description NVARCHAR(500)
);

CREATE TABLE Finance.MonthlyBudget (
    BudgetID INT IDENTITY(1,1) PRIMARY KEY,
    BudgetMonth DATE NOT NULL, -- First day of month
    BudgetCategoryID INT NOT NULL,
    AllocatedAmount DECIMAL(10,2) NOT NULL,
    SpentAmount DECIMAL(10,2) DEFAULT 0,
    Notes NVARCHAR(500),
    FOREIGN KEY (BudgetCategoryID) REFERENCES Finance.BudgetCategories(BudgetCategoryID)
);