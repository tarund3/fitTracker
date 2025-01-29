const express = require('express');
const { register, login, getAuthUser } = require('../controllers/authController'); // Import controllers
const authMiddleware = require('../middleware/auth');

const router = express.Router();

// GET /api/auth/me - Get current authenticated user
router.get('/me', authMiddleware, getAuthUser);

// POST /api/auth/register - Register new user
router.post('/register', register);

// POST /api/auth/login - Login user
router.post('/login', login);

module.exports = router;
