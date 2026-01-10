--Step5: Important Documents and files

-- Important Documents
CREATE TABLE Inventory.ImportantDocuments (
    DocumentID INT IDENTITY(1,1) PRIMARY KEY,
    DocumentName NVARCHAR(200) NOT NULL,
    DocumentType NVARCHAR(100) NOT NULL, -- Passport, Birth Certificate, Insurance, etc.
    LocationID INT NOT NULL,
    OwnerMemberID INT NULL,
    IssueDate DATE NULL,
    ExpiryDate DATE NULL,
    DocumentNumber NVARCHAR(100),
    IssuingAuthority NVARCHAR(200),
    DigitalCopyPath NVARCHAR(500),
    Notes NVARCHAR(1000),
    CreatedDate DATETIME DEFAULT GETDATE(),
    LastViewed DATE NULL,
    FOREIGN KEY (LocationID) REFERENCES Inventory.Locations(LocationID),
    FOREIGN KEY (OwnerMemberID) REFERENCES Household.Members(MemberID)
);

-- Jewelry and Valuables
CREATE TABLE Inventory.Valuables (
    ValuableID INT IDENTITY(1,1) PRIMARY KEY,
    ItemName NVARCHAR(200) NOT NULL,
    Category NVARCHAR(100) NOT NULL, -- Jewelry, Watches, Electronics, etc.
    Material NVARCHAR(100), -- Gold, Silver, Diamond, etc.
    Weight DECIMAL(10,2) NULL,
    Purity NVARCHAR(20) NULL, -- 18K, 24K, etc.
    PurchaseValue DECIMAL(10,2),
    CurrentValue DECIMAL(10,2),
    PurchaseDate DATE NULL,
    OwnerMemberID INT NULL,
    LocationID INT NOT NULL,
    Description NVARCHAR(1000),
    SerialNumber NVARCHAR(100),
    InsurancePolicyNumber NVARCHAR(100),
    PhotoPath NVARCHAR(500),
    FOREIGN KEY (OwnerMemberID) REFERENCES Household.Members(MemberID),
    FOREIGN KEY (LocationID) REFERENCES Inventory.Locations(LocationID)
);