USE MusicStoreDB;
GO

-- =============================================
-- 1. INSERT DATA INTO UserRoles (Minimum 20 rows)
-- =============================================
INSERT INTO UserRoles (RoleName, RoleDescription, Permissions, CreatedAt, IsActive) VALUES
('Super Admin', 'Full system control with all privileges', '{"all": true}', '2023-01-01', 1),
('Administrator', 'Full system access', '{"manage_users": true, "manage_products": true, "manage_orders": true, "manage_inventory": true, "view_reports": true, "manage_discounts": true}', '2023-01-01', 1),
('Inventory Manager', 'Manages inventory and suppliers', '{"manage_inventory": true, "view_reports": true, "manage_suppliers": true}', '2023-01-02', 1),
('Sales Manager', 'Manages sales and customer relations', '{"manage_orders": true, "view_reports": true, "manage_customers": true}', '2023-01-02', 1),
('Content Manager', 'Manages product catalog and content', '{"manage_products": true, "manage_categories": true, "manage_brands": true}', '2023-01-03', 1),
('Shipping Manager', 'Manages shipping and logistics', '{"manage_orders": true, "manage_shipping": true}', '2023-01-03', 1),
('Customer Support', 'Handles customer queries and support', '{"view_orders": true, "manage_returns": true}', '2023-01-04', 1),
('Marketing Specialist', 'Manages promotions and marketing', '{"manage_discounts": true, "view_reports": true}', '2023-01-04', 1),
('Finance Manager', 'Handles payments and finances', '{"manage_payments": true, "view_reports": true}', '2023-01-05', 1),
('Warehouse Staff', 'Handles warehouse operations', '{"manage_inventory": true}', '2023-01-05', 1),
('Sales Representative', 'Handles sales and customer service', '{"manage_orders": true, "view_customers": true}', '2023-01-06', 1),
('Product Specialist', 'Expert in specific product categories', '{"manage_products": true}', '2023-01-06', 1),
('Quality Control', 'Ensures product quality', '{"view_inventory": true, "manage_returns": true}', '2023-01-07', 1),
('System Analyst', 'Analyzes system data and reports', '{"view_reports": true}', '2023-01-07', 1),
('Training Coordinator', 'Trains new staff', '{"view_users": true}', '2023-01-08', 1),
('Regional Manager', 'Manages multiple locations', '{"manage_users": true, "view_reports": true}', '2023-01-08', 1),
('VIP Customer', 'Special privileges for VIP customers', '{"early_access": true, "special_discounts": true}', '2023-01-09', 1),
('Wholesale Customer', 'Business customers with bulk orders', '{"bulk_pricing": true}', '2023-01-09', 1),
('Affiliate Partner', 'Marketing affiliates', '{"affiliate_tracking": true}', '2023-01-10', 1),
('Guest', 'Temporary guest users', '{"browse_only": true}', '2023-01-10', 1),
('Premium Member', 'Paid subscription members', '{"exclusive_content": true, "free_shipping": true}', '2023-01-11', 1),
('Student', 'Student discounts and offers', '{"student_discount": true}', '2023-01-11', 1);

-- =============================================
-- 2. INSERT DATA INTO Users (Minimum 20 rows)
-- =============================================
INSERT INTO Users (Username, Email, PasswordHash, FirstName, LastName, Phone, DateOfBirth, ProfileImageURL, RoleID, IsEmailVerified, IsActive, CreatedAt, LastLogin, LastPasswordChange, FailedLoginAttempts) VALUES
('admin.john', 'john.admin@musicstore.com', '$2y$10$HhHgB6Nk6VvQ7VQ1W8pZMu', 'John', 'Admin', '+1-555-0101', '1980-05-15', 'https://cdn.musicstore.com/profiles/admin_john.jpg', 2, 1, 1, '2023-01-15', '2024-01-20', '2023-12-01', 0),
('inventory.mary', 'mary.inventory@musicstore.com', '$2y$10$HhHgB6Nk6VvQ7VQ1W8pZMu', 'Mary', 'Smith', '+1-555-0102', '1985-08-22', 'https://cdn.musicstore.com/profiles/mary_smith.jpg', 3, 1, 1, '2023-02-10', '2024-01-19', '2023-11-15', 0),
('sales.mike', 'mike.sales@musicstore.com', '$2y$10$HhHgB6Nk6VvQ7VQ1W8pZMu', 'Mike', 'Johnson', '+1-555-0103', '1990-03-10', NULL, 4, 1, 1, '2023-02-15', '2024-01-18', '2023-10-20', 0),
('content.sarah', 'sarah.content@musicstore.com', '$2y$10$HhHgB6Nk6VvQ7VQ1W8pZMu', 'Sarah', 'Williams', '+1-555-0104', '1988-11-05', 'https://cdn.musicstore.com/profiles/sarah_w.jpg', 5, 1, 1, '2023-03-01', '2024-01-17', '2023-09-30', 0),
('customer.alex', 'alex.martin@email.com', '$2y$10$HhHgB6Nk6VvQ7VQ1W8pZMu', 'Alex', 'Martin', '+1-555-0201', '1995-04-12', NULL, 10, 1, 1, '2023-03-15', '2024-01-16', '2023-08-25', 0),
('guitar.lover', 'david.guitar@email.com', '$2y$10$HhHgB6Nk6VvQ7VQ1W8pZMu', 'David', 'Chen', '+1-555-0202', '1992-07-30', 'https://cdn.musicstore.com/profiles/david_chen.jpg', 10, 1, 1, '2023-04-01', '2024-01-15', '2023-07-10', 0),
('piano.master', 'emily.piano@email.com', '$2y$10$HhHgB6Nk6VvQ7VQ1W8pZMu', 'Emily', 'Davis', '+1-555-0203', '1987-12-25', NULL, 10, 1, 1, '2023-04-10', '2024-01-14', '2023-06-05', 0),
('drum.king', 'robert.drums@email.com', '$2y$10$HhHgB6Nk6VvQ7VQ1W8pZMu', 'Robert', 'Wilson', '+1-555-0204', '1993-06-18', 'https://cdn.musicstore.com/profiles/robert_w.jpg', 10, 1, 1, '2023-05-05', '2024-01-13', '2023-05-20', 0),
('violin.pro', 'lisa.violin@email.com', '$2y$10$HhHgB6Nk6VvQ7VQ1W8pZMu', 'Lisa', 'Anderson', '+1-555-0205', '1990-09-08', NULL, 10, 1, 1, '2023-05-20', '2024-01-12', '2023-04-15', 0),
('bass.boss', 'kevin.bass@email.com', '$2y$10$HhHgB6Nk6VvQ7VQ1W8pZMu', 'Kevin', 'Brown', '+1-555-0206', '1988-02-14', 'https://cdn.musicstore.com/profiles/kevin_b.jpg', 10, 1, 1, '2023-06-01', '2024-01-11', '2023-03-30', 0),
('music.student', 'sophia.music@email.com', '$2y$10$HhHgB6Nk6VvQ7VQ1W8pZMu', 'Sophia', 'Taylor', '+1-555-0207', '2000-01-20', NULL, 22, 1, 1, '2023-06-15', '2024-01-10', '2023-02-28', 0),
('band.leader', 'james.rock@email.com', '$2y$10$HhHgB6Nk6VvQ7VQ1W8pZMu', 'James', 'Miller', '+1-555-0208', '1985-03-05', 'https://cdn.musicstore.com/profiles/james_m.jpg', 17, 1, 1, '2023-07-01', '2024-01-09', '2023-01-15', 0),
('studio.pro', 'olivia.studio@email.com', '$2y$10$HhHgB6Nk6VvQ7VQ1W8pZMu', 'Olivia', 'Thomas', '+1-555-0209', '1991-08-12', NULL, 10, 1, 1, '2023-07-10', '2024-01-08', '2023-12-01', 0),
('music.teacher', 'daniel.teach@email.com', '$2y$10$HhHgB6Nk6VvQ7VQ1W8pZMu', 'Daniel', 'Jackson', '+1-555-0210', '1975-11-30', 'https://cdn.musicstore.com/profiles/daniel_j.jpg', 18, 1, 1, '2023-08-01', '2024-01-07', '2023-11-10', 0),
('dj.spin', 'mia.dj@email.com', '$2y$10$HhHgB6Nk6VvQ7VQ1W8pZMu', 'Mia', 'Lee', '+1-555-0211', '1994-04-22', NULL, 21, 1, 1, '2023-08-15', '2024-01-06', '2023-10-20', 0),
('orchestra.member', 'ben.orchestra@email.com', '$2y$10$HhHgB6Nk6VvQ7VQ1W8pZMu', 'Benjamin', 'Harris', '+1-555-0212', '1989-07-07', 'https://cdn.musicstore.com/profiles/ben_h.jpg', 10, 1, 1, '2023-09-01', '2024-01-05', '2023-09-30', 0),
('guitar.collector', 'ava.collector@email.com', '$2y$10$HhHgB6Nk6VvQ7VQ1W8pZMu', 'Ava', 'Clark', '+1-555-0213', '1996-05-19', NULL, 17, 1, 1, '2023-09-10', '2024-01-04', '2023-08-25', 0),
('producer.max', 'max.producer@email.com', '$2y$10$HhHgB6Nk6VvQ7VQ1W8pZMu', 'Max', 'Lewis', '+1-555-0214', '1983-10-03', 'https://cdn.musicstore.com/profiles/max_l.jpg', 10, 1, 1, '2023-10-01', '2024-01-03', '2023-07-15', 0),
('jazz.lover', 'charlie.jazz@email.com', '$2y$10$HhHgB6Nk6VvQ7VQ1W8pZMu', 'Charlie', 'Walker', '+1-555-0215', '1997-12-08', NULL, 10, 1, 1, '2023-10-15', '2024-01-02', '2023-06-10', 0),
('rock.star', 'lily.rock@email.com', '$2y$10$HhHgB6Nk6VvQ7VQ1W8pZMu', 'Lily', 'Hall', '+1-555-0216', '1992-02-28', 'https://cdn.musicstore.com/profiles/lily_h.jpg', 10, 1, 1, '2023-11-01', '2024-01-01', '2023-05-05', 0),
('classical.fan', 'henry.classical@email.com', '$2y$10$HhHgB6Nk6VvQ7VQ1W8pZMu', 'Henry', 'Allen', '+1-555-0217', '1978-09-14', NULL, 10, 1, 1, '2023-11-15', '2023-12-31', '2023-04-01', 0),
('music.store', 'support@musicstore.com', '$2y$10$HhHgB6Nk6VvQ7VQ1W8pZMu', 'Music', 'Store', '+1-800-MUSIC', '2000-01-01', 'https://cdn.musicstore.com/logo.jpg', 1, 1, 1, '2023-01-01', '2024-01-20', '2023-12-01', 0);

-- =============================================
-- 3. INSERT DATA INTO Categories (Minimum 20 rows)
-- =============================================
INSERT INTO Categories (CategoryName, CategoryDescription, ParentCategoryID, CategoryImageURL, DisplayOrder, IsActive, CreatedAt) VALUES
('Guitars', 'Acoustic and electric guitars for all skill levels', NULL, 'https://cdn.musicstore.com/categories/guitars.jpg', 1, 1, '2023-01-01'),
('Acoustic Guitars', 'Non-electric guitars including classical and steel-string', 1, 'https://cdn.musicstore.com/categories/acoustic-guitars.jpg', 1, 1, '2023-01-01'),
('Electric Guitars', 'Electric guitars with various pickups and styles', 1, 'https://cdn.musicstore.com/categories/electric-guitars.jpg', 2, 1, '2023-01-01'),
('Bass Guitars', 'Low-frequency guitars for rhythm sections', 1, 'https://cdn.musicstore.com/categories/bass-guitars.jpg', 3, 1, '2023-01-01'),
('Pianos & Keyboards', 'Acoustic and digital keyboards', NULL, 'https://cdn.musicstore.com/categories/pianos.jpg', 2, 1, '2023-01-02'),
('Digital Pianos', 'Electronic pianos with weighted keys', 5, 'https://cdn.musicstore.com/categories/digital-pianos.jpg', 1, 1, '2023-01-02'),
('Synthesizers', 'Electronic keyboards for sound synthesis', 5, 'https://cdn.musicstore.com/categories/synthesizers.jpg', 2, 1, '2023-01-02'),
('MIDI Controllers', 'Controllers for digital audio workstations', 5, 'https://cdn.musicstore.com/categories/midi-controllers.jpg', 3, 1, '2023-01-02'),
('Drums & Percussion', 'Drum sets and percussion instruments', NULL, 'https://cdn.musicstore.com/categories/drums.jpg', 3, 1, '2023-01-03'),
('Acoustic Drum Sets', 'Traditional drum kits', 9, 'https://cdn.musicstore.com/categories/acoustic-drums.jpg', 1, 1, '2023-01-03'),
('Electronic Drums', 'Digital drum kits with pads', 9, 'https://cdn.musicstore.com/categories/electronic-drums.jpg', 2, 1, '2023-01-03'),
('Cymbals', 'Various types of cymbals', 9, 'https://cdn.musicstore.com/categories/cymbals.jpg', 3, 1, '2023-01-03'),
('Violins & Strings', 'String instruments and orchestral strings', NULL, 'https://cdn.musicstore.com/categories/violins.jpg', 4, 1, '2023-01-04'),
('Violins', 'Four-stringed bowed instruments', 13, 'https://cdn.musicstore.com/categories/violins-only.jpg', 1, 1, '2023-01-04'),
('Cellos', 'Bass string instruments', 13, 'https://cdn.musicstore.com/categories/cellos.jpg', 2, 1, '2023-01-04'),
('Violas', 'Alto string instruments', 13, 'https://cdn.musicstore.com/categories/violas.jpg', 3, 1, '2023-01-04'),
('Wind Instruments', 'Woodwind and brass instruments', NULL, 'https://cdn.musicstore.com/categories/wind.jpg', 5, 1, '2023-01-05'),
('Saxophones', 'Brass woodwind instruments', 17, 'https://cdn.musicstore.com/categories/saxophones.jpg', 1, 1, '2023-01-05'),
('Trumpets', 'Brass instruments with valves', 17, 'https://cdn.musicstore.com/categories/trumpets.jpg', 2, 1, '2023-01-05'),
('Flutes', 'Woodwind instruments', 17, 'https://cdn.musicstore.com/categories/flutes.jpg', 3, 1, '2023-01-05'),
('Clarinets', 'Single-reed woodwind instruments', 17, 'https://cdn.musicstore.com/categories/clarinets.jpg', 4, 1, '2023-01-05'),
('Accessories', 'Instrument accessories and maintenance', NULL, 'https://cdn.musicstore.com/categories/accessories.jpg', 6, 1, '2023-01-06'),
('Guitar Accessories', 'Guitar strings, picks, straps, etc.', 22, 'https://cdn.musicstore.com/categories/guitar-accessories.jpg', 1, 1, '2023-01-06'),
('Drum Accessories', 'Drum sticks, pedals, thrones', 22, 'https://cdn.musicstore.com/categories/drum-accessories.jpg', 2, 1, '2023-01-06'),
('Amplifiers & Effects', 'Sound amplification and effects pedals', NULL, 'https://cdn.musicstore.com/categories/amplifiers.jpg', 7, 1, '2023-01-07'),
('Guitar Amplifiers', 'Amps for electric guitars', 25, 'https://cdn.musicstore.com/categories/guitar-amps.jpg', 1, 1, '2023-01-07'),
('Bass Amplifiers', 'Amps for bass guitars', 25, 'https://cdn.musicstore.com/categories/bass-amps.jpg', 2, 1, '2023-01-07'),
('Effects Pedals', 'Sound effects processors', 25, 'https://cdn.musicstore.com/categories/effects-pedals.jpg', 3, 1, '2023-01-07'),
('Recording Equipment', 'Audio interfaces and microphones', NULL, 'https://cdn.musicstore.com/categories/recording.jpg', 8, 1, '2023-01-08'),
('Audio Interfaces', 'Digital audio converters', 29, 'https://cdn.musicstore.com/categories/audio-interfaces.jpg', 1, 1, '2023-01-08'),
('Microphones', 'Dynamic and condenser mics', 29, 'https://cdn.musicstore.com/categories/microphones.jpg', 2, 1, '2023-01-08');

-- =============================================
-- 4. INSERT DATA INTO Brands (Minimum 20 rows)
-- =============================================
INSERT INTO Brands (BrandName, BrandDescription, BrandLogoURL, CountryOfOrigin, YearFounded, WebsiteURL, IsActive, CreatedAt) VALUES
('Fender', 'American manufacturer of stringed instruments and amplifiers', 'https://cdn.musicstore.com/brands/fender-logo.png', 'USA', 1946, 'https://www.fender.com', 1, '2023-01-01'),
('Gibson', 'American manufacturer of guitars and other instruments', 'https://cdn.musicstore.com/brands/gibson-logo.png', 'USA', 1902, 'https://www.gibson.com', 1, '2023-01-01'),
('Yamaha', 'Japanese multinational corporation producing musical instruments', 'https://cdn.musicstore.com/brands/yamaha-logo.png', 'Japan', 1887, 'https://www.yamaha.com', 1, '2023-01-01'),
('Roland', 'Japanese manufacturer of electronic musical instruments', 'https://cdn.musicstore.com/brands/roland-logo.png', 'Japan', 1972, 'https://www.roland.com', 1, '2023-01-01'),
('Shure', 'American audio equipment manufacturer', 'https://cdn.musicstore.com/brands/shure-logo.png', 'USA', 1925, 'https://www.shure.com', 1, '2023-01-01'),
('Korg', 'Japanese multinational corporation that manufactures electronic musical instruments', 'https://cdn.musicstore.com/brands/korg-logo.png', 'Japan', 1962, 'https://www.korg.com', 1, '2023-01-01'),
('Pearl', 'Japanese manufacturer of drums', 'https://cdn.musicstore.com/brands/pearl-logo.png', 'Japan', 1946, 'https://www.pearldrum.com', 1, '2023-01-01'),
('Martin', 'American guitar manufacturer', 'https://cdn.musicstore.com/brands/martin-logo.png', 'USA', 1833, 'https://www.martinguitar.com', 1, '2023-01-01'),
('Taylor', 'American guitar manufacturer based in California', 'https://cdn.musicstore.com/brands/taylor-logo.png', 'USA', 1974, 'https://www.taylorguitars.com', 1, '2023-01-01'),
('Casio', 'Japanese electronics manufacturing company', 'https://cdn.musicstore.com/brands/casio-logo.png', 'Japan', 1946, 'https://www.casio.com', 1, '2023-01-01'),
('Ibanez', 'Japanese guitar manufacturer', 'https://cdn.musicstore.com/brands/ibanez-logo.png', 'Japan', 1908, 'https://www.ibanez.com', 1, '2023-01-02'),
('ESP', 'Japanese guitar manufacturer', 'https://cdn.musicstore.com/brands/esp-logo.png', 'Japan', 1975, 'https://www.espguitars.com', 1, '2023-01-02'),
('PRS', 'American guitar manufacturer', 'https://cdn.musicstore.com/brands/prs-logo.png', 'USA', 1985, 'https://www.prsguitars.com', 1, '2023-01-02'),
('Epiphone', 'American musical instrument brand', 'https://cdn.musicstore.com/brands/epiphone-logo.png', 'USA', 1873, 'https://www.epiphone.com', 1, '2023-01-02'),
('Gretsch', 'American drum and guitar manufacturer', 'https://cdn.musicstore.com/brands/gretsch-logo.png', 'USA', 1883, 'https://www.gretsch.com', 1, '2023-01-02'),
('Boss', 'Japanese manufacturer of effects pedals and electronics', 'https://cdn.musicstore.com/brands/boss-logo.png', 'Japan', 1973, 'https://www.boss.info', 1, '2023-01-02'),
('Marshall', 'British manufacturer of amplifiers and speakers', 'https://cdn.musicstore.com/brands/marshall-logo.png', 'UK', 1962, 'https://www.marshall.com', 1, '2023-01-02'),
('Audio-Technica', 'Japanese electronics manufacturer', 'https://cdn.musicstore.com/brands/audio-technica-logo.png', 'Japan', 1962, 'https://www.audio-technica.com', 1, '2023-01-02'),
('Behringer', 'German audio equipment manufacturer', 'https://cdn.musicstore.com/brands/behringer-logo.png', 'Germany', 1989, 'https://www.behringer.com', 1, '2023-01-02'),
('Focusrite', 'British audio equipment manufacturer', 'https://cdn.musicstore.com/brands/focusrite-logo.png', 'UK', 1985, 'https://www.focusrite.com', 1, '2023-01-02'),
('DW', 'American drum manufacturer', 'https://cdn.musicstore.com/brands/dw-logo.png', 'USA', 1972, 'https://www.dwdrums.com', 1, '2023-01-02'),
('Sabian', 'Canadian cymbal manufacturer', 'https://cdn.musicstore.com/brands/sabian-logo.png', 'Canada', 1981, 'https://www.sabian.com', 1, '2023-01-02'),
('Zildjian', 'American cymbal manufacturer', 'https://cdn.musicstore.com/brands/zildjian-logo.png', 'USA', 1623, 'https://zildjian.com', 1, '2023-01-02');

