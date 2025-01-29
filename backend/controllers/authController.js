const bcrypt = require('bcryptjs');  // For password hashing
const jwt = require('jsonwebtoken'); // For token generation
const User = require('../models/User'); // Import User model

// @desc Get current authenticated user
// @route GET /api/auth/me
// @access Private
exports.getAuthUser = async (req, res) => {
    try {
        console.log("✅ Authenticated User ID:", req.user ? req.user.id : "No User in req");

        if (!req.user) {
            return res.status(401).json({ msg: 'Token verification failed' });
        }

        const user = await User.findById(req.user.id).select('-password'); // Exclude password field
        console.log("🔹 Found user:", user);

        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }
        
        res.json(user);
    } catch (err) {
        console.error('❌ Error fetching user:', err.message);
        res.status(500).send('Server Error');
    }
};


// @desc Register a new user
// @route POST /api/auth/register
// @access Public
exports.register = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Check if the user already exists
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ msg: 'User already exists' });
        }

        // Create new user instance
        user = new User({ name, email, password });

        // Hash password before saving
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        // Save user to DB
        await user.save();

        // Create JWT payload
        const payload = { user: { id: user.id } };

        // Sign and send JWT token
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
        res.status(500).send('Server Error');
    }
};

// @desc Authenticate user and get token
// @route POST /api/auth/login
// @access Public
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        let user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ msg: 'Invalid credentials' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ msg: 'Invalid credentials' });
        }

        const payload = { user: { id: user.id } };

        jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: '24h' },
            (err, token) => {
                if (err) throw err;

                console.log("✅ Generated Token:", token); // Log the token
                res.json({ token, user }); // Ensure the response includes token
            }
        );

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};
