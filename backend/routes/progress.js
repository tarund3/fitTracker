const express = require('express');
const { logProgress, getProgressLogs, deleteProgress } = require('../controllers/progressController'); // Import controllers
const auth = require('../middleware/auth'); // Protect routes

const router = express.Router();

// POST /api/progress - Log a completed workout
router.post('/', auth, logProgress);

// GET /api/progress - Get all progress logs for the logged-in user
router.get('/', auth, getProgressLogs);

// DELETE /api/progress/:id - Delete a progress entry
router.delete('/:id', auth, deleteProgress);

module.exports = router;
