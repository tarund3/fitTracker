const mongoose = require('mongoose');


const ProfileSchema = new mongoose.Schema({
    user: { // each profile has a user
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // links this profile to a user 
    },
    age: { type: Number },
    weight: { type: Number }, // in lbs
    height: { type: Number }, // in cm
    fitnessGoal: { type: String, enum: ['Weight Loss', 'Muscle Gain', 'Endurance'] },
    targetAreas: { type: [String] }, // Example: ['Arms', 'Legs', 'Core']
    createdAt: { type: Date, default: Date.now }

});

module.exports = mongoose.model('Profile', ProfileSchema);