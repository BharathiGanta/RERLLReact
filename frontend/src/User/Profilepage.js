import React, { useEffect, useState } from "react";
import axios from "../Common/Axios";
import Navbar from "./UserNavBar";

const ProfilePage = () => {
  const [profileData, setProfileData] = useState({
    name: "",
    email: "",
    dob: "",
    phoneNumber: "",
    address: "",
    gender: "",
  });

  const [email, setEmail] = useState("");
  const [editMode, setEditMode] = useState(false); // Add edit mode state
  const [editedData, setEditedData] = useState({
    dob: "",
    gender: "",
    phoneNumber: "",
    address: "",
  });

  useEffect(() => {
    const storedEmail = localStorage.getItem("userEmail");
    setEmail(storedEmail || "Email not found");

    if (storedEmail) {
      const encodedEmail = encodeURIComponent(storedEmail);
      axios
        .get(`http://localhost:9002/profile/${encodedEmail}`)
        .then((response) => {
          setProfileData(response.data);
          setEditedData(response.data); // Initialize editedData with the current data
        })
        .catch((error) => {
          console.error("Error fetching profile details:", error);
        });
    }
  }, []);

  const handleEditClick = () => {
    setEditMode(true);
  };

  const handleSaveChanges = () => {
    // Update the backend with editedData
    axios
      .put(`http://localhost:9002/profile/${encodeURIComponent(email)}`, editedData)
      .then((response) => {
        setProfileData(response.data);
        setEditMode(false);
      })
      .catch((error) => {
        console.error("Error updating profile details:", error);
      });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <>
      <Navbar />
      <div
      style={{
        padding: '20px',
        backgroundImage: 'url("../userbg1.jpg")', 
        backgroundSize: 'cover', 
        height: '100vh', 
      }}
    >
       <div className="Profilecontainer">
        <h1 className="profileh1">User Profile</h1>
        <div className="Profileincontainer">
        <p className="profiletext">Email: {email}</p>
        <p className="profiletext">Name: {profileData.name}</p>
        <p className="profiletext">
          Date of Birth: {editMode ? <input type="date" name="dob" value={editedData.dob} onChange={handleInputChange} /> : profileData.dob}
        </p>
        <p className="profiletext">
          Gender: {editMode ? (
            <select name="gender" value={editedData.gender} onChange={handleInputChange}>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          ) : (
            profileData.gender
          )}
        </p>
        <p className="profiletext">
          Phone Number: {editMode ? <input type="number" name="phoneNumber" value={editedData.phoneNumber} onChange={handleInputChange} /> : profileData.phoneNumber}
        </p>
        <p className="profiletext">
          Address: {editMode ? (
            <textarea name="address" value={editedData.address} onChange={handleInputChange}/>
          ) : (
            profileData.address
          )}
        </p>
       
        {editMode ? (
          <button className="profilesavechanges" onClick={handleSaveChanges}>Save Changes</button>
        ) : (
          <button className="profileedit" onClick={handleEditClick}>Edit</button>
        )}
      </div>
      </div>
      </div>
    </>
  );
};

export default ProfilePage;