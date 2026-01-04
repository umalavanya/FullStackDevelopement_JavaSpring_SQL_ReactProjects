-- =============================================
-- Musical Instruments E-Commerce Database Schema
-- =============================================

-- Create the database
CREATE DATABASE MusicStoreDB;
GO

USE MusicStoreDB;
GO

-- =============================================
-- 1. USER MANAGEMENT TABLES
-- =============================================

-- User roles table
CREATE TABLE UserRoles (
    RoleID INT IDENTITY(1,1) PRIMARY KEY,
    RoleName NVARCHAR(50) NOT NULL UNIQUE,
    RoleDescription NVARCHAR(255),
    Permissions NVARCHAR(MAX),
    CreatedAt DATETIME DEFAULT GETDATE(),
    IsActive BIT DEFAULT 1
);

-- Users table
CREATE TABLE Users (
    UserID INT IDENTITY(1,1) PRIMARY KEY,
    Username NVARCHAR(50) NOT NULL UNIQUE,
    Email NVARCHAR(100) NOT NULL UNIQUE,
    PasswordHash NVARCHAR(255) NOT NULL,
    FirstName NVARCHAR(50) NOT NULL,
    LastName NVARCHAR(50) NOT NULL,
    Phone NVARCHAR(20),
    DateOfBirth DATE,
    ProfileImageURL NVARCHAR(255),
    RoleID INT NOT NULL,
    IsEmailVerified BIT DEFAULT 0,
    IsActive BIT DEFAULT 1,
    CreatedAt DATETIME DEFAULT GETDATE(),
    LastLogin DATETIME,
    LastPasswordChange DATETIME,
    FailedLoginAttempts INT DEFAULT 0,
    AccountLockedUntil DATETIME,
    FOREIGN KEY (RoleID) REFERENCES UserRoles(RoleID)
);

-- User addresses
CREATE TABLE UserAddresses (
    AddressID INT IDENTITY(1,1) PRIMARY KEY,
    UserID INT NOT NULL,
    AddressType NVARCHAR(20) CHECK (AddressType IN ('Home', 'Work', 'Billing', 'Shipping')),
    StreetAddress NVARCHAR(255) NOT NULL,
    City NVARCHAR(100) NOT NULL,
    State NVARCHAR(100),
    Country NVARCHAR(100) NOT NULL,
    PostalCode NVARCHAR(20) NOT NULL,
    IsDefault BIT DEFAULT 0,
    CreatedAt DATETIME DEFAULT GETDATE(),
    FOREIGN KEY (UserID) REFERENCES Users(UserID) ON DELETE CASCADE
);

-- User payment methods
CREATE TABLE UserPaymentMethods (
    PaymentMethodID INT IDENTITY(1,1) PRIMARY KEY,
    UserID INT NOT NULL,
    PaymentType NVARCHAR(20) CHECK (PaymentType IN ('Credit Card', 'Debit Card', 'PayPal', 'Bank Transfer', 'COD')),
    CardNumber NVARCHAR(20),
    CardHolderName NVARCHAR(100),
    ExpiryMonth INT,
    ExpiryYear INT,
    CVV NVARCHAR(4),
    PayPalEmail NVARCHAR(100),
    IsDefault BIT DEFAULT 0,
    IsActive BIT DEFAULT 1,
    CreatedAt DATETIME DEFAULT GETDATE(),
    FOREIGN KEY (UserID) REFERENCES Users(UserID) ON DELETE CASCADE
);

-- =============================================
-- 2. PRODUCT CATALOG TABLES
-- =============================================

-- Product categories
CREATE TABLE Categories (
    CategoryID INT IDENTITY(1,1) PRIMARY KEY,
    CategoryName NVARCHAR(100) NOT NULL UNIQUE,
    CategoryDescription NVARCHAR(MAX),
    ParentCategoryID INT NULL,
    CategoryImageURL NVARCHAR(255),
    DisplayOrder INT DEFAULT 0,
    IsActive BIT DEFAULT 1,
    CreatedAt DATETIME DEFAULT GETDATE(),
    FOREIGN KEY (ParentCategoryID) REFERENCES Categories(CategoryID)
);

-- Product brands
CREATE TABLE Brands (
    BrandID INT IDENTITY(1,1) PRIMARY KEY,
    BrandName NVARCHAR(100) NOT NULL UNIQUE,
    BrandDescription NVARCHAR(MAX),
    BrandLogoURL NVARCHAR(255),
    CountryOfOrigin NVARCHAR(100),
    YearFounded INT,
    WebsiteURL NVARCHAR(255),
    IsActive BIT DEFAULT 1,
    CreatedAt DATETIME DEFAULT GETDATE()
);

-- Products table
CREATE TABLE Products (
    ProductID INT IDENTITY(1,1) PRIMARY KEY,
    SKU NVARCHAR(50) NOT NULL UNIQUE,
    ProductName NVARCHAR(200) NOT NULL,
    ProductDescription NVARCHAR(MAX),
    CategoryID INT NOT NULL,
    BrandID INT NOT NULL,
    ProductType NVARCHAR(50) CHECK (ProductType IN ('Acoustic', 'Electric', 'Digital', 'Accessory', 'Sheet Music', 'Equipment')),
    UnitPrice DECIMAL(10,2) NOT NULL,
    CostPrice DECIMAL(10,2),
    MSRP DECIMAL(10,2),
    Weight DECIMAL(8,2),
    Dimensions NVARCHAR(100),
    Color NVARCHAR(50),
    Material NVARCHAR(100),
    WarrantyPeriod INT, -- in months
    IsActive BIT DEFAULT 1,
    IsFeatured BIT DEFAULT 0,
    IsNewArrival BIT DEFAULT 0,
    IsOnSale BIT DEFAULT 0,
    CreatedAt DATETIME DEFAULT GETDATE(),
    UpdatedAt DATETIME DEFAULT GETDATE(),
    FOREIGN KEY (CategoryID) REFERENCES Categories(CategoryID),
    FOREIGN KEY (BrandID) REFERENCES Brands(BrandID)
);

