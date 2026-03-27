import pool from '../config/db.js'

export default defineEventHandler(async (event) => {
  try {
    // Get a connection from the pool
    const connection = await pool.getConnection()
    
    // Get all tasks
    const [tasks] = await connection.query('SELECT * FROM tasks ORDER BY created_at DESC')
    
    // Release the connection
    connection.release()
    
    return {
      success: true,
      data: tasks
    }
  } catch (error) {
    console.error('Error fetching tasks:', error)
    return {
      success: false,
      message: 'Failed to fetch tasks',
      error: error.message
    }
  }
})