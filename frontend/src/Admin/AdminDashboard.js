import React, { useEffect, useState } from "react";
import axios from "../Common/Axios";
import Adminpage from "./AdminNavbar";
import "./AdminDashboard.css";

const AdminDashboard = () => {
  const [slots, setSlots] = useState([]);
  const [availableVaccines, setAvailableVaccines] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    getSlotsList();
    axios
      .get("http://localhost:9002/vaccine/vaccine-posted")
      .then((res) => {
        const vaccineNames = res.data.map((vaccine) => vaccine.name);
        setAvailableVaccines(vaccineNames);
      })
      .catch((error) => console.error("Error fetching vaccines:", error));
  }, []);

  const getSlotsList = () => {
    axios
      .get("http://localhost:9002/slot/list")
      .then((response) => {
        setSlots(response.data);
      })
      .catch((error) => {
        console.error("Error fetching slots:", error);
      });
  };

  const handleEdit = (slot) => {
    axios
      .put("http://localhost:9002/slot/update-slot", slot)
      .then((response) => {
        console.log("Updated slot successfully", response.data);
        getSlotsList();
      })
      .catch((error) => {
        console.error("Error updating slot:", error);
      });
  };

  const handleDelete = (slotId) => {
    axios
      .delete(`http://localhost:9002/slot/delete-slot/${slotId}`)
      .then((response) => {
        console.log("Deleted slot successfully", response.data);
        getSlotsList();
      })
      .catch((error) => {
        console.error("Error deleting slot:", error);
      });
  };

  const handleChange = (e, slotId) => {
    const { name, value } = e.target;

    const slotData = slots[slotId];
    const updatedSlotData = {
      ...slotData,
      [name]: value,
    };

    setSlots((prevSlots) => {
      const updatedSlots = [...prevSlots];
      updatedSlots[slotId] = updatedSlotData;
      return updatedSlots;
    });
  };

  const filterSlots = () => {
    if (searchQuery === "") {
      return slots;
    }
    const search = searchQuery.toLowerCase();
    return slots.filter(
      (slot) =>
        slot.name.toLowerCase().includes(search) ||
        slot.email.toLowerCase().includes(search) ||
        slot.vaccineName.toLowerCase().includes(search) ||
        slot.date.toLowerCase().includes(search) ||
        slot.time.toLowerCase().includes(search) ||
        slot.familyMembers.filter(
          (familyMember) =>
            familyMember.name.toLowerCase().includes(search) ||
            familyMember.age.toLowerCase().includes(search)
        ).length > 0
    );
  };

  return (
    <>
      <Adminpage />
      <div
      style={{
        padding: '20px',
        backgroundImage: 'url("../admindashboard.jpg")', 
        backgroundSize: 'cover', 
        height: '700vh', 
      }}
    >
      <div>
       <center><h2 className="admindashoardh2" >Users & Slot List </h2></center> 
        <div>
          <label htmlFor="searchQuery" style={{fontWeight:"bold", fontSize:"130%"}}>Search:</label>
          <input className="adminsearch"
            type="text"
            id="searchQuery"
            name="searchQuery"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <table className="slot-table">
          <thead>
            <tr>
              <th className="addvaccinetext" style={{fontWeight:"bold", fontSize:"130%"}}>Vaccine Name</th>
              <th className="addvaccinetext" style={{fontWeight:"bold", fontSize:"130%"}}>Name</th>
              <th className="addvaccinetext" style={{fontWeight:"bold", fontSize:"130%"}}>Email</th>
              <th className="addvaccinetext" style={{fontWeight:"bold", fontSize:"130%"}}>Date</th>
              <th className="addvaccinetext" style={{fontWeight:"bold", fontSize:"130%"}}>Time</th>
              <th className="addvaccinetext" style={{fontWeight:"bold", fontSize:"130%"}}>Family Members</th>
              <th className="addvaccinetext" style={{fontWeight:"bold", fontSize:"130%"}}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filterSlots().map((slot, index) => (
              <tr key={index}>
                <td>
                  <select style={{fontWeight:"bold"}}
                    className="form-select"
                    id="vaccineName"
                    name="vaccineName"
                    value={slot.vaccineName}
                    onChange={(e) => handleChange(e, index)}
                    required
                  >
                    {availableVaccines.map((vaccine, index) => (
                      <option key={index} value={vaccine}>
                        {vaccine}
                      </option>
                    ))}
                  </select>
                </td>
                <td style={{fontWeight:"bold"}}>{slot.name}</td>
                <td style={{fontWeight:"bold"}}>{slot.email}</td>
                <td>
                  <input style={{fontWeight:"bold"}}
                    id={index + " date"}
                    name="date"
                    type="date"
                    value={slot.date}
                    onChange={(e) => handleChange(e, index)}
                  />
                </td>
                <td>
                  <input style={{fontWeight:"bold"}}
                    id={index + " time"}
                    name="time"
                    type="time"
                    value={slot.time}
                    onChange={(e) => handleChange(e, index)}
                  />
                </td>
                <td>
                  {slot.familyMembers.map((familyMember, memberIndex) => (
                    <div key={memberIndex}>
                      <p style={{fontWeight:"bold"}}>Name: {familyMember.name}</p>
                      <p style={{fontWeight:"bold"}}>Age: {familyMember.age}</p>
                      {memberIndex < slot.familyMembers.length - 1 && (
                        <hr />
                      )}{" "}
                    </div>
                  ))}
                </td>
                <td>
                  <button onClick={() => handleEdit(slot)}>Edit</button>
                  <button className="deletebtn" onClick={() => handleDelete(slot._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      </div>
    </>
  );
};

export default AdminDashboard;