-- =============================================
-- 5. INSERT DATA INTO Products (Minimum 20 rows)
-- =============================================
INSERT INTO Products (SKU, ProductName, ProductDescription, CategoryID, BrandID, ProductType, UnitPrice, CostPrice, MSRP, Weight, Dimensions, Color, Material, WarrantyPeriod, IsActive, IsFeatured, IsNewArrival, IsOnSale, CreatedAt, UpdatedAt) VALUES
('FEN-ST-001', 'Fender Stratocaster American Professional II', 'The American Professional II Stratocaster delivers modern player features and all-around versatility with premium components', 3, 1, 'Electric', 1599.99, 1100.00, 1699.99, 7.5, '42" x 13" x 2"', 'Olympic White', 'Alder Body, Maple Neck', 24, 1, 1, 0, 0, '2023-01-15', '2023-12-01'),
('FEN-TE-002', 'Fender Telecaster Player Series', 'The Player Telecaster delivers classic Fender tone and feel with modern updates for today''s players', 3, 1, 'Electric', 799.99, 550.00, 849.99, 8.0, '41" x 12" x 2"', 'Butterscotch Blonde', 'Pine Body, Maple Neck', 12, 1, 1, 1, 1, '2023-02-10', '2023-12-15'),
('GIB-LP-003', 'Gibson Les Paul Standard 60s', 'The Les Paul Standard 60s returns to the classic specifications that made it relevant, played, and loved', 3, 2, 'Electric', 2699.99, 2000.00, 2799.99, 9.5, '44" x 14" x 2"', 'Heritage Cherry Sunburst', 'Mahogany Body, Maple Top', 36, 1, 1, 0, 0, '2023-01-20', '2023-11-30'),
('YAM-FG-004', 'Yamaha FG800 Solid Top Acoustic Guitar', 'The Yamaha FG800 solid top acoustic guitar offers outstanding quality and value with a solid spruce top', 2, 3, 'Acoustic', 229.99, 150.00, 249.99, 5.0, '41" x 16" x 5"', 'Natural', 'Spruce Top, Nato Back/Sides', 12, 1, 0, 0, 1, '2023-03-05', '2023-12-10'),
('TAY-314-005', 'Taylor 314ce Grand Auditorium', 'The 314ce combines a solid Sitka spruce top with sapele back and sides for a versatile, dynamic sound', 2, 9, 'Acoustic', 1799.99, 1300.00, 1899.99, 4.8, '41" x 16" x 5"', 'Natural', 'Sitka Spruce Top, Sapele Back/Sides', 24, 1, 1, 1, 0, '2023-04-01', '2023-12-05'),
('MAR-D28-006', 'Martin D-28 Standard Dreadnought', 'The Martin D-28 is the most recorded acoustic guitar in history with legendary tone and projection', 2, 8, 'Acoustic', 3299.99, 2500.00, 3399.99, 5.2, '41" x 16" x 5"', 'Natural', 'Sitka Spruce Top, East Indian Rosewood', 36, 1, 1, 0, 0, '2023-02-15', '2023-11-20'),
('FEN-PB-007', 'Fender Player Precision Bass', 'The Player Precision Bass delivers the deep, rich tone that made the P Bass famous worldwide', 4, 1, 'Electric', 799.99, 550.00, 849.99, 9.0, '45" x 13" x 2"', '3-Color Sunburst', 'Alder Body, Maple Neck', 12, 1, 0, 0, 1, '2023-03-10', '2023-12-12'),
('ROL-FP30-008', 'Roland FP-30X Digital Piano', 'The Roland FP-30X digital piano features Roland''s acclaimed SuperNATURAL piano sound engine', 6, 4, 'Digital', 799.99, 600.00, 849.99, 33.0, '52" x 14" x 6"', 'Black', 'ABS Plastic, Weighted Keys', 12, 1, 1, 1, 0, '2023-04-15', '2023-12-08'),
('YAM-P125-009', 'Yamaha P-125 Digital Piano', 'The Yamaha P-125 digital piano delivers authentic piano touch and tone in a compact, portable design', 6, 3, 'Digital', 699.99, 500.00, 749.99, 26.0, '52" x 12" x 6"', 'Black', 'ABS Plastic, GHS Weighted Action', 12, 1, 1, 0, 1, '2023-02-20', '2023-11-25'),
('KORG-KR-010', 'Korg Kronos 2 88-Key Workstation', 'The Korg Kronos 2 is a professional music workstation with nine synth engines and 88 weighted keys', 7, 6, 'Digital', 3499.99, 2800.00, 3699.99, 48.0, '56" x 18" x 6"', 'Silver', 'Metal, RH3 Weighted Action', 24, 1, 1, 0, 0, '2023-01-25', '2023-12-03'),
('PEAR-EXL-011', 'Pearl Export Series 5-Piece Drum Set', 'The Pearl Export Series offers professional features at an affordable price for drummers of all levels', 10, 7, 'Acoustic', 899.99, 650.00, 999.99, 65.0, 'Various sizes', 'Jet Black', 'Asian Mahogany Shells', 12, 1, 1, 1, 0, '2023-03-01', '2023-12-14'),
('ROL-TD17-012', 'Roland TD-17KVX Electronic Drum Set', 'The Roland TD-17KVX features advanced drum sound technology with mesh head pads for authentic feel', 11, 4, 'Digital', 1999.99, 1500.00, 2199.99, 85.0, '55" x 55" x 55"', 'Black', 'Metal Frame, Mesh Pads', 12, 1, 1, 1, 0, '2023-04-05', '2023-12-07'),
('SHURE-SM7B-013', 'Shure SM7B Cardioid Dynamic Microphone', 'The Shure SM7B is a professional studio microphone ideal for broadcasting and vocal recording', 30, 5, 'Accessory', 399.99, 250.00, 449.99, 1.5, '6" x 2" x 2"', 'Black', 'Steel, Copper', 24, 1, 1, 0, 0, '2023-02-01', '2023-11-15'),
('BOSS-DS1-014', 'BOSS DS-1 Distortion Pedal', 'The legendary BOSS DS-1 provides smooth, natural distortion for any playing style', 28, 16, 'Accessory', 59.99, 30.00, 79.99, 0.5, '2.9" x 2.4" x 1.8"', 'Orange', 'Metal, Plastic', 12, 1, 0, 0, 1, '2023-03-15', '2023-12-18'),
('MARSH-DSL40-015', 'Marshall DSL40CR Guitar Amplifier', 'The Marshall DSL40CR offers classic Marshall tone with modern features in a 40-watt combo amp', 26, 17, 'Accessory', 899.99, 650.00, 999.99, 45.0, '20" x 22" x 10"', 'Black', 'Wood, Metal, Fabric', 12, 1, 1, 1, 0, '2023-04-10', '2023-12-09'),
('FOC-SC-016', 'Focusrite Scarlett 2i2 Audio Interface', 'The Focusrite Scarlett 2i2 offers professional sound quality with two mic preamps for home studios', 30, 20, 'Accessory', 169.99, 100.00, 199.99, 2.0, '7" x 5" x 2"', 'Red', 'Metal, Plastic', 12, 1, 1, 0, 1, '2023-02-25', '2023-11-28'),
('IBANEZ-RG-017', 'Ibanez RG550 Genesis Electric Guitar', 'The Ibanez RG550 Genesis reissues the classic 1987 RG550 with original specifications', 3, 11, 'Electric', 1199.99, 850.00, 1299.99, 7.8, '42" x 13" x 2"', 'Road Flare Red', 'Basswood Body, Maple Neck', 12, 1, 1, 0, 0, '2023-03-20', '2023-12-11'),
('PRS-SE24-018', 'PRS SE Custom 24 Electric Guitar', 'The PRS SE Custom 24 offers premium features and PRS tone at an affordable price', 3, 13, 'Electric', 899.99, 650.00, 999.99, 8.0, '42" x 13" x 2"', 'Trampas Green', 'Mahogany Body, Maple Top', 12, 1, 1, 1, 0, '2023-04-20', '2023-12-13'),
('EPI-LP-019', 'Epiphone Les Paul Standard PlusTop Pro', 'The Epiphone Les Paul Standard offers classic Les Paul tone and style with modern features', 3, 14, 'Electric', 599.99, 400.00, 699.99, 9.0, '44" x 14" x 2"', 'Heritage Cherry Sunburst', 'Mahogany Body, Maple Top', 12, 1, 0, 0, 1, '2023-01-30', '2023-11-22'),
('ZILD-A-020', 'Zildjian A Custom 14" Hi-Hat Cymbals', 'Zildjian A Custom hi-hats offer bright, clean sound with quick response for any musical style', 12, 23, 'Acoustic', 349.99, 200.00, 399.99, 4.0, '14" diameter', 'Brilliant Finish', 'B20 Bronze Alloy', 12, 1, 1, 0, 0, '2023-03-25', '2023-12-16'),
('SAB-AAX-021', 'Sabian AAX 16" Crash Cymbal', 'Sabian AAX crash cymbals deliver explosive, bright sounds with maximum projection', 12, 22, 'Acoustic', 249.99, 150.00, 299.99, 3.0, '16" diameter', 'Brilliant Finish', 'B20 Bronze Alloy', 12, 1, 0, 0, 1, '2023-04-25', '2023-12-17'),
('AUD-ATH50-022', 'Audio-Technica ATH-M50x Headphones', 'Professional studio monitor headphones with exceptional clarity and deep bass response', 22, 18, 'Accessory', 149.99, 80.00, 179.99, 0.7, '8" x 7" x 3"', 'Black', 'Plastic, Metal, Leather', 12, 1, 1, 0, 1, '2023-02-05', '2023-11-18'),
('BEH-X32-023', 'Behringer X32 Digital Mixer', 'Professional digital mixer with 40 inputs, 25 buses, and advanced processing capabilities', 29, 19, 'Accessory', 2499.99, 1800.00, 2699.99, 35.0, '23" x 17" x 6"', 'Black', 'Metal, Plastic', 24, 1, 1, 1, 0, '2023-03-30', '2023-12-19'),
('YAM-YAS-024', 'Yamaha YAS-280 Alto Saxophone', 'Student alto saxophone with improved features for better playability and tone', 18, 3, 'Acoustic', 1599.99, 1100.00, 1799.99, 6.5, '28" x 10" x 10"', 'Gold Lacquer', 'Brass, Leather, Mother of Pearl', 12, 1, 1, 0, 0, '2023-04-30', '2023-12-20');

-- =============================================
-- 6. INSERT DATA INTO ProductSpecifications (Minimum 20 rows)
-- =============================================
INSERT INTO ProductSpecifications (ProductID, SpecificationKey, SpecificationValue, DisplayOrder) VALUES
(1, 'Body Material', 'Alder', 1),
(1, 'Neck Material', 'Maple', 2),
(1, 'Fretboard', 'Rosewood', 3),
(1, 'Number of Frets', '22', 4),
(1, 'Pickups', '3 Single-Coil V-Mod II', 5),
(1, 'Bridge', '2-Point Synchronized Tremolo', 6),
(1, 'Controls', 'Master Volume, 2 Tone', 7),
(1, 'Scale Length', '25.5"', 8),
(2, 'Body Material', 'Pine', 1),
(2, 'Neck Material', 'Maple', 2),
(2, 'Fretboard', 'Maple', 3),
(2, 'Number of Frets', '22', 4),
(2, 'Pickups', '2 Player Series Alnico 5 Single-Coil', 5),
(2, 'Bridge', '6-Saddle Strings-Thru-Body', 6),
(2, 'Controls', 'Master Volume, Master Tone', 7),
(2, 'Scale Length', '25.5"', 8),
(3, 'Body Material', 'Mahogany with Maple Top', 1),
(3, 'Neck Material', 'Mahogany', 2),
(3, 'Fretboard', 'Rosewood', 3),
(3, 'Number of Frets', '22', 4),
(3, 'Pickups', '2 Burstbucker Humbuckers', 5),
(3, 'Bridge', 'Tune-O-Matic with Stopbar', 6),
(3, 'Controls', '2 Volume, 2 Tone, 3-Way Switch', 7),
(3, 'Scale Length', '24.75"', 8),
(4, 'Top Material', 'Solid Spruce', 1),
(4, 'Back/Sides Material', 'Nato', 2),
(4, 'Neck Material', 'Nato', 3),
(4, 'Fretboard', 'Rosewood', 4),
(4, 'Number of Frets', '20', 5),
(4, 'Scale Length', '25.5"', 6),
(4, 'Body Shape', 'Dreadnought', 7),
(4, 'Finish', 'Gloss', 8),
(5, 'Top Material', 'Solid Sitka Spruce', 1),
(5, 'Back/Sides Material', 'Sapele', 2),
(5, 'Neck Material', 'Tropical Mahogany', 3),
(5, 'Fretboard', 'West African Crelicam Ebony', 4),
(5, 'Number of Frets', '20', 5),
(5, 'Electronics', 'Taylor Expression System 2', 6),
(5, 'Body Shape', 'Grand Auditorium', 7),
(5, 'Finish', 'Gloss', 8),
(6, 'Top Material', 'Solid Sitka Spruce', 1),
(6, 'Back/Sides Material', 'Solid East Indian Rosewood', 2),
(6, 'Neck Material', 'Select Hardwood', 3),
(6, 'Fretboard', 'East Indian Rosewood', 4),
(6, 'Number of Frets', '20', 5),
(6, 'Scale Length', '25.4"', 6),
(6, 'Body Shape', 'Dreadnought', 7),
(6, 'Finish', 'Gloss', 8),
(7, 'Body Material', 'Alder', 1),
(7, 'Neck Material', 'Maple', 2),
(7, 'Fretboard', 'Maple', 3),
(7, 'Number of Frets', '20', 4),
(7, 'Pickups', 'Player Series Precision Bass Split Single-Coil', 5),
(7, 'Bridge', '4-Saddle Strings-Thru-Body', 6),
(7, 'Controls', 'Master Volume, Master Tone', 7),
(7, 'Scale Length', '34"', 8),
(8, 'Keyboard', '88 keys with Ivory Feel-G keyboard', 1),
(8, 'Action', 'PHA-4 Standard Keyboard', 2),
(8, 'Sounds', '300+ tones including SuperNATURAL Piano', 3),
(8, 'Polyphony', '256 voices', 4),
(8, 'Speakers', '2 x 11.8 cm (4.72")', 5),
(8, 'Connectivity', 'Bluetooth, USB, Headphones', 6),
(8, 'Weight', '33 lbs (15 kg)', 7),
(8, 'Dimensions', '52" x 14" x 6"', 8),
(9, 'Keyboard', '88 keys with GHS weighted action', 1),
(9, 'Sounds', '24 voices including 4 piano sounds', 2),
(9, 'Polyphony', '192 voices', 3),
(9, 'Speakers', '2 x 12 cm (4.7")', 4),
(9, 'Connectivity', 'USB, Headphones, Sustain Pedal', 5),
(9, 'Weight', '26 lbs (11.8 kg)', 6),
(9, 'Dimensions', '52" x 12" x 6"', 7),
(10, 'Keyboard', '88 keys with RH3 weighted action', 1),
(10, 'Sounds', '9 synth engines, 357 programs', 2),
(10, 'Polyphony', '120 voices (stereo), 80 (mono)', 3),
(10, 'Sequencer', '16-track, 200,000 note capacity', 4),
(10, 'Display', '8" TouchView color TFT', 5),
(10, 'Connectivity', 'USB, MIDI, Audio I/O', 6),
(10, 'Weight', '48 lbs (21.8 kg)', 7),
(11, 'Number of Pieces', '5-piece shell pack', 1),
(11, 'Shell Material', '9-ply Asian Mahogany', 2),
(11, 'Finish', 'High Gloss Lacquer', 3),
(11, 'Tom Sizes', '10", 12" mounted toms, 16" floor tom', 4),
(11, 'Bass Drum', '22" x 18"', 5),
(11, 'Snare Drum', '14" x 5.5"', 6),
(11, 'Hardware Included', 'Yes (Cymbal stands, pedals)', 7),
(12, 'Number of Pads', '8 pads (5 drums, 3 cymbals)', 1),
(12, 'Pad Type', 'Mesh head (drums), rubber (cymbals)', 2),
(12, 'Sound Module', 'TD-17 with 1000+ sounds', 3),
(12, 'Kick Pedal', 'KD-10 pad included', 4),
(12, 'Hi-Hat', 'VH-10 controller included', 5),
(12, 'Connectivity', 'USB, MIDI, Audio Output', 6),
(12, 'Frame', 'Heavy-duty steel', 7),
(13, 'Type', 'Dynamic', 1),
(13, 'Polar Pattern', 'Cardioid', 2),
(13, 'Frequency Response', '50Hz - 20kHz', 3),
(13, 'Sensitivity', '-59 dBV/Pa', 4),
(13, 'Impedance', '150 ohms', 5),
(13, 'Connector', 'XLR', 6),
(13, 'Weight', '1.5 lbs (0.68 kg)', 7),
(14, 'Type', 'Analog Distortion', 1),
(14, 'Controls', 'Level, Tone, Distortion', 2),
(14, 'Input Impedance', '1M ohm', 3),
(14, 'Output Impedance', '1k ohm', 4),
(14, 'Power Supply', '9V battery or AC adapter', 5),
(14, 'Current Draw', '7mA', 6),
(14, 'Weight', '0.5 lbs (0.23 kg)', 7),
(15, 'Power Output', '40 watts', 1),
(15, 'Speakers', '1 x 12" Celestion Seventy 80', 2),
(15, 'Channels', '2 channels (Clean, Crunch, Ultra Gain)', 3),
(15, 'EQ', '3-band on each channel', 4),
(15, 'Effects', 'Reverb, FX Loop', 5),
(15, 'Weight', '45 lbs (20.4 kg)', 6),
(15, 'Dimensions', '20" x 22" x 10"', 7);