-- Product specifications
CREATE TABLE ProductSpecifications (
    SpecificationID INT IDENTITY(1,1) PRIMARY KEY,
    ProductID INT NOT NULL,
    SpecificationKey NVARCHAR(100) NOT NULL,
    SpecificationValue NVARCHAR(MAX) NOT NULL,
    DisplayOrder INT DEFAULT 0,
    FOREIGN KEY (ProductID) REFERENCES Products(ProductID) ON DELETE CASCADE
);

-- Product images
CREATE TABLE ProductImages (
    ImageID INT IDENTITY(1,1) PRIMARY KEY,
    ProductID INT NOT NULL,
    ImageURL NVARCHAR(255) NOT NULL,
    ImageType NVARCHAR(20) CHECK (ImageType IN ('Main', 'Gallery', 'Thumbnail', 'Zoom')),
    DisplayOrder INT DEFAULT 0,
    AltText NVARCHAR(255),
    IsActive BIT DEFAULT 1,
    CreatedAt DATETIME DEFAULT GETDATE(),
    FOREIGN KEY (ProductID) REFERENCES Products(ProductID) ON DELETE CASCADE
);

-- Product reviews
CREATE TABLE ProductReviews (
    ReviewID INT IDENTITY(1,1) PRIMARY KEY,
    ProductID INT NOT NULL,
    UserID INT NOT NULL,
    Rating INT NOT NULL CHECK (Rating BETWEEN 1 AND 5),
    ReviewTitle NVARCHAR(200),
    ReviewText NVARCHAR(MAX),
    IsVerifiedPurchase BIT DEFAULT 0,
    IsApproved BIT DEFAULT 1,
    HelpfulCount INT DEFAULT 0,
    UnhelpfulCount INT DEFAULT 0,
    CreatedAt DATETIME DEFAULT GETDATE(),
    UpdatedAt DATETIME DEFAULT GETDATE(),
    FOREIGN KEY (ProductID) REFERENCES Products(ProductID),
    FOREIGN KEY (UserID) REFERENCES Users(UserID)
);

-- Product variations (for different models/versions)
CREATE TABLE ProductVariations (
    VariationID INT IDENTITY(1,1) PRIMARY KEY,
    ProductID INT NOT NULL,
    VariationName NVARCHAR(100) NOT NULL,
    SKU NVARCHAR(50) NOT NULL UNIQUE,
    PriceAdjustment DECIMAL(10,2) DEFAULT 0,
    StockQuantity INT DEFAULT 0,
    IsActive BIT DEFAULT 1,
    FOREIGN KEY (ProductID) REFERENCES Products(ProductID) ON DELETE CASCADE
);

-- =============================================
-- 3. INVENTORY MANAGEMENT TABLES
-- =============================================

-- Warehouses
CREATE TABLE Warehouses (
    WarehouseID INT IDENTITY(1,1) PRIMARY KEY,
    WarehouseName NVARCHAR(100) NOT NULL UNIQUE,
    Address NVARCHAR(255) NOT NULL,
    City NVARCHAR(100) NOT NULL,
    State NVARCHAR(100),
    Country NVARCHAR(100) NOT NULL,
    PostalCode NVARCHAR(20),
    ContactPhone NVARCHAR(20),
    ContactEmail NVARCHAR(100),
    ManagerID INT,
    IsActive BIT DEFAULT 1,
    CreatedAt DATETIME DEFAULT GETDATE(),
    FOREIGN KEY (ManagerID) REFERENCES Users(UserID)
);

-- Inventory
CREATE TABLE Inventory (
    InventoryID INT IDENTITY(1,1) PRIMARY KEY,
    ProductID INT NOT NULL,
    WarehouseID INT NOT NULL,
    Quantity INT NOT NULL DEFAULT 0,
    MinimumStockLevel INT DEFAULT 10,
    MaximumStockLevel INT DEFAULT 100,
    ReorderPoint INT DEFAULT 20,
    LastRestocked DATETIME,
    NextRestockDate DATETIME,
    Aisle NVARCHAR(20),
    Shelf NVARCHAR(20),
    Bin NVARCHAR(20),
    CreatedAt DATETIME DEFAULT GETDATE(),
    UpdatedAt DATETIME DEFAULT GETDATE(),
    FOREIGN KEY (ProductID) REFERENCES Products(ProductID),
    FOREIGN KEY (WarehouseID) REFERENCES Warehouses(WarehouseID),
    UNIQUE (ProductID, WarehouseID)
);

-- Inventory transactions
CREATE TABLE InventoryTransactions (
    TransactionID INT IDENTITY(1,1) PRIMARY KEY,
    ProductID INT NOT NULL,
    WarehouseID INT NOT NULL,
    TransactionType NVARCHAR(20) CHECK (TransactionType IN ('Purchase', 'Sale', 'Return', 'Adjustment', 'Transfer', 'Damage')),
    Quantity INT NOT NULL,
    PreviousQuantity INT NOT NULL,
    NewQuantity INT NOT NULL,
    ReferenceID INT, -- OrderID, PurchaseOrderID, etc.
    ReferenceType NVARCHAR(50),
    Notes NVARCHAR(MAX),
    CreatedBy INT,
    CreatedAt DATETIME DEFAULT GETDATE(),
    FOREIGN KEY (ProductID) REFERENCES Products(ProductID),
    FOREIGN KEY (WarehouseID) REFERENCES Warehouses(WarehouseID),
    FOREIGN KEY (CreatedBy) REFERENCES Users(UserID)
);

-- Suppliers
CREATE TABLE Suppliers (
    SupplierID INT IDENTITY(1,1) PRIMARY KEY,
    SupplierName NVARCHAR(200) NOT NULL,
    ContactPerson NVARCHAR(100),
    Email NVARCHAR(100),
    Phone NVARCHAR(20),
    Address NVARCHAR(255),
    City NVARCHAR(100),
    Country NVARCHAR(100),
    PaymentTerms NVARCHAR(50),
    LeadTime INT, -- in days
    IsActive BIT DEFAULT 1,
    CreatedAt DATETIME DEFAULT GETDATE()
);

