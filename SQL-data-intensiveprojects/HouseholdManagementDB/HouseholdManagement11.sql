-- step 11 - security setup

-- Create roles
CREATE ROLE HouseholdAdmin;
CREATE ROLE HouseholdMember;
CREATE ROLE FinanceManager;
CREATE ROLE ReadOnlyUser;

-- Create user for each family member (example)
CREATE LOGIN JohnSmith WITH PASSWORD = 'StrongPassword123';
CREATE USER JohnSmith FOR LOGIN JohnSmith;

CREATE LOGIN SarahSmith WITH PASSWORD = 'StrongPassword456';
CREATE USER SarahSmith FOR LOGIN SarahSmith;

-- Assign roles
ALTER ROLE HouseholdAdmin ADD MEMBER JohnSmith;
ALTER ROLE HouseholdAdmin ADD MEMBER SarahSmith;
ALTER ROLE FinanceManager ADD MEMBER JohnSmith;
ALTER ROLE HouseholdMember ADD MEMBER SarahSmith;

-- Grant permissions
GRANT SELECT, INSERT, UPDATE, DELETE ON SCHEMA::Household TO HouseholdAdmin;
GRANT SELECT, INSERT, UPDATE, DELETE ON SCHEMA::Inventory TO HouseholdAdmin;
GRANT SELECT, INSERT, UPDATE, DELETE ON SCHEMA::Tasks TO HouseholdAdmin;
GRANT SELECT, INSERT, UPDATE, DELETE ON SCHEMA::Finance TO FinanceManager;
GRANT SELECT ON SCHEMA::Household TO HouseholdMember;
GRANT SELECT ON SCHEMA::Inventory TO HouseholdMember;
GRANT SELECT ON SCHEMA::Tasks TO HouseholdMember;
GRANT SELECT ON SCHEMA::Finance TO FinanceManager;
GRANT SELECT ON ALL VIEWS TO ReadOnlyUser;