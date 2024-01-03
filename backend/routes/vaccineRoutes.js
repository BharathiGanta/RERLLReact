import express from "express";
import Vaccine from "../models/Vaccine.js";

const router = express.Router();

router.post("/add-vaccine", async (req, res) => {
  try {
    const { name, startDate, endDate, placesOfVaccination } = req.body;

    const existingVaccine = await Vaccine.findOne({ name });

    if (existingVaccine) {
      return res.status(400).send({ message: "Vaccine already exists" });
    }

    const newVaccine = new Vaccine({
      name,
      startDate,
      endDate,
      placesOfVaccination,
    });
    await newVaccine.save();

    res.status(201).send({ message: "Vaccine added successfully" });
  } catch (error) {
    console.error("Error adding vaccine:", error);
    res.status(500).send({ message: "Internal Server Error" });
  }
});

router.get("/vaccine-posted", async (req, res) => {
  try {
    const vaccines = await Vaccine.find(
      {},
      "name startDate endDate placesOfVaccination"
    );

    res.status(200).json(vaccines);
  } catch (error) {
    console.error("Error fetching vaccines:", error);
    res.status(500).send({ message: "Internal Server Error" });
  }
});

router.delete("/delete-vaccine/:vaccineId", async (req, res) => {
  try {
    const { vaccineId } = req.params;

    await Vaccine.findByIdAndDelete(vaccineId);

    res.status(200).send({ message: "Vaccine deleted successfully" });
  } catch (error) {
    console.error("Error deleting vaccine:", error);
    res.status(500).send({ message: "Internal Server Error" });
  }
});

export default router;