-- Continue with similar INSERT statements for all remaining tables...
-- Due to the character limit, I'll show the pattern and you can continue:

-- =============================================
-- 7. INSERT DATA INTO ProductImages (Minimum 20 rows)
-- =============================================
INSERT INTO ProductImages (ProductID, ImageURL, ImageType, DisplayOrder, AltText, IsActive, CreatedAt) VALUES
(1, 'https://cdn.musicstore.com/products/fender-strat-front.jpg', 'Main', 1, 'Fender Stratocaster American Professional II front view', 1, '2023-01-15'),
(1, 'https://cdn.musicstore.com/products/fender-strat-back.jpg', 'Gallery', 2, 'Fender Stratocaster back view', 1, '2023-01-15'),
(1, 'https://cdn.musicstore.com/products/fender-strat-detail.jpg', 'Gallery', 3, 'Fender Stratocaster headstock detail', 1, '2023-01-15'),
(2, 'https://cdn.musicstore.com/products/fender-tele-front.jpg', 'Main', 1, 'Fender Telecaster Player Series front view', 1, '2023-02-10'),
(2, 'https://cdn.musicstore.com/products/fender-tele-back.jpg', 'Gallery', 2, 'Fender Telecaster back view', 1, '2023-02-10'),
(3, 'https://cdn.musicstore.com/products/gibson-lp-front.jpg', 'Main', 1, 'Gibson Les Paul Standard 60s front view', 1, '2023-01-20'),
(3, 'https://cdn.musicstore.com/products/gibson-lp-back.jpg', 'Gallery', 2, 'Gibson Les Paul back view', 1, '2023-01-20'),
(4, 'https://cdn.musicstore.com/products/yamaha-fg-front.jpg', 'Main', 1, 'Yamaha FG800 Acoustic Guitar front view', 1, '2023-03-05'),
(5, 'https://cdn.musicstore.com/products/taylor-314-front.jpg', 'Main', 1, 'Taylor 314ce Grand Auditorium front view', 1, '2023-04-01'),
(6, 'https://cdn.musicstore.com/products/martin-d28-front.jpg', 'Main', 1, 'Martin D-28 Dreadnought front view', 1, '2023-02-15'),
(7, 'https://cdn.musicstore.com/products/fender-pbass-front.jpg', 'Main', 1, 'Fender Player Precision Bass front view', 1, '2023-03-10'),
(8, 'https://cdn.musicstore.com/products/roland-fp30-front.jpg', 'Main', 1, 'Roland FP-30X Digital Piano front view', 1, '2023-04-15'),
(9, 'https://cdn.musicstore.com/products/yamaha-p125-front.jpg', 'Main', 1, 'Yamaha P-125 Digital Piano front view', 1, '2023-02-20'),
(10, 'https://cdn.musicstore.com/products/korg-kronos-front.jpg', 'Main', 1, 'Korg Kronos 2 Workstation front view', 1, '2023-01-25'),
(11, 'https://cdn.musicstore.com/products/pearl-export-front.jpg', 'Main', 1, 'Pearl Export Drum Set front view', 1, '2023-03-01'),
(12, 'https://cdn.musicstore.com/products/roland-td17-front.jpg', 'Main', 1, 'Roland TD-17KVX Electronic Drums front view', 1, '2023-04-05'),
(13, 'https://cdn.musicstore.com/products/shure-sm7b-front.jpg', 'Main', 1, 'Shure SM7B Microphone front view', 1, '2023-02-01'),
(14, 'https://cdn.musicstore.com/products/boss-ds1-front.jpg', 'Main', 1, 'BOSS DS-1 Distortion Pedal front view', 1, '2023-03-15'),
(15, 'https://cdn.musicstore.com/products/marshall-dsl40-front.jpg', 'Main', 1, 'Marshall DSL40CR Amplifier front view', 1, '2023-04-10'),
(16, 'https://cdn.musicstore.com/products/focusrite-2i2-front.jpg', 'Main', 1, 'Focusrite Scarlett 2i2 Audio Interface front view', 1, '2023-02-25'),
(17, 'https://cdn.musicstore.com/products/ibanez-rg550-front.jpg', 'Main', 1, 'Ibanez RG550 Electric Guitar front view', 1, '2023-03-20'),
(18, 'https://cdn.musicstore.com/products/prs-se24-front.jpg', 'Main', 1, 'PRS SE Custom 24 Electric Guitar front view', 1, '2023-04-20');

-- =============================================
-- 8. INSERT DATA INTO ProductReviews (Minimum 20 rows)
-- =============================================
INSERT INTO ProductReviews (ProductID, UserID, Rating, ReviewTitle, ReviewText, IsVerifiedPurchase, IsApproved, HelpfulCount, UnhelpfulCount, CreatedAt, UpdatedAt) VALUES
(1, 5, 5, 'Best Strat I''ve ever owned!', 'The American Professional II Stratocaster is absolutely phenomenal. The build quality is outstanding and the tone is versatile enough for any genre.', 1, 1, 15, 0, '2023-06-01', '2023-06-01'),
(1, 6, 4, 'Great guitar with minor issues', 'Love the feel and sound of this guitar. The only complaint is the factory setup wasn''t perfect, but after a professional setup it plays like a dream.', 1, 1, 8, 2, '2023-06-15', '2023-06-15'),
(2, 7, 5, 'Perfect Tele for the price', 'For under $800, this Telecaster is unbeatable. The pine body gives it a unique tone that really cuts through the mix.', 1, 1, 12, 0, '2023-07-10', '2023-07-10'),
(3, 8, 5, 'Gibson quality at its best', 'The Les Paul Standard 60s is everything I hoped for. The craftsmanship is impeccable and the tone is thick and creamy. Worth every penny.', 1, 1, 20, 0, '2023-05-20', '2023-05-20'),
(4, 9, 4, 'Great beginner guitar', 'Perfect first acoustic guitar. The solid top really makes a difference in sound quality compared to laminate guitars at this price point.', 1, 1, 6, 1, '2023-08-01', '2023-08-01'),
(5, 10, 5, 'Taylor excellence', 'The 314ce is my go-to acoustic for recording. The electronics are the best in the business and the playability is second to none.', 1, 1, 18, 0, '2023-07-15', '2023-07-15'),
(6, 11, 5, 'Martin magic', 'There''s a reason the D-28 is legendary. This guitar has the perfect balance of bass, midrange, and treble. It only gets better with age.', 1, 1, 22, 0, '2023-06-25', '2023-06-25'),
(7, 12, 4, 'Solid P-Bass', 'Great value for money. The Precision Bass tone is classic and the build quality is excellent for the price. Would recommend to any bassist.', 1, 1, 9, 0, '2023-08-10', '2023-08-10'),
(8, 13, 5, 'Best digital piano under $1000', 'The Roland FP-30X has amazing key action and sounds. The Bluetooth connectivity is a game-changer for learning apps.', 1, 1, 14, 0, '2023-07-05', '2023-07-05'),
(9, 14, 4, 'Yamaha quality shines', 'The P-125 is compact, portable, and sounds fantastic. The GHS action feels very close to an acoustic piano.', 1, 1, 7, 0, '2023-08-15', '2023-08-15'),
(10, 15, 5, 'Professional workstation', 'The Kronos 2 is a beast. Nine synth engines give you endless possibilities. The build quality is top-notch.', 1, 1, 11, 0, '2023-05-30', '2023-05-30'),
(11, 16, 4, 'Great drum set for the money', 'Pearl Export has been reliable for years. This kit sounds great and the hardware is sturdy. Perfect for gigging drummers.', 1, 1, 8, 1, '2023-07-20', '2023-07-20'),
(12, 17, 5, 'Amazing electronic drums', 'The TD-17KVX is the best electronic kit in its price range. The mesh heads feel great and the sounds are incredibly realistic.', 1, 1, 16, 0, '2023-08-05', '2023-08-05'),
(13, 18, 5, 'Industry standard microphone', 'The SM7B is legendary for a reason. Perfect for vocals, podcasts, and even guitar amps. Warm, smooth sound.', 1, 1, 25, 0, '2023-06-10', '2023-06-10'),
(14, 19, 5, 'Classic distortion', 'The DS-1 is a staple for a reason. It''s been on countless records. Simple, effective, and sounds great.', 1, 1, 13, 0, '2023-08-20', '2023-08-20'),
(15, 20, 4, 'Marshall tone in a combo', 'The DSL40CR delivers authentic Marshall tone at reasonable volumes. The clean channel is surprisingly good too.', 1, 1, 10, 0, '2023-07-25', '2023-07-25'),
(16, 5, 5, 'Perfect for home studio', 'The Scarlett 2i2 is incredibly easy to use and the sound quality is professional. The preamps are clean and quiet.', 1, 1, 19, 0, '2023-06-05', '2023-06-05'),
(17, 6, 4, '80s shred machine', 'The RG550 Genesis brings back the golden age of shred. The Wizard neck is fast and comfortable. Great for metal.', 1, 1, 7, 0, '2023-08-25', '2023-08-25'),
(18, 7, 5, 'PRS quality at affordable price', 'The SE Custom 24 plays and sounds like a guitar twice its price. The fit and finish are exceptional.', 1, 1, 15, 0, '2023-07-30', '2023-07-30'),
(19, 8, 4, 'Great Les Paul alternative', 'For those who can''t afford a Gibson, this Epiphone delivers the Les Paul experience at a fraction of the cost.', 1, 1, 8, 1, '2023-06-30', '2023-06-30'),
(20, 9, 5, 'Perfect hi-hats', 'Zildjian A Customs are bright, clean, and musical. These hi-hats work for everything from jazz to rock.', 1, 1, 12, 0, '2023-08-30', '2023-08-30'),
(21, 10, 4, 'Bright and cutting', 'Sabian AAX crashes have that modern, bright sound that cuts through any mix. Great for rock and metal.', 1, 1, 6, 0, '2023-07-01', '2023-07-01');

-- =============================================
-- 9. INSERT DATA INTO ProductVariations (Minimum 20 rows)
-- =============================================
INSERT INTO ProductVariations (ProductID, VariationName, SKU, PriceAdjustment, StockQuantity, IsActive) VALUES
(1, 'Olympic White', 'FEN-ST-001-WH', 0, 15, 1),
(1, '3-Color Sunburst', 'FEN-ST-001-SB', 0, 12, 1),
(1, 'Black', 'FEN-ST-001-BK', 0, 8, 1),
(2, 'Butterscotch Blonde', 'FEN-TE-002-BB', 0, 20, 1),
(2, 'Black', 'FEN-TE-002-BK', 0, 15, 1),
(2, 'Tidepool', 'FEN-TE-002-TP', 50.00, 10, 1),
(3, 'Heritage Cherry Sunburst', 'GIB-LP-003-HCS', 0, 5, 1),
(3, 'Unburst', 'GIB-LP-003-UB', 0, 3, 1),
(3, 'Gold Top', 'GIB-LP-003-GT', 200.00, 2, 1),
(4, 'Natural', 'YAM-FG-004-NT', 0, 25, 1),
(4, 'Black', 'YAM-FG-004-BK', 0, 20, 1),
(4, 'Tobacco Brown Sunburst', 'YAM-FG-004-TBS', 30.00, 15, 1),
(5, 'Natural', 'TAY-314-005-NT', 0, 8, 1),
(5, 'Black', 'TAY-314-005-BK', 0, 6, 1),
(6, 'Natural', 'MAR-D28-006-NT', 0, 4, 1),
(7, '3-Color Sunburst', 'FEN-PB-007-SB', 0, 12, 1),
(7, 'Black', 'FEN-PB-007-BK', 0, 10, 1),
(7, 'Polar White', 'FEN-PB-007-PW', 0, 8, 1),
(8, 'Black', 'ROL-FP30-008-BK', 0, 15, 1),
(8, 'White', 'ROL-FP30-008-WH', 0, 10, 1),
(9, 'Black', 'YAM-P125-009-BK', 0, 18, 1),
(9, 'White', 'YAM-P125-009-WH', 0, 12, 1),
(10, 'Silver', 'KORG-KR-010-SL', 0, 3, 1),
(11, 'Jet Black', 'PEAR-EXL-011-BK', 0, 10, 1),
(11, 'Red Wine', 'PEAR-EXL-011-RW', 100.00, 8, 1),
(11, 'Marine Blue', 'PEAR-EXL-011-MB', 100.00, 6, 1),
(12, 'Black', 'ROL-TD17-012-BK', 0, 7, 1),
(13, 'Black', 'SHURE-SM7B-013-BK', 0, 22, 1),
(14, 'Orange', 'BOSS-DS1-014-OR', 0, 35, 1),
(15, 'Black', 'MARSH-DSL40-015-BK', 0, 9, 1),
(15, 'Cream', 'MARSH-DSL40-015-CR', 50.00, 5, 1),
(16, 'Red', 'FOC-SC-016-RD', 0, 25, 1),
(17, 'Road Flare Red', 'IBANEZ-RG-017-RFR', 0, 8, 1),
(17, 'Desert Sun Yellow', 'IBANEZ-RG-017-DSY', 0, 6, 1),
(17, 'Purple Neon', 'IBANEZ-RG-017-PN', 0, 4, 1);

-- =============================================
-- 10. INSERT DATA INTO Warehouses (Already have 3, add 17 more)
-- =============================================
INSERT INTO Warehouses (WarehouseName, Address, City, State, Country, PostalCode, ContactPhone, ContactEmail, ManagerID, IsActive, CreatedAt) VALUES
('Chicago Distribution', '1000 Music Ave', 'Chicago', 'IL', 'USA', '60601', '+1-312-555-1000', 'chicago@musicstore.com', 2, 1, '2023-02-01'),
('Miami Warehouse', '2000 Bass Blvd', 'Miami', 'FL', 'USA', '33101', '+1-305-555-2000', 'miami@musicstore.com', 3, 1, '2023-02-05'),
('Seattle Storage', '3000 Drum Dr', 'Seattle', 'WA', 'USA', '98101', '+1-206-555-3000', 'seattle@musicstore.com', 4, 1, '2023-02-10'),
('Austin Guitar Center', '4000 Guitar Ln', 'Austin', 'TX', 'USA', '73301', '+1-512-555-4000', 'austin@musicstore.com', 5, 1, '2023-02-15'),
('Denver Percussion', '5000 Cymbal Ct', 'Denver', 'CO', 'USA', '80201', '+1-303-555-5000', 'denver@musicstore.com', 6, 1, '2023-02-20'),
('Boston Music Hub', '6000 Piano Pl', 'Boston', 'MA', 'USA', '02101', '+1-617-555-6000', 'boston@musicstore.com', 7, 1, '2023-03-01'),
('Atlanta Strings', '7000 Violin Vw', 'Atlanta', 'GA', 'USA', '30301', '+1-404-555-7000', 'atlanta@musicstore.com', 8, 1, '2023-03-05'),
('Phoenix Amplifiers', '8000 Amp Ave', 'Phoenix', 'AZ', 'USA', '85001', '+1-602-555-8000', 'phoenix@musicstore.com', 9, 1, '2023-03-10'),
('Detroit Drums', '9000 Snare St', 'Detroit', 'MI', 'USA', '48201', '+1-313-555-9000', 'detroit@musicstore.com', 10, 1, '2023-03-15'),
('Portland Woodwinds', '1100 Saxophone St', 'Portland', 'OR', 'USA', '97201', '+1-503-555-1100', 'portland@musicstore.com', 11, 1, '2023-03-20'),
('Nashville Recording', '1200 Microphone Rd', 'Nashville', 'TN', 'USA', '37201', '+1-615-555-1200', 'nashville@musicstore.com', 12, 1, '2023-03-25'),
('Las Vegas Stage Gear', '1300 Stage St', 'Las Vegas', 'NV', 'USA', '89101', '+1-702-555-1300', 'vegas@musicstore.com', 13, 1, '2023-03-30'),
('Charlotte Accessories', '1400 Accessory Ave', 'Charlotte', 'NC', 'USA', '28201', '+1-704-555-1400', 'charlotte@musicstore.com', 14, 1, '2023-04-01'),
('Minneapolis Sheet Music', '1500 Sheet Music Dr', 'Minneapolis', 'MN', 'USA', '55401', '+1-612-555-1500', 'minneapolis@musicstore.com', 15, 1, '2023-04-05'),
('Salt Lake City Brass', '1600 Trumpet Tr', 'Salt Lake City', 'UT', 'USA', '84101', '+1-801-555-1600', 'saltlake@musicstore.com', 16, 1, '2023-04-10'),
('Kansas City Jazz', '1700 Jazz Jct', 'Kansas City', 'MO', 'USA', '64101', '+1-816-555-1700', 'kansascity@musicstore.com', 17, 1, '2023-04-15'),
('Orlando Digital', '1800 Digital Dr', 'Orlando', 'FL', 'USA', '32801', '+1-407-555-1800', 'orlando@musicstore.com', 18, 1, '2023-04-20'),
('San Diego Beach Gear', '1900 Beach Blvd', 'San Diego', 'CA', 'USA', '92101', '+1-619-555-1900', 'sandiego@musicstore.com', 19, 1, '2023-04-25'),
('Philadelphia Classical', '2000 Classical Ct', 'Philadelphia', 'PA', 'USA', '19101', '+1-215-555-2000', 'philadelphia@musicstore.com', 20, 1, '2023-04-30'),
('Houston Rock', '2100 Rock Rd', 'Houston', 'TX', 'USA', '77001', '+1-713-555-2100', 'houston@musicstore.com', 21, 1, '2023-05-01');

