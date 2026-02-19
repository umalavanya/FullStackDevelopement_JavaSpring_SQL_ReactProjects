--======================= Uma Lavanya Chintapanti ================

----------------------- Mandatory Assignment -2 --------------
--import the Jomato.csv from Jomato Folder------------
--steps: right click on the sqlassignments ---> Tasks --> import Flat file --> browse the file path and upload
--Dataset: Jomato
--About the dataset:

--You work for a data analytics company, and your client is a food delivery platform similar to Jomato. 
--They have provided you with a dataset containing information about various restaurants in a city. 
--Your task is to analyze this dataset using SQL queries to extract valuable insights and generate reports for your client.

--Tasks to be performed:

--1. Create a user-defined functions to stuff the chicken into 'Quick Bites'. Eg. 'Quick Chicken Bites'.
--2. Use the function to display the restaurant name and cuisine type which has the maximum number of rating.
--3. Create a rating Status column to display the rating as 'Excellent' if it has  more the 4 star rating. 'Good' if it has above 3.5 and below 4 star rating, 'Average' if it is above 3 and below 3.5 and 'Bad' if it is below 3 star rating and 
--4. Find the ceil, floor and absolute values of the rating column and display the current date and separately display the year, month_name and day.
--5. Display the restaurant type and total average cost using rollup.
-------------------------------------------------------------------------------------------------------------------------------------------

SELECT * FROM Jomato ;

--1. Create a user-defined functions to stuff the chicken into 'Quick Bites'. Eg. 'Quick Chicken Bites'.

CREATE FUNCTION dbo.StuffChicken(@RestaurantName VARCHAR(100))
RETURNS VARCHAR(100)
AS
BEGIN
	DECLARE @Result VARCHAR(100) 
	--Check if the restaurant name is 'Quick Bites'
	IF @RestaurantName = 'Quick Bites'
		SET @Result = 'Quick Chicken Bites'
	ELSE 
		SET @Result = @RestaurantName
	RETURN @Result
END
GO

SELECT 
	RestaurantName,
	dbo.StuffChicken(RestaurantName) AS ModifiedName
FROM Jomato 
WHERE RestaurantName = 'Quick Bites' ;
GO
--==============================================================================================================================================

--2. Use the function to display the restaurant name and cuisine type which has the maximum number of rating.

CREATE FUNCTION dbo.GetMaxRatedRestaurants()
RETURNS @Result TABLE
(
	RestaurantName VARCHAR(100),
	CuisinesType VARCHAR(100),
	No_of_Rating INT,
	Rating DECIMAL(3,1),
	RestaurantType VARCHAR(100),
	Area VARCHAR(100)
)
AS
BEGIN
	DECLARE @MaxRating INT ;

	SELECT @MaxRating = MAX(No_of_rating) FROM Jomato ;

	INSERT INTO @Result
	SELECT
		RestaurantName,
		CuisinesType,
		No_of_Rating,
		Rating,
		RestaurantType,
		Area
	FROM Jomato
	WHERE No_of_Rating = @MaxRating ;
	RETURN ;
END ;
GO

SELECT 
	RestaurantName,
	CuisinesType,
	No_of_Rating
FROM 
	dbo.GetMaxRatedRestaurants() ;

--==========================================================================================================================================================

--3. Create a rating Status column to display the rating as 'Excellent' if it has  more the 4 star rating. 'Good' if it has above 3.5 and below 4 star rating, 'Average' if it is above 3 and below 3.5 and 'Bad' if it is below 3 star rating and 

--First, Check if column exists and add if not
IF NOT EXISTS (
	SELECT * 
	FROM INFORMATION_SCHEMA.COLUMNS 
	WHERE TABLE_NAME = 'Jomato'
	AND
	COLUMN_NAME = 'RatingStatus'
)
BEGIN
	ALTER TABLE Jomato
	ADD RatingStatus VARCHAR(20) ;
END
GO

--second, Update the RatingStatus based on rating
UPDATE Jomato
SET RatingStatus = 
		CASE
			WHEN Rating > 4.0 THEN 'Excellent'
			WHEN Rating > 3.5 AND Rating <= 4.0 THEN 'Good'
			WHEN Rating > 3.0 AND Rating <= 3.5 THEN 'Average'
			ELSE 'Bad'
		END ;
GO

--Now, Display the results with RatingStatus
SELECT 
	RestaurantName,
	CuisinesType,
	Rating,
	RatingStatus
FROM Jomato ;
GO

--====================================================================================================================================================

--4. Find the ceil, floor and absolute values of the rating column and display the current date and separately display the year, month_name and day.
SELECT 
    RestaurantName,
    Rating,
    CEILING(Rating) AS CeilRating,
    FLOOR(Rating) AS FloorRating,
    ABS(Rating) AS AbsoluteRating,
    GETDATE() AS CurrentDateTime,
	CAST(GETDATE() AS DATE) AS CurrentDate,
    YEAR(GETDATE()) AS CurrentYear,
    DATENAME(MONTH, GETDATE()) AS CurrentMonth,
    DAY(GETDATE()) AS CurrentDay,
	DATEPART(WEEKDAY, GETDATE()) AS DayOFWeek,
	DATENAME(WEEKDAY, GETDATE()) AS DayName
FROM Jomato;
GO

--=================================================================================================================================================
--5. Display the restaurant type and total average cost using rollup.
SELECT 
	ISNULL(RestaurantType, 'ALL TYPES') AS RestaurantType,
	COUNT(*) AS NumberOfRestaurants, 
	SUM(AverageCost) AS TotalAverageCost,
	AVG(AverageCost) AS AverageCostPerRestaurant,
	AVG(Rating) AS AverageRating
FROM Jomato
GROUP BY ROLLUP(RestaurantType)
ORDER BY
	CASE	
		WHEN RestaurantType IS NULL THEN 1
		ELSE 0
	END,
	RestaurantType ;
GO

SELECT * FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME='Jomato' ;
--===================================================== DONE ===========================================================================================