-- Purchase orders
CREATE TABLE PurchaseOrders (
    PurchaseOrderID INT IDENTITY(1,1) PRIMARY KEY,
    PONumber NVARCHAR(50) NOT NULL UNIQUE,
    SupplierID INT NOT NULL,
    OrderDate DATETIME DEFAULT GETDATE(),
    ExpectedDeliveryDate DATETIME,
    ActualDeliveryDate DATETIME,
    Status NVARCHAR(20) CHECK (Status IN ('Draft', 'Ordered', 'Received', 'Cancelled', 'Partially Received')),
    TotalAmount DECIMAL(10,2) DEFAULT 0,
    TaxAmount DECIMAL(10,2) DEFAULT 0,
    ShippingCost DECIMAL(10,2) DEFAULT 0,
    Notes NVARCHAR(MAX),
    CreatedBy INT NOT NULL,
    ApprovedBy INT,
    CreatedAt DATETIME DEFAULT GETDATE(),
    UpdatedAt DATETIME DEFAULT GETDATE(),
    FOREIGN KEY (SupplierID) REFERENCES Suppliers(SupplierID),
    FOREIGN KEY (CreatedBy) REFERENCES Users(UserID),
    FOREIGN KEY (ApprovedBy) REFERENCES Users(UserID)
);

-- Purchase order items
CREATE TABLE PurchaseOrderItems (
    POItemID INT IDENTITY(1,1) PRIMARY KEY,
    PurchaseOrderID INT NOT NULL,
    ProductID INT NOT NULL,
    Quantity INT NOT NULL,
    UnitCost DECIMAL(10,2) NOT NULL,
    ReceivedQuantity INT DEFAULT 0,
    WarehouseID INT NOT NULL,
    Notes NVARCHAR(500),
    FOREIGN KEY (PurchaseOrderID) REFERENCES PurchaseOrders(PurchaseOrderID) ON DELETE CASCADE,
    FOREIGN KEY (ProductID) REFERENCES Products(ProductID),
    FOREIGN KEY (WarehouseID) REFERENCES Warehouses(WarehouseID)
);

-- =============================================
-- 4. ORDER MANAGEMENT TABLES
-- =============================================

-- Orders table
CREATE TABLE Orders (
    OrderID INT IDENTITY(1,1) PRIMARY KEY,
    OrderNumber NVARCHAR(50) NOT NULL UNIQUE,
    UserID INT NOT NULL,
    OrderDate DATETIME DEFAULT GETDATE(),
    OrderStatus NVARCHAR(20) CHECK (OrderStatus IN ('Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled', 'Returned', 'Refunded')),
    PaymentStatus NVARCHAR(20) CHECK (PaymentStatus IN ('Pending', 'Authorized', 'Paid', 'Failed', 'Refunded', 'Partially Refunded')),
    ShippingStatus NVARCHAR(20) CHECK (ShippingStatus IN ('Pending', 'Packed', 'Shipped', 'Delivered', 'Returned')),
    Subtotal DECIMAL(10,2) NOT NULL,
    TaxAmount DECIMAL(10,2) DEFAULT 0,
    ShippingCost DECIMAL(10,2) DEFAULT 0,
    DiscountAmount DECIMAL(10,2) DEFAULT 0,
    TotalAmount DECIMAL(10,2) NOT NULL,
    PaymentMethodID INT,
    ShippingAddressID INT NOT NULL,
    BillingAddressID INT NOT NULL,
    Notes NVARCHAR(MAX),
    IPAddress NVARCHAR(45),
    UserAgent NVARCHAR(500),
    CreatedAt DATETIME DEFAULT GETDATE(),
    UpdatedAt DATETIME DEFAULT GETDATE(),
    FOREIGN KEY (UserID) REFERENCES Users(UserID),
    FOREIGN KEY (PaymentMethodID) REFERENCES UserPaymentMethods(PaymentMethodID),
    FOREIGN KEY (ShippingAddressID) REFERENCES UserAddresses(AddressID),
    FOREIGN KEY (BillingAddressID) REFERENCES UserAddresses(AddressID)
);

-- Order items
CREATE TABLE OrderItems (
    OrderItemID INT IDENTITY(1,1) PRIMARY KEY,
    OrderID INT NOT NULL,
    ProductID INT NOT NULL,
    VariationID INT NULL,
    Quantity INT NOT NULL,
    UnitPrice DECIMAL(10,2) NOT NULL,
    DiscountPercentage DECIMAL(5,2) DEFAULT 0,
    DiscountAmount DECIMAL(10,2) DEFAULT 0,
    LineTotal DECIMAL(10,2) NOT NULL,
    WarehouseID INT,
    ShippedQuantity INT DEFAULT 0,
    ShipDate DATETIME,
    TrackingNumber NVARCHAR(100),
    Carrier NVARCHAR(50),
    FOREIGN KEY (OrderID) REFERENCES Orders(OrderID) ON DELETE CASCADE,
    FOREIGN KEY (ProductID) REFERENCES Products(ProductID),
    FOREIGN KEY (VariationID) REFERENCES ProductVariations(VariationID),
    FOREIGN KEY (WarehouseID) REFERENCES Warehouses(WarehouseID)
);

-- Order status history
CREATE TABLE OrderStatusHistory (
    HistoryID INT IDENTITY(1,1) PRIMARY KEY,
    OrderID INT NOT NULL,
    OldStatus NVARCHAR(50),
    NewStatus NVARCHAR(50) NOT NULL,
    StatusType NVARCHAR(20) CHECK (StatusType IN ('Order', 'Payment', 'Shipping')),
    ChangedBy INT,
    Notes NVARCHAR(500),
    ChangedAt DATETIME DEFAULT GETDATE(),
    FOREIGN KEY (OrderID) REFERENCES Orders(OrderID) ON DELETE CASCADE,
    FOREIGN KEY (ChangedBy) REFERENCES Users(UserID)
);

