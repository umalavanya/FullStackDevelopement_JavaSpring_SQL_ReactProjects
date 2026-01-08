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
    },
    orders: {
      columns: ['order_id', 'customer_id', 'product_id', 'quantity', 'order_date', 'total'],
      rows: [
        { order_id: 1001, customer_id: 1, product_id: 101, quantity: 1, order_date: '2023-10-01', total: 999.99 },
        { order_id: 1002, customer_id: 2, product_id: 102, quantity: 2, order_date: '2023-10-02', total: 59.98 },
        { order_id: 1003, customer_id: 1, product_id: 103, quantity: 1, order_date: '2023-10-03', total: 199.99 },
        { order_id: 1004, customer_id: 3, product_id: 105, quantity: 1, order_date: '2023-10-04', total: 299.99 },
        { order_id: 1005, customer_id: 4, product_id: 106, quantity: 3, order_date: '2023-10-05', total: 239.97 },
      ]
    },
    customers: {
      columns: ['customer_id', 'customer_name', 'email', 'city', 'country'],
      rows: [
        { customer_id: 1, customer_name: 'John Smith', email: 'john@example.com', city: 'New York', country: 'USA' },
        { customer_id: 2, customer_name: 'Maria Garcia', email: 'maria@example.com', city: 'Madrid', country: 'Spain' },
        { customer_id: 3, customer_name: 'Chen Wei', email: 'chen@example.com', city: 'Beijing', country: 'China' },
        { customer_id: 4, customer_name: 'Anna Müller', email: 'anna@example.com', city: 'Berlin', country: 'Germany' },
        { customer_id: 5, customer_name: 'David Kim', email: 'david@example.com', city: 'Seoul', country: 'South Korea' },
      ]
    }
  }
};

// SQL Parser and Executor
export const executeSql = (sqlQuery, database) => {
  try {
    const query = sqlQuery.trim().toLowerCase();
    
    // Simple SELECT query parser
    if (query.startsWith('select')) {
      // Basic SELECT * FROM table
      const fromMatch = query.match(/from\s+(\w+)/);
      if (fromMatch) {
        const tableName = fromMatch[1];
        const table = database.tables[tableName];
        
        if (!table) {
          return { error: `Table '${tableName}' does not exist` };
        }
        
        // Check for WHERE clause
        let filteredRows = [...table.rows];
        const whereMatch = query.match(/where\s+(.+)/);
        if (whereMatch) {
          const condition = whereMatch[1];
          // Simple equality condition parser
          const equalityMatch = condition.match(/(\w+)\s*=\s*['"]?([^'"]+)['"]?/);
          if (equalityMatch) {
            const [_, column, value] = equalityMatch;
            filteredRows = filteredRows.filter(row => 
              String(row[column]) === value.replace(/['"]/g, '')
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
        
        return { rows: filteredRows, columns: table.columns };
      }
    }
    
    // SHOW TABLES
    if (query === 'show tables') {
      return { 
        rows: Object.keys(database.tables).map(name => ({ table_name: name })), 
        columns: ['table_name'] 
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
        rows: table.columns.map(col => ({ column: col, type: 'VARCHAR(255)' })),
        columns: ['column', 'type']
      };
    }
    
    return { error: 'Only SELECT, SHOW TABLES, and DESCRIBE queries are supported in practice mode' };
    
  } catch (error) {
    return { error: `Error executing query: ${error.message}` };
  }
};