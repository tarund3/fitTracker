const Profile = require('../models/Profile');

// @desc Get current user's profile
// @route GET /api/profile
// @access Private
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

// @desc Create or update user profile
// @route POST /api/profile
// @access Private
exports.createOrUpdateProfile = async (req, res) => {
    try {
        const { age, weight, height, fitnessGoal, targetAreas } = req.body;

        let profile = await Profile.findOne({ user: req.user.id });

        if (profile) {
            // Update existing profile
            profile.age = age || profile.age;
            profile.weight = weight || profile.weight;
            profile.height = height || profile.height;
            profile.fitnessGoal = fitnessGoal || profile.fitnessGoal;
            profile.targetAreas = targetAreas || profile.targetAreas;
        } else {
            // Create new profile
            profile = new Profile({
                user: req.user.id,
                age,
                weight,
                height,
                fitnessGoal,
                targetAreas
            });
        }

        await profile.save();
        res.json(profile);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// @desc Delete user profile
// @route DELETE /api/profile
// @access Private
exports.deleteProfile = async (req, res) => {
    try {
        await Profile.findOneAndRemove({ user: req.user.id });
        res.json({ msg: 'Profile deleted' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};
