const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const dbUrl = process.env.MONGODB_URI || process.env.MONGO_URI;
    const conn = await mongoose.connect(dbUrl);
    console.log(`[DATABASE] MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`[DATABASE ERROR] ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
