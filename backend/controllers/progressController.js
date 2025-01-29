const Progress = require('../models/Progress'); // Import Progress model

// @desc Log a completed workout
// @route POST /api/progress
// @access Private
exports.logProgress = async (req, res) => {
    try {
        const { workout, exercises } = req.body;

        let progress = new Progress({
            user: req.user.id, // Get logged-in user
            workout,
            exercises
        });

        await progress.save();
        res.json(progress);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// @desc Get all progress logs for the logged-in user
// @route GET /api/progress
// @access Private
exports.getProgressLogs = async (req, res) => {
    try {
        const progressLogs = await Progress.find({ user: req.user.id }).populate('workout', ['goal']);
        res.json(progressLogs);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// @desc Delete a progress entry
// @route DELETE /api/progress/:id
// @access Private
exports.deleteProgress = async (req, res) => {
    try {
        let progress = await Progress.findById(req.params.id);
        if (!progress) {
            return res.status(404).json({ msg: 'Progress entry not found' });
        }

        // Ensure the progress entry belongs to the logged-in user
        if (progress.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'Not authorized' });
        }

        await Progress.findByIdAndDelete(req.params.id);
        res.json({ msg: 'Progress entry deleted' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};
