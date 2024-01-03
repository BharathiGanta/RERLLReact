import Slot from "../models/Slot.js";

const slotStatusUpdateScheduler = async () => {
  // console.log("Running scheduler to update slot status");

  const currentDate = new Date();
  const currentDateString =
    currentDate.getFullYear() +
    "-" +
    (currentDate.getMonth() + 1).toString().padStart(2, "0") +
    "-" +
    currentDate.getDate().toString().padStart(2, "0");
  const currentTimeString = currentDate
    .toLocaleTimeString("en-US", {
      hour12: false,
    })
    .slice(0, 5);

  // console.log(currentDateString, currentTimeString);

  const filter = {
    $or: [
      { date: currentDateString, time: { $lte: currentTimeString } },
      { date: { $lt: currentDateString } },
    ],
  };
  const options = { multi: true };
  const update = {
    $set: { status: "Completed" },
  };

  try {
    const result = await Slot.updateMany(filter, update, options);
    // console.log("Updated slots:", result.modifiedCount);
  } catch (error) {
    console.error("Error updating slots:", error);
    stopScheduler(scheduler);
  }
};

export default slotStatusUpdateScheduler;
