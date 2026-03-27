import jwt from 'jsonwebtoken';

const config = useRuntimeConfig();

export default defineEventHandler(async (event) => {
    // Only check authentication for API routes
    if (!event.path.startsWith('/api/')) {
        return;
    }
    
    // Public routes that anyone can access (no token required)
    const publicRoutes = ['/api/register', '/api/login', '/api/test-db'];
    
    // Check if current route is public
    const isPublicRoute = publicRoutes.some(route => event.path === route);
    
    if (isPublicRoute) {
        return; // Skip authentication for public routes
    }
    
    // Get the authorization header
    const authHeader = event.headers.get('authorization');
    
    // Check if token exists
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        throw createError({
            statusCode: 401,
            statusMessage: 'Authentication required. Please login first.'
        });
    }
    
    // Extract the token
    const token = authHeader.split(' ')[1];
    
    try {
        // Verify the token
        const decoded = jwt.verify(token, config.jwtSecret);
        // Attach user info to the event context
        event.context.user = decoded;
    } catch (error) {
        throw createError({
            statusCode: 401,
            statusMessage: 'Invalid or expired token. Please login again.'
        });
    }
});