-- =============================================
-- 5. SALES & PAYMENT TABLES
-- =============================================

-- Payments
CREATE TABLE Payments (
    PaymentID INT IDENTITY(1,1) PRIMARY KEY,
    OrderID INT NOT NULL,
    PaymentMethod NVARCHAR(50) NOT NULL,
    PaymentGateway NVARCHAR(50),
    TransactionID NVARCHAR(100),
    Amount DECIMAL(10,2) NOT NULL,
    Currency NVARCHAR(3) DEFAULT 'USD',
    PaymentStatus NVARCHAR(20) CHECK (PaymentStatus IN ('Pending', 'Authorized', 'Completed', 'Failed', 'Refunded')),
    PaymentDate DATETIME DEFAULT GETDATE(),
    GatewayResponse NVARCHAR(MAX),
    RefundAmount DECIMAL(10,2) DEFAULT 0,
    RefundDate DATETIME,
    RefundReason NVARCHAR(500),
    CreatedAt DATETIME DEFAULT GETDATE(),
    FOREIGN KEY (OrderID) REFERENCES Orders(OrderID)
);

-- Invoices
CREATE TABLE Invoices (
    InvoiceID INT IDENTITY(1,1) PRIMARY KEY,
    InvoiceNumber NVARCHAR(50) NOT NULL UNIQUE,
    OrderID INT NOT NULL,
    InvoiceDate DATETIME DEFAULT GETDATE(),
    DueDate DATETIME,
    Status NVARCHAR(20) CHECK (Status IN ('Draft', 'Sent', 'Paid', 'Overdue', 'Cancelled')),
    Subtotal DECIMAL(10,2) NOT NULL,
    TaxAmount DECIMAL(10,2) NOT NULL,
    TotalAmount DECIMAL(10,2) NOT NULL,
    AmountPaid DECIMAL(10,2) DEFAULT 0,
    AmountDue AS (TotalAmount - AmountPaid),
    Notes NVARCHAR(MAX),
    SentDate DATETIME,
    PaidDate DATETIME,
    CreatedAt DATETIME DEFAULT GETDATE(),
    FOREIGN KEY (OrderID) REFERENCES Orders(OrderID)
);

-- Shipping details
CREATE TABLE ShippingDetails (
    ShippingID INT IDENTITY(1,1) PRIMARY KEY,
    OrderID INT NOT NULL,
    ShippingMethod NVARCHAR(50) NOT NULL,
    TrackingNumber NVARCHAR(100),
    Carrier NVARCHAR(50),
    ServiceLevel NVARCHAR(50),
    EstimatedDeliveryDate DATETIME,
    ActualDeliveryDate DATETIME,
    ShippingCost DECIMAL(10,2) NOT NULL,
    PackageWeight DECIMAL(8,2),
    PackageDimensions NVARCHAR(100),
    ShipDate DATETIME,
    DeliveryConfirmation BIT DEFAULT 0,
    SignedBy NVARCHAR(100),
    Notes NVARCHAR(500),
    CreatedAt DATETIME DEFAULT GETDATE(),
    FOREIGN KEY (OrderID) REFERENCES Orders(OrderID)
);

-- Returns and refunds
CREATE TABLE Returns (
    ReturnID INT IDENTITY(1,1) PRIMARY KEY,
    ReturnNumber NVARCHAR(50) NOT NULL UNIQUE,
    OrderID INT NOT NULL,
    UserID INT NOT NULL,
    ReturnDate DATETIME DEFAULT GETDATE(),
    ReturnReason NVARCHAR(500) NOT NULL,
    ReturnStatus NVARCHAR(20) CHECK (ReturnStatus IN ('Requested', 'Approved', 'Received', 'Inspected', 'Refunded', 'Rejected', 'Exchange')),
    RefundAmount DECIMAL(10,2),
    RefundMethod NVARCHAR(50),
    RefundDate DATETIME,
    RestockingFee DECIMAL(10,2) DEFAULT 0,
    Notes NVARCHAR(MAX),
    CreatedAt DATETIME DEFAULT GETDATE(),
    UpdatedAt DATETIME DEFAULT GETDATE(),
    FOREIGN KEY (OrderID) REFERENCES Orders(OrderID),
    FOREIGN KEY (UserID) REFERENCES Users(UserID)
);

-- Return items
CREATE TABLE ReturnItems (
    ReturnItemID INT IDENTITY(1,1) PRIMARY KEY,
    ReturnID INT NOT NULL,
    OrderItemID INT NOT NULL,
    ProductID INT NOT NULL,
    Quantity INT NOT NULL,
    Reason NVARCHAR(500),
    Condition NVARCHAR(50) CHECK (Condition IN ('Like New', 'Used', 'Damaged', 'Defective')),
    Restock BIT DEFAULT 0,
    RestockedQuantity INT DEFAULT 0,
    RestockedDate DATETIME,
    RefundAmount DECIMAL(10,2),
    FOREIGN KEY (ReturnID) REFERENCES Returns(ReturnID) ON DELETE CASCADE,
    FOREIGN KEY (OrderItemID) REFERENCES OrderItems(OrderItemID),
    FOREIGN KEY (ProductID) REFERENCES Products(ProductID)
);

-- =============================================
-- 6. PRICING & PROMOTIONS TABLES
-- =============================================

