const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    console.log("Trying to connect...");

    const conn = await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 10000,
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error("Mongo Error:");
    console.error(error.message);
  }
};

module.exports = connectDB;