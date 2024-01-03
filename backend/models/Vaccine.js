import mongoose from "mongoose";

const vaccineSchema = new mongoose.Schema({
    name: String,
    startDate: String,
    endDate: String,
    placesOfVaccination: [String],
  });
  
  const Vaccine = new mongoose.model("Vaccine", vaccineSchema);

  export default Vaccine;