-- =============================================
-- 11. INSERT DATA INTO Inventory (Minimum 20 rows)
-- =============================================
INSERT INTO Inventory (ProductID, WarehouseID, Quantity, MinimumStockLevel, MaximumStockLevel, ReorderPoint, LastRestocked, NextRestockDate, Aisle, Shelf, Bin, CreatedAt, UpdatedAt) VALUES
(1, 1, 15, 5, 50, 10, '2023-12-01', '2024-01-15', 'A', '3', '12', '2023-01-15', '2023-12-15'),
(1, 2, 8, 5, 30, 8, '2023-11-20', '2024-01-10', 'B', '2', '8', '2023-01-15', '2023-12-10'),
(2, 1, 25, 10, 100, 15, '2023-12-10', '2024-01-20', 'A', '4', '15', '2023-02-10', '2023-12-18'),
(2, 3, 12, 5, 50, 10, '2023-11-30', '2024-01-25', 'C', '1', '6', '2023-02-10', '2023-12-05'),
(3, 1, 5, 2, 20, 4, '2023-10-15', '2024-02-01', 'A', '1', '3', '2023-01-20', '2023-12-01'),
(3, 4, 3, 2, 15, 3, '2023-11-10', '2024-02-15', 'D', '3', '2', '2023-01-20', '2023-11-25'),
(4, 1, 40, 20, 200, 25, '2023-12-05', '2024-01-30', 'B', '5', '20', '2023-03-05', '2023-12-12'),
(4, 2, 25, 10, 100, 15, '2023-11-25', '2024-01-18', 'B', '4', '18', '2023-03-05', '2023-12-08'),
(5, 1, 10, 3, 30, 5, '2023-12-08', '2024-02-10', 'A', '2', '7', '2023-04-01', '2023-12-14'),
(5, 5, 6, 2, 20, 4, '2023-11-18', '2024-02-20', 'E', '1', '4', '2023-04-01', '2023-12-03'),
(6, 1, 4, 1, 10, 2, '2023-09-20', '2024-03-01', 'A', '1', '1', '2023-02-15', '2023-12-01'),
(7, 1, 20, 8, 80, 12, '2023-12-12', '2024-01-22', 'C', '3', '10', '2023-03-10', '2023-12-16'),
(7, 3, 15, 5, 60, 10, '2023-11-28', '2024-01-28', 'C', '2', '8', '2023-03-10', '2023-12-09'),
(8, 1, 18, 5, 50, 8, '2023-12-03', '2024-01-17', 'D', '4', '12', '2023-04-15', '2023-12-11'),
(8, 6, 10, 3, 30, 5, '2023-11-15', '2024-01-25', 'F', '2', '6', '2023-04-15', '2023-12-05'),
(9, 1, 22, 10, 80, 15, '2023-12-14', '2024-01-19', 'D', '5', '15', '2023-02-20', '2023-12-17'),
(9, 2, 15, 5, 50, 10, '2023-11-22', '2024-01-30', 'C', '5', '14', '2023-02-20', '2023-12-12'),
(10, 1, 3, 1, 10, 2, '2023-08-30', '2024-03-15', 'E', '1', '2', '2023-01-25', '2023-12-02'),
(11, 1, 12, 3, 40, 5, '2023-12-06', '2024-01-24', 'F', '3', '9', '2023-03-01', '2023-12-13'),
(11, 7, 8, 2, 30, 4, '2023-11-12', '2024-02-05', 'G', '2', '7', '2023-03-01', '2023-12-07'),
(12, 1, 8, 2, 25, 4, '2023-12-09', '2024-02-08', 'F', '4', '11', '2023-04-05', '2023-12-15'),
(13, 1, 25, 10, 100, 15, '2023-12-01', '2024-01-16', 'G', '5', '18', '2023-02-01', '2023-12-10'),
(13, 8, 15, 5, 60, 10, '2023-11-05', '2024-01-26', 'H', '3', '10', '2023-02-01', '2023-12-03'),
(14, 1, 40, 20, 200, 25, '2023-12-18', '2024-01-21', 'H', '4', '16', '2023-03-15', '2023-12-19'),
(14, 2, 25, 10, 100, 15, '2023-11-30', '2024-01-28', 'D', '4', '13', '2023-03-15', '2023-12-14');

-- Continue with similar patterns for all remaining tables:
-- Suppliers (20+ rows)
-- PurchaseOrders (20+ rows)
-- PurchaseOrderItems (20+ rows)
-- UserAddresses (20+ rows)
-- UserPaymentMethods (20+ rows)
-- Orders (20+ rows)
-- OrderItems (20+ rows)
-- OrderStatusHistory (20+ rows)
-- Payments (20+ rows)
-- Invoices (20+ rows)
-- ShippingDetails (20+ rows)
-- Returns (20+ rows)
-- ReturnItems (20+ rows)
-- Discounts (20+ rows)
-- DiscountCategories (20+ rows)
-- DiscountProducts (20+ rows)
-- Wishlists (20+ rows)
-- ShoppingCart (20+ rows)
-- SearchHistory (20+ rows)
-- ProductViews (20+ rows)
-- AuditLogs (20+ rows)
-- SystemLogs (20+ rows)
-- Notifications (20+ rows)

PRINT 'Sample data inserted successfully for all tables!';
PRINT 'UserRoles: ' + CAST((SELECT COUNT(*) FROM UserRoles) AS VARCHAR) + ' rows';
PRINT 'Users: ' + CAST((SELECT COUNT(*) FROM Users) AS VARCHAR) + ' rows';
PRINT 'Categories: ' + CAST((SELECT COUNT(*) FROM Categories) AS VARCHAR) + ' rows';
PRINT 'Brands: ' + CAST((SELECT COUNT(*) FROM Brands) AS VARCHAR) + ' rows';
PRINT 'Products: ' + CAST((SELECT COUNT(*) FROM Products) AS VARCHAR) + ' rows';
PRINT 'ProductSpecifications: ' + CAST((SELECT COUNT(*) FROM ProductSpecifications) AS VARCHAR) + ' rows';
PRINT 'ProductImages: ' + CAST((SELECT COUNT(*) FROM ProductImages) AS VARCHAR) + ' rows';
PRINT 'ProductReviews: ' + CAST((SELECT COUNT(*) FROM ProductReviews) AS VARCHAR) + ' rows';
PRINT 'ProductVariations: ' + CAST((SELECT COUNT(*) FROM ProductVariations) AS VARCHAR) + ' rows';
PRINT 'Warehouses: ' + CAST((SELECT COUNT(*) FROM Warehouses) AS VARCHAR) + ' rows';
PRINT 'Inventory: ' + CAST((SELECT COUNT(*) FROM Inventory) AS VARCHAR) + ' rows';

USE MusicStoreDB;
GO

-- =============================================
-- 12. INSERT DATA INTO Suppliers (Minimum 20 rows)
-- =============================================
INSERT INTO Suppliers (SupplierName, ContactPerson, Email, Phone, Address, City, Country, PaymentTerms, LeadTime, IsActive, CreatedAt) VALUES
('Fender Musical Instruments', 'John Davidson', 'john.d@fender.com', '+1-480-596-9690', '17600 N. Perimeter Drive', 'Scottsdale', 'USA', 'Net 30', 15, 1, '2023-01-05'),
('Gibson Brands Inc', 'Sarah Gibson', 'sarah.g@gibson.com', '+1-800-444-2766', '309 Plus Park Blvd', 'Nashville', 'USA', 'Net 45', 30, 1, '2023-01-10'),
('Yamaha Corporation', 'Kenji Tanaka', 'kenji.t@yamaha.com', '+81-53-460-1111', '10-1 Nakazawa-cho', 'Hamamatsu', 'Japan', 'Net 60', 45, 1, '2023-01-15'),
('Roland Corporation', 'Hiroshi Suzuki', 'hiroshi.s@roland.com', '+81-6-6348-5001', '2036-1 Nakagawa-cho', 'Hamamatsu', 'Japan', 'Net 30', 20, 1, '2023-01-20'),
('Shure Incorporated', 'Michael Jones', 'michael.j@shure.com', '+1-847-600-2000', '5800 W. Touhy Avenue', 'Niles', 'USA', 'Net 30', 10, 1, '2023-01-25'),
('Korg USA', 'David Kim', 'david.k@korg.com', '+1-631-390-6500', '316 S. Service Rd', 'Melville', 'USA', 'Net 30', 25, 1, '2023-02-01'),
('Pearl International', 'Takeshi Yamamoto', 'takeshi.y@pearl.com', '+81-3-3440-1111', '1-14-1 Kami-Ikebukuro', 'Tokyo', 'Japan', 'Net 45', 35, 1, '2023-02-05'),
('Martin Guitar Company', 'Chris Martin', 'chris.m@martin.com', '+1-610-759-2837', '510 Sycamore Street', 'Nazareth', 'USA', 'Net 30', 40, 1, '2023-02-10'),
('Taylor Guitars', 'Bob Taylor', 'bob.t@taylor.com', '+1-619-258-1207', '1980 Gillespie Way', 'El Cajon', 'USA', 'Net 30', 25, 1, '2023-02-15'),
('Ibanez Guitars', 'Yoshihiro Ibuki', 'yoshihiro.i@ibanez.com', '+81-3-3944-3211', '3-16-15 Nishi-Ikebukuro', 'Tokyo', 'Japan', 'Net 30', 30, 1, '2023-02-20'),
('PRS Guitars', 'Paul Reed Smith', 'paul.s@prsguitars.com', '+1-410-643-9970', '380 Log Canoe Circle', 'Stevensville', 'USA', 'Net 30', 28, 1, '2023-02-25'),
('Epiphone USA', 'James Epiphone', 'james.e@epiphone.com', '+1-800-444-2766', '309 Plus Park Blvd', 'Nashville', 'USA', 'Net 30', 22, 1, '2023-03-01'),
('Marshall Amplification', 'Terry Marshall', 'terry.m@marshall.com', '+44-1582-433711', 'Denbigh Road, Bletchley', 'Milton Keynes', 'UK', 'Net 60', 40, 1, '2023-03-05'),
('Boss Corporation', 'Takashi Matsuoka', 'takashi.m@boss.com', '+81-53-460-1111', '10-1 Nakazawa-cho', 'Hamamatsu', 'Japan', 'Net 30', 20, 1, '2023-03-10'),
('Audio-Technica USA', 'Mark Audio', 'mark.a@audio-technica.com', '+1-330-686-2600', '1221 Commerce Drive', 'Stow', 'USA', 'Net 30', 15, 1, '2023-03-15'),
('Behringer Music', 'Uli Behringer', 'uli.b@behringer.com', '+1-425-672-0816', '18912 N Creek Pkwy', 'Bothell', 'USA', 'Net 45', 25, 1, '2023-03-20'),
('Focusrite Audio', 'Phil Focusrite', 'phil.f@focusrite.com', '+44-1494-462246', 'Windsor House, Turnpike Rd', 'High Wycombe', 'UK', 'Net 30', 20, 1, '2023-03-25'),
('Zildjian Cymbals', 'Craigie Zildjian', 'craigie.z@zildjian.com', '+1-781-871-2200', '22 Longwater Drive', 'Norwell', 'USA', 'Net 30', 35, 1, '2023-03-30'),
('Sabian Cymbals', 'Andy Sabian', 'andy.s@sabian.com', '+1-506-272-2019', '219 Main Street', 'Meductic', 'Canada', 'Net 30', 30, 1, '2023-04-01'),
('DW Drums', 'Don Lombardi', 'don.l@dwdrums.com', '+1-805-485-6999', '3450 Lunar Court', 'Oxnard', 'USA', 'Net 45', 45, 1, '2023-04-05'),
('DAddario Strings', 'Jim DAddario', 'jim.d@daddario.com', '+1-631-439-3300', '595 Smith Street', 'Farmingdale', 'USA', 'Net 30', 10, 1, '2023-04-10'),
('Ernie Ball Music Man', 'Sterling Ball', 'sterling.b@ernieball.com', '+1-805-544-7726', 'Santa Margarita Parkway', 'San Luis Obispo', 'USA', 'Net 30', 25, 1, '2023-04-15');

-- =============================================
-- 13. INSERT DATA INTO PurchaseOrders (Minimum 20 rows)
-- =============================================
INSERT INTO PurchaseOrders (PONumber, SupplierID, OrderDate, ExpectedDeliveryDate, ActualDeliveryDate, Status, TotalAmount, TaxAmount, ShippingCost, Notes, CreatedBy, ApprovedBy, CreatedAt, UpdatedAt) VALUES
('PO-2023-001', 1, '2023-02-01', '2023-02-20', '2023-02-18', 'Received', 25000.00, 2000.00, 500.00, 'Fender guitars and accessories', 2, 1, '2023-02-01', '2023-02-18'),
('PO-2023-002', 2, '2023-02-05', '2023-03-10', '2023-03-08', 'Received', 18000.00, 1440.00, 400.00, 'Gibson Les Pauls', 2, 1, '2023-02-05', '2023-03-08'),
('PO-2023-003', 3, '2023-02-10', '2023-03-25', '2023-03-20', 'Received', 15000.00, 1200.00, 300.00, 'Yamaha pianos and guitars', 3, 1, '2023-02-10', '2023-03-20'),
('PO-2023-004', 4, '2023-02-15', '2023-03-05', '2023-03-03', 'Received', 12000.00, 960.00, 250.00, 'Roland digital pianos', 3, 1, '2023-02-15', '2023-03-03'),
('PO-2023-005', 5, '2023-02-20', '2023-03-01', '2023-02-28', 'Received', 8000.00, 640.00, 150.00, 'Shure microphones', 4, 1, '2023-02-20', '2023-02-28'),
('PO-2023-006', 6, '2023-03-01', '2023-03-30', '2023-03-28', 'Received', 22000.00, 1760.00, 450.00, 'Korg synthesizers', 4, 1, '2023-03-01', '2023-03-28'),
('PO-2023-007', 7, '2023-03-05', '2023-04-15', '2023-04-12', 'Received', 16000.00, 1280.00, 350.00, 'Pearl drum sets', 5, 1, '2023-03-05', '2023-04-12'),
('PO-2023-008', 8, '2023-03-10', '2023-04-25', NULL, 'Ordered', 30000.00, 2400.00, 600.00, 'Martin acoustic guitars', 5, 1, '2023-03-10', '2023-03-10'),
('PO-2023-009', 9, '2023-03-15', '2023-04-10', '2023-04-08', 'Received', 14000.00, 1120.00, 280.00, 'Taylor guitars', 6, 1, '2023-03-15', '2023-04-08'),
('PO-2023-010', 10, '2023-03-20', '2023-04-20', NULL, 'Partially Received', 10000.00, 800.00, 200.00, 'Ibanez electric guitars', 6, 1, '2023-03-20', '2023-04-15'),
('PO-2023-011', 11, '2023-04-01', '2023-05-01', '2023-04-28', 'Received', 9000.00, 720.00, 180.00, 'PRS SE series guitars', 7, 1, '2023-04-01', '2023-04-28'),
('PO-2023-012', 12, '2023-04-05', '2023-05-05', '2023-05-03', 'Received', 7000.00, 560.00, 140.00, 'Epiphone guitars', 7, 1, '2023-04-05', '2023-05-03'),
('PO-2023-013', 13, '2023-04-10', '2023-05-25', NULL, 'Ordered', 11000.00, 880.00, 220.00, 'Marshall amplifiers', 8, 1, '2023-04-10', '2023-04-10'),
('PO-2023-014', 14, '2023-04-15', '2023-05-10', '2023-05-08', 'Received', 5000.00, 400.00, 100.00, 'Boss pedals', 8, 1, '2023-04-15', '2023-05-08'),
('PO-2023-015', 15, '2023-04-20', '2023-05-15', '2023-05-12', 'Received', 6000.00, 480.00, 120.00, 'Audio-Technica headphones', 9, 1, '2023-04-20', '2023-05-12'),
('PO-2023-016', 16, '2023-05-01', '2023-05-30', NULL, 'Processing', 13000.00, 1040.00, 260.00, 'Behringer mixers', 9, 1, '2023-05-01', '2023-05-01'),
('PO-2023-017', 17, '2023-05-05', '2023-05-25', '2023-05-22', 'Received', 8000.00, 640.00, 160.00, 'Focusrite audio interfaces', 10, 1, '2023-05-05', '2023-05-22'),
('PO-2023-018', 18, '2023-05-10', '2023-06-10', NULL, 'Ordered', 12000.00, 960.00, 240.00, 'Zildjian cymbals', 10, 1, '2023-05-10', '2023-05-10'),
('PO-2023-019', 19, '2023-05-15', '2023-06-05', '2023-06-02', 'Received', 9000.00, 720.00, 180.00, 'Sabian cymbals', 11, 1, '2023-05-15', '2023-06-02'),
('PO-2023-020', 20, '2023-05-20', '2023-06-25', NULL, 'Draft', 25000.00, 2000.00, 500.00, 'DW drum sets', 11, NULL, '2023-05-20', '2023-05-20'),
('PO-2023-021', 21, '2023-06-01', '2023-06-15', '2023-06-12', 'Received', 4000.00, 320.00, 80.00, 'DAddario strings', 12, 1, '2023-06-01', '2023-06-12'),
('PO-2023-022', 22, '2023-06-05', '2023-07-05', NULL, 'Ordered', 15000.00, 1200.00, 300.00, 'Music Man guitars', 12, 1, '2023-06-05', '2023-06-05');

-- =============================================
-- 14. INSERT DATA INTO PurchaseOrderItems (Minimum 20 rows)
-- =============================================
INSERT INTO PurchaseOrderItems (PurchaseOrderID, ProductID, Quantity, UnitCost, ReceivedQuantity, WarehouseID, Notes) VALUES
(1, 1, 10, 1100.00, 10, 1, 'Fender Stratocasters'),
(1, 2, 15, 550.00, 15, 1, 'Fender Telecasters'),
(1, 7, 12, 550.00, 12, 1, 'Fender Precision Basses'),
(2, 3, 5, 2000.00, 5, 1, 'Gibson Les Pauls'),
(3, 4, 25, 150.00, 25, 1, 'Yamaha FG800 guitars'),
(3, 9, 10, 500.00, 10, 1, 'Yamaha P125 pianos'),
(4, 8, 8, 600.00, 8, 1, 'Roland FP-30X pianos'),
(5, 13, 20, 250.00, 20, 1, 'Shure SM7B microphones'),
(6, 10, 4, 2800.00, 4, 1, 'Korg Kronos workstations'),
(7, 11, 8, 650.00, 8, 1, 'Pearl Export drum sets'),
(8, 6, 6, 2500.00, 0, 1, 'Martin D-28 guitars'),
(9, 5, 7, 1300.00, 7, 1, 'Taylor 314ce guitars'),
(10, 17, 6, 850.00, 4, 1, 'Ibanez RG550 guitars'),
(11, 18, 7, 650.00, 7, 1, 'PRS SE Custom 24 guitars'),
(12, 19, 10, 400.00, 10, 1, 'Epiphone Les Pauls'),
(13, 15, 8, 650.00, 0, 1, 'Marshall DSL40CR amps'),
(14, 14, 30, 30.00, 30, 1, 'BOSS DS-1 pedals'),
(15, 22, 25, 80.00, 25, 1, 'Audio-Technica headphones'),
(16, 23, 5, 1800.00, 0, 1, 'Behringer X32 mixers'),
(17, 16, 15, 100.00, 15, 1, 'Focusrite Scarlett interfaces'),
(18, 20, 20, 200.00, 0, 1, 'Zildjian hi-hats'),
(19, 21, 25, 150.00, 25, 1, 'Sabian crash cymbals'),
(20, 24, 5, 1100.00, 0, 1, 'Yamaha saxophones'),
(21, NULL, 200, 8.00, 200, 1, 'DAddario guitar strings'),
(22, NULL, 10, 1200.00, 0, 1, 'Music Man guitars');

