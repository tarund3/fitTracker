const mongoose = require('mongoose');

const WorkoutSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    goal: {
        type: String,
        enum: ['Weight Loss', 'Muscle Gain', 'Endurance'],
        required: true
    },
    exercises: [ // array of sub-documents
        {
          name: String, // Example: "Push-ups"
          sets: Number, // Example: 3
          reps: Number, // Example: 10
          duration: Number, // Example: 30 (seconds for cardio)
          difficulty: { type: String, enum: ['Easy', 'Medium', 'Hard'] }
        }
      ],
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Workout', WorkoutSchema);