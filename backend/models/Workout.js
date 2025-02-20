const mongoose = require('mongoose');

const WorkoutSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    title: {
        type: String,
        required: true
    },
    goal: {
        type: String,
        required: true
    },
    exercises: [
        {
            name: { type: String, required: true },  // Exercise name (e.g., Bench Press)
            sets: { type: Number, required: true },  // Number of sets
            reps: { type: Number, required: true }   // Number of reps per set
        }
    ],
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Workout', WorkoutSchema);
