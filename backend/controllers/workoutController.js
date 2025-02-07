const Workout = require('../models/Workout'); // Import Workout model

// @desc Log a new workout
// @route POST /api/workout
// @access Private
exports.createWorkout = async (req, res) => {
    try {
        const { name, type, duration, intensity, exercises } = req.body;

        let workout = new Workout({
            user: req.user.id, // Get logged-in user
            name,
            type,
            duration,
            intensity,
            exercises
        });

        await workout.save();
        res.json(workout);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// @desc Get all workouts for the logged-in user
// @route GET /api/workout
// @access Private
exports.getWorkouts = async (req, res) => {
    try {
        const workouts = await Workout.find({ user: req.user.id });
        res.json(workouts);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// @desc Delete a workout entry
// @route DELETE /api/workout/:id
// @access Private
exports.deleteWorkout = async (req, res) => {
    try {
        let workout = await Workout.findById(req.params.id);
        if (!workout) {
            return res.status(404).json({ msg: 'Workout entry not found' });
        }

        // Ensure the workout entry belongs to the logged-in user
        if (workout.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'Not authorized' });
        }

        await Workout.findByIdAndDelete(req.params.id);
        res.json({ msg: 'Workout entry deleted' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

exports.getWorkoutRecommendations = async (req, res) => {
    try {
        const { fitnessGoal, experienceLevel, workoutType } = req.query;

        const options = {
            method: 'GET',
            url: 'https://exercisedb.p.rapidapi.com/exercises',   
            headers: {
                'X-RapidAPIKey': process.env.RAPIDAPI_KEY, // api key stored in env
                'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com'
            }     
        };

        const response = await axios.request(options);
        const workouts = response.data;

        // Filter workouts based on user preferences
        let filteredWorkouts = workouts.filter(workout =>
            workout.bodyPart.toLowerCase().includes(workoutType.toLowerCase())
        );

        res.json(filteredWorkouts);

    } catch (error) {
        console.error('Error fetching workout recommendations:', error.message);
        res.status(500).json({ msg: 'Failed to fetch workout recommendations' });    
    
    }
};