-- Discounts
CREATE TABLE Discounts (
    DiscountID INT IDENTITY(1,1) PRIMARY KEY,
    DiscountCode NVARCHAR(50) UNIQUE,
    DiscountName NVARCHAR(100) NOT NULL,
    DiscountType NVARCHAR(20) CHECK (DiscountType IN ('Percentage', 'Fixed Amount', 'Buy X Get Y', 'Free Shipping')),
    DiscountValue DECIMAL(10,2) NOT NULL,
    MinimumPurchase DECIMAL(10,2) DEFAULT 0,
    MaximumDiscount DECIMAL(10,2),
    StartDate DATETIME NOT NULL,
    EndDate DATETIME NOT NULL,
    UsageLimit INT,
    UsageCount INT DEFAULT 0,
    IsActive BIT DEFAULT 1,
    ApplyTo NVARCHAR(20) CHECK (ApplyTo IN ('All Products', 'Specific Categories', 'Specific Products', 'Specific Brands')),
    CreatedAt DATETIME DEFAULT GETDATE()
);

-- Discount categories
CREATE TABLE DiscountCategories (
    DiscountCategoryID INT IDENTITY(1,1) PRIMARY KEY,
    DiscountID INT NOT NULL,
    CategoryID INT NOT NULL,
    FOREIGN KEY (DiscountID) REFERENCES Discounts(DiscountID) ON DELETE CASCADE,
    FOREIGN KEY (CategoryID) REFERENCES Categories(CategoryID)
);

-- Discount products
CREATE TABLE DiscountProducts (
    DiscountProductID INT IDENTITY(1,1) PRIMARY KEY,
    DiscountID INT NOT NULL,
    ProductID INT NOT NULL,
    FOREIGN KEY (DiscountID) REFERENCES Discounts(DiscountID) ON DELETE CASCADE,
    FOREIGN KEY (ProductID) REFERENCES Products(ProductID)
);

-- =============================================
-- 7. ANALYTICS & REPORTING TABLES
-- =============================================

-- Customer wishlist
CREATE TABLE Wishlists (
    WishlistID INT IDENTITY(1,1) PRIMARY KEY,
    UserID INT NOT NULL,
    ProductID INT NOT NULL,
    AddedDate DATETIME DEFAULT GETDATE(),
    Notes NVARCHAR(500),
    FOREIGN KEY (UserID) REFERENCES Users(UserID) ON DELETE CASCADE,
    FOREIGN KEY (ProductID) REFERENCES Products(ProductID),
    UNIQUE (UserID, ProductID)
);

-- Shopping cart
CREATE TABLE ShoppingCart (
    CartID INT IDENTITY(1,1) PRIMARY KEY,
    UserID INT NOT NULL,
    ProductID INT NOT NULL,
    VariationID INT NULL,
    Quantity INT NOT NULL DEFAULT 1,
    AddedDate DATETIME DEFAULT GETDATE(),
    UpdatedAt DATETIME DEFAULT GETDATE(),
    FOREIGN KEY (UserID) REFERENCES Users(UserID) ON DELETE CASCADE,
    FOREIGN KEY (ProductID) REFERENCES Products(ProductID),
    FOREIGN KEY (VariationID) REFERENCES ProductVariations(VariationID)
);

-- Customer search history
CREATE TABLE SearchHistory (
    SearchID INT IDENTITY(1,1) PRIMARY KEY,
    UserID INT NULL,
    SearchQuery NVARCHAR(500) NOT NULL,
    SearchResultsCount INT,
    CategoryFilter NVARCHAR(100),
    PriceMin DECIMAL(10,2),
    PriceMax DECIMAL(10,2),
    BrandFilter NVARCHAR(100),
    SearchDate DATETIME DEFAULT GETDATE(),
    IPAddress NVARCHAR(45),
    FOREIGN KEY (UserID) REFERENCES Users(UserID)
);

-- Product views tracking
CREATE TABLE ProductViews (
    ViewID INT IDENTITY(1,1) PRIMARY KEY,
    ProductID INT NOT NULL,
    UserID INT NULL,
    ViewDate DATETIME DEFAULT GETDATE(),
    SessionID NVARCHAR(100),
    IPAddress NVARCHAR(45),
    UserAgent NVARCHAR(500),
    TimeSpentSeconds INT,
    FOREIGN KEY (ProductID) REFERENCES Products(ProductID),
    FOREIGN KEY (UserID) REFERENCES Users(UserID)
);

-- =============================================
-- 8. AUDIT & LOGGING TABLES
-- =============================================

-- Audit logs
CREATE TABLE AuditLogs (
    LogID INT IDENTITY(1,1) PRIMARY KEY,
    TableName NVARCHAR(100) NOT NULL,
    RecordID INT NOT NULL,
    Action NVARCHAR(20) CHECK (Action IN ('INSERT', 'UPDATE', 'DELETE')),
    OldValues NVARCHAR(MAX),
    NewValues NVARCHAR(MAX),
    ChangedBy INT,
    ChangedAt DATETIME DEFAULT GETDATE(),
    IPAddress NVARCHAR(45),
    FOREIGN KEY (ChangedBy) REFERENCES Users(UserID)
);

-- System logs
CREATE TABLE SystemLogs (
    LogID INT IDENTITY(1,1) PRIMARY KEY,
    LogLevel NVARCHAR(20) CHECK (LogLevel IN ('INFO', 'WARNING', 'ERROR', 'DEBUG')),
    LogSource NVARCHAR(100),
    Message NVARCHAR(MAX) NOT NULL,
    ExceptionDetails NVARCHAR(MAX),
    UserID INT NULL,
    IPAddress NVARCHAR(45),
    CreatedAt DATETIME DEFAULT GETDATE(),
    FOREIGN KEY (UserID) REFERENCES Users(UserID)
);

-- =============================================
-- 9. NOTIFICATIONS TABLE
-- =============================================

CREATE TABLE Notifications (
    NotificationID INT IDENTITY(1,1) PRIMARY KEY,
    UserID INT NOT NULL,
    NotificationType NVARCHAR(50) CHECK (NotificationType IN ('Order', 'Shipping', 'Payment', 'Promotion', 'System', 'Inventory')),
    Title NVARCHAR(200) NOT NULL,
    Message NVARCHAR(MAX) NOT NULL,
    IsRead BIT DEFAULT 0,
    LinkURL NVARCHAR(500),
    SentDate DATETIME DEFAULT GETDATE(),
    ReadDate DATETIME,
    FOREIGN KEY (UserID) REFERENCES Users(UserID)
);

