import pool from '../../config/db';

export default defineEventHandler(async (event) => {
  const user = event.context.user;
  const taskId = event.context.params.id;
  
  if (!user) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Unauthorized'
    });
  }
  
  const method = event.method;
  
  // PUT - Update task
  if (method === 'PUT') {
    try {
      const body = await readBody(event);
      const { status } = body;
      
      // Verify task belongs to user
      const [tasks] = await pool.query(
        'SELECT * FROM tasks WHERE id = ? AND user_id = ?',
        [taskId, user.userId]
      );
      
      if (tasks.length === 0) {
        throw createError({
          statusCode: 404,
          statusMessage: 'Task not found'
        });
      }
      
      await pool.query(
        'UPDATE tasks SET status = ? WHERE id = ?',
        [status, taskId]
      );
      
      return {
        success: true,
        message: 'Task updated successfully'
      };
    } catch (error) {
      console.error('Error updating task:', error);
      throw createError({
        statusCode: 500,
        statusMessage: 'Failed to update task'
      });
    }
  }
  
  // DELETE - Delete task
  if (method === 'DELETE') {
    try {
      // Verify task belongs to user
      const [tasks] = await pool.query(
        'SELECT * FROM tasks WHERE id = ? AND user_id = ?',
        [taskId, user.userId]
      );
      
      if (tasks.length === 0) {
        throw createError({
          statusCode: 404,
          statusMessage: 'Task not found'
        });
      }
      
      await pool.query('DELETE FROM tasks WHERE id = ?', [taskId]);
      
      return {
        success: true,
        message: 'Task deleted successfully'
      };
    } catch (error) {
      console.error('Error deleting task:', error);
      throw createError({
        statusCode: 500,
        statusMessage: 'Failed to delete task'
      });
    }
  }
});