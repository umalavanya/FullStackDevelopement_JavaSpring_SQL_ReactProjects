--Step4: Task management Tables

-- Task Categories
CREATE TABLE Tasks.TaskCategories (
    TaskCategoryID INT IDENTITY(1,1) PRIMARY KEY,
    CategoryName NVARCHAR(100) NOT NULL UNIQUE,
    ColorCode NVARCHAR(7) DEFAULT '#3498db'
);

-- Household Tasks
CREATE TABLE Tasks.HouseholdTasks (
    TaskID INT IDENTITY(1,1) PRIMARY KEY,
    TaskTitle NVARCHAR(200) NOT NULL,
    Description NVARCHAR(1000),
    TaskCategoryID INT NOT NULL,
    AssignedToMemberID INT NOT NULL,
    CreatedByMemberID INT NOT NULL,
    CreatedDate DATETIME DEFAULT GETDATE(),
    DueDate DATE,
    CompletedDate DATETIME NULL,
    Priority INT DEFAULT 3, -- 1=High, 2=Medium, 3=Low
    Status NVARCHAR(20) DEFAULT 'Pending', -- Pending, In Progress, Completed, Cancelled
    RecurrencePattern NVARCHAR(50) NULL, -- Daily, Weekly, Monthly, Yearly
    EstimatedDurationMinutes INT NULL,
    FOREIGN KEY (TaskCategoryID) REFERENCES Tasks.TaskCategories(TaskCategoryID),
    FOREIGN KEY (AssignedToMemberID) REFERENCES Household.Members(MemberID),
    FOREIGN KEY (CreatedByMemberID) REFERENCES Household.Members(MemberID)
);

-- Task Dependencies
CREATE TABLE Tasks.TaskDependencies (
    DependencyID INT IDENTITY(1,1) PRIMARY KEY,
    TaskID INT NOT NULL,
    DependsOnTaskID INT NOT NULL,
    FOREIGN KEY (TaskID) REFERENCES Tasks.HouseholdTasks(TaskID),
    FOREIGN KEY (DependsOnTaskID) REFERENCES Tasks.HouseholdTasks(TaskID)
);

-- Task Notes/Updates
CREATE TABLE Tasks.TaskUpdates (
    UpdateID INT IDENTITY(1,1) PRIMARY KEY,
    TaskID INT NOT NULL,
    UpdateText NVARCHAR(1000) NOT NULL,
    UpdatedByMemberID INT NOT NULL,
    UpdateDate DATETIME DEFAULT GETDATE(),
    FOREIGN KEY (TaskID) REFERENCES Tasks.HouseholdTasks(TaskID),
    FOREIGN KEY (UpdatedByMemberID) REFERENCES Household.Members(MemberID)
);