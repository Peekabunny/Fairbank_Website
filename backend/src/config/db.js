import mongoose from "mongoose";
// easy-to-use API for defining schemas and interacting with MongoDB databases

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI,);
    console.log("mongodb connect successfully!");
  } catch (error) {
    console.error("Error connecting to MONGODB", error);
    process.exit(1);
  }
};