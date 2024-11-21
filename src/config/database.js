const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const database_uri =
  process.env.ENV === "dev" ? process.env.MONGO_LOCAL : process.env.MONGO_URI;

const connectDB = async () => {
  try {
    const connect = await mongoose.connect(database_uri);
    console.log(`Database connected: ${connect.connection.host}`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

module.exports = connectDB;
