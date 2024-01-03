import express from "express";
import cookie from "cookie";
import jwt from "jsonwebtoken";
import axios from "axios";
import User from "../models/User.js";
import Profile from "../models/Profile.js";


const router = express.Router();

router.post("/login", async (req, res) => {
  const { email, password, captcha } = req.body;
  try {
    const isValidCaptcha = await verifyCaptcha(captcha);
    if (!isValidCaptcha) {
      res.status(401).send({ message: "Invalid captcha try again" });
      return;
    }

    const user = await User.findOne({ email: email });

    if (user) {
      if (password === user.password) {
        const secretKey = "secret-key";
        const expiresIn = 3600 * 3;
        const expirationTime = new Date(Date.now() + expiresIn * 1000); // 3hr expiry

        const token = jwt.sign(
          { name: user.name, email: user.email },
          secretKey,
          { expiresIn }
        );
        res.setHeader(
          "Set-Cookie",
          cookie.serialize("token", token, {
            httpOnly: true,
            expires: expirationTime,
            path: "/",
            sameSite: "None",
            secure: true,
          })
        );

        res.send({ message: "Login Successful", user: user });
      } else {
        res.status(401).send({ message: "Incorrect Password" });
      }
    } else {
      res.status(401).send({ message: "User not found" });
    }
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).send({ message: "Internal Server Error" });
  }
});

const verifyCaptcha = async (captcha) => {
  console.log("Verifying captcha:", captcha);
  try {
    const response = await axios.post(
      "https://www.google.com/recaptcha/api/siteverify",
      null,
      {
        params: {
          secret: "6LdaQTopAAAAAKtpnxQbcuMbzykODdBgzpa-XJbB",
          response: captcha,
        },
      }
    );

    if (response.data && response.data.success) {
      return true;
    }
  } catch (error) {
    console.error("Error verifying captcha:", error.message);
    throw error;
  }
  return false;
};









router.post("/register", async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      securityQuestion1,
      securityAnswer1,
      securityQuestion2,
      securityAnswer2,
    } = req.body;

    const existingUser = await User.findOne({ email: email });

    if (existingUser) {
      return res.status(400).send({ message: "User already registered" });
    }

    const newUser = new User({
      name,
      email,
      password: password,
      securityQuestion1,
      securityAnswer1,
      securityQuestion2,
      securityAnswer2,
    });

    await newUser.save();

    // Extract the user ID from the saved user
    const userId = newUser._id;

    // Prepare data for the profile schema (name and email only)
    const userProfileData = {
     
      name,
      email,
    };

    // Create the user profile
    const newUserProfile = new Profile(userProfileData);
    await newUserProfile.save();

    res.status(201).send({ message: "Successfully Registered, Please login now." });
  } catch (error) {
    console.error("Error during registration:", error);
    res.status(500).send({ message: "Internal Server Error" });
  }
});
// ... (your imports and other code)

router.get("/profile/:email", async (req, res) => {
  try {
    const email = decodeURIComponent(req.params.email); // Decode the email
    console.log("Decoded Email:", email);

  

    const profile = await Profile.findOne({ email});

    if (!profile) {
      return res.status(404).json({ message: "Profile not found" });
    }

    res.status(200).json({
      name: profile.name,
      email: profile.email,
      dob: profile.dob,
      phoneNumber: profile.phoneNumber,
      address: profile.address,
      gender: profile.gender,
    });
  } catch (error) {
    console.error("Error fetching profile details:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});



router.put("/profile/:email", async (req, res) => {
  try {
    const email = decodeURIComponent(req.params.email); // Decode the email

    // Extract the fields you want to update from the request body
    const { dob, phoneNumber, address, gender } = req.body;

    // Find the profile by email
    const profile = await Profile.findOne({ email });

    if (!profile) {
      return res.status(404).json({ message: "Profile not found" });
    }

    // Update the fields if they are provided in the request body
    if (dob) {
      profile.dob = dob;
    }
    if (phoneNumber) {
      profile.phoneNumber = phoneNumber;
    }
    if (address) {
      profile.address = address;
    }
    if (gender) {
      profile.gender = gender;
    }

    // Save the updated profile
    await profile.save();

    res.status(200).json({
      message: "Profile successfully updated",
      name: profile.name,
      email: profile.email,
      dob: profile.dob,
      phoneNumber: profile.phoneNumber,
      address: profile.address,
      gender: profile.gender,
    });
  } catch (error) {
    console.error("Error updating profile details:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});







router.post("/reset-password-check-answers", async (req, res) => {
  try {
    const { email, securityAnswer1, securityAnswer2 } = req.body;

    const user = await User.findOne({ email: email });

    if (!user) {
      return res.status(400).send({ message: "User not found" });
    }

    if (
      user.securityAnswer1 !== securityAnswer1 ||
      user.securityAnswer2 !== securityAnswer2
    ) {
      return res.status(401).send({ message: "Incorrect security answers" });
    }

    res.status(200).send({ message: "Security answers are correct" });
  } catch (error) {
    console.error("Error during security answers check:", error);
    res.status(500).send({ message: "Internal Server Error" });
  }
});

router.post("/reset-password", async (req, res) => {
  try {
    const {
      email,
      securityAnswer1,
      securityAnswer2,
      newPassword,
      confirmPassword,
    } = req.body;

    const user = await User.findOne({ email: email });

    if (!user) {
      return res.status(400).send({ message: "User not found" });
    }

    if (
      user.securityAnswer1 !== securityAnswer1 ||
      user.securityAnswer2 !== securityAnswer2
    ) {
      return res
        .status(401)
        .send({ message: "Security answers are incorrect" });
    }

    if (newPassword !== confirmPassword) {
      return res.status(400).send({ message: "Passwords do not match" });
    }

    user.password = newPassword;
    await user.save();

    res.status(200).send({ message: "Password reset successfully" });
  } catch (error) {
    console.error("Error during password reset:", error);
    res.status(500).send({ message: "Internal Server Error" });
  }
});

router.post("/forgot-password-check-email", async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email: email });

    if (user) {
      const { securityQuestion1, securityQuestion2 } = user;
      res.json({ securityQuestions: { securityQuestion1, securityQuestion2 } });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.error("Error checking email:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

export default router;