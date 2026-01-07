export const javaTopics = [
  {
    id: 'basics',
    name: 'Java Basics',
    description: 'Learn the fundamentals of Java programming',
    icon: '🔤',
    lessonIds: ['basics-1', 'basics-2', 'basics-3']
  },
  {
    id: 'oop',
    name: 'Object-Oriented Programming',
    description: 'Classes, objects, and OOP principles',
    icon: '🧩',
    lessonIds: ['oop-1', 'oop-2', 'oop-3']
  },
  {
    id: 'data-structures',
    name: 'Data Structures',
    description: 'Arrays, lists, and collections',
    icon: '🗂️',
    lessonIds: ['ds-1', 'ds-2']
  },
  {
    id: 'exceptions',
    name: 'Exception Handling',
    description: 'Try-catch and custom exceptions',
    icon: '⚠️',
    lessonIds: ['ex-1', 'ex-2']
  },
  {
    id: 'files',
    name: 'File I/O',
    description: 'Reading and writing files',
    icon: '📁',
    lessonIds: ['file-1']
  }
];

export const lessonsData = {
  'basics': [
    {
      id: 'basics-1',
      title: 'Hello, World!',
      content: 'Java is an object-oriented programming language. Every Java program starts with a class definition.',
      codeExample: `public class HelloWorld {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
    }
}`,
      question: 'What is the correct way to print text in Java?',
      options: [
        'print("Hello")',
        'System.out.println("Hello")',
        'console.log("Hello")',
        'echo "Hello"'
      ],
      correctAnswer: 2,
      example: 'The main method is the entry point of every Java application.'
    },
    {
      id: 'basics-2',
      title: 'Variables and Data Types',
      content: 'Java has several primitive data types: int, double, boolean, char, etc. Variables must be declared with their type.',
      codeExample: `int age = 25;
double price = 19.99;
boolean isJavaFun = true;
char grade = 'A';
String name = "John";`,
      question: 'Which data type would you use for a true/false value?',
      options: ['int', 'String', 'boolean', 'double'],
      correctAnswer: 3,
      example: 'String is not a primitive type, but a class in Java.'
    },
    {
      id: 'basics-3',
      title: 'Operators',
      content: 'Java supports arithmetic operators (+, -, *, /, %), comparison operators (==, !=, >, <), and logical operators (&&, ||, !).',
      codeExample: `int x = 10;
int y = 3;
int sum = x + y;      // 13
int difference = x - y; // 7
int product = x * y;    // 30
int quotient = x / y;   // 3
int remainder = x % y;  // 1`,
      question: 'What does the % operator do in Java?',
      options: [
        'Division',
        'Multiplication',
        'Modulus (remainder)',
        'Percentage'
      ],
      correctAnswer: 3,
      example: 'The modulus operator is useful for checking if a number is even or odd.'
    }
  ],
  'oop': [
    {
      id: 'oop-1',
      title: 'Classes and Objects',
      content: 'A class is a blueprint for objects. An object is an instance of a class. Classes contain fields (variables) and methods (functions).',
      codeExample: `// Defining a class
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
myCar.startEngine();`,
      question: 'What keyword is used to create an object from a class?',
      options: ['create', 'new', 'object', 'instance'],
      correctAnswer: 2,
      example: 'The "new" keyword allocates memory for the new object.'
    },
    {
      id: 'oop-2',
      title: 'Constructors',
      content: 'A constructor is a special method that is called when an object is created. It has the same name as the class and no return type.',
      codeExample: `public class Student {
    String name;
    int id;
    
    // Constructor
    public Student(String studentName, int studentId) {
        name = studentName;
        id = studentId;
    }
}

// Using the constructor
Student student1 = new Student("Alice", 12345);`,
      question: 'What is the name of a constructor?',
      options: [
        'Always "Constructor"',
        'Same as the class name',
        'Any valid method name',
        'Always "init"'
      ],
      correctAnswer: 2,
      example: 'Constructors can be overloaded with different parameters.'
    },
    {
      id: 'oop-3',
      title: 'Inheritance',
      content: 'Inheritance allows a class (child) to inherit fields and methods from another class (parent). Use the "extends" keyword.',
      codeExample: `// Parent class
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
myDog.bark(); // From Dog class`,
      question: 'Which keyword is used for inheritance in Java?',
      options: ['inherits', 'extends', 'implements', 'super'],
      correctAnswer: 2,
      example: 'Java supports single inheritance for classes (one parent class only).'
    }
  ],
  'data-structures': [
    {
      id: 'ds-1',
      title: 'Arrays',
      content: 'Arrays store multiple values of the same type. They have a fixed size that cannot be changed after creation.',
      codeExample: `// Array declaration and initialization
int[] numbers = new int[5]; // Array of 5 integers
numbers[0] = 10;
numbers[1] = 20;

// Alternative syntax
String[] colors = {"red", "green", "blue"};

// Accessing elements
System.out.println(colors[0]); // red
System.out.println(numbers.length); // 5`,
      question: 'How do you get the length of an array in Java?',
      options: [
        'array.length()',
        'array.size',
        'array.length',
        'array.count'
      ],
      correctAnswer: 3,
      example: 'Array indices start at 0, so the last element is at index length-1.'
    },
    {
      id: 'ds-2',
      title: 'ArrayList',
      content: 'ArrayList is a resizable array implementation in the Java Collections Framework. It can grow and shrink dynamically.',
      codeExample: `import java.util.ArrayList;

ArrayList<String> fruits = new ArrayList<>();
fruits.add("Apple");
fruits.add("Banana");
fruits.add("Orange");

System.out.println(fruits.get(1)); // Banana
System.out.println(fruits.size()); // 3

fruits.remove("Banana");
System.out.println(fruits.size()); // 2`,
      question: 'Which method adds an element to an ArrayList?',
      options: ['insert()', 'add()', 'push()', 'append()'],
      correctAnswer: 2,
      example: 'ArrayLists can only store objects, not primitive types (use wrapper classes like Integer, Double).'
    }
  ],
  'exceptions': [
    {
      id: 'ex-1',
      title: 'Try-Catch Blocks',
      content: 'Exception handling prevents program crashes when errors occur. Use try-catch blocks to handle exceptions gracefully.',
      codeExample: `try {
    int[] numbers = {1, 2, 3};
    System.out.println(numbers[5]); // This will cause ArrayIndexOutOfBoundsException
} catch (ArrayIndexOutOfBoundsException e) {
    System.out.println("Error: Array index is out of bounds!");
} catch (Exception e) {
    System.out.println("Some other error occurred: " + e.getMessage());
} finally {
    System.out.println("This always executes.");
}`,
      question: 'Which block always executes, whether an exception occurs or not?',
      options: ['try', 'catch', 'finally', 'exception'],
      correctAnswer: 3,
      example: 'You can have multiple catch blocks for different exception types.'
    },
    {
      id: 'ex-2',
      title: 'Throwing Exceptions',
      content: 'You can throw exceptions using the "throw" keyword. Methods can declare that they throw exceptions using "throws".',
      codeExample: `public class Calculator {
    public double divide(double a, double b) throws ArithmeticException {
        if (b == 0) {
            throw new ArithmeticException("Cannot divide by zero!");
        }
        return a / b;
    }
}

// Using the method
Calculator calc = new Calculator();
try {
    double result = calc.divide(10, 0);
} catch (ArithmeticException e) {
    System.out.println("Error: " + e.getMessage());
}`,
      question: 'Which keyword is used to explicitly throw an exception?',
      options: ['throws', 'throw', 'exception', 'error'],
      correctAnswer: 2,
      example: 'Checked exceptions must be declared in the method signature or handled.'
    }
  ],
  'files': [
    {
      id: 'file-1',
      title: 'Reading and Writing Files',
      content: 'Java provides several classes for file operations. FileReader and BufferedReader for reading, FileWriter and BufferedWriter for writing.',
      codeExample: `import java.io.*;

public class FileExample {
    public static void main(String[] args) {
        // Writing to a file
        try (BufferedWriter writer = new BufferedWriter(new FileWriter("output.txt"))) {
            writer.write("Hello, File!");
            writer.newLine();
            writer.write("This is a second line.");
        } catch (IOException e) {
            System.out.println("Error writing file: " + e.getMessage());
        }
        
        // Reading from a file
        try (BufferedReader reader = new BufferedReader(new FileReader("output.txt"))) {
            String line;
            while ((line = reader.readLine()) != null) {
                System.out.println(line);
            }
        } catch (IOException e) {
            System.out.println("Error reading file: " + e.getMessage());
        }
    }
}`,
      question: 'Which class is commonly used for efficient reading of text files?',
      options: ['FileReader', 'BufferedReader', 'FileInputStream', 'Scanner'],
      correctAnswer: 2,
      example: 'Try-with-resources automatically closes the file, preventing resource leaks.'
    }
  ]
};