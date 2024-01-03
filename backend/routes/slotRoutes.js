import express from "express";
import Slot from "../models/Slot.js";

const router = express.Router();

router.post("/book-slot", async (req, res) => {
  try {
    const { name, email } = req.decodedToken;
    const { vaccineName, placesOfVaccination, age, date, time, familyMembers } = req.body;

    const newSlot = new Slot({
      vaccineName,
      placesOfVaccination,
      name,
      email,
      age,
      date,
      time,
      familyMembers,
    });

    console.log(newSlot);

    await newSlot.save();

    res.status(201).send({ message: "Slot booked successfully" });
  } catch (error) {
    console.error("Error booking slot:", error);
    res.status(500).send({ message: "Internal Server Error" });
  }
});

router.get("/ongoing", async (req, res) => {
  try {
    const { email } = req.decodedToken;

    const ongoingSlot = await Slot.findOne({
      email,
      status: "Ongoing",
    });

    if (ongoingSlot) {
      res.status(200).send(ongoingSlot);
    } else {
      res.status(404).send({ message: "Ongoing slot not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
});

router.get("/history", async (req, res) => {
  try {
    const { email } = req.decodedToken;

    const slotsByEmail = await Slot.find({ email });
    res.json(slotsByEmail);
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
});

router.get("/list", async (req, res) => {
  try {
    const slots = await Slot.find();
    res.json(slots);
  } catch (error) {
    console.error("Error fetching slots:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.put("/update-slot", async (req, res) => {
  try {
    const {
      _id,
      name,
      email,
      placesOfVaccination,
      vaccineName,
      age,
      date,
      time,
      familyMembers,
    } = req.body;

    const updatedSlot = await Slot.findByIdAndUpdate(
      _id,
      {
        name,
        email,
        placesOfVaccination,
        vaccineName,
        age,
        date,
        time,
        familyMembers,
      },
      { new: true }
    );

    res.json(updatedSlot);
  } catch (error) {
    console.error("Error fetching slots:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.delete("/delete-slot/:id", async (req, res) => {
  try {
    const slotId = req.params.id;

    const deletedSlot = await Slot.findByIdAndDelete(slotId);

    if (!deletedSlot) {
      return res.status(404).json({ error: "Slot not found" });
    }

    res.status(200).json({ message: "Deleted successfully" });
  } catch (error) {
    console.error("Error deleting slot:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.put("/reschedule/:slotId", async (req, res) => {
  const { slotId } = req.params;
  const { date, time } = req.body;

  try {
    const slot = await Slot.findById(slotId);

    if (!slot) {
      return res.status(404).send({ message: "Slot not found" });
    }
    slot.date = date;
    slot.time = time;

    await slot.save();

    res.json({ message: "Slot rescheduled successfully", updatedSlot: slot });
  } catch (error) {
    console.error("Error rescheduling slot:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
