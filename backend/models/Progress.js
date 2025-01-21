const mongoose = require('mongoose');

const ProgressSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Links progress to a User
  },
  workout: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Workout', // Links to a specific workout plan
  },
  exercises: [
    {
      name: String, // Example: "Push-ups"
      setsCompleted: Number, // Example: 3
      repsCompleted: Number, // Example: 10
      duration: Number, // Time spent (in seconds)
    }
  ],
  date: { type: Date, default: Date.now } // Date of the workout session
});

module.exports = mongoose.model('Progress', ProgressSchema);
