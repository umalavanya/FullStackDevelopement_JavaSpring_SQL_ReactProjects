import pool from '../../config/db';

export default defineEventHandler(async (event) => {
  const user = event.context.user;
  
  if (!user) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Unauthorized'
    });
  }
  
  const method = event.method;
  
  // GET - Fetch all tasks for the user
  if (method === 'GET') {
    try {
      const [tasks] = await pool.query(
        'SELECT * FROM tasks WHERE user_id = ? ORDER BY created_at DESC',
        [user.userId]
      );
      
      return {
        success: true,
        data: tasks
      };
    } catch (error) {
      console.error('Error fetching tasks:', error);
      throw createError({
        statusCode: 500,
        statusMessage: 'Failed to fetch tasks'
      });
    }
  }
  
  // POST - Create a new task
  if (method === 'POST') {
    try {
      const body = await readBody(event);
      const { title, description = '' } = body;
      
      if (!title) {
        throw createError({
          statusCode: 400,
          statusMessage: 'Title is required'
        });
      }
      
      const [result] = await pool.query(
        'INSERT INTO tasks (user_id, title, description, status) VALUES (?, ?, ?, ?)',
        [user.userId, title, description, 'pending']
      );
      
      const [newTask] = await pool.query(
        'SELECT * FROM tasks WHERE id = ?',
        [result.insertId]
      );
      
      return {
        success: true,
        data: newTask[0]
      };
    } catch (error) {
      console.error('Error creating task:', error);
      throw createError({
        statusCode: 500,
        statusMessage: 'Failed to create task'
      });
    }
  }
});