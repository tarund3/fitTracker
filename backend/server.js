require('dotenv').config(); // Load environment variables
console.log("JWT_SECRET in server:", process.env.JWT_SECRET); // Debug log

const express = require('express');
const jwt = require('jsonwebtoken'); // Import JWT
const connectDB = require('./config/db');
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const cors = require('cors'); // Import CORS
const User = require('./models/User');

connectDB(); // Connect to MongoDB

const app = express();
app.use(express.json());
app.use(cors()); // Enable CORS

// Define API routes
app.use('/api/auth', require('./routes/auth')); // 🔑 User Authentication Routes
app.use('/api/profile', require('./routes/profile'));
app.use('/api/workout', require('./routes/workout'));
app.use('/api/progress', require('./routes/progress'));

// Root Route
app.get('/api', (req, res) => {
  res.send('FitBuddy API is running...');
});

// Start the server
const PORT = process.env.PORT || 5002;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
