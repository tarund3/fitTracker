const Profile = require('../models/Profile');
const User = require('../models/User');

// Get current user's profile
exports.getProfile = async (req, res) => {
    try {
        const profile = await Profile.findOne({ user: req.user.id }).populate('user', ['name', 'email']);
        
        if (!profile) {
            return res.status(404).json({ msg: 'Profile not found' });
        }

        res.json(profile);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// Create or update profile
exports.createProfile = async (req, res) => {
    try {
        const {
            height,
            weight,
            fitnessGoal,
            activityLevel,
            medicalConditions,
            preferredWorkoutDays
        } = req.body;

        // Build profile object
        const profileFields = {
            user: req.user.id,
            height,
            weight,
            fitnessGoal,
            activityLevel,
            medicalConditions: medicalConditions || [],
            preferredWorkoutDays: preferredWorkoutDays || []
        };

        let profile = await Profile.findOne({ user: req.user.id });

        if (profile) {
            // Update
            profile = await Profile.findOneAndUpdate(
                { user: req.user.id },
                { $set: profileFields },
                { new: true }
            );
        } else {
            // Create
            profile = new Profile(profileFields);
            await profile.save();
        }

        res.json(profile);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// Delete profile
exports.deleteProfile = async (req, res) => {
    try {
        await Profile.findOneAndRemove({ user: req.user.id });
        res.json({ msg: 'Profile deleted' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};
