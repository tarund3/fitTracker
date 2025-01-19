const express = require('express');
const auth = require('../middleware/auth'); 
const Profile = require('../models/Profile');
const User = require('../models/User');
const router = express.Router()

// finds user and returns name and email
router.get('/', auth, async (req, res) => {
    try {
      const profile = await Profile.findOne({ user: req.user.id }).populate('user', ['name', 'email']); // replaces user document in profile model with the name and email
      if (!profile) return res.status(404).json({ msg: 'Profile not found' });
      
      res.json(profile); // returns the profile
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  });

router.post('/', auth, async (req, res) => {
    const { age, weight, height, fitnessGoal, targetAreas } = req.body; // these are what the user inputs

    try {
        let profile = await Profile.findOne({ user: req.user.id });

        if (profile) {
            profile.age = age || profile.age // if user inputs age -> update the age, otherwise leave it undefined
            profile.weight = weight || profile.weight;
            profile.height = height || profile.height;
            profile.fitnessGoal = fitnessGoal || profile.fitnessGoal;
            profile.targetAreas = targetAreas || profile.targetAreas;
        } else {
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
    } catch(err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

router.delete('/', auth, async(req, res) => {
    try {
        await Profile.findOneAndDelete({ user: req.user.id });
        res.json({ msg: 'Profile Deleted' });
    } catch {
        console.error(err.message);
        res.status(500).send('Server Error')
    }
});

module.exports = router;