require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

const resetPassword = async () => {
  const hashedPassword = await bcrypt.hash("password123", 10);
  await User.findOneAndUpdate(
    { email: "testuser@example.com" }, 
    { password: hashedPassword }
  );
  console.log("Password reset successfully!");
  mongoose.connection.close();
};

resetPassword();
