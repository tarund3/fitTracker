const express = require('express');
const auth = require('../middleware/auth'); 
const { getProfile, createOrUpdateProfile, deleteProfile } = require('../controllers/profileController'); // Import controllers
const router = express.Router();

// GET /api/profile - Get current user's profile
router.get('/', auth, getProfile);

// POST /api/profile - Create or update user profile
router.post('/', auth, createOrUpdateProfile);

// DELETE /api/profile - Delete user profile
router.delete('/', auth, deleteProfile);

module.exports = router;
