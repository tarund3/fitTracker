const express = require('express');
const { createWorkout, getWorkouts, deleteWorkout } = require('../controllers/workoutController'); // Import controllers
const auth = require('../middleware/auth'); // Protect routes

const router = express.Router();

// POST /api/workout - Log a new workout
router.post('/', auth, createWorkout);

// GET /api/workout - Get all workouts for the logged-in user
router.get('/', auth, getWorkouts);

// DELETE /api/workout/:id - Delete a workout entry
router.delete('/:id', auth, deleteWorkout);

module.exports = router;
