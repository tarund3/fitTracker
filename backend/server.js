const express = require('express'); // Import Express.js
const dotenv = require('dotenv'); // Load environment variables
const connectDB = require('./config/db'); // Import MongoDB connection function

dotenv.config(); // Initialize dotenv to read .env variables
connectDB(); // Connect to MongoDB

const app = express(); // Create an Express app

app.use(express.json()); // Middleware to parse JSON requests

// Define API routes
app.use('/api/auth', require('./routes/auth')); // handles user authentication (login and sign up)
app.use('/api/profile', require('./routes/profile')); // handles user profile details
app.use('/api/workout', require('./routes/workout'));
app.use('/api/progress', require('./routes/progress'));


// Start the server
const PORT = process.env.PORT || 5002;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