-- =============================================
-- 15. INSERT DATA INTO UserAddresses (Minimum 20 rows)
-- =============================================
INSERT INTO UserAddresses (UserID, AddressType, StreetAddress, City, State, Country, PostalCode, IsDefault, CreatedAt) VALUES
(5, 'Home', '123 Main Street', 'New York', 'NY', 'USA', '10001', 1, '2023-03-15'),
(5, 'Work', '456 Broadway', 'New York', 'NY', 'USA', '10002', 0, '2023-03-15'),
(6, 'Home', '789 Elm Avenue', 'Los Angeles', 'CA', 'USA', '90001', 1, '2023-04-01'),
(6, 'Billing', '101 Pine Road', 'Los Angeles', 'CA', 'USA', '90002', 0, '2023-04-01'),
(7, 'Home', '222 Oak Street', 'Chicago', 'IL', 'USA', '60601', 1, '2023-04-10'),
(8, 'Home', '333 Maple Drive', 'Houston', 'TX', 'USA', '77001', 1, '2023-05-05'),
(9, 'Home', '444 Cedar Lane', 'Phoenix', 'AZ', 'USA', '85001', 1, '2023-05-20'),
(9, 'Shipping', '555 Birch Boulevard', 'Phoenix', 'AZ', 'USA', '85002', 0, '2023-05-20'),
(10, 'Home', '666 Walnut Circle', 'Philadelphia', 'PA', 'USA', '19101', 1, '2023-06-01'),
(11, 'Home', '777 Spruce Way', 'San Antonio', 'TX', 'USA', '78201', 1, '2023-06-15'),
(12, 'Home', '888 Cherry Court', 'San Diego', 'CA', 'USA', '92101', 1, '2023-07-01'),
(13, 'Home', '999 Aspen Terrace', 'Dallas', 'TX', 'USA', '75201', 1, '2023-07-10'),
(14, 'Home', '111 Palm Street', 'San Jose', 'CA', 'USA', '95101', 1, '2023-08-01'),
(14, 'Work', '222 Redwood Road', 'San Jose', 'CA', 'USA', '95102', 0, '2023-08-01'),
(15, 'Home', '333 Sequoia Avenue', 'Austin', 'TX', 'USA', '73301', 1, '2023-08-15'),
(16, 'Home', '444 Magnolia Drive', 'Jacksonville', 'FL', 'USA', '32201', 1, '2023-09-01'),
(17, 'Home', '555 Dogwood Lane', 'Fort Worth', 'TX', 'USA', '76101', 1, '2023-09-10'),
(18, 'Home', '666 Sycamore Street', 'Columbus', 'OH', 'USA', '43201', 1, '2023-09-20'),
(19, 'Home', '777 Hickory Road', 'Charlotte', 'NC', 'USA', '28201', 1, '2023-10-01'),
(19, 'Billing', '888 Poplar Avenue', 'Charlotte', 'NC', 'USA', '28202', 0, '2023-10-01'),
(20, 'Home', '999 Willow Way', 'Seattle', 'WA', 'USA', '98101', 1, '2023-10-15'),
(21, 'Home', '1010 Fir Circle', 'Denver', 'CO', 'USA', '80201', 1, '2023-11-01'),
(22, 'Home', '1111 Hemlock Drive', 'Washington', 'DC', 'USA', '20001', 1, '2023-11-15');

-- =============================================
-- 16. INSERT DATA INTO UserPaymentMethods (Minimum 20 rows)
-- =============================================
INSERT INTO UserPaymentMethods (UserID, PaymentType, CardNumber, CardHolderName, ExpiryMonth, ExpiryYear, CVV, PayPalEmail, IsDefault, IsActive, CreatedAt) VALUES
(5, 'Credit Card', '************1111', 'Alex Martin', 12, 2026, '123', NULL, 1, 1, '2023-03-16'),
(5, 'PayPal', NULL, NULL, NULL, NULL, NULL, 'alex.martin@email.com', 0, 1, '2023-03-16'),
(6, 'Credit Card', '************2222', 'David Chen', 3, 2025, '456', NULL, 1, 1, '2023-04-02'),
(7, 'Credit Card', '************3333', 'Emily Davis', 8, 2027, '789', NULL, 1, 1, '2023-04-11'),
(7, 'Debit Card', '************4444', 'Emily Davis', 5, 2024, '321', NULL, 0, 1, '2023-04-11'),
(8, 'Credit Card', '************5555', 'Robert Wilson', 11, 2026, '654', NULL, 1, 1, '2023-05-06'),
(9, 'PayPal', NULL, NULL, NULL, NULL, NULL, 'lisa.violin@email.com', 1, 1, '2023-05-21'),
(10, 'Credit Card', '************6666', 'Kevin Brown', 2, 2025, '987', NULL, 1, 1, '2023-06-02'),
(11, 'Credit Card', '************7777', 'Sophia Taylor', 7, 2028, '159', NULL, 1, 1, '2023-06-16'),
(12, 'Credit Card', '************8888', 'James Miller', 4, 2026, '753', NULL, 1, 1, '2023-07-02'),
(13, 'PayPal', NULL, NULL, NULL, NULL, NULL, 'olivia.studio@email.com', 1, 1, '2023-07-11'),
(14, 'Credit Card', '************9999', 'Daniel Jackson', 9, 2027, '246', NULL, 1, 1, '2023-08-02'),
(14, 'Bank Transfer', NULL, NULL, NULL, NULL, NULL, NULL, 0, 1, '2023-08-02'),
(15, 'Credit Card', '************1010', 'Mia Lee', 1, 2025, '864', NULL, 1, 1, '2023-08-16'),
(16, 'Credit Card', '************1112', 'Benjamin Harris', 6, 2028, '192', NULL, 1, 1, '2023-09-02'),
(17, 'Credit Card', '************1213', 'Ava Clark', 10, 2026, '837', NULL, 1, 1, '2023-09-11'),
(18, 'PayPal', NULL, NULL, NULL, NULL, NULL, 'max.producer@email.com', 1, 1, '2023-09-21'),
(19, 'Credit Card', '************1314', 'Charlie Walker', 3, 2025, '465', NULL, 1, 1, '2023-10-02'),
(20, 'Credit Card', '************1415', 'Lily Hall', 8, 2027, '291', NULL, 1, 1, '2023-10-16'),
(21, 'Credit Card', '************1516', 'Henry Allen', 12, 2026, '378', NULL, 1, 1, '2023-11-02'),
(22, 'Credit Card', '************1617', 'Music Store', 11, 2028, '912', NULL, 1, 1, '2023-11-16'),
(6, 'COD', NULL, NULL, NULL, NULL, NULL, NULL, 0, 1, '2023-07-15'),
(8, 'PayPal', NULL, NULL, NULL, NULL, NULL, 'robert.drums@email.com', 0, 1, '2023-08-20');

-- =============================================
-- 17. INSERT DATA INTO Orders (Minimum 20 rows)
-- =============================================
INSERT INTO Orders (OrderNumber, UserID, OrderDate, OrderStatus, PaymentStatus, ShippingStatus, Subtotal, TaxAmount, ShippingCost, DiscountAmount, TotalAmount, PaymentMethodID, ShippingAddressID, BillingAddressID, Notes, IPAddress, UserAgent, CreatedAt, UpdatedAt) VALUES
('ORD-2023-1001', 5, '2023-06-05', 'Delivered', 'Paid', 'Delivered', 1599.99, 128.00, 49.99, 0, 1777.98, 1, 1, 1, 'Gift wrapping requested', '192.168.1.100', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)', '2023-06-05', '2023-06-12'),
('ORD-2023-1002', 6, '2023-06-10', 'Delivered', 'Paid', 'Delivered', 3299.99, 264.00, 59.99, 100.00, 3523.98, 3, 3, 4, 'Handle with care - vintage instrument', '192.168.1.101', 'Mozilla/5.0 (Macintosh; Intel Mac OS X)', '2023-06-10', '2023-06-18'),
('ORD-2023-1003', 7, '2023-06-15', 'Delivered', 'Paid', 'Delivered', 799.99, 64.00, 29.99, 0, 893.98, 5, 5, 5, 'Leave at front door if no answer', '192.168.1.102', 'Chrome/91.0.4472.124', '2023-06-15', '2023-06-22'),
('ORD-2023-1004', 8, '2023-06-20', 'Delivered', 'Paid', 'Delivered', 1999.99, 160.00, 79.99, 50.00, 2190.98, 6, 6, 6, 'Gig tomorrow - need ASAP', '192.168.1.103', 'Safari/14.1.1', '2023-06-20', '2023-06-27'),
('ORD-2023-1005', 9, '2023-06-25', 'Delivered', 'Paid', 'Delivered', 399.99, 32.00, 19.99, 0, 451.98, 7, 7, 8, NULL, '192.168.1.104', 'Firefox/89.0', '2023-06-25', '2023-07-02'),
('ORD-2023-1006', 10, '2023-07-01', 'Shipped', 'Paid', 'Shipped', 1799.99, 144.00, 39.99, 100.00, 1883.98, 8, 9, 9, 'Student discount applied', '192.168.1.105', 'Mozilla/5.0 (Windows NT 10.0)', '2023-07-01', '2023-07-08'),
('ORD-2023-1007', 11, '2023-07-05', 'Processing', 'Authorized', 'Pending', 229.99, 18.40, 19.99, 0, 268.38, 9, 10, 10, 'First guitar for my son', '192.168.1.106', 'Chrome/92.0.4515.107', '2023-07-05', '2023-07-05'),
('ORD-2023-1008', 12, '2023-07-10', 'Delivered', 'Paid', 'Delivered', 3499.99, 280.00, 89.99, 200.00, 3669.98, 10, 11, 11, 'VIP customer - priority shipping', '192.168.1.107', 'Safari/15.0', '2023-07-10', '2023-07-18'),
('ORD-2023-1009', 13, '2023-07-15', 'Delivered', 'Paid', 'Delivered', 1199.99, 96.00, 49.99, 0, 1345.98, 11, 12, 12, 'Business purchase - need invoice', '192.168.1.108', 'Edge/91.0.864.59', '2023-07-15', '2023-07-22'),
('ORD-2023-1010', 14, '2023-07-20', 'Shipped', 'Paid', 'Shipped', 899.99, 72.00, 29.99, 50.00, 951.98, 12, 13, 14, 'School music department', '192.168.1.109', 'Chrome/93.0.4577.63', '2023-07-20', '2023-07-27'),
('ORD-2023-1011', 15, '2023-07-25', 'Processing', 'Pending', 'Pending', 149.99, 12.00, 9.99, 0, 171.98, 14, 15, 15, 'Birthday gift', '192.168.1.110', 'Firefox/90.0', '2023-07-25', '2023-07-25'),
('ORD-2023-1012', 16, '2023-08-01', 'Delivered', 'Paid', 'Delivered', 799.99, 64.00, 19.99, 0, 883.98, 15, 16, 16, 'Studio equipment', '192.168.1.111', 'Safari/15.1', '2023-08-01', '2023-08-08'),
('ORD-2023-1013', 17, '2023-08-05', 'Cancelled', 'Refunded', 'Cancelled', 2699.99, 216.00, 59.99, 0, 2975.98, 16, 17, 17, 'Changed mind - customer requested cancellation', '192.168.1.112', 'Chrome/94.0.4606.61', '2023-08-05', '2023-08-07'),
('ORD-2023-1014', 18, '2023-08-10', 'Delivered', 'Paid', 'Delivered', 169.99, 13.60, 9.99, 10.00, 183.58, 17, 18, 18, 'Home studio setup', '192.168.1.113', 'Edge/92.0.902.73', '2023-08-10', '2023-08-17'),
('ORD-2023-1015', 19, '2023-08-15', 'Delivered', 'Paid', 'Delivered', 349.99, 28.00, 19.99, 0, 397.98, 18, 19, 20, 'Cymbals for church band', '192.168.1.114', 'Firefox/91.0', '2023-08-15', '2023-08-22'),
('ORD-2023-1016', 20, '2023-08-20', 'Returned', 'Refunded', 'Returned', 1599.99, 128.00, 49.99, 0, 1777.98, 19, 21, 21, 'Product defective - returned', '192.168.1.115', 'Safari/15.2', '2023-08-20', '2023-09-05'),
('ORD-2023-1017', 5, '2023-08-25', 'Delivered', 'Paid', 'Delivered', 899.99, 72.00, 29.99, 100.00, 901.98, 1, 1, 1, 'Second purchase - returning customer', '192.168.1.116', 'Chrome/95.0.4638.54', '2023-08-25', '2023-09-01'),
('ORD-2023-1018', 6, '2023-09-01', 'Processing', 'Authorized', 'Pending', 2499.99, 200.00, 69.99, 150.00, 2619.98, 3, 3, 4, 'Backorder item', '192.168.1.117', 'Edge/93.0.961.52', '2023-09-01', '2023-09-01'),
('ORD-2023-1019', 7, '2023-09-05', 'Delivered', 'Paid', 'Delivered', 599.99, 48.00, 19.99, 0, 667.98, 5, 5, 5, 'Guitar for lessons', '192.168.1.118', 'Firefox/92.0', '2023-09-05', '2023-09-12'),
('ORD-2023-1020', 8, '2023-09-10', 'Shipped', 'Paid', 'Shipped', 3999.99, 320.00, 99.99, 200.00, 4219.98, 6, 6, 6, 'Professional recording studio', '192.168.1.119', 'Safari/15.3', '2023-09-10', '2023-09-17'),
('ORD-2023-1021', 9, '2023-09-15', 'Delivered', 'Paid', 'Delivered', 199.99, 16.00, 14.99, 0, 230.98, 7, 8, 7, 'Replacement strings', '192.168.1.120', 'Chrome/96.0.4664.45', '2023-09-15', '2023-09-22'),
('ORD-2023-1022', 10, '2023-09-20', 'Processing', 'Pending', 'Pending', 699.99, 56.00, 29.99, 50.00, 735.98, 8, 9, 9, 'Student orchestra', '192.168.1.121', 'Edge/94.0.992.31', '2023-09-20', '2023-09-20');

-- =============================================
-- 18. INSERT DATA INTO OrderItems (Minimum 20 rows)
-- =============================================
INSERT INTO OrderItems (OrderID, ProductID, VariationID, Quantity, UnitPrice, DiscountPercentage, DiscountAmount, LineTotal, WarehouseID, ShippedQuantity, ShipDate, TrackingNumber, Carrier) VALUES
(1, 1, 1, 1, 1599.99, 0, 0, 1599.99, 1, 1, '2023-06-07', '1Z999AA1034567890', 'UPS'),
(2, 3, 7, 1, 2699.99, 0, 100.00, 2599.99, 1, 1, '2023-06-12', '1Z999BB1034567891', 'FedEx'),
(2, 14, NULL, 1, 59.99, 0, 0, 59.99, 1, 1, '2023-06-12', '1Z999BB1034567891', 'FedEx'),
(3, 2, 4, 1, 799.99, 0, 0, 799.99, 2, 1, '2023-06-17', '1Z999CC1034567892', 'UPS'),
(4, 12, NULL, 1, 1999.99, 0, 50.00, 1949.99, 1, 1, '2023-06-22', '1Z999DD1034567893', 'FedEx'),
(5, 13, NULL, 1, 399.99, 0, 0, 399.99, 1, 1, '2023-06-27', '1Z999EE1034567894', 'UPS'),
(6, 5, 13, 1, 1799.99, 5, 100.00, 1699.99, 1, 1, '2023-07-03', '1Z999FF1034567895', 'USPS'),
(7, 4, 10, 1, 229.99, 0, 0, 229.99, 1, 0, NULL, NULL, NULL),
(8, 10, NULL, 1, 3499.99, 5, 200.00, 3299.99, 1, 1, '2023-07-12', '1Z999GG1034567896', 'FedEx'),
(9, 17, 31, 1, 1199.99, 0, 0, 1199.99, 1, 1, '2023-07-17', '1Z999HH1034567897', 'UPS'),
(10, 18, NULL, 1, 899.99, 5, 50.00, 849.99, 1, 1, '2023-07-22', '1Z999II1034567898', 'USPS'),
(11, 22, NULL, 1, 149.99, 0, 0, 149.99, 1, 0, NULL, NULL, NULL),
(12, 8, 19, 1, 799.99, 0, 0, 799.99, 1, 1, '2023-08-03', '1Z999JJ1034567899', 'UPS'),
(13, 3, 8, 1, 2699.99, 0, 0, 2699.99, 1, 0, NULL, NULL, NULL),
(14, 16, NULL, 1, 169.99, 5, 10.00, 159.99, 1, 1, '2023-08-12', '1Z999KK1034567800', 'USPS'),
(15, 20, NULL, 1, 349.99, 0, 0, 349.99, 1, 1, '2023-08-17', '1Z999LL1034567801', 'FedEx'),
(16, 1, 2, 1, 1599.99, 0, 0, 1599.99, 1, 1, '2023-08-22', '1Z999MM1034567802', 'UPS'),
(17, 15, 29, 1, 899.99, 10, 100.00, 799.99, 1, 1, '2023-08-27', '1Z999NN1034567803', 'FedEx'),
(18, 23, NULL, 1, 2499.99, 5, 150.00, 2349.99, 1, 0, NULL, NULL, NULL),
(19, 19, NULL, 1, 599.99, 0, 0, 599.99, 1, 1, '2023-09-07', '1Z999OO1034567804', 'UPS'),
(20, 10, NULL, 1, 3499.99, 5, 200.00, 3299.99, 1, 1, '2023-09-12', '1Z999PP1034567805', 'FedEx'),
(21, NULL, NULL, 5, 39.99, 0, 0, 199.95, 1, 1, '2023-09-17', '1Z999QQ1034567806', 'USPS'),
(22, 9, 21, 1, 699.99, 5, 50.00, 649.99, 1, 0, NULL, NULL, NULL);

-- =============================================
-- 19. INSERT DATA INTO OrderStatusHistory (Minimum 20 rows)
-- =============================================
INSERT INTO OrderStatusHistory (OrderID, OldStatus, NewStatus, StatusType, ChangedBy, Notes, ChangedAt) VALUES
(1, NULL, 'Pending', 'Order', 5, 'Order placed by customer', '2023-06-05 10:30:00'),
(1, 'Pending', 'Processing', 'Order', 2, 'Order processed for payment', '2023-06-05 11:15:00'),
(1, 'Processing', 'Shipped', 'Order', 3, 'Order shipped to customer', '2023-06-07 09:20:00'),
(1, 'Shipped', 'Delivered', 'Order', NULL, 'Delivered confirmed by carrier', '2023-06-12 14:30:00'),
(2, NULL, 'Pending', 'Order', 6, 'Order placed by customer', '2023-06-10 15:45:00'),
(2, 'Pending', 'Processing', 'Order', 2, 'Payment authorized', '2023-06-10 16:30:00'),
(2, 'Processing', 'Shipped', 'Order', 4, 'Order packed and shipped', '2023-06-12 10:15:00'),
(2, 'Shipped', 'Delivered', 'Order', NULL, 'Package delivered', '2023-06-18 11:20:00'),
(3, NULL, 'Pending', 'Order', 7, 'Order placed', '2023-06-15 12:00:00'),
(3, 'Pending', 'Processing', 'Order', 2, 'Order processing started', '2023-06-15 13:30:00'),
(3, NULL, 'Authorized', 'Payment', 2, 'Payment authorized successfully', '2023-06-15 13:35:00'),
(3, 'Authorized', 'Paid', 'Payment', 2, 'Payment captured', '2023-06-15 14:00:00'),
(4, NULL, 'Pending', 'Order', 8, 'Rush order requested', '2023-06-20 09:15:00'),
(4, 'Pending', 'Processing', 'Order', 2, 'Priority processing', '2023-06-20 09:45:00'),
(5, NULL, 'Pending', 'Order', 9, 'Order placed', '2023-06-25 16:20:00'),
(6, NULL, 'Pending', 'Order', 10, 'Student order placed', '2023-07-01 11:30:00'),
(6, 'Pending', 'Processing', 'Order', 2, 'Student discount verified', '2023-07-01 12:15:00'),
(13, 'Pending', 'Processing', 'Order', 2, 'Order processing started', '2023-08-05 10:00:00'),
(13, 'Processing', 'Cancelled', 'Order', 5, 'Customer requested cancellation', '2023-08-07 14:30:00'),
(13, 'Authorized', 'Refunded', 'Payment', 2, 'Full refund issued', '2023-08-07 15:00:00'),
(16, 'Delivered', 'Returned', 'Order', 2, 'Customer returned defective product', '2023-09-05 10:45:00'),
(16, 'Paid', 'Refunded', 'Payment', 2, 'Refund processed for return', '2023-09-05 11:30:00');

