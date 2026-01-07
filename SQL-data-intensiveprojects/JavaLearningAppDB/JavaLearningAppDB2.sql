-- Insert sample user (for testing)
INSERT INTO Users (Username, Email, PasswordHash, StreakDays, TotalXP)
VALUES 
('testuser', 'test@example.com', 'hashed_password', 7, 150),
('javalearner', 'java@example.com', 'hashed_password', 3, 75);
GO

-- Insert Java Topics
INSERT INTO Topics (TopicName, TopicDescription, Icon, DisplayOrder)
VALUES
('Java Basics', 'Learn the fundamentals of Java programming', '🔤', 1),
('Object-Oriented Programming', 'Classes, objects, and OOP principles', '🧩', 2),
('Data Structures', 'Arrays, lists, and collections', '🗂️', 3),
('Exception Handling', 'Try-catch and custom exceptions', '⚠️', 4),
('File I/O', 'Reading and writing files', '📁', 5),
('Multithreading', 'Concurrent programming in Java', '⚡', 6),
('Java Collections Framework', 'Advanced data structures', '📚', 7),
('Lambda Expressions', 'Functional programming features', 'λ', 8);
GO

-- Insert Lessons for Java Basics
DECLARE @topic1 INT = (SELECT TopicID FROM Topics WHERE TopicName = 'Java Basics');

INSERT INTO Lessons (TopicID, LessonTitle, LessonContent, CodeExample, DisplayOrder, DifficultyLevel, EstimatedMinutes)
VALUES
(@topic1, 'Hello, World!', 'Java is an object-oriented programming language. Every Java program starts with a class definition. The main method is the entry point of every Java application.', 
'public class HelloWorld {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
    }
}', 1, 1, 10),

