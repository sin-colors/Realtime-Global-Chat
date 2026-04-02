import mongoose from "mongoose";

async function connectToMongoDB() {
  try {
    // console.log("URI:", process.env.MONGO_DB_URI);
    await mongoose.connect(process.env.MONGO_DB_URI!);
    console.log("Connect to MongoDB");
  } catch (err) {
    if (err instanceof Error) {
      console.log("Error connecting to MongoDB", err.message);
    } else {
      console.log("Error connecting to MongoDB", err);
    }
  }
}

export default connectToMongoDB;
