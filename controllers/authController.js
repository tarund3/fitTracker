// controllers/authController.js

// Import required packages and models
const bcrypt = require('bcryptjs');         // For password hashing
const jwt = require('jsonwebtoken');        // For creating tokens
const User = require('../models/User');     // User model

// Register Controller
exports.register = async (req, res) => {
    try {
        // 1. Get user input from request body
        const { name, email, password } = req.body;

        // 2. Check if user already exists
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ msg: 'User already exists' });
        }

        // 3. Create new user instance
        user = new User({
            name,
            email,
            password
        });

        // 4. Hash the password
        const salt = await bcrypt.genSalt(10);           // Generate salt
        user.password = await bcrypt.hash(password, salt); // Hash password

        // 5. Save user to database
        await user.save();

        // 6. Create JWT payload
        const payload = {
            user: {
                id: user.id
            }
        };

        // 7. Sign and send JWT token
        jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: '24h' },
            (err, token) => {
                if (err) throw err;
                res.json({ token });
            }
        );

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// Login Controller
exports.login = async (req, res) => {
    try {
        // 1. Get user input
        const { email, password } = req.body;

        // 2. Check if user exists
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ msg: 'Invalid credentials' });
        }

        // 3. Verify password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ msg: 'Invalid credentials' });
        }

        // 4. Create JWT payload
        const payload = {
            user: {
                id: user.id
            }
        };

        // 5. Sign and send JWT token
        jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: '24h' },
            (err, token) => {
                if (err) throw err;
                res.json({ token });
            }
        );

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};
