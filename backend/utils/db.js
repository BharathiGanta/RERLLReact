import mongoose from "mongoose";
import slotStatusUpdateScheduler from "./scheduler.js";

const connectToDatabase = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/vaccineDB", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("DB Connected");

    slotStatusUpdateScheduler();
    const scheduler = setInterval(slotStatusUpdateScheduler, 60 * 1000);
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
};

export default connectToDatabase;
