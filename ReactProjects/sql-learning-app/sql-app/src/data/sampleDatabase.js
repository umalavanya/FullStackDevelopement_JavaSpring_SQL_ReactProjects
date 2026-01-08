// Sample database for practice
export const sampleDatabase = {
  tables: {
    employees: {
      columns: ['id', 'name', 'department', 'salary', 'hire_date'],
      rows: [
        { id: 1, name: 'John Doe', department: 'Sales', salary: 50000, hire_date: '2022-01-15' },
        { id: 2, name: 'Jane Smith', department: 'Marketing', salary: 60000, hire_date: '2021-03-10' },
        { id: 3, name: 'Bob Johnson', department: 'Sales', salary: 55000, hire_date: '2022-06-20' },
        { id: 4, name: 'Alice Brown', department: 'IT', salary: 75000, hire_date: '2020-11-05' },
        { id: 5, name: 'Charlie Wilson', department: 'Marketing', salary: 62000, hire_date: '2022-02-28' },
        { id: 6, name: 'Diana Lee', department: 'HR', salary: 48000, hire_date: '2023-01-10' },
        { id: 7, name: 'Evan Davis', department: 'IT', salary: 80000, hire_date: '2019-08-15' },
      ]
    },
    products: {
      columns: ['product_id', 'product_name', 'category', 'price', 'stock'],
      rows: [
        { product_id: 101, product_name: 'Laptop', category: 'Electronics', price: 999.99, stock: 15 },
        { product_id: 102, product_name: 'Mouse', category: 'Electronics', price: 29.99, stock: 100 },
        { product_id: 103, product_name: 'Desk Chair', category: 'Furniture', price: 199.99, stock: 25 },
        { product_id: 104, product_name: 'Notebook', category: 'Stationery', price: 9.99, stock: 200 },
        { product_id: 105, product_name: 'Monitor', category: 'Electronics', price: 299.99, stock: 30 },
        { product_id: 106, product_name: 'Keyboard', category: 'Electronics', price: 79.99, stock: 50 },
      ]
    }
  }
};

// Simple SQL Executor
export const executeSql = (sqlQuery, database) => {
  try {
    const query = sqlQuery.trim().toLowerCase();
    
    // Handle SELECT queries
    if (query.startsWith('select')) {
      // Extract table name (simple parsing)
      const fromMatch = query.match(/from\s+(\w+)/);
      if (fromMatch) {
        const tableName = fromMatch[1];
        const table = database.tables[tableName];
        
        if (!table) {
          return { error: `Table '${tableName}' does not exist` };
        }
        
        let filteredRows = [...table.rows];
        
        // Check for WHERE clause (simple equality only)
        const whereMatch = query.match(/where\s+(.+)/);
        if (whereMatch) {
          const condition = whereMatch[1];
          // Simple equality: column = 'value'
          if (condition.includes('=')) {
            const [column, value] = condition.split('=').map(s => s.trim().replace(/['"]/g, ''));
            filteredRows = filteredRows.filter(row => 
              String(row[column]) === value
            );
          }
        }
        
        // Check for ORDER BY
        const orderByMatch = query.match(/order by\s+(\w+)(?:\s+(asc|desc))?/);
        if (orderByMatch) {
          const [_, column, direction = 'asc'] = orderByMatch;
          filteredRows.sort((a, b) => {
            if (direction === 'desc') {
              return String(b[column]).localeCompare(String(a[column]));
            }
            return String(a[column]).localeCompare(String(b[column]));
          });
        }
        
        return { rows: filteredRows };
      }
    }
    
    // SHOW TABLES
    if (query === 'show tables' || query === 'show tables;') {
      return { 
        rows: Object.keys(database.tables).map(name => ({ Tables: name }))
      };
    }
    
    // DESCRIBE table
    const describeMatch = query.match(/describe\s+(\w+)/);
    if (describeMatch) {
      const tableName = describeMatch[1];
      const table = database.tables[tableName];
      if (!table) {
        return { error: `Table '${tableName}' does not exist` };
      }
      return {
        rows: table.columns.map(col => ({ Field: col, Type: 'VARCHAR(255)' }))
      };
    }
    
    return { error: 'Only SELECT, SHOW TABLES, and DESCRIBE queries are supported in practice mode' };
    
  } catch (error) {
    return { error: `Error executing query: ${error.message}` };
  }
};