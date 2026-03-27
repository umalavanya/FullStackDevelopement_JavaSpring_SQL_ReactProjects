import pool from '../config/db';
import bcrypt from 'bcryptjs';

export default defineEventHandler(async (event) => {
    try {
        const body = await readBody(event);
        const { name, email, password } = body;
        
        // Validate input
        if (!name || !email || !password) {
            return {
                success: false,
                message: 'Name, email and password are required'
            };
        }
        
        // Check if user already exists
        const [existingUsers] = await pool.query(
            'SELECT * FROM users WHERE email = ?',
            [email]
        );
        
        if (existingUsers.length > 0) {
            return {
                success: false,
                message: 'User already exists with this email'
            };
        }
        
        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);
        
        // Insert new user
        const [result] = await pool.query(
            'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
            [name, email, hashedPassword]
        );
        
        return {
            success: true,
            message: 'User registered successfully',
            data: {
                id: result.insertId,
                name: name,
                email: email
            }
        };
        
    } catch (error) {
        console.error('Registration error:', error);
        return {
            success: false,
            message: 'Registration failed',
            error: error.message
        };
    }
});