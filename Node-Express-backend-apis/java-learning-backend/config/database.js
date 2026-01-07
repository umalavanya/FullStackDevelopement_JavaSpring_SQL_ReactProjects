// config/database.js
const sql = require('mssql');

// Database configuration
const dbConfig = {
  server: process.env.DB_SERVER || 'localhost',
  database: process.env.DB_DATABASE || 'JavaLearningDB',
  user: process.env.DB_USER || 'sa',
  password: process.env.DB_PASSWORD || '',
  port: parseInt(process.env.DB_PORT) || 1433,
  options: {
    encrypt: true, // For Azure SQL
    trustServerCertificate: true, // For local development
    enableArithAbort: true
  },
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 30000
  }
};

// Create connection pool
let pool = null;

// Function to connect to database
const connectToDatabase = async () => {
  try {
    if (pool) {
      console.log('📊 Using existing database connection pool');
      return pool;
    }

    console.log('🔗 Connecting to SQL Server...');
    pool = await new sql.ConnectionPool(dbConfig).connect();
    
    console.log('✅ Database connected successfully!');
    console.log(`📁 Database: ${dbConfig.database}`);
    console.log(`🖥️  Server: ${dbConfig.server}`);
    
    return pool;
  } catch (err) {
    console.error('❌ Database connection failed:', err.message);
    console.log('⚠️  Make sure:');
    console.log('   1. SQL Server is running');
    console.log('   2. Database exists (JavaLearningDB)');
    console.log('   3. Credentials in .env file are correct');
    throw err;
  }
};

// Function to get a database connection
const getConnection = async () => {
  return await connectToDatabase();
};

// Function to execute a SQL query
const executeQuery = async (query, params = []) => {
  const pool = await connectToDatabase();
  
  try {
    const request = pool.request();
    
    // Add parameters if provided
    params.forEach(param => {
      request.input(param.name, param.type, param.value);
    });
    
    const result = await request.query(query);
    return result.recordset;
  } catch (err) {
    console.error('❌ Query execution error:', err.message);
    console.error('📝 Query:', query);
    throw err;
  }
};

// Function to execute a stored procedure
const executeStoredProcedure = async (procedureName, params = []) => {
  const pool = await connectToDatabase();
  
  try {
    const request = pool.request();
    
    // Add parameters if provided
    params.forEach(param => {
      request.input(param.name, param.type, param.value);
    });
    
    const result = await request.execute(procedureName);
    return result.recordset;
  } catch (err) {
    console.error(`❌ Stored procedure ${procedureName} error:`, err.message);
    throw err;
  }
};

// Test database connection
const testConnection = async () => {
  try {
    const pool = await connectToDatabase();
    const result = await pool.request().query('SELECT @@VERSION as version');
    console.log('✅ Database test successful!');
    console.log(`📋 SQL Server version: ${result.recordset[0].version.substring(0, 100)}...`);
    return true;
  } catch (err) {
    console.error('❌ Database test failed:', err.message);
    return false;
  }
};

// Export functions
module.exports = {
  connectToDatabase,
  getConnection,
  executeQuery,
  executeStoredProcedure,
  testConnection,
  sql // Export sql for direct use if needed
};