const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Import User model
const dotenv = require('dotenv');

dotenv.config(); // Load environment variables

// @route   POST /api/auth/register
// @desc    Register new user
router.post('/register', async (req, res) => {
  // Log the incoming request body
  console.log("Register Route - req.body:", req.body);

  const { name, email, password } = req.body;

  try {
    // Check if user already exists
    let user = await User.findOne({ email });
    console.log("Register Route - found user:", user);

    if (user) {
      return res.status(400).json({ msg: 'User already exists' });
    }

    // Hash password before saving
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    user = new User({ name, email, password: hashedPassword });

    // Save new user to DB
    await user.save();
    console.log("Register Route - new user saved:", user);

    // Generate JWT token
    const payload = { user: { id: user.id } };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({ token });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   POST /api/auth/login
// @desc    Authenticate user & get token
router.post('/login', async (req, res) => {
  // Log the incoming request body
  console.log("Login Route - req.body:", req.body);

  const { email, password } = req.body;

  try {
    // Find user by email
    const user = await User.findOne({ email });
    console.log("Login Route - user from DB:", user);

    if (!user) {
      return res.status(400).json({ msg: 'User not found' });
    }

    // Compare the entered password with the hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    console.log("Login Route - password isMatch:", isMatch);

    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    // Generate JWT token
    const payload = { user: { id: user.id } };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({ token });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
