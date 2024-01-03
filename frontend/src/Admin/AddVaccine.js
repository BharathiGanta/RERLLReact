import { useState } from "react";
import axios from "../Common/Axios";
import Adminpage from "./AdminNavbar";
import Select from "react-select";

const cityOptions = [
  { value: "Delhi", label: "Delhi" },
  { value: "Mumbai", label: "Mumbai" },
  { value: "Kolkata", label: "Kolkata" },
  { value: "Chennai", label: "Chennai" },
  { value: "Bangalore", label: "Bangalore" },
  { value: "Hyderabad", label: "Hyderabad" },
  { value: "Ahmedabad", label: "Ahmedabad" },
  { value: "Pune", label: "Pune" },
  { value: "Jaipur", label: "Jaipur" },
  { value: "Lucknow", label: "Lucknow" },
];

const AddVaccine = () => {
  const [vaccineName, setVaccineName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [vaccinationPlaces, setVaccinationPlaces] = useState([]);
  const [error, setError] = useState("");

  const handleVaccineChange = (selectedOption) => {
    setVaccinationPlaces(selectedOption);
  };

  const handleAddVaccine = async () => {
    try {
      if (
        !vaccineName ||
        !startDate ||
        !endDate ||
        vaccinationPlaces.length === 0
      ) {
        setError("Please fill in all required fields.");
        return;
      }

      setError("");

      const response = await axios.post(
        "http://localhost:9002/vaccine/add-vaccine",
        {
          name: vaccineName,
          startDate,
          endDate,
          placesOfVaccination: vaccinationPlaces.map(
            (vaccinationPlaces) => vaccinationPlaces.value
          ),
        }
      );

      alert(response.data.message);

      setVaccineName("");
      setStartDate("");
      setEndDate("");
      setVaccinationPlaces([]);
    } catch (error) {
      console.error("Error adding vaccine:", error);
    }
  };

  // Inline styles
  const containerStyle = {
    maxWidth: "600px",
    margin: "0 auto",
    marginTop: "20px",
  };

  const tableStyle = {
    width: "100%",
    borderCollapse: "collapse",
    marginTop: "20px",
  };

  const tdStyle = {
    border: "1px solid #ddd",
    padding: "8px",
    textAlign: "left",
  };

  const buttonStyle = {
    backgroundColor: "#4CAF50",
    color: "white",
    border: "none",
    padding: "10px 15px",
    borderRadius: "4px",
    cursor: "pointer",
  };

  return (
    <>
      <Adminpage />
      <div
      style={{
        padding: '20px',
        backgroundImage: 'url("../admindashboard.jpg")', 
        backgroundSize: 'cover', 
        height: '100vh', 
      }}
    >

      <div style={containerStyle}>
        <h2 className="admindashoardh2" style={{textAlign:"center"}}>Add Vaccine</h2>
        <table style={tableStyle}>
          <tbody>
            <tr>
              <td style={tdStyle}>
                <label className="addvaccinetext" style={{fontWeight:"bold"}}>Vaccine Name:</label>
              </td>
              <td style={tdStyle}>
                <input
                  type="text"
                  placeholder="Vaccine Name"
                  value={vaccineName}
                  onChange={(e) => setVaccineName(e.target.value)}
                />
              </td>
            </tr>
            <tr>
              <td style={tdStyle}>
                <label className="addvaccinetext" style={{fontWeight:"bold"}}>Start Date:</label>
              </td>
              <td style={tdStyle}>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                />
              </td>
            </tr>
            <tr>
              <td style={tdStyle}>
                <label className="addvaccinetext" style={{fontWeight:"bold"}}>End Date:</label>
              </td>
              <td style={tdStyle}>
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                />
              </td>
            </tr>
            <tr>
              <td style={tdStyle}>
                <label className="addvaccinetext" style={{fontWeight:"bold"}}>Place of Vaccination:</label>
              </td>
              <td style={tdStyle}>
                <Select
                  value={vaccinationPlaces}
                  onChange={handleVaccineChange}
                  options={cityOptions}
                  isMulti
                  isSearchable
                  placeholder="Select cities"
                />
              </td>
            </tr>
          </tbody>
        </table>
        <div style={{ color: "red", margin: "5px 0" }}>{error}</div>
        <div>
          <button className="addvaccinebtn" onClick={handleAddVaccine} style={{buttonStyle}}>
            Add Vaccine
          </button>
        </div>
      </div>
      </div>
    </>
  );
};

export default AddVaccine;
