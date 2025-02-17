import mongoose from "mongoose";

const MONGO_URI: string = "mongodb://localhost:27017/affiliate-website";
const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI, {
      directConnection: true,
    });
    console.log("MongoDB connection SUCCESS");
  } catch (error) {
    console.error("MongoDB connection FAIL");
    process.exit(1);
  }
};

export default connectDB;
