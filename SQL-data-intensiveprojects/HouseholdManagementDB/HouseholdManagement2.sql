--Step2: Core Tables

-- Household Members Table
CREATE TABLE Household.Members (
    MemberID INT IDENTITY(1,1) PRIMARY KEY,
    FirstName NVARCHAR(50) NOT NULL,
    LastName NVARCHAR(50) NOT NULL,
    Role NVARCHAR(50) NOT NULL, -- Dad, Mom, Child
    DateOfBirth DATE NOT NULL,
    Age AS DATEDIFF(YEAR, DateOfBirth, GETDATE()),
    CreatedDate DATETIME DEFAULT GETDATE(),
    IsActive BIT DEFAULT 1
);

-- Categories for Items
CREATE TABLE Inventory.Categories (
    CategoryID INT IDENTITY(1,1) PRIMARY KEY,
    CategoryName NVARCHAR(100) NOT NULL UNIQUE,
    ParentCategoryID INT NULL, -- For sub-categories
    Description NVARCHAR(500),
    FOREIGN KEY (ParentCategoryID) REFERENCES Inventory.Categories(CategoryID)
);

-- Storage Locations
CREATE TABLE Inventory.Locations (
    LocationID INT IDENTITY(1,1) PRIMARY KEY,
    LocationName NVARCHAR(100) NOT NULL UNIQUE,
    Room NVARCHAR(50) NOT NULL, -- Living Room, Kitchen, Bedroom, etc.
    Shelf NVARCHAR(50),
    Description NVARCHAR(500)
);

-- Household Items
CREATE TABLE Inventory.Items (
    ItemID INT IDENTITY(1,1) PRIMARY KEY,
    ItemName NVARCHAR(200) NOT NULL,
    CategoryID INT NOT NULL,
    LocationID INT NOT NULL,
    Quantity INT DEFAULT 1,
    Description NVARCHAR(1000),
    PurchaseDate DATE,
    ExpiryDate DATE NULL, -- For food items
    Value DECIMAL(10,2) NULL,
    OwnerMemberID INT NULL,
    CreatedDate DATETIME DEFAULT GETDATE(),
    LastUpdated DATETIME DEFAULT GETDATE(),
    FOREIGN KEY (CategoryID) REFERENCES Inventory.Categories(CategoryID),
    FOREIGN KEY (LocationID) REFERENCES Inventory.Locations(LocationID),
    FOREIGN KEY (OwnerMemberID) REFERENCES Household.Members(MemberID)
);

-- Grocery Management
CREATE TABLE Inventory.GroceryItems (
    GroceryID INT IDENTITY(1,1) PRIMARY KEY,
    ItemName NVARCHAR(200) NOT NULL,
    CategoryID INT NOT NULL,
    PreferredBrand NVARCHAR(100),
    UsualQuantity DECIMAL(10,2),
    Unit NVARCHAR(20), -- kg, liter, piece, etc.
    LastPurchasedDate DATE,
    LastPurchasedPrice DECIMAL(10,2),
    ReorderLevel INT DEFAULT 1,
    IsEssential BIT DEFAULT 1,
    Notes NVARCHAR(500),
    FOREIGN KEY (CategoryID) REFERENCES Inventory.Categories(CategoryID)
);

-- Shopping Lists
CREATE TABLE Inventory.ShoppingLists (
    ListID INT IDENTITY(1,1) PRIMARY KEY,
    ListName NVARCHAR(200) NOT NULL,
    CreatedByMemberID INT NOT NULL,
    CreatedDate DATETIME DEFAULT GETDATE(),
    IsCompleted BIT DEFAULT 0,
    CompletedDate DATETIME NULL,
    TotalBudget DECIMAL(10,2) NULL,
    ActualSpent DECIMAL(10,2) NULL,
    FOREIGN KEY (CreatedByMemberID) REFERENCES Household.Members(MemberID)
);

-- Shopping List Items
CREATE TABLE Inventory.ShoppingListItems (
    ListItemID INT IDENTITY(1,1) PRIMARY KEY,
    ListID INT NOT NULL,
    GroceryID INT NOT NULL,
    QuantityNeeded DECIMAL(10,2) NOT NULL,
    Priority INT DEFAULT 3, -- 1=High, 2=Medium, 3=Low
    IsPurchased BIT DEFAULT 0,
    EstimatedPrice DECIMAL(10,2) NULL,
    ActualPrice DECIMAL(10,2) NULL,
    Notes NVARCHAR(500),
    FOREIGN KEY (ListID) REFERENCES Inventory.ShoppingLists(ListID),
    FOREIGN KEY (GroceryID) REFERENCES Inventory.GroceryItems(GroceryID)
);