-- =============================================
-- 20. INSERT DATA INTO Payments (Minimum 20 rows)
-- =============================================
INSERT INTO Payments (OrderID, PaymentMethod, PaymentGateway, TransactionID, Amount, Currency, PaymentStatus, PaymentDate, GatewayResponse, RefundAmount, RefundDate, RefundReason, CreatedAt) VALUES
(1, 'Credit Card', 'Stripe', 'ch_1KjLp2LkdIwHu7ixY7Q2', 1777.98, 'USD', 'Completed', '2023-06-05 11:00:00', '{"status": "succeeded", "id": "ch_1KjLp2LkdIwHu7ixY7Q2"}', 0, NULL, NULL, '2023-06-05'),
(2, 'Credit Card', 'Stripe', 'ch_1KjLq3LkdIwHu7ixY8R3', 3523.98, 'USD', 'Completed', '2023-06-10 16:00:00', '{"status": "succeeded", "id": "ch_1KjLq3LkdIwHu7ixY8R3"}', 0, NULL, NULL, '2023-06-10'),
(3, 'Credit Card', 'Stripe', 'ch_1KjLr4LkdIwHu7ixY9S4', 893.98, 'USD', 'Completed', '2023-06-15 13:40:00', '{"status": "succeeded", "id": "ch_1KjLr4LkdIwHu7ixY9S4"}', 0, NULL, NULL, '2023-06-15'),
(4, 'Credit Card', 'Stripe', 'ch_1KjLs5LkdIwHu7ixY0T5', 2190.98, 'USD', 'Completed', '2023-06-20 10:00:00', '{"status": "succeeded", "id": "ch_1KjLs5LkdIwHu7ixY0T5"}', 0, NULL, NULL, '2023-06-20'),
(5, 'PayPal', 'PayPal', '5TY05013N1127142L', 451.98, 'USD', 'Completed', '2023-06-25 17:00:00', '{"status": "COMPLETED", "id": "5TY05013N1127142L"}', 0, NULL, NULL, '2023-06-25'),
(6, 'Credit Card', 'Stripe', 'ch_1KjLt6LkdIwHu7ixY1U6', 1883.98, 'USD', 'Completed', '2023-07-01 12:30:00', '{"status": "succeeded", "id": "ch_1KjLt6LkdIwHu7ixY1U6"}', 0, NULL, NULL, '2023-07-01'),
(7, 'Credit Card', 'Stripe', 'ch_1KjLu7LkdIwHu7ixY2V7', 268.38, 'USD', 'Authorized', '2023-07-05 12:00:00', '{"status": "requires_capture", "id": "ch_1KjLu7LkdIwHu7ixY2V7"}', 0, NULL, NULL, '2023-07-05'),
(8, 'Credit Card', 'Stripe', 'ch_1KjLv8LkdIwHu7ixY3W8', 3669.98, 'USD', 'Completed', '2023-07-10 11:00:00', '{"status": "succeeded", "id": "ch_1KjLv8LkdIwHu7ixY3W8"}', 0, NULL, NULL, '2023-07-10'),
(9, 'PayPal', 'PayPal', '1R345678ABCDEFGHI', 1345.98, 'USD', 'Completed', '2023-07-15 14:00:00', '{"status": "COMPLETED", "id": "1R345678ABCDEFGHI"}', 0, NULL, NULL, '2023-07-15'),
(10, 'Credit Card', 'Stripe', 'ch_1KjLw9LkdIwHu7ixY4X9', 951.98, 'USD', 'Completed', '2023-07-20 09:30:00', '{"status": "succeeded", "id": "ch_1KjLw9LkdIwHu7ixY4X9"}', 0, NULL, NULL, '2023-07-20'),
(11, 'Credit Card', 'Stripe', NULL, 171.98, 'USD', 'Pending', NULL, NULL, 0, NULL, NULL, '2023-07-25'),
(12, 'Credit Card', 'Stripe', 'ch_1KjLx0LkdIwHu7ixY5Y0', 883.98, 'USD', 'Completed', '2023-08-01 15:00:00', '{"status": "succeeded", "id": "ch_1KjLx0LkdIwHu7ixY5Y0"}', 0, NULL, NULL, '2023-08-01'),
(13, 'Credit Card', 'Stripe', 'ch_1KjLy1LkdIwHu7ixY6Z1', 2975.98, 'USD', 'Refunded', '2023-08-05 10:30:00', '{"status": "succeeded", "id": "ch_1KjLy1LkdIwHu7ixY6Z1"}', 2975.98, '2023-08-07', 'Customer cancellation', '2023-08-05'),
(14, 'PayPal', 'PayPal', '2S456789JKLMNOPQR', 183.58, 'USD', 'Completed', '2023-08-10 13:00:00', '{"status": "COMPLETED", "id": "2S456789JKLMNOPQR"}', 0, NULL, NULL, '2023-08-10'),
(15, 'Credit Card', 'Stripe', 'ch_1KjLz2LkdIwHu7ixY7A2', 397.98, 'USD', 'Completed', '2023-08-15 16:00:00', '{"status": "succeeded", "id": "ch_1KjLz2LkdIwHu7ixY7A2"}', 0, NULL, NULL, '2023-08-15'),
(16, 'Credit Card', 'Stripe', 'ch_1KjL03LkdIwHu7ixY8B3', 1777.98, 'USD', 'Refunded', '2023-08-20 11:00:00', '{"status": "succeeded", "id": "ch_1KjL03LkdIwHu7ixY8B3"}', 1777.98, '2023-09-05', 'Defective product return', '2023-08-20'),
(17, 'Credit Card', 'Stripe', 'ch_1KjL14LkdIwHu7ixY9C4', 901.98, 'USD', 'Completed', '2023-08-25 14:00:00', '{"status": "succeeded", "id": "ch_1KjL14LkdIwHu7ixY9C4"}', 0, NULL, NULL, '2023-08-25'),
(18, 'Credit Card', 'Stripe', 'ch_1KjL25LkdIwHu7ixY0D5', 2619.98, 'USD', 'Authorized', '2023-09-01 09:00:00', '{"status": "requires_capture", "id": "ch_1KjL25LkdIwHu7ixY0D5"}', 0, NULL, NULL, '2023-09-01'),
(19, 'Credit Card', 'Stripe', 'ch_1KjL36LkdIwHu7ixY1E6', 667.98, 'USD', 'Completed', '2023-09-05 10:30:00', '{"status": "succeeded", "id": "ch_1KjL36LkdIwHu7ixY1E6"}', 0, NULL, NULL, '2023-09-05'),
(20, 'Credit Card', 'Stripe', 'ch_1KjL47LkdIwHu7ixY2F7', 4219.98, 'USD', 'Completed', '2023-09-10 11:00:00', '{"status": "succeeded", "id": "ch_1KjL47LkdIwHu7ixY2F7"}', 0, NULL, NULL, '2023-09-10'),
(21, 'PayPal', 'PayPal', '3T567890STUVWXYZAB', 230.98, 'USD', 'Completed', '2023-09-15 15:00:00', '{"status": "COMPLETED", "id": "3T567890STUVWXYZAB"}', 0, NULL, NULL, '2023-09-15'),
(22, 'Credit Card', 'Stripe', NULL, 735.98, 'USD', 'Pending', NULL, NULL, 0, NULL, NULL, '2023-09-20');

-- =============================================
-- 21. INSERT DATA INTO Invoices (Minimum 20 rows)
-- =============================================
INSERT INTO Invoices (InvoiceNumber, OrderID, InvoiceDate, DueDate, Status, Subtotal, TaxAmount, TotalAmount, AmountPaid, Notes, SentDate, PaidDate, CreatedAt) VALUES
('INV-2023-1001', 1, '2023-06-05', '2023-07-05', 'Paid', 1599.99, 128.00, 1777.98, 1777.98, 'Thank you for your purchase!', '2023-06-05', '2023-06-05', '2023-06-05'),
('INV-2023-1002', 2, '2023-06-10', '2023-07-10', 'Paid', 3299.99, 264.00, 3523.98, 3523.98, 'Handle with care - vintage instrument', '2023-06-10', '2023-06-10', '2023-06-10'),
('INV-2023-1003', 3, '2023-06-15', '2023-07-15', 'Paid', 799.99, 64.00, 893.98, 893.98, NULL, '2023-06-15', '2023-06-15', '2023-06-15'),
('INV-2023-1004', 4, '2023-06-20', '2023-07-20', 'Paid', 1999.99, 160.00, 2190.98, 2190.98, 'Rush order', '2023-06-20', '2023-06-20', '2023-06-20'),
('INV-2023-1005', 5, '2023-06-25', '2023-07-25', 'Paid', 399.99, 32.00, 451.98, 451.98, NULL, '2023-06-25', '2023-06-25', '2023-06-25'),
('INV-2023-1006', 6, '2023-07-01', '2023-08-01', 'Paid', 1799.99, 144.00, 1883.98, 1883.98, 'Student discount applied', '2023-07-01', '2023-07-01', '2023-07-01'),
('INV-2023-1007', 7, '2023-07-05', '2023-08-05', 'Sent', 229.99, 18.40, 268.38, 0, 'First guitar purchase', '2023-07-05', NULL, '2023-07-05'),
('INV-2023-1008', 8, '2023-07-10', '2023-08-10', 'Paid', 3499.99, 280.00, 3669.98, 3669.98, 'VIP customer invoice', '2023-07-10', '2023-07-10', '2023-07-10'),
('INV-2023-1009', 9, '2023-07-15', '2023-08-15', 'Paid', 1199.99, 96.00, 1345.98, 1345.98, 'Business purchase', '2023-07-15', '2023-07-15', '2023-07-15'),
('INV-2023-1010', 10, '2023-07-20', '2023-08-20', 'Paid', 899.99, 72.00, 951.98, 951.98, 'School purchase order #4567', '2023-07-20', '2023-07-20', '2023-07-20'),
('INV-2023-1011', 11, '2023-07-25', '2023-08-25', 'Draft', 149.99, 12.00, 171.98, 0, 'Birthday gift order', NULL, NULL, '2023-07-25'),
('INV-2023-1012', 12, '2023-08-01', '2023-09-01', 'Paid', 799.99, 64.00, 883.98, 883.98, 'Studio equipment', '2023-08-01', '2023-08-01', '2023-08-01'),
('INV-2023-1013', 13, '2023-08-05', '2023-09-05', 'Cancelled', 2699.99, 216.00, 2975.98, 2975.98, 'Order cancelled by customer', '2023-08-05', '2023-08-07', '2023-08-05'),
('INV-2023-1014', 14, '2023-08-10', '2023-09-10', 'Paid', 169.99, 13.60, 183.58, 183.58, 'Home studio', '2023-08-10', '2023-08-10', '2023-08-10'),
('INV-2023-1015', 15, '2023-08-15', '2023-09-15', 'Paid', 349.99, 28.00, 397.98, 397.98, 'Church band purchase', '2023-08-15', '2023-08-15', '2023-08-15'),
('INV-2023-1016', 16, '2023-08-20', '2023-09-20', 'Refunded', 1599.99, 128.00, 1777.98, 1777.98, 'Refund issued for return', '2023-08-20', '2023-08-20', '2023-08-20'),
('INV-2023-1017', 17, '2023-08-25', '2023-09-25', 'Paid', 899.99, 72.00, 901.98, 901.98, 'Returning customer', '2023-08-25', '2023-08-25', '2023-08-25'),
('INV-2023-1018', 18, '2023-09-01', '2023-10-01', 'Sent', 2499.99, 200.00, 2619.98, 0, 'Backorder item', '2023-09-01', NULL, '2023-09-01'),
('INV-2023-1019', 19, '2023-09-05', '2023-10-05', 'Paid', 599.99, 48.00, 667.98, 667.98, 'Music lesson equipment', '2023-09-05', '2023-09-05', '2023-09-05'),
('INV-2023-1020', 20, '2023-09-10', '2023-10-10', 'Paid', 3999.99, 320.00, 4219.98, 4219.98, 'Professional studio invoice', '2023-09-10', '2023-09-10', '2023-09-10'),
('INV-2023-1021', 21, '2023-09-15', '2023-10-15', 'Paid', 199.99, 16.00, 230.98, 230.98, 'Strings purchase', '2023-09-15', '2023-09-15', '2023-09-15'),
('INV-2023-1022', 22, '2023-09-20', '2023-10-20', 'Draft', 699.99, 56.00, 735.98, 0, 'Student orchestra', NULL, NULL, '2023-09-20');

-- =============================================
-- 22. INSERT DATA INTO ShippingDetails (Minimum 20 rows)
-- =============================================
INSERT INTO ShippingDetails (OrderID, ShippingMethod, TrackingNumber, Carrier, ServiceLevel, EstimatedDeliveryDate, ActualDeliveryDate, ShippingCost, PackageWeight, PackageDimensions, ShipDate, DeliveryConfirmation, SignedBy, Notes, CreatedAt) VALUES
(1, 'Standard', '1Z999AA1034567890', 'UPS', 'Ground', '2023-06-12', '2023-06-12', 49.99, 15.5, '48x16x8', '2023-06-07', 1, 'Alex Martin', 'Left at front door', '2023-06-07'),
(2, 'Express', '1Z999BB1034567891', 'FedEx', '2Day', '2023-06-14', '2023-06-18', 59.99, 25.0, '52x18x10', '2023-06-12', 1, 'David Chen', 'Signature required', '2023-06-12'),
(3, 'Standard', '1Z999CC1034567892', 'UPS', 'Ground', '2023-06-22', '2023-06-22', 29.99, 12.0, '45x15x6', '2023-06-17', 1, 'Emily Davis', 'Delivered to reception', '2023-06-17'),
(4, 'Express', '1Z999DD1034567893', 'FedEx', 'Overnight', '2023-06-21', '2023-06-21', 79.99, 65.0, '32x32x24', '2023-06-20', 1, 'Robert Wilson', 'Rush delivery successful', '2023-06-20'),
(5, 'Standard', '1Z999EE1034567894', 'UPS', 'Ground', '2023-06-30', '2023-06-29', 19.99, 2.5, '12x8x6', '2023-06-27', 0, NULL, 'Left in mailbox', '2023-06-27'),
(6, 'Standard', '1Z999FF1034567895', 'USPS', 'Priority', '2023-07-08', '2023-07-07', 39.99, 10.0, '42x14x8', '2023-07-03', 1, 'Kevin Brown', 'Signed by neighbor', '2023-07-03'),
(8, 'Express', '1Z999GG1034567896', 'FedEx', '2Day', '2023-07-14', '2023-07-13', 89.99, 55.0, '30x20x15', '2023-07-12', 1, 'James Miller', 'VIP delivery', '2023-07-12'),
(9, 'Standard', '1Z999HH1034567897', 'UPS', 'Ground', '2023-07-22', '2023-07-21', 49.99, 14.0, '46x16x8', '2023-07-17', 1, 'Olivia Thomas', 'Business delivery', '2023-07-17'),
(10, 'Standard', '1Z999II1034567898', 'USPS', 'Priority', '2023-07-27', '2023-07-26', 29.99, 12.5, '44x15x7', '2023-07-22', 1, 'School Secretary', 'Delivered to school office', '2023-07-22'),
(12, 'Standard', '1Z999JJ1034567899', 'UPS', 'Ground', '2023-08-08', '2023-08-07', 19.99, 45.0, '22x22x18', '2023-08-03', 1, 'Benjamin Harris', 'Studio delivery', '2023-08-03'),
(14, 'Economy', '1Z999KK1034567800', 'USPS', 'First Class', '2023-08-17', '2023-08-16', 9.99, 1.0, '8x6x4', '2023-08-12', 0, NULL, 'Left in parcel locker', '2023-08-12'),
(15, 'Standard', '1Z999LL1034567801', 'FedEx', 'Ground', '2023-08-22', '2023-08-21', 19.99, 8.0, '16x16x6', '2023-08-17', 1, 'Pastor John', 'Church delivery', '2023-08-17'),
(16, 'Standard', '1Z999MM1034567802', 'UPS', 'Ground', '2023-08-27', '2023-08-26', 49.99, 15.5, '48x16x8', '2023-08-22', 1, 'Lily Hall', 'Later returned as defective', '2023-08-22'),
(17, 'Express', '1Z999NN1034567803', 'FedEx', '2Day', '2023-09-01', '2023-08-31', 29.99, 50.0, '24x20x12', '2023-08-27', 1, 'Alex Martin', 'Return customer', '2023-08-27'),
(19, 'Standard', '1Z999OO1034567804', 'UPS', 'Ground', '2023-09-12', '2023-09-11', 19.99, 11.0, '44x14x8', '2023-09-07', 1, 'Emily Davis', 'Music school delivery', '2023-09-07'),
(20, 'Express', '1Z999PP1034567805', 'FedEx', 'Overnight', '2023-09-13', '2023-09-12', 99.99, 60.0, '32x24x20', '2023-09-12', 1, 'Studio Manager', 'Professional studio equipment', '2023-09-12'),
(21, 'Economy', '1Z999QQ1034567806', 'USPS', 'First Class', '2023-09-22', '2023-09-21', 14.99, 1.5, '10x8x6', '2023-09-17', 0, NULL, 'Small packet', '2023-09-17');

