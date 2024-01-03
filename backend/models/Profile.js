// profile.js
import mongoose from "mongoose";

const profileSchema = new mongoose.Schema({
  name: String,
  email: String,
  dob: {
    type: String,
    default: "Not Provided",
  },
  phoneNumber: {
    type: String,
    default: "Not Provided",
  },
  address: {
    type: String,
    default: "Not Provided",
  },
  gender: {
    type: String,
    default: "Not Provided",
  },
});

const Profile = new mongoose.model("Profile", profileSchema);
export default Profile;