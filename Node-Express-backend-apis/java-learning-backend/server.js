// Load environment variables first
require('dotenv').config();

// Test database connection on startup
const { testConnection } = require('./config/database');

// Import required modules
const express = require('express');
const cors = require('cors');

// Create Express app
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // Parse JSON request bodies

// Basic route to test server
app.get('/', (req, res) => {
  res.json({ 
    message: 'Welcome to Java Learning API!',
    status: 'Server is running',
    timestamp: new Date().toISOString()
  });
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK',
    message: 'Server is healthy',
    timestamp: new Date().toISOString()
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ Server is running on http://localhost:${PORT}`);
  console.log(`📚 Java Learning API is ready!`);
  console.log(`📅 ${new Date().toLocaleString()}`);
  // Test database connection when server starts
testConnection().then(isConnected => {
  if (isConnected) {
    console.log('✅ Database connection verified');
  } else {
    console.log('⚠️  Database connection failed - check SQL Server');
  }
}).catch(err => {
  console.error('❌ Database connection error:', err.message);
});
});

// Handle 404 errors
app.use((req, res) => {
  res.status(404).json({ 
    error: 'Not Found',
    message: `Route ${req.originalUrl} not found`,
    timestamp: new Date().toISOString()
  });
});