-- =============================================
-- 10. INDEXES FOR PERFORMANCE
-- =============================================

-- Users indexes
CREATE INDEX IX_Users_Email ON Users(Email);
CREATE INDEX IX_Users_Username ON Users(Username);
CREATE INDEX IX_Users_RoleID ON Users(RoleID);

-- Products indexes
CREATE INDEX IX_Products_CategoryID ON Products(CategoryID);
CREATE INDEX IX_Products_BrandID ON Products(BrandID);
CREATE INDEX IX_Products_SKU ON Products(SKU);
CREATE INDEX IX_Products_Price ON Products(UnitPrice);
CREATE INDEX IX_Products_IsActive ON Products(IsActive) WHERE IsActive = 1;

-- Orders indexes
CREATE INDEX IX_Orders_UserID ON Orders(UserID);
CREATE INDEX IX_Orders_OrderStatus ON Orders(OrderStatus);
CREATE INDEX IX_Orders_PaymentStatus ON Orders(PaymentStatus);
CREATE INDEX IX_Orders_OrderDate ON Orders(OrderDate);
CREATE INDEX IX_Orders_OrderNumber ON Orders(OrderNumber);

-- Inventory indexes
CREATE INDEX IX_Inventory_ProductID ON Inventory(ProductID);
CREATE INDEX IX_Inventory_WarehouseID ON Inventory(WarehouseID);
CREATE INDEX IX_Inventory_Quantity ON Inventory(Quantity);

-- OrderItems indexes
CREATE INDEX IX_OrderItems_OrderID ON OrderItems(OrderID);
CREATE INDEX IX_OrderItems_ProductID ON OrderItems(ProductID);

-- ProductReviews indexes
CREATE INDEX IX_ProductReviews_ProductID ON ProductReviews(ProductID);
CREATE INDEX IX_ProductReviews_UserID ON ProductReviews(UserID);
CREATE INDEX IX_ProductReviews_Rating ON ProductReviews(Rating);

-- =============================================
-- 11. INSERT SAMPLE DATA
-- =============================================

-- Insert roles
INSERT INTO UserRoles (RoleName, RoleDescription, Permissions) VALUES
('Administrator', 'Full system access', '{"manage_users": true, "manage_products": true, "manage_orders": true, "manage_inventory": true, "view_reports": true}'),
('Manager', 'Store manager access', '{"manage_products": true, "manage_orders": true, "manage_inventory": true, "view_reports": true}'),
('Staff', 'Staff member access', '{"manage_orders": true, "view_inventory": true}'),
('Customer', 'Regular customer', '{"place_orders": true, "view_products": true, "write_reviews": true}');

-- Insert categories
INSERT INTO Categories (CategoryName, CategoryDescription, ParentCategoryID, DisplayOrder) VALUES
('Guitars', 'Acoustic and electric guitars', NULL, 1),
('Acoustic Guitars', 'Non-electric guitars', 1, 1),
('Electric Guitars', 'Electric guitars with amplifiers', 1, 2),
('Bass Guitars', 'Low-frequency guitars', 1, 3),
('Pianos & Keyboards', 'Pianos and electronic keyboards', NULL, 2),
('Drums & Percussion', 'Drum sets and percussion instruments', NULL, 3),
('Violins & Strings', 'String instruments', NULL, 4),
('Wind Instruments', 'Woodwind and brass instruments', NULL, 5),
('Accessories', 'Instrument accessories', NULL, 6),
('Amplifiers & Effects', 'Sound amplification and effects', NULL, 7);

-- Insert brands
INSERT INTO Brands (BrandName, BrandDescription, CountryOfOrigin, YearFounded) VALUES
('Fender', 'American guitar manufacturer', 'USA', 1946),
('Gibson', 'Iconic American guitar brand', 'USA', 1902),
('Yamaha', 'Japanese multinational corporation', 'Japan', 1887),
('Roland', 'Japanese electronic musical instruments', 'Japan', 1972),
('Shure', 'American audio equipment manufacturer', 'USA', 1925),
('Korg', 'Japanese multinational corporation', 'Japan', 1962),
('Pearl', 'Japanese drum manufacturer', 'Japan', 1946),
('Martin', 'American guitar manufacturer', 'USA', 1833),
('Taylor', 'American guitar manufacturer', 'USA', 1974),
('Casio', 'Japanese electronics manufacturer', 'Japan', 1946);

-- Insert sample warehouse
INSERT INTO Warehouses (WarehouseName, Address, City, State, Country, PostalCode) VALUES
('Main Warehouse', '123 Music Street', 'Nashville', 'TN', 'USA', '37201'),
('West Coast Warehouse', '456 Guitar Lane', 'Los Angeles', 'CA', 'USA', '90001'),
('East Coast Warehouse', '789 Drum Road', 'New York', 'NY', 'USA', '10001');

-- =============================================
-- 12. STORED PROCEDURES
-- =============================================

-- Get product details with inventory
CREATE PROCEDURE GetProductDetailsWithInventory
    @ProductID INT
AS
BEGIN
    SELECT 
        p.ProductID,
        p.SKU,
        p.ProductName,
        p.ProductDescription,
        p.UnitPrice,
        p.CostPrice,
        c.CategoryName,
        b.BrandName,
        i.Quantity,
        i.MinimumStockLevel,
        i.MaximumStockLevel,
        w.WarehouseName,
        COALESCE(AVG(pr.Rating), 0) AS AverageRating,
        COUNT(pr.ReviewID) AS ReviewCount
    FROM Products p
    JOIN Categories c ON p.CategoryID = c.CategoryID
    JOIN Brands b ON p.BrandID = b.BrandID
    LEFT JOIN Inventory i ON p.ProductID = i.ProductID
    LEFT JOIN Warehouses w ON i.WarehouseID = w.WarehouseID
    LEFT JOIN ProductReviews pr ON p.ProductID = pr.ProductID AND pr.IsApproved = 1
    WHERE p.ProductID = @ProductID
    GROUP BY 
        p.ProductID, p.SKU, p.ProductName, p.ProductDescription, p.UnitPrice, p.CostPrice,
        c.CategoryName, b.BrandName, i.Quantity, i.MinimumStockLevel, i.MaximumStockLevel,
        w.WarehouseName;