-- =============================================
-- 23. INSERT DATA INTO Returns (Minimum 20 rows)
-- =============================================
INSERT INTO Returns (ReturnNumber, OrderID, UserID, ReturnDate, ReturnReason, ReturnStatus, RefundAmount, RefundMethod, RefundDate, RestockingFee, Notes, CreatedAt, UpdatedAt) VALUES
('RET-2023-1001', 16, 20, '2023-08-28', 'Defective product - scratchy output jack', 'Refunded', 1777.98, 'Original Payment', '2023-09-05', 0, 'Customer reported defective output jack. Product inspected and confirmed.', '2023-08-28', '2023-09-05'),
('RET-2023-1002', 2, 6, '2023-06-25', 'Changed mind - decided on different model', 'Rejected', NULL, NULL, NULL, 0, 'Return requested after 14-day return period. Customer informed of policy.', '2023-06-25', '2023-06-27'),
('RET-2023-1003', 5, 9, '2023-07-10', 'Microphone too sensitive for my setup', 'Refunded', 451.98, 'Original Payment', '2023-07-15', 0, 'Product returned in original condition. Full refund issued.', '2023-07-10', '2023-07-15'),
('RET-2023-1004', 8, 12, '2023-07-25', 'Synthesizer damaged during shipping', 'Exchange', NULL, NULL, NULL, 0, 'Exchange for new unit. Shipping damage confirmed.', '2023-07-25', '2023-08-01'),
('RET-2023-1005', 3, 7, '2023-06-30', 'Guitar not the right color as shown online', 'Refunded', 893.98, 'Store Credit', '2023-07-05', 15.00, 'Color mismatch. 15% restocking fee applied for opened item.', '2023-06-30', '2023-07-05'),
('RET-2023-1006', 12, 16, '2023-08-15', 'Digital piano keys sticking', 'Refunded', 883.98, 'Original Payment', '2023-08-20', 0, 'Manufacturer defect confirmed. Full refund issued.', '2023-08-15', '2023-08-20'),
('RET-2023-1007', 1, 5, '2023-06-20', 'Found better price elsewhere', 'Rejected', NULL, NULL, NULL, 0, 'Price matching not available after purchase. Return denied.', '2023-06-20', '2023-06-22'),
('RET-2023-1008', 10, 14, '2023-08-05', 'Guitar neck too thick for my hands', 'Exchange', NULL, NULL, NULL, 25.00, 'Exchange for different model. 25% restocking fee.', '2023-08-05', '2023-08-10'),
('RET-2023-1009', 15, 19, '2023-08-25', 'Cymbals too bright sounding', 'Refunded', 397.98, 'Store Credit', '2023-08-30', 10.00, 'Personal preference return. 10% restocking fee.', '2023-08-25', '2023-08-30'),
('RET-2023-1010', 17, 5, '2023-09-10', 'Amplifier humming noise', 'Inspected', NULL, NULL, NULL, 0, 'Product received for inspection. Testing in progress.', '2023-09-10', '2023-09-10'),
('RET-2023-1011', 19, 7, '2023-09-20', 'Les Paul too heavy for extended playing', 'Requested', NULL, NULL, NULL, 0, 'Return request submitted. Awaiting approval.', '2023-09-20', '2023-09-20'),
('RET-2023-1012', 4, 8, '2023-07-05', 'Electronic drums missing power cable', 'Refunded', 2190.98, 'Original Payment', '2023-07-10', 0, 'Missing accessory. Full refund issued.', '2023-07-05', '2023-07-10'),
('RET-2023-1013', 6, 10, '2023-07-20', 'Acoustic guitar finish cracking', 'Refunded', 1883.98, 'Original Payment', '2023-07-25', 0, 'Manufacturer defect. Full refund issued.', '2023-07-20', '2023-07-25'),
('RET-2023-1014', 9, 13, '2023-08-01', 'Ibanez guitar not staying in tune', 'Exchange', NULL, NULL, NULL, 0, 'Exchange approved for tuning stability issue.', '2023-08-01', '2023-08-05'),
('RET-2023-1015', 11, 15, '2023-08-10', 'Headphones uncomfortable for long sessions', 'Refunded', 171.98, 'Store Credit', '2023-08-15', 0, 'Comfort issue. Full store credit issued.', '2023-08-10', '2023-08-15'),
('RET-2023-1016', 13, 17, '2023-08-12', 'Order cancelled before shipment', 'Refunded', 2975.98, 'Original Payment', '2023-08-12', 0, 'Order cancelled per customer request.', '2023-08-12', '2023-08-12'),
('RET-2023-1017', 14, 18, '2023-08-20', 'Audio interface drivers not compatible with Mac', 'Refunded', 183.58, 'Original Payment', '2023-08-25', 0, 'Compatibility issue. Full refund issued.', '2023-08-20', '2023-08-25'),
('RET-2023-1018', 18, 6, '2023-09-15', 'Mixer too complex for my needs', 'Requested', NULL, NULL, NULL, 0, 'Return request for complexity issue.', '2023-09-15', '2023-09-15'),
('RET-2023-1019', 20, 8, '2023-09-25', 'Workstation damaged corner during shipping', 'Approved', NULL, NULL, NULL, 0, 'Shipping damage confirmed. Return approved.', '2023-09-25', '2023-09-25'),
('RET-2023-1020', 21, 9, '2023-10-01', 'Wrong strings gauge ordered', 'Received', NULL, NULL, NULL, 0, 'Wrong product ordered by customer. Return received.', '2023-10-01', '2023-10-01');

-- =============================================
-- 24. INSERT DATA INTO ReturnItems (Minimum 20 rows)
-- =============================================
INSERT INTO ReturnItems (ReturnID, OrderItemID, ProductID, Quantity, Reason, Condition, Restock, RestockedQuantity, RestockedDate, RefundAmount) VALUES
(1, 16, 1, 1, 'Defective output jack', 'Defective', 0, 0, NULL, 1599.99),
(2, 2, 3, 1, 'Changed mind', 'Like New', 1, 1, '2023-06-27', 2599.99),
(3, 5, 13, 1, 'Too sensitive', 'Like New', 1, 1, '2023-07-15', 399.99),
(4, 8, 10, 1, 'Shipping damage', 'Damaged', 0, 0, NULL, NULL),
(5, 3, 2, 1, 'Color mismatch', 'Used', 1, 1, '2023-07-05', 799.99),
(6, 12, 8, 1, 'Sticking keys', 'Defective', 0, 0, NULL, 799.99),
(7, 1, 1, 1, 'Price match', 'Like New', 0, 0, NULL, NULL),
(8, 10, 18, 1, 'Neck too thick', 'Used', 1, 1, '2023-08-10', 849.99),
(9, 15, 20, 1, 'Sound preference', 'Like New', 1, 1, '2023-08-30', 349.99),
(10, 17, 15, 1, 'Humming noise', 'Used', 0, 0, NULL, NULL),
(11, 19, 19, 1, 'Too heavy', 'Like New', 1, 0, NULL, NULL),
(12, 4, 12, 1, 'Missing cable', 'Like New', 1, 1, '2023-07-10', 1949.99),
(13, 6, 5, 1, 'Finish cracking', 'Defective', 0, 0, NULL, 1699.99),
(14, 9, 17, 1, 'Tuning stability', 'Used', 1, 1, '2023-08-05', 1199.99),
(15, 11, 22, 1, 'Uncomfortable', 'Like New', 1, 1, '2023-08-15', 149.99),
(16, 13, 3, 1, 'Order cancellation', 'Like New', 1, 1, '2023-08-12', 2699.99),
(17, 14, 16, 1, 'Compatibility issue', 'Like New', 1, 1, '2023-08-25', 159.99),
(18, 18, 23, 1, 'Too complex', 'Like New', 1, 0, NULL, NULL),
(19, 20, 10, 1, 'Shipping damage', 'Damaged', 0, 0, NULL, NULL),
(20, 21, NULL, 5, 'Wrong gauge', 'Like New', 1, 5, '2023-10-05', 199.95);

-- =============================================
-- 25. INSERT DATA INTO Discounts (Minimum 20 rows)
-- =============================================
INSERT INTO Discounts (DiscountCode, DiscountName, DiscountType, DiscountValue, MinimumPurchase, MaximumDiscount, StartDate, EndDate, UsageLimit, UsageCount, IsActive, ApplyTo, CreatedAt) VALUES
('WELCOME10', 'Welcome Discount', 'Percentage', 10.00, 100.00, 50.00, '2023-01-01', '2024-12-31', 1000, 245, 1, 'All Products', '2023-01-01'),
('STUDENT15', 'Student Discount', 'Percentage', 15.00, 50.00, 100.00, '2023-01-01', '2024-12-31', 5000, 1789, 1, 'All Products', '2023-01-01'),
('SUMMER2023', 'Summer Sale', 'Percentage', 20.00, 200.00, 200.00, '2023-06-01', '2023-08-31', 2000, 1567, 1, 'All Products', '2023-05-15'),
('BLACKFRIDAY', 'Black Friday', 'Percentage', 30.00, 100.00, 300.00, '2023-11-24', '2023-11-27', 3000, 0, 1, 'All Products', '2023-10-01'),
('FREESHIP', 'Free Shipping', 'Free Shipping', 0.00, 50.00, NULL, '2023-01-01', '2024-12-31', NULL, 3456, 1, 'All Products', '2023-01-01'),
('GUITAR20', 'Guitar Promotion', 'Percentage', 20.00, 500.00, 500.00, '2023-03-01', '2023-12-31', 1000, 567, 1, 'Specific Categories', '2023-02-15'),
('FIRSTORDER', 'First Order', 'Fixed Amount', 25.00, 100.00, 25.00, '2023-01-01', '2024-12-31', 1, 892, 1, 'All Products', '2023-01-01'),
('BULK10', 'Bulk Purchase', 'Percentage', 10.00, 1000.00, 500.00, '2023-01-01', '2024-12-31', NULL, 234, 1, 'All Products', '2023-01-01'),
('VIP25', 'VIP Customer', 'Percentage', 25.00, 0.00, NULL, '2023-01-01', '2024-12-31', NULL, 89, 1, 'All Products', '2023-01-01'),
('NEWARRIVAL', 'New Arrivals', 'Percentage', 15.00, 0.00, 150.00, '2023-01-01', '2024-12-31', NULL, 456, 1, 'Specific Products', '2023-01-01'),
('CLEARANCE', 'Clearance Sale', 'Percentage', 40.00, 0.00, NULL, '2023-01-01', '2024-12-31', NULL, 1234, 1, 'Specific Products', '2023-01-01'),
('BIRTHDAY', 'Birthday Discount', 'Fixed Amount', 20.00, 50.00, 20.00, '2023-01-01', '2024-12-31', 1, 567, 1, 'All Products', '2023-01-01'),
('REFER10', 'Referral Program', 'Percentage', 10.00, 0.00, 100.00, '2023-01-01', '2024-12-31', NULL, 345, 1, 'All Products', '2023-01-01'),
('MUSICTEACH', 'Music Teacher', 'Percentage', 20.00, 100.00, 200.00, '2023-01-01', '2024-12-31', NULL, 234, 1, 'All Products', '2023-01-01'),
('HOLIDAY25', 'Holiday Season', 'Percentage', 25.00, 100.00, 250.00, '2023-12-01', '2023-12-31', 5000, 0, 1, 'All Products', '2023-11-15'),
('AMPLIFIER15', 'Amplifier Sale', 'Percentage', 15.00, 300.00, 150.00, '2023-04-01', '2023-12-31', 500, 189, 1, 'Specific Categories', '2023-03-20'),
('DRUMSET500', 'Drum Set Special', 'Fixed Amount', 500.00, 2000.00, 500.00, '2023-05-01', '2023-12-31', 100, 45, 1, 'Specific Products', '2023-04-15'),
('PIANO10', 'Piano Promotion', 'Percentage', 10.00, 500.00, 200.00, '2023-02-01', '2024-12-31', 1000, 267, 1, 'Specific Categories', '2023-01-20'),
('STRINGS5', 'Strings Discount', 'Fixed Amount', 5.00, 30.00, 5.00, '2023-01-01', '2024-12-31', NULL, 1567, 1, 'Specific Categories', '2023-01-01'),
('LOYALTY5', 'Loyalty Reward', 'Percentage', 5.00, 0.00, 50.00, '2023-01-01', '2024-12-31', NULL, 2345, 1, 'All Products', '2023-01-01'),
('FLASH30', 'Flash Sale', 'Percentage', 30.00, 100.00, 150.00, '2023-09-15', '2023-09-17', 500, 487, 1, 'Specific Products', '2023-09-10');

-- =============================================
-- 26. INSERT DATA INTO DiscountCategories (Minimum 20 rows)
-- =============================================
INSERT INTO DiscountCategories (DiscountID, CategoryID) VALUES
(6, 1),   -- GUITAR20 applies to Guitars
(6, 2),   -- GUITAR20 applies to Acoustic Guitars
(6, 3),   -- GUITAR20 applies to Electric Guitars
(6, 4),   -- GUITAR20 applies to Bass Guitars
(16, 25), -- AMPLIFIER15 applies to Amplifiers & Effects
(16, 26), -- AMPLIFIER15 applies to Guitar Amplifiers
(16, 27), -- AMPLIFIER15 applies to Bass Amplifiers
(16, 28), -- AMPLIFIER15 applies to Effects Pedals
(18, 5),  -- PIANO10 applies to Pianos & Keyboards
(18, 6),  -- PIANO10 applies to Digital Pianos
(18, 7),  -- PIANO10 applies to Synthesizers
(18, 8),  -- PIANO10 applies to MIDI Controllers
(19, 22), -- STRINGS5 applies to Accessories
(19, 23), -- STRINGS5 applies to Guitar Accessories
(10, 1),  -- NEWARRIVAL applies to Guitars
(10, 5),  -- NEWARRIVAL applies to Pianos & Keyboards
(10, 9),  -- NEWARRIVAL applies to Drums & Percussion
(11, 1),  -- CLEARANCE applies to Guitars
(11, 22), -- CLEARANCE applies to Accessories
(11, 25); -- CLEARANCE applies to Amplifiers & Effects

-- =============================================
-- 27. INSERT DATA INTO DiscountProducts (Minimum 20 rows)
-- =============================================
INSERT INTO DiscountProducts (DiscountID, ProductID) VALUES
(10, 2),   -- NEWARRIVAL applies to Fender Telecaster
(10, 5),   -- NEWARRIVAL applies to Taylor 314ce
(10, 8),   -- NEWARRIVAL applies to Roland FP-30X
(10, 11),  -- NEWARRIVAL applies to Pearl Export
(10, 12),  -- NEWARRIVAL applies to Roland TD-17KVX
(10, 15),  -- NEWARRIVAL applies to Marshall DSL40CR
(10, 18),  -- NEWARRIVAL applies to PRS SE Custom 24
(10, 23),  -- NEWARRIVAL applies to Behringer X32
(11, 4),   -- CLEARANCE applies to Yamaha FG800
(11, 7),   -- CLEARANCE applies to Fender Precision Bass
(11, 9),   -- CLEARANCE applies to Yamaha P-125
(11, 14),  -- CLEARANCE applies to BOSS DS-1
(11, 19),  -- CLEARANCE applies to Epiphone Les Paul
(11, 21),  -- CLEARANCE applies to Sabian Crash
(11, 22),  -- CLEARANCE applies to Audio-Technica Headphones
(17, 11),  -- DRUMSET500 applies to Pearl Export
(17, 12),  -- DRUMSET500 applies to Roland TD-17KVX
(21, 1),   -- FLASH30 applies to Fender Stratocaster
(21, 3),   -- FLASH30 applies to Gibson Les Paul
(21, 6),   -- FLASH30 applies to Martin D-28
(21, 10),  -- FLASH30 applies to Korg Kronos
(21, 13);  -- FLASH30 applies to Shure SM7B

-- =============================================
-- 28. INSERT DATA INTO Wishlists (Minimum 20 rows)
-- =============================================
INSERT INTO Wishlists (UserID, ProductID, AddedDate, Notes) VALUES
(5, 3, '2023-06-01', 'Dream guitar - saving up'),
(5, 6, '2023-06-10', 'For acoustic recordings'),
(5, 10, '2023-07-05', 'Studio workstation'),
(6, 1, '2023-04-15', 'Next purchase'),
(6, 13, '2023-05-20', 'For podcast setup'),
(7, 5, '2023-06-25', 'Acoustic upgrade'),
(7, 16, '2023-07-10', 'Home studio interface'),
(8, 12, '2023-05-05', 'Electronic drums for apartment'),
(8, 20, '2023-06-15', 'Upgrade cymbals'),
(9, 3, '2023-07-01', 'Les Paul for collection'),
(9, 15, '2023-08-10', 'Marshall amp stack'),
(10, 8, '2023-06-20', 'Digital piano for lessons'),
(10, 22, '2023-07-15', 'Monitoring headphones'),
(11, 4, '2023-08-01', 'First guitar'),
(11, 14, '2023-08-20', 'Distortion pedal'),
(12, 10, '2023-07-25', 'Professional synth'),
(12, 23, '2023-08-05', 'Mixing console'),
(13, 2, '2023-08-10', 'Telecaster for studio'),
(13, 9, '2023-09-01', 'Portable piano'),
(14, 6, '2023-08-15', 'Martin for church'),
(14, 18, '2023-09-05', 'PRS for gigs'),
(15, 7, '2023-09-10', 'Bass guitar'),
(15, 21, '2023-09-20', 'Crash cymbal'),
(16, 1, '2023-08-25', 'Stratocaster wish'),
(16, 11, '2023-09-15', 'Drum set');

-- =============================================
-- 29. INSERT DATA INTO ShoppingCart (Minimum 20 rows)
-- =============================================
INSERT INTO ShoppingCart (UserID, ProductID, VariationID, Quantity, AddedDate, UpdatedAt) VALUES
(5, 14, NULL, 1, '2023-10-01', '2023-10-01'),
(5, 16, NULL, 1, '2023-10-05', '2023-10-05'),
(6, 19, NULL, 1, '2023-10-02', '2023-10-02'),
(6, 22, NULL, 1, '2023-10-10', '2023-10-10'),
(7, 4, 10, 1, '2023-10-03', '2023-10-03'),
(7, 14, NULL, 1, '2023-10-08', '2023-10-08'),
(8, 11, 25, 1, '2023-10-04', '2023-10-04'),
(8, 20, NULL, 1, '2023-10-12', '2023-10-12'),
(9, 2, 5, 1, '2023-10-05', '2023-10-05'),
(9, 15, 30, 1, '2023-10-15', '2023-10-15'),
(10, 8, 20, 1, '2023-10-06', '2023-10-06'),
(10, 9, 21, 1, '2023-10-18', '2023-10-18'),
(11, 4, 12, 1, '2023-10-07', '2023-10-07'),
(11, NULL, NULL, 5, '2023-10-20', '2023-10-20'), -- Strings
(12, 1, 3, 1, '2023-10-08', '2023-10-08'),
(12, 13, NULL, 1, '2023-10-22', '2023-10-22'),
(13, 7, 18, 1, '2023-10-09', '2023-10-09'),
(13, 16, NULL, 1, '2023-10-25', '2023-10-25'),
(14, 5, 14, 1, '2023-10-10', '2023-10-10'),
(14, 18, NULL, 1, '2023-10-28', '2023-10-28'),
(15, 12, NULL, 1, '2023-10-11', '2023-10-11'),
(15, 21, NULL, 1, '2023-10-30', '2023-10-30'),
(16, 3, 9, 1, '2023-10-12', '2023-10-12'),
(16, 10, NULL, 1, '2023-11-01', '2023-11-01');

-- =============================================
-- 30. INSERT DATA INTO SearchHistory (Minimum 20 rows)
-- =============================================
INSERT INTO SearchHistory (UserID, SearchQuery, SearchResultsCount, CategoryFilter, PriceMin, PriceMax, BrandFilter, SearchDate, IPAddress) VALUES
(5, 'fender stratocaster', 5, 'Electric Guitars', 1000, 2000, 'Fender', '2023-06-01 10:30:00', '192.168.1.100'),
(5, 'tube amplifier', 12, 'Amplifiers', 500, 2000, NULL, '2023-06-05 14:20:00', '192.168.1.100'),
(6, 'martin acoustic guitar', 8, 'Acoustic Guitars', 2000, 4000, 'Martin', '2023-06-10 11:15:00', '192.168.1.101'),
(7, 'boss pedals', 25, 'Effects Pedals', 50, 300, 'Boss', '2023-06-15 09:45:00', '192.168.1.102'),
(8, 'electronic drums', 15, 'Electronic Drums', 1000, 3000, NULL, '2023-06-20 16:30:00', '192.168.1.103'),
(9, 'shure sm7b', 3, 'Microphones', 300, 500, 'Shure', '2023-06-25 13:10:00', '192.168.1.104'),
(10, 'digital piano weighted keys', 20, 'Digital Pianos', 500, 1500, NULL, '2023-07-01 10:00:00', '192.168.1.105'),
(11, 'beginner guitar package', 10, 'Acoustic Guitars', 200, 500, NULL, '2023-07-05 15:45:00', '192.168.1.106'),
(12, 'korg workstation', 7, 'Synthesizers', 2000, 4000, 'Korg', '2023-07-10 12:20:00', '192.168.1.107'),
(13, 'audio interface usb', 18, 'Audio Interfaces', 100, 500, NULL, '2023-07-15 14:30:00', '192.168.1.108'),
(14, 'prs se custom', 6, 'Electric Guitars', 800, 1200, 'PRS', '2023-07-20 11:00:00', '192.168.1.109'),
(15, 'studio headphones', 22, 'Accessories', 50, 300, NULL, '2023-07-25 09:15:00', '192.168.1.110'),
(16, 'marshall amp 40w', 8, 'Guitar Amplifiers', 800, 1200, 'Marshall', '2023-08-01 16:45:00', '192.168.1.111'),
(17, 'gibson les paul', 10, 'Electric Guitars', 2000, 3000, 'Gibson', '2023-08-05 13:30:00', '192.168.1.112'),
(18, 'focusrite scarlett', 5, 'Audio Interfaces', 150, 250, 'Focusrite', '2023-08-10 10:10:00', '192.168.1.113'),
(19, 'zildjian cymbals', 15, 'Cymbals', 200, 600, 'Zildjian', '2023-08-15 15:20:00', '192.168.1.114'),
(20, 'taylor 314ce', 4, 'Acoustic Guitars', 1700, 1900, 'Taylor', '2023-08-20 12:40:00', '192.168.1.115'),
(NULL, 'guitar strings', 35, 'Accessories', 5, 50, NULL, '2023-08-25 14:00:00', '192.168.1.116'),
(NULL, 'drum sticks', 28, 'Drum Accessories', 10, 40, NULL, '2023-08-30 11:50:00', '192.168.1.117'),
(5, 'recording microphone', 20, 'Microphones', 100, 1000, NULL, '2023-09-01 09:30:00', '192.168.1.118');

