const express = require('express');
const auth = require('../middleware/auth'); // Protect routes
const Progress = require('../models/Progress'); // Import Progress model
const router = express.Router();

/**
 * @route   POST /api/progress
 * @desc    Log a completed workout
 * @access  Private
 */
router.post('/', auth, async (req, res) => {
  const { workout, exercises } = req.body;

  try {
    let progress = new Progress({
      user: req.user.id, // Get logged-in user
      workout,
      exercises
    });

    await progress.save();
    res.json(progress);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

/**
 * @route   GET /api/progress
 * @desc    Get all progress logs for the logged-in user
 * @access  Private
 */
router.get('/', auth, async (req, res) => {
  try {
    const progressLogs = await Progress.find({ user: req.user.id }).populate('workout', ['goal']);
    res.json(progressLogs);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

/**
 * @route   DELETE /api/progress/:id
 * @desc    Delete a progress entry
 * @access  Private
 */
router.delete('/:id', auth, async (req, res) => {
  try {
    let progress = await Progress.findById(req.params.id);
    if (!progress) return res.status(404).json({ msg: 'Progress entry not found' });

    // Ensure the progress entry belongs to the logged-in user
    if (progress.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    await Progress.findByIdAndDelete(req.params.id);
    res.json({ msg: 'Progress entry deleted' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
