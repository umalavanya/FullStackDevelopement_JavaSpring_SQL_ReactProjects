export default defineEventHandler(async (event) => {
    // This route will use the auth middleware
    // The user data is attached to event.context.user
    
    return {
        success: true,
        message: 'Protected route accessed successfully',
        user: event.context.user
    };
});