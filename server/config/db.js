const mongoose = require("mongoose");

const connectDB = async () => {
  const url = "mongodb+srv://user1:Omkar2546@cluster0.iapi7.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
  try {
    const conn = await mongoose.connect(url);

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
  }
};

module.exports = connectDB;
