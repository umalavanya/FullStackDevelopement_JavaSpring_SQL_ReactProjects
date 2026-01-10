--Step6: Insert sample Data
-- Insert Family Members
INSERT INTO Household.Members (FirstName, LastName, Role, DateOfBirth)
VALUES
    ('John', 'Smith', 'Dad', '1980-03-15'),
    ('Sarah', 'Smith', 'Mom', '1982-07-22'),
    ('Tommy', 'Smith', 'Child', '2017-05-10'),
    ('Lily', 'Smith', 'Baby', '2023-11-30');

-- Insert Categories
INSERT INTO Inventory.Categories (CategoryName, Description)
VALUES
    ('Clothing', 'All clothing items'),
    ('Toys', 'Children toys and games'),
    ('Stationery', 'Office and school supplies'),
    ('Kitchen Items', 'Kitchen utensils and appliances'),
    ('Food Items', 'Groceries and food supplies'),
    ('Important Files', 'Documents and certificates'),
    ('Jewelry', 'Valuables and jewelry'),
    ('Everyday Items', 'Daily use items'),
    ('Electronics', 'Electronic devices'),
    ('Furniture', 'Household furniture'),
    ('Medicines', 'Medical supplies'),
    ('Books', 'Books and magazines');

-- Insert Sub-categories
INSERT INTO Inventory.Categories (CategoryName, ParentCategoryID, Description)
VALUES
    ('Men Clothing', 1, 'Dad''s clothing'),
    ('Women Clothing', 1, 'Mom''s clothing'),
    ('Children Clothing', 1, 'Kids clothing'),
    ('Baby Clothing', 1, 'Baby clothing'),
    ('Educational Toys', 2, 'Learning toys'),
    ('Kitchen Appliances', 4, 'Electrical appliances'),
    ('Cookware', 4, 'Pots and pans'),
    ('Perishables', 5, 'Food with expiry'),
    ('Non-Perishables', 5, 'Long shelf life food');

-- Insert Storage Locations
INSERT INTO Inventory.Locations (LocationName, Room, Shelf, Description)
VALUES
    ('Dad Wardrobe', 'Master Bedroom', 'Top Shelf', 'Dad''s clothing storage'),
    ('Mom Wardrobe', 'Master Bedroom', 'Middle Shelf', 'Mom''s clothing storage'),
    ('Toy Box', 'Children Room', 'Floor', 'Toy storage'),
    ('Kitchen Cabinet 1', 'Kitchen', 'Upper Cabinet', 'Food storage'),
    ('Kitchen Cabinet 2', 'Kitchen', 'Lower Cabinet', 'Utensils'),
    ('Medicine Cabinet', 'Bathroom', 'Wall Cabinet', 'Medical supplies'),
    ('Safe Box', 'Home Office', 'Desk', 'Important documents'),
    ('Jewelry Box', 'Master Bedroom', 'Dresser', 'Jewelry storage'),
    ('Bookshelf', 'Living Room', 'Wall', 'Books and magazines'),
    ('Garage Shelf 1', 'Garage', 'Metal Shelf', 'Car supplies'),
    ('Baby Dresser', 'Baby Room', 'Top Drawer', 'Baby clothing');

-- Insert Bill Types
INSERT INTO Finance.BillTypes (BillName, PaymentFrequency, DueDay, AverageAmount)
VALUES
    ('Rent', 'Monthly', 1, 1500.00),
    ('Electricity', 'Monthly', 15, 120.00),
    ('Water', 'Monthly', 10, 60.00),
    ('Internet', 'Monthly', 20, 80.00),
    ('Car Insurance', 'Yearly', 1, 1200.00),
    ('Car Loan', 'Monthly', 5, 350.00),
    ('Health Insurance', 'Monthly', 1, 450.00),
    ('Mobile Phones', 'Monthly', 25, 120.00);

-- Insert Budget Categories
INSERT INTO Finance.BudgetCategories (CategoryName, Description)
VALUES
    ('Housing', 'Rent, utilities, maintenance'),
    ('Transportation', 'Car payments, fuel, insurance'),
    ('Groceries', 'Food and household supplies'),
    ('Healthcare', 'Medical expenses, insurance'),
    ('Entertainment', 'Dining out, movies, hobbies'),
    ('Education', 'School supplies, activities'),
    ('Savings', 'Emergency fund, investments'),
    ('Personal Care', 'Clothing, grooming'),
    ('Childcare', 'Baby supplies, toys'),
    ('Miscellaneous', 'Other expenses');

-- Insert Task Categories
INSERT INTO Tasks.TaskCategories (CategoryName, ColorCode)
VALUES
    ('Cleaning', '#2ecc71'),
    ('Cooking', '#e74c3c'),
    ('Shopping', '#f39c12'),
    ('Maintenance', '#3498db'),
    ('Childcare', '#9b59b6'),
    ('Bill Payment', '#1abc9c'),
    ('Car Care', '#34495e'),
    ('Laundry', '#16a085');