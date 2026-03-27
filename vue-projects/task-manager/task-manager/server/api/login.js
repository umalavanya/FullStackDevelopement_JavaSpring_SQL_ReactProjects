import pool from '../config/db';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const config = useRuntimeConfig();

export default defineEventHandler(async (event) => {
    try {
        const body = await readBody(event);
        const { email, password } = body;
        
        // Validate input
        if (!email || !password) {
            return {
                success: false,
                message: 'Email and password are required'
            };
        }
        
        // Find user by email
        const [users] = await pool.query(
            'SELECT * FROM users WHERE email = ?',
            [email]
        );
        
        if (users.length === 0) {
            return {
                success: false,
                message: 'Invalid email or password'
            };
        }
        
        const user = users[0];
        
        // Verify password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        
        if (!isPasswordValid) {
            return {
                success: false,
                message: 'Invalid email or password'
            };
        }
        
        // Generate JWT token
        const token = jwt.sign(
            { 
                userId: user.id, 
                email: user.email,
                name: user.name
            },
            config.jwtSecret,
            { expiresIn: '7d' }
        );
        
        return {
            success: true,
            message: 'Login successful',
            data: {
                token: token,
                user: {
                    id: user.id,
                    name: user.name,
                    email: user.email
                }
            }
        };
        
    } catch (error) {
        console.error('Login error:', error);
        return {
            success: false,
            message: 'Login failed',
            error: error.message
        };
    }
});