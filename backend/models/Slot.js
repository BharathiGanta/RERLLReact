import mongoose from "mongoose";

const slotSchema = new mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    default: () => new mongoose.Types.ObjectId(),
  },
  vaccineName: String,
  placesOfVaccination: String,
  name: String,
  email: String,
  age: String,
  date: String,
  time: String,
  familyMembers: [
    {
      name: String,
      age: String,
    },
  ],
  status: {
    type: String,
    default: "Ongoing",
  },
});

const Slot = new mongoose.model("Slot", slotSchema);

export default Slot;
