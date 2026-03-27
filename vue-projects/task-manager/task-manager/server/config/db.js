import mysql from 'mysql2/promise';

// Update these with your actual MySQL credentials
const dbConfig = {
    host: 'localhost',
    user: 'root',        // your MySQL username
    password: 'raviumaB@143',  // your MySQL password - UPDATE THIS
    database: 'task_manager',
    port: 3306,          // default MySQL port
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
};

console.log('Attempting to connect with config:', {
    host: dbConfig.host,
    user: dbConfig.user,
    database: dbConfig.database,
    port: dbConfig.port
});

const pool = mysql.createPool(dbConfig);

// Test connection immediately
pool.getConnection()
    .then(connection => {
        console.log('✅ Database connected successfully!');
        connection.release();
    })
    .catch(err => {
        console.error('❌ Database connection failed:');
        console.error('Error Code:', err.code);
        console.error('Error Message:', err.message);
        console.error('Full Error:', err);
    });

export default pool;