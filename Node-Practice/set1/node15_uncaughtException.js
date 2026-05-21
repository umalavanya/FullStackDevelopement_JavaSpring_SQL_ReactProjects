process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception:', error.message);
  console.error(error.stack);
  process.exit(1); // Exit after logging (recommended)
});

// This will trigger the handler
throw new Error('Something broke!');

// 
// Key Points
// uncaughtException catches errors that aren't caught by try-catch

// The application state may be corrupted after an uncaught exception

// Always exit the process (usually with process.exit(1)) after handling

// Use for logging and cleanup only, not to continue execution

// Better to prevent uncaught exceptions with proper error handling

// Not a substitute for proper try-catch and error handling patterns