(@topic1, 'Variables and Data Types', 'Java has several primitive data types: int, double, boolean, char, etc. Variables must be declared with their type. String is not a primitive type, but a class in Java.',
'int age = 25;
double price = 19.99;
boolean isJavaFun = true;
char grade = ''A'';
String name = "John";', 2, 1, 15),

(@topic1, 'Operators', 'Java supports arithmetic operators (+, -, *, /, %), comparison operators (==, !=, >, <), and logical operators (&&, ||, !). The modulus operator is useful for checking if a number is even or odd.',
'int x = 10;
int y = 3;
int sum = x + y;      // 13
int difference = x - y; // 7
int product = x * y;    // 30
int quotient = x / y;   // 3
int remainder = x % y;  // 1', 3, 1, 12);
GO

-- Insert Lessons for OOP
DECLARE @topic2 INT = (SELECT TopicID FROM Topics WHERE TopicName = 'Object-Oriented Programming');

INSERT INTO Lessons (TopicID, LessonTitle, LessonContent, CodeExample, DisplayOrder, DifficultyLevel, EstimatedMinutes)
VALUES
(@topic2, 'Classes and Objects', 'A class is a blueprint for objects. An object is an instance of a class. Classes contain fields (variables) and methods (functions). The "new" keyword allocates memory for the new object.',
'// Defining a class
public class Car {
    // Fields
    String brand;
    int year;
    
    // Method
    void startEngine() {
        System.out.println("Engine started!");
    }
}

// Creating an object
Car myCar = new Car();
myCar.brand = "Toyota";
myCar.year = 2020;
myCar.startEngine();', 1, 2, 15),

(@topic2, 'Constructors', 'A constructor is a special method that is called when an object is created. It has the same name as the class and no return type. Constructors can be overloaded with different parameters.',
'public class Student {
    String name;
    int id;
    
    // Constructor
    public Student(String studentName, int studentId) {
        name = studentName;
        id = studentId;
    }
}

// Using the constructor
Student student1 = new Student("Alice", 12345);', 2, 2, 12),

(@topic2, 'Inheritance', 'Inheritance allows a class (child) to inherit fields and methods from another class (parent). Use the "extends" keyword. Java supports single inheritance for classes (one parent class only).',
'// Parent class
public class Animal {
    void eat() {
        System.out.println("This animal eats food.");
    }
}

// Child class
public class Dog extends Animal {
    void bark() {
        System.out.println("The dog barks.");
    }
}

Dog myDog = new Dog();
myDog.eat();  // Inherited from Animal
myDog.bark(); // From Dog class', 3, 2, 15);
GO

-- Insert Quiz Questions for first lesson
DECLARE @lesson1 INT = (SELECT LessonID FROM Lessons WHERE LessonTitle = 'Hello, World!' AND TopicID = (SELECT TopicID FROM Topics WHERE TopicName = 'Java Basics'));

INSERT INTO QuizQuestions (LessonID, QuestionText, QuestionType, Points, DisplayOrder)
VALUES
(@lesson1, 'What is the correct way to print text in Java?', 'multiple-choice', 10, 1),
(@lesson1, 'Which method is the entry point of a Java application?', 'multiple-choice', 10, 2),
(@lesson1, 'Every Java program must have at least one class.', 'true-false', 5, 3);
GO

-- Insert Options for first question
DECLARE @question1 INT = (SELECT QuestionID FROM QuizQuestions WHERE QuestionText = 'What is the correct way to print text in Java?' AND LessonID = @lesson1);

INSERT INTO QuestionOptions (QuestionID, OptionText, IsCorrect, DisplayOrder)
VALUES
(@question1, 'print("Hello")', 0, 1),
(@question1, 'System.out.println("Hello")', 1, 2),
(@question1, 'console.log("Hello")', 0, 3),
(@question1, 'echo "Hello"', 0, 4);
GO

-- Insert Options for second question
DECLARE @question2 INT = (SELECT QuestionID FROM QuizQuestions WHERE QuestionText = 'Which method is the entry point of a Java application?' AND LessonID = @lesson1);

INSERT INTO QuestionOptions (QuestionID, OptionText, IsCorrect, DisplayOrder)
VALUES
(@question2, 'init()', 0, 1),
(@question2, 'main()', 1, 2),
(@question2, 'start()', 0, 3),
(@question2, 'run()', 0, 4);
GO

-- Insert Options for third question
DECLARE @question3 INT = (SELECT QuestionID FROM QuizQuestions WHERE QuestionText = 'Every Java program must have at least one class.' AND LessonID = @lesson1);

INSERT INTO QuestionOptions (QuestionID, OptionText, IsCorrect, DisplayOrder)
VALUES
(@question3, 'True', 1, 1),
(@question3, 'False', 0, 2);
GO

-- Insert sample progress for test user
DECLARE @user1 INT = (SELECT UserID FROM Users WHERE Username = 'testuser');
DECLARE @lesson1ID INT = (SELECT LessonID FROM Lessons WHERE LessonTitle = 'Hello, World!' AND TopicID = (SELECT TopicID FROM Topics WHERE TopicName = 'Java Basics'));
DECLARE @lesson2ID INT = (SELECT LessonID FROM Lessons WHERE LessonTitle = 'Variables and Data Types' AND TopicID = (SELECT TopicID FROM Topics WHERE TopicName = 'Java Basics'));

INSERT INTO UserProgress (UserID, TopicID, LessonID, IsCompleted, Score, Attempts, LastAttempt, CompletedAt, TimeSpentSeconds)
VALUES
(@user1, (SELECT TopicID FROM Topics WHERE TopicName = 'Java Basics'), @lesson1ID, 1, 25, 2, DATEADD(DAY, -1, GETDATE()), DATEADD(DAY, -1, GETDATE()), 450),
(@user1, (SELECT TopicID FROM Topics WHERE TopicName = 'Java Basics'), @lesson2ID, 1, 30, 1, DATEADD(DAY, -1, GETDATE()), DATEADD(DAY, -1, GETDATE()), 600);
GO

-- Insert streak data
INSERT INTO UserStreaks (UserID, CurrentStreak, LongestStreak, LastLearningDate)
VALUES
(@user1, 7, 10, CAST(GETDATE() AS DATE));
GO

-- Insert daily goals
INSERT INTO DailyGoals (UserID, TargetLessons, CurrentLessons, GoalDate, IsCompleted)
VALUES
(@user1, 2, 2, CAST(GETDATE() AS DATE), 1),
(@user1, 2, 1, DATEADD(DAY, 1, CAST(GETDATE() AS DATE)), 0);
GO