END;
GO

-- Get customer order history
CREATE PROCEDURE GetCustomerOrderHistory
    @UserID INT
AS
BEGIN
    SELECT 
        o.OrderID,
        o.OrderNumber,
        o.OrderDate,
        o.OrderStatus,
        o.TotalAmount,
        COUNT(oi.OrderItemID) AS ItemCount,
        STRING_AGG(p.ProductName, ', ') WITHIN GROUP (ORDER BY p.ProductName) AS Products
    FROM Orders o
    JOIN OrderItems oi ON o.OrderID = oi.OrderID
    JOIN Products p ON oi.ProductID = p.ProductID
    WHERE o.UserID = @UserID
    GROUP BY o.OrderID, o.OrderNumber, o.OrderDate, o.OrderStatus, o.TotalAmount
    ORDER BY o.OrderDate DESC;
END;
GO

-- Update inventory quantity
CREATE PROCEDURE UpdateInventoryQuantity
    @ProductID INT,
    @WarehouseID INT,
    @QuantityChange INT,
    @TransactionType NVARCHAR(20),
    @ReferenceID INT = NULL,
    @Notes NVARCHAR(MAX) = NULL,
    @UserID INT = NULL
AS
BEGIN
    BEGIN TRANSACTION;
    
    DECLARE @PreviousQuantity INT;
    DECLARE @NewQuantity INT;
    
    -- Get current quantity
    SELECT @PreviousQuantity = Quantity 
    FROM Inventory 
    WHERE ProductID = @ProductID AND WarehouseID = @WarehouseID;
    
    -- Update or insert inventory
    IF EXISTS(SELECT 1 FROM Inventory WHERE ProductID = @ProductID AND WarehouseID = @WarehouseID)
    BEGIN
        UPDATE Inventory 
        SET Quantity = Quantity + @QuantityChange,
            UpdatedAt = GETDATE()
        WHERE ProductID = @ProductID AND WarehouseID = @WarehouseID;
        
        SET @NewQuantity = @PreviousQuantity + @QuantityChange;
    END
    ELSE
    BEGIN
        INSERT INTO Inventory (ProductID, WarehouseID, Quantity, CreatedAt, UpdatedAt)
        VALUES (@ProductID, @WarehouseID, @QuantityChange, GETDATE(), GETDATE());
        
        SET @PreviousQuantity = 0;
        SET @NewQuantity = @QuantityChange;
    END
    
    -- Log transaction
    INSERT INTO InventoryTransactions (
        ProductID, WarehouseID, TransactionType, Quantity,
        PreviousQuantity, NewQuantity, ReferenceID, Notes, CreatedBy, CreatedAt
    )
    VALUES (
        @ProductID, @WarehouseID, @TransactionType, @QuantityChange,
        @PreviousQuantity, @NewQuantity, @ReferenceID, @Notes, @UserID, GETDATE()
    );
    
    COMMIT TRANSACTION;
END;
GO

-- =============================================
-- 13. VIEWS
-- =============================================

-- Sales report view
CREATE VIEW SalesReport AS
SELECT 
    YEAR(o.OrderDate) AS Year,
    MONTH(o.OrderDate) AS Month,
    DATENAME(month, o.OrderDate) AS MonthName,
    COUNT(DISTINCT o.OrderID) AS TotalOrders,
    COUNT(oi.OrderItemID) AS TotalItems,
    SUM(oi.Quantity) AS TotalQuantity,
    SUM(o.TotalAmount) AS TotalRevenue,
    AVG(o.TotalAmount) AS AverageOrderValue,
    COUNT(DISTINCT o.UserID) AS UniqueCustomers
FROM Orders o
JOIN OrderItems oi ON o.OrderID = oi.OrderID
WHERE o.OrderStatus NOT IN ('Cancelled')
GROUP BY YEAR(o.OrderDate), MONTH(o.OrderDate), DATENAME(month, o.OrderDate);
GO

-- Inventory alert view
CREATE VIEW InventoryAlerts AS
SELECT 
    p.ProductID,
    p.ProductName,
    p.SKU,
    i.Quantity,
    i.MinimumStockLevel,
    i.ReorderPoint,
    w.WarehouseName,
    CASE 
        WHEN i.Quantity <= 0 THEN 'Out of Stock'
        WHEN i.Quantity < i.ReorderPoint THEN 'Reorder'
        WHEN i.Quantity < i.MinimumStockLevel THEN 'Low Stock'
        ELSE 'OK'
    END AS StockStatus
FROM Inventory i
JOIN Products p ON i.ProductID = p.ProductID
JOIN Warehouses w ON i.WarehouseID = w.WarehouseID
WHERE p.IsActive = 1;
GO

-- Customer purchase summary view
CREATE VIEW CustomerPurchaseSummary AS
SELECT 
    u.UserID,
    u.Email,
    u.FirstName + ' ' + u.LastName AS FullName,
    COUNT(DISTINCT o.OrderID) AS TotalOrders,
    SUM(o.TotalAmount) AS TotalSpent,
    MAX(o.OrderDate) AS LastOrderDate,
    DATEDIFF(day, MAX(o.OrderDate), GETDATE()) AS DaysSinceLastOrder,
    AVG(o.TotalAmount) AS AverageOrderValue
FROM Users u
LEFT JOIN Orders o ON u.UserID = o.UserID AND o.OrderStatus NOT IN ('Cancelled')
WHERE u.RoleID = (SELECT RoleID FROM UserRoles WHERE RoleName = 'Customer')
GROUP BY u.UserID, u.Email, u.FirstName, u.LastName;
GO

