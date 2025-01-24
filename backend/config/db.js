// config/db.js
const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // Step 1: Log the MONGO_URI value to confirm it's loaded
    console.log("MONGO_URI is:", process.env.MONGO_URI);

    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
