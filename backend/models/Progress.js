const mongoose = require('mongoose');

const ProgressSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  workout: { type: mongoose.Schema.Types.ObjectId, ref: 'Workout', required: false }, // Optional if logging general progress
  exercises: [
    {
      name: { type: String, required: true },
      sets: { type: Number, required: true },
      reps: { type: Number, required: true },
      weight: { type: Number, required: false }, // Optional, for strength tracking
    }
  ],
  weight: { type: Number, required: false }, // New field for tracking user weight
  bodyFat: { type: Number, required: false }, // New field for tracking body fat percentage
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Progress', ProgressSchema);