-- =============================================
-- 14. TRIGGERS
-- =============================================

-- Trigger to update product updated timestamp
CREATE TRIGGER trg_UpdateProductTimestamp
ON Products
AFTER UPDATE
AS
BEGIN
    UPDATE Products
    SET UpdatedAt = GETDATE()
    FROM Products p
    INNER JOIN inserted i ON p.ProductID = i.ProductID;
END;
GO

-- Trigger to maintain audit log for orders
CREATE TRIGGER trg_AuditOrderChanges
ON Orders
AFTER UPDATE
AS
BEGIN
    INSERT INTO AuditLogs (TableName, RecordID, Action, OldValues, NewValues, ChangedAt)
    SELECT 
        'Orders',
        i.OrderID,
        'UPDATE',
        (SELECT d.* FROM deleted d WHERE d.OrderID = i.OrderID FOR JSON PATH),
        (SELECT i.* FROM inserted i WHERE i.OrderID = i.OrderID FOR JSON PATH),
        GETDATE()
    FROM inserted i
    INNER JOIN deleted d ON i.OrderID = d.OrderID;
END;
GO

-- Trigger to update inventory on order completion
CREATE TRIGGER trg_UpdateInventoryOnOrder
ON Orders
AFTER UPDATE
AS
BEGIN
    IF UPDATE(OrderStatus)
    BEGIN
        -- When order is shipped, reduce inventory
        IF EXISTS(SELECT 1 FROM inserted i JOIN deleted d ON i.OrderID = d.OrderID 
                 WHERE i.OrderStatus = 'Shipped' AND d.OrderStatus != 'Shipped')
        BEGIN
            UPDATE i
            SET i.Quantity = i.Quantity - oi.ShippedQuantity,
                i.UpdatedAt = GETDATE()
            FROM Inventory i
            JOIN OrderItems oi ON i.ProductID = oi.ProductID AND i.WarehouseID = oi.WarehouseID
            JOIN inserted ins ON oi.OrderID = ins.OrderID
            WHERE ins.OrderStatus = 'Shipped';
        END
        
        -- When order is cancelled, restore inventory
        IF EXISTS(SELECT 1 FROM inserted i JOIN deleted d ON i.OrderID = d.OrderID 
                 WHERE i.OrderStatus = 'Cancelled' AND d.OrderStatus != 'Cancelled')
        BEGIN
            UPDATE i
            SET i.Quantity = i.Quantity + oi.Quantity,
                i.UpdatedAt = GETDATE()
            FROM Inventory i
            JOIN OrderItems oi ON i.ProductID = oi.ProductID AND i.WarehouseID = oi.WarehouseID
            JOIN inserted ins ON oi.OrderID = ins.OrderID
            WHERE ins.OrderStatus = 'Cancelled';
        END
    END
END;
GO

-- =============================================
-- 15. FUNCTIONS
-- =============================================

-- Calculate product rating
CREATE FUNCTION CalculateProductRating(@ProductID INT)
RETURNS DECIMAL(3,2)
AS
BEGIN
    DECLARE @Rating DECIMAL(3,2);
    
    SELECT @Rating = AVG(CAST(Rating AS DECIMAL(3,2)))
    FROM ProductReviews
    WHERE ProductID = @ProductID AND IsApproved = 1;
    
    RETURN ISNULL(@Rating, 0);
END;
GO

-- Get product availability
CREATE FUNCTION GetProductAvailability(@ProductID INT)
RETURNS NVARCHAR(20)
AS
BEGIN
    DECLARE @TotalQuantity INT;
    DECLARE @Availability NVARCHAR(20);
    
    SELECT @TotalQuantity = SUM(Quantity)
    FROM Inventory
    WHERE ProductID = @ProductID;
    
    SET @Availability = CASE
        WHEN @TotalQuantity IS NULL OR @TotalQuantity <= 0 THEN 'Out of Stock'
        WHEN @TotalQuantity < 5 THEN 'Low Stock'
        ELSE 'In Stock'
    END;
    
    RETURN @Availability;
END;
GO

-- =============================================
-- 16. COMPUTED COLUMNS (Add after table creation)
-- =============================================

-- Add computed column for product rating (add to Products table)
ALTER TABLE Products
ADD AverageRating AS dbo.CalculateProductRating(ProductID);

-- Add computed column for total inventory quantity
ALTER TABLE Products
ADD TotalStock AS (
    SELECT ISNULL(SUM(Quantity), 0)
    FROM Inventory
    WHERE ProductID = Products.ProductID
);

-- Add computed column for order item total
ALTER TABLE OrderItems
ADD TotalPrice AS (Quantity * UnitPrice * (1 - DiscountPercentage/100.0));

-- =============================================
-- 17. CHECK CONSTRAINTS
-- =============================================

-- Add check constraints
ALTER TABLE Products
ADD CONSTRAINT CHK_Product_Price CHECK (UnitPrice >= 0);

ALTER TABLE OrderItems
ADD CONSTRAINT CHK_OrderItem_Quantity CHECK (Quantity > 0);

ALTER TABLE Inventory
ADD CONSTRAINT CHK_Inventory_Quantity CHECK (Quantity >= 0);

ALTER TABLE Users
ADD CONSTRAINT CHK_User_Email CHECK (Email LIKE '%_@__%.__%');

-- =============================================
-- 18. FOREIGN KEY INDEXES FOR PERFORMANCE
-- =============================================

CREATE INDEX IX_FK_Products_CategoryID ON Products(CategoryID);
CREATE INDEX IX_FK_Products_BrandID ON Products(BrandID);
CREATE INDEX IX_FK_OrderItems_OrderID ON OrderItems(OrderID);
CREATE INDEX IX_FK_OrderItems_ProductID ON OrderItems(ProductID);
CREATE INDEX IX_FK_Inventory_ProductID ON Inventory(ProductID);
CREATE INDEX IX_FK_Users_RoleID ON Users(RoleID);

PRINT 'Database schema created successfully!';














