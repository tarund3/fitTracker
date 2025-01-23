require('dotenv').config(); // Load environment variables at the top

const express = require('express'); // Import Express.js
const connectDB = require('./config/db'); // Import MongoDB connection function
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const User = require('./models/User'); // Adjust path if necessary

connectDB(); // Connect to MongoDB

const app = express(); // Create an Express app
app.use(express.json()); // Middleware to parse JSON requests

// Define API routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/profile', require('./routes/profile'));
app.use('/api/workout', require('./routes/workout'));
app.use('/api/progress', require('./routes/progress'));

// Start the server
const PORT = process.env.PORT || 5002;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
