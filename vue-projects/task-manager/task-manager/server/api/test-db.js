import pool from '../config/db';

export default defineEventHandler(async (event) => {
    try {
        console.log('Testing database connection...');
        
        // Get a connection from the pool
        const connection = await pool.getConnection();
        console.log('Connected to MySQL');
        
        // Simple test query - just check if we can get the current time
        const [rows] = await connection.query('SELECT NOW() as server_time');
        
        // Release connection
        connection.release();
        
        return {
            success: true,
            message: '✅ Database connected successfully!',
            data: {
                server_time: rows[0].server_time,
                database_name: 'task_manager'
            }
        };
        
    } catch (error) {
        console.error('Database connection error:', error);
        
        return {
            success: false,
            message: '❌ Database connection failed',
            error: error.message,
            code: error.code
        };
    }
});