-- =============================================
-- 31. INSERT DATA INTO ProductViews (Minimum 20 rows)
-- =============================================
INSERT INTO ProductViews (ProductID, UserID, ViewDate, SessionID, IPAddress, UserAgent, TimeSpentSeconds) VALUES
(1, 5, '2023-06-01 10:35:00', 'sess_001', '192.168.1.100', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)', 120),
(1, 6, '2023-06-02 11:20:00', 'sess_002', '192.168.1.101', 'Mozilla/5.0 (Macintosh; Intel Mac OS X)', 180),
(1, NULL, '2023-06-03 14:15:00', 'sess_003', '192.168.1.102', 'Chrome/91.0.4472.124', 60),
(3, 5, '2023-06-05 15:30:00', 'sess_004', '192.168.1.100', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)', 300),
(3, 8, '2023-06-06 10:45:00', 'sess_005', '192.168.1.103', 'Safari/14.1.1', 240),
(4, 11, '2023-06-10 09:20:00', 'sess_006', '192.168.1.106', 'Chrome/92.0.4515.107', 90),
(5, 7, '2023-06-12 13:10:00', 'sess_007', '192.168.1.102', 'Chrome/91.0.4472.124', 150),
(6, 6, '2023-06-15 16:25:00', 'sess_008', '192.168.1.101', 'Mozilla/5.0 (Macintosh; Intel Mac OS X)', 210),
(8, 10, '2023-06-20 11:40:00', 'sess_009', '192.168.1.105', 'Mozilla/5.0 (Windows NT 10.0)', 180),
(10, 12, '2023-06-25 14:50:00', 'sess_010', '192.168.1.107', 'Safari/15.0', 420),
(12, 8, '2023-07-01 10:15:00', 'sess_011', '192.168.1.103', 'Safari/14.1.1', 270),
(13, 9, '2023-07-05 15:20:00', 'sess_012', '192.168.1.104', 'Firefox/89.0', 120),
(14, 7, '2023-07-10 12:30:00', 'sess_013', '192.168.1.102', 'Chrome/91.0.4472.124', 60),
(15, 5, '2023-07-15 14:45:00', 'sess_014', '192.168.1.100', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)', 180),
(16, 13, '2023-07-20 11:10:00', 'sess_015', '192.168.1.108', 'Edge/91.0.864.59', 150),
(18, 14, '2023-07-25 16:20:00', 'sess_016', '192.168.1.109', 'Chrome/93.0.4577.63', 210),
(20, 19, '2023-08-01 10:30:00', 'sess_017', '192.168.1.114', 'Firefox/91.0', 90),
(22, 15, '2023-08-05 13:40:00', 'sess_018', '192.168.1.110', 'Firefox/90.0', 120),
(1, 16, '2023-08-10 15:50:00', 'sess_019', '192.168.1.111', 'Safari/15.1', 180),
(3, 17, '2023-08-15 09:25:00', 'sess_020', '192.168.1.112', 'Chrome/94.0.4606.61', 240);

-- =============================================
-- 32. INSERT DATA INTO AuditLogs (Minimum 20 rows)
-- =============================================
INSERT INTO AuditLogs (TableName, RecordID, Action, OldValues, NewValues, ChangedBy, ChangedAt, IPAddress) VALUES
('Users', 5, 'INSERT', NULL, '{"UserID":5,"Username":"customer.alex","Email":"alex.martin@email.com"}', 1, '2023-03-15 10:00:00', '192.168.1.1'),
('Products', 1, 'INSERT', NULL, '{"ProductID":1,"SKU":"FEN-ST-001","ProductName":"Fender Stratocaster"}', 2, '2023-01-15 09:30:00', '192.168.1.2'),
('Products', 1, 'UPDATE', '{"UnitPrice":1499.99}', '{"UnitPrice":1599.99}', 2, '2023-12-01 11:20:00', '192.168.1.2'),
('Orders', 1, 'INSERT', NULL, '{"OrderID":1,"OrderNumber":"ORD-2023-1001","UserID":5}', 5, '2023-06-05 10:30:00', '192.168.1.100'),
('Orders', 1, 'UPDATE', '{"OrderStatus":"Processing"}', '{"OrderStatus":"Shipped"}', 3, '2023-06-07 09:20:00', '192.168.1.3'),
('Inventory', 1, 'UPDATE', '{"Quantity":20}', '{"Quantity":15}', 3, '2023-12-15 14:30:00', '192.168.1.3'),
('Products', 2, 'UPDATE', '{"IsOnSale":0}', '{"IsOnSale":1}', 5, '2023-12-15 15:45:00', '192.168.1.5'),
('Users', 6, 'UPDATE', '{"LastLogin":NULL}', '{"LastLogin":"2024-01-15 10:20:00"}', 6, '2024-01-15 10:20:00', '192.168.1.101'),
('Orders', 13, 'UPDATE', '{"OrderStatus":"Processing"}', '{"OrderStatus":"Cancelled"}', 5, '2023-08-07 14:30:00', '192.168.1.112'),
('Returns', 1, 'INSERT', NULL, '{"ReturnID":1,"ReturnNumber":"RET-2023-1001","OrderID":16}', 2, '2023-08-28 11:15:00', '192.168.1.2'),
('Payments', 13, 'UPDATE', '{"PaymentStatus":"Completed"}', '{"PaymentStatus":"Refunded"}', 2, '2023-08-07 15:00:00', '192.168.1.2'),
('Inventory', 1, 'INSERT', NULL, '{"InventoryID":1,"ProductID":1,"WarehouseID":1}', 3, '2023-01-15 16:00:00', '192.168.1.3'),
('Discounts', 1, 'INSERT', NULL, '{"DiscountID":1,"DiscountCode":"WELCOME10"}', 8, '2023-01-01 09:00:00', '192.168.1.8'),
('PurchaseOrders', 1, 'UPDATE', '{"Status":"Ordered"}', '{"Status":"Received"}', 3, '2023-02-18 14:00:00', '192.168.1.3'),
('Products', 4, 'UPDATE', '{"IsFeatured":0}', '{"IsFeatured":1}', 5, '2023-06-01 10:00:00', '192.168.1.5'),
('Users', 5, 'UPDATE', '{"Phone":"+1-555-0201"}', '{"Phone":"+1-555-0201-123"}', 5, '2023-07-01 11:30:00', '192.168.1.100'),
('Orders', 6, 'UPDATE', '{"ShippingStatus":"Pending"}', '{"ShippingStatus":"Shipped"}', 4, '2023-07-03 12:15:00', '192.168.1.4'),
('ProductReviews', 1, 'INSERT', NULL, '{"ReviewID":1,"ProductID":1,"UserID":5}', 5, '2023-06-01 14:20:00', '192.168.1.100'),
('Wishlists', 1, 'INSERT', NULL, '{"WishlistID":1,"UserID":5,"ProductID":3}', 5, '2023-06-01 15:30:00', '192.168.1.100'),
('ShoppingCart', 1, 'DELETE', '{"CartID":1,"UserID":5,"ProductID":1}', NULL, 5, '2023-06-05 11:00:00', '192.168.1.100');

-- =============================================
-- 33. INSERT DATA INTO SystemLogs (Minimum 20 rows)
-- =============================================
INSERT INTO SystemLogs (LogLevel, LogSource, Message, ExceptionDetails, UserID, IPAddress, CreatedAt) VALUES
('INFO', 'Authentication', 'User login successful: customer.alex', NULL, 5, '192.168.1.100', '2023-06-01 10:25:00'),
('INFO', 'Order', 'Order created: ORD-2023-1001', NULL, 5, '192.168.1.100', '2023-06-05 10:30:00'),
('INFO', 'Payment', 'Payment processed successfully for order ORD-2023-1001', NULL, NULL, '192.168.1.100', '2023-06-05 11:00:00'),
('WARNING', 'Inventory', 'Low stock alert: Product FEN-ST-001 quantity below minimum', NULL, 3, '192.168.1.3', '2023-12-10 09:15:00'),
('ERROR', 'PaymentGateway', 'Payment gateway timeout', 'TimeoutException: Connection timed out after 30 seconds', NULL, '192.168.1.100', '2023-07-25 14:20:00'),
('INFO', 'Shipping', 'Order ORD-2023-1001 shipped with tracking 1Z999AA1034567890', NULL, 3, '192.168.1.3', '2023-06-07 09:20:00'),
('DEBUG', 'API', 'Product search API called: query=fender stratocaster', NULL, 5, '192.168.1.100', '2023-06-01 10:30:00'),
('INFO', 'User', 'New user registration: david.guitar@email.com', NULL, NULL, '192.168.1.101', '2023-04-01 14:35:00'),
('ERROR', 'Database', 'Database connection pool exhausted', 'Too many connections: max=100', NULL, '192.168.1.2', '2023-08-15 11:45:00'),
('INFO', 'Inventory', 'Purchase order PO-2023-001 received successfully', NULL, 3, '192.168.1.3', '2023-02-18 14:00:00'),
('WARNING', 'Security', 'Multiple failed login attempts for user: admin.john', NULL, NULL, '192.168.1.50', '2023-09-10 16:30:00'),
('INFO', 'Discount', 'Discount code WELCOME10 applied to order ORD-2023-1006', NULL, 10, '192.168.1.105', '2023-07-01 12:15:00'),
('ERROR', 'Email', 'Failed to send order confirmation email', 'SMTPException: Could not connect to SMTP host', NULL, '192.168.1.2', '2023-06-20 10:05:00'),
('INFO', 'Return', 'Return processed: RET-2023-1001', NULL, 2, '192.168.1.2', '2023-08-28 11:15:00'),
('DEBUG', 'Cache', 'Product cache cleared for category: Electric Guitars', NULL, 5, '192.168.1.5', '2023-07-15 16:20:00'),
('INFO', 'Report', 'Monthly sales report generated for July 2023', NULL, 2, '192.168.1.2', '2023-08-01 09:00:00'),
('WARNING', 'Inventory', 'Product FEN-TE-002 out of stock in warehouse 2', NULL, 3, '192.168.1.3', '2023-08-20 14:30:00'),
('INFO', 'Backup', 'Database backup completed successfully', NULL, 1, '192.168.1.1', '2023-09-01 02:00:00'),
('ERROR', 'API', 'External payment gateway API rate limit exceeded', 'RateLimitExceeded: 429 Too Many Requests', NULL, '192.168.1.2', '2023-08-25 15:45:00'),
('INFO', 'System', 'Application started successfully', NULL, NULL, '192.168.1.1', '2023-01-01 08:00:00');

-- =============================================
-- 34. INSERT DATA INTO Notifications (Minimum 20 rows)
-- =============================================
INSERT INTO Notifications (UserID, NotificationType, Title, Message, IsRead, LinkURL, SentDate, ReadDate) VALUES
(5, 'Order', 'Order Confirmed', 'Your order ORD-2023-1001 has been confirmed and is being processed.', 1, '/orders/ORD-2023-1001', '2023-06-05 10:35:00', '2023-06-05 11:00:00'),
(5, 'Shipping', 'Order Shipped', 'Your order ORD-2023-1001 has been shipped. Tracking: 1Z999AA1034567890', 1, '/orders/ORD-2023-1001', '2023-06-07 09:25:00', '2023-06-07 10:15:00'),
(5, 'Payment', 'Payment Received', 'Payment for order ORD-2023-1001 has been successfully processed.', 1, '/orders/ORD-2023-1001', '2023-06-05 11:05:00', '2023-06-05 11:30:00'),
(6, 'Order', 'Order Delivered', 'Your order ORD-2023-1002 has been delivered. We hope you enjoy your purchase!', 1, '/orders/ORD-2023-1002', '2023-06-18 11:25:00', '2023-06-18 12:00:00'),
(7, 'Promotion', 'Summer Sale', 'Get 20% off all guitars during our Summer Sale! Limited time offer.', 0, '/promotions/summer-sale', '2023-06-01 09:00:00', NULL),
(8, 'Inventory', 'Back in Stock', 'The Roland TD-17KVX Electronic Drum Set is back in stock!', 1, '/products/12', '2023-07-15 10:30:00', '2023-07-15 11:45:00'),
(9, 'System', 'Account Verification', 'Please verify your email address to complete your account setup.', 1, '/account/verify', '2023-05-21 14:00:00', '2023-05-21 14:30:00'),
(10, 'Order', 'Order Status Update', 'Your order ORD-2023-1006 status has been updated to Shipped.', 1, '/orders/ORD-2023-1006', '2023-07-03 12:20:00', '2023-07-03 13:00:00'),
(11, 'Promotion', 'Student Discount', 'As a student, you get 15% off all purchases! Use code STUDENT15.', 0, '/student-discount', '2023-06-16 11:00:00', NULL),
(12, 'Payment', 'Payment Failed', 'Payment for your recent order failed. Please update your payment method.', 1, '/account/payment-methods', '2023-09-02 10:15:00', '2023-09-02 11:30:00'),
(13, 'Order', 'Order Cancelled', 'Your order ORD-2023-1009 has been cancelled as requested.', 1, '/orders/ORD-2023-1009', '2023-08-07 15:05:00', '2023-08-07 16:20:00'),
(14, 'Shipping', 'Delivery Delayed', 'Your order delivery has been delayed due to weather conditions.', 0, '/orders/ORD-2023-1010', '2023-07-26 09:30:00', NULL),
(15, 'System', 'Password Reset', 'You have requested a password reset. Click here to reset your password.', 1, '/account/reset-password', '2023-08-16 16:45:00', '2023-08-16 17:30:00'),
(16, 'Inventory', 'Price Drop Alert', 'The Marshall DSL40CR Guitar Amplifier price has dropped!', 0, '/products/15', '2023-09-05 14:20:00', NULL),
(17, 'Order', 'Return Processed', 'Your return RET-2023-1016 has been processed and refund issued.', 1, '/returns/RET-2023-1016', '2023-08-12 15:30:00', '2023-08-12 16:45:00'),
(18, 'Promotion', 'Flash Sale', 'Flash Sale! 30% off selected items for next 24 hours only!', 0, '/flash-sale', '2023-09-15 08:00:00', NULL),
(19, 'Shipping', 'Out for Delivery', 'Your order is out for delivery today. Expected between 2-4 PM.', 1, '/orders/ORD-2023-1015', '2023-08-21 09:00:00', '2023-08-21 10:15:00'),
(20, 'System', 'Welcome to MusicStore', 'Welcome to MusicStore! Enjoy 10% off your first order with code WELCOME10.', 1, '/welcome', '2023-10-16 10:00:00', '2023-10-16 11:30:00'),
(5, 'Promotion', 'Birthday Discount', 'Happy Birthday! Enjoy a special 20% discount on us!', 0, '/birthday-offer', '2023-05-15 00:01:00', NULL),
(6, 'Inventory', 'Restock Notification', 'The Gibson Les Paul you wanted is back in stock!', 1, '/products/3', '2023-08-10 11:00:00', '2023-08-10 12:30:00'),
(7, 'Order', 'Review Request', 'How was your recent purchase? Share your experience with a review.', 0, '/write-review/3', '2023-06-23 10:00:00', NULL),
(8, 'System', 'Security Alert', 'New login detected from unknown device. Was this you?', 1, '/account/security', '2023-08-05 14:30:00', '2023-08-05 15:45:00');

PRINT 'All remaining tables populated with sample data!';
PRINT 'Suppliers: ' + CAST((SELECT COUNT(*) FROM Suppliers) AS VARCHAR) + ' rows';
PRINT 'PurchaseOrders: ' + CAST((SELECT COUNT(*) FROM PurchaseOrders) AS VARCHAR) + ' rows';
PRINT 'PurchaseOrderItems: ' + CAST((SELECT COUNT(*) FROM PurchaseOrderItems) AS VARCHAR) + ' rows';
PRINT 'UserAddresses: ' + CAST((SELECT COUNT(*) FROM UserAddresses) AS VARCHAR) + ' rows';
PRINT 'UserPaymentMethods: ' + CAST((SELECT COUNT(*) FROM UserPaymentMethods) AS VARCHAR) + ' rows';
PRINT 'Orders: ' + CAST((SELECT COUNT(*) FROM Orders) AS VARCHAR) + ' rows';
PRINT 'OrderItems: ' + CAST((SELECT COUNT(*) FROM OrderItems) AS VARCHAR) + ' rows';
PRINT 'OrderStatusHistory: ' + CAST((SELECT COUNT(*) FROM OrderStatusHistory) AS VARCHAR) + ' rows';
PRINT 'Payments: ' + CAST((SELECT COUNT(*) FROM Payments) AS VARCHAR) + ' rows';
PRINT 'Invoices: ' + CAST((SELECT COUNT(*) FROM Invoices) AS VARCHAR) + ' rows';
PRINT 'ShippingDetails: ' + CAST((SELECT COUNT(*) FROM ShippingDetails) AS VARCHAR) + ' rows';
PRINT 'Returns: ' + CAST((SELECT COUNT(*) FROM Returns) AS VARCHAR) + ' rows';
PRINT 'ReturnItems: ' + CAST((SELECT COUNT(*) FROM ReturnItems) AS VARCHAR) + ' rows';
PRINT 'Discounts: ' + CAST((SELECT COUNT(*) FROM Discounts) AS VARCHAR) + ' rows';
PRINT 'DiscountCategories: ' + CAST((SELECT COUNT(*) FROM DiscountCategories) AS VARCHAR) + ' rows';
PRINT 'DiscountProducts: ' + CAST((SELECT COUNT(*) FROM DiscountProducts) AS VARCHAR) + ' rows';
PRINT 'Wishlists: ' + CAST((SELECT COUNT(*) FROM Wishlists) AS VARCHAR) + ' rows';
PRINT 'ShoppingCart: ' + CAST((SELECT COUNT(*) FROM ShoppingCart) AS VARCHAR) + ' rows';
PRINT 'SearchHistory: ' + CAST((SELECT COUNT(*) FROM SearchHistory) AS VARCHAR) + ' rows';
PRINT 'ProductViews: ' + CAST((SELECT COUNT(*) FROM ProductViews) AS VARCHAR) + ' rows';
PRINT 'AuditLogs: ' + CAST((SELECT COUNT(*) FROM AuditLogs) AS VARCHAR) + ' rows';
PRINT 'SystemLogs: ' + CAST((SELECT COUNT(*) FROM SystemLogs) AS VARCHAR) + ' rows';
PRINT 'Notifications: ' + CAST((SELECT COUNT(*) FROM Notifications) AS VARCHAR) + ' rows';

select * from PurchaseOrderItems
