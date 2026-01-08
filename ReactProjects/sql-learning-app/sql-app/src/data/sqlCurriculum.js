export const sqlCurriculum = {
  modules: [
    {
      id: 1,
      title: "SQL Basics",
      description: "Introduction to databases and SQL",
      icon: "📚",
      color: "#3b82f6",
      topics: [
        {
          id: 1,
          title: "What is SQL?",
          description: "Introduction to Structured Query Language",
          type: "lesson",
          duration: "15 min",
          completed: false,
          locked: false,
          content: {
            theory: "SQL is a standard language for managing and manipulating relational databases...",
            examples: ["SELECT * FROM users;", "CREATE DATABASE school;"]
          }
        },
        {
          id: 2,
          title: "Databases & Tables",
          description: "Understanding database structure",
          type: "lesson",
          duration: "20 min",
          completed: false,
          locked: false,
          content: {
            theory: "A database is a structured collection of data. Tables store data in rows and columns...",
            examples: ["CREATE TABLE students (id INT, name VARCHAR(50));"]
          }
        },
        {
          id: 3,
          title: "SELECT Statement",
          description: "Retrieving data from tables",
          type: "lesson",
          duration: "25 min",
          completed: false,
          locked: true,
          content: {
            theory: "The SELECT statement is used to select data from a database...",
            examples: ["SELECT name, age FROM students;", "SELECT * FROM employees WHERE department = 'Sales';"]
          }
        },
        {
          id: 4,
          title: "Basic Queries Practice",
          description: "Practice SELECT statements",
          type: "practice",
          duration: "30 min",
          completed: false,
          locked: true,
          exercises: [
            "Retrieve all columns from the customers table",
            "Get only the product names and prices from products table"
          ]
        }
      ]
    },
    {
      id: 2,
      title: "Filtering & Sorting",
      description: "WHERE, ORDER BY, LIMIT clauses",
      icon: "🔍",
      color: "#8b5cf6",
      topics: [
        {
          id: 5,
          title: "WHERE Clause",
          description: "Filtering data with conditions",
          type: "lesson",
          duration: "20 min",
          completed: false,
          locked: true,
          content: {
            theory: "The WHERE clause is used to filter records...",
            examples: ["SELECT * FROM products WHERE price > 100;"]
          }
        },
        {
          id: 6,
          title: "Comparison Operators",
          description: "=, <>, >, <, >=, <=",
          type: "lesson",
          duration: "25 min",
          completed: false,
          locked: true,
          content: {
            theory: "Comparison operators are used in the WHERE clause...",
            examples: ["SELECT * FROM orders WHERE amount >= 500;"]
          }
        },
        {
          id: 7,
          title: "ORDER BY",
          description: "Sorting query results",
          type: "lesson",
          duration: "15 min",
          completed: false,
          locked: true,
          content: {
            theory: "The ORDER BY keyword is used to sort the result-set...",
            examples: ["SELECT * FROM products ORDER BY price DESC;"]
          }
        }
      ]
    },
    {
      id: 3,
      title: "Advanced Queries",
      description: "JOINs, Subqueries, Aggregations",
      icon: "⚡",
      color: "#10b981",
      topics: [
        {
          id: 8,
          title: "JOIN Operations",
          description: "Combining data from multiple tables",
          type: "lesson",
          duration: "35 min",
          completed: false,
          locked: true,
          content: {
            theory: "JOINs combine rows from two or more tables...",
            examples: ["INNER JOIN", "LEFT JOIN", "RIGHT JOIN"]
          }
        },
        {
          id: 9,
          title: "GROUP BY & Aggregations",
          description: "COUNT, SUM, AVG, MIN, MAX",
          type: "lesson",
          duration: "30 min",
          completed: false,
          locked: true,
          content: {
            theory: "Aggregate functions perform calculations on multiple rows...",
            examples: ["SELECT department, COUNT(*) FROM employees GROUP BY department;"]
          }
        }
      ]
    }
  ],
  prerequisites: [
    { from: 1, to: 2 },  // Complete Basics to unlock Filtering
    { from: 2, to: 3 },  // Complete Filtering to unlock Advanced
    { from: 3, to: 4 },  // Chain within modules
    { from: 1, to: 3 }   // Direct connection for visualization
  ]
};