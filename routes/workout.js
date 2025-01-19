const express = require('express');
const auth = require('../middleware/auth'); // Protect routes
const Workout = require('../models/Workout'); // Import Workout model
const router = express.Router();

// route that listens for http get requests
router.get('/', auth, async(req, res) => {
    try {
        const workouts = await Workout.find({ user: req.user.id });
        res.json(workout);
    } catch(err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
})


router.post('/', auth, async (req, res) => {
    const { goal, exercises } = req.body // accesses the goal and exercises from the client request

    try {
        let workout = new workout({
            user: req.user.id,
            goal,
            exercises
        });

        await workout.save();
        res.json(workout);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

router.put('/:id', auth, async (req, res) => {
    const { exercises } = req.body;

    try {
        let workout = await Workout.findByID(req.params.id);
        if (!workout) return res.status(404).json({ msg: 'Workout not found' });

        if (workout.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'Not authorized' });
        }

            // Update exercises (other fields remain unchanged)
        workout.exercises = exercises || workout.exercises;
        await workout.save();
        res.json(workout);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

router.delete('/:id', auth, async (req, res) => {
    try {
      let workout = await Workout.findById(req.params.id);
      if (!workout) return res.status(404).json({ msg: 'Workout not found' });
  
      // Ensure the workout belongs to the logged-in user
      if (workout.user.toString() !== req.user.id) {
        return res.status(401).json({ msg: 'Not authorized' });
      }
  
      await Workout.findByIdAndDelete(req.params.id);
      res.json({ msg: 'Workout deleted' });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  });
  
  module.exports = router;