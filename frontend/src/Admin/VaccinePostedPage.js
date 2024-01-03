import React, { useState, useEffect } from "react";
import axios from "../Common/Axios";
import Adminpage from "./AdminNavbar";
const VaccinePostedPage = () => {
  const [vaccines, setVaccines] = useState([]);

  useEffect(() => {
    const fetchVaccines = async () => {
      try {
        const response = await axios.get(
          "http://localhost:9002/vaccine/vaccine-posted"
        );
        setVaccines(response.data);
      } catch (error) {
        console.error("Error fetching vaccines:", error);
      }
    };

    fetchVaccines();
  }, []); 

  const handleDelete = async (vaccineId) => {
    try {
      await axios.delete(`http://localhost:9002/vaccine/delete-vaccine/${vaccineId}`);

      setVaccines((prevVaccines) =>
        prevVaccines.filter((vaccine) => vaccine._id !== vaccineId)
      );
    } catch (error) {
      console.error("Error deleting vaccine:", error);
    }
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
        <h2 className="admindashoardh2" style={{ textAlign: "center", marginBottom: "20px" }}>
         Posted Vaccines
        </h2>
        <div style={tableContainerStyle}>
          <table style={tableStyle}>
            <thead>
              <tr>
                <th style={tableHeaderStyle}>Name</th>
                <th style={tableHeaderStyle}>Start Date</th>
                <th style={tableHeaderStyle}>End Date</th>
                <th style={tableHeaderStyle}>Places of Vaccination</th>
                <th style={tableHeaderStyle}>Action</th>
              </tr>
            </thead>
            <tbody>
              {vaccines.map((vaccine) => (
                <tr key={vaccine._id}>
                  <td className="tableCellStyle">{vaccine.name}</td>
                  <td className="tableCellStyle">{vaccine.startDate}</td>
                  <td className="tableCellStyle">{vaccine.endDate}</td>
                  <td className="tableCellStyle">
                    {vaccine.placesOfVaccination.join(",")}
                  </td>
                  <td className="tableCellStyle">
                    <button
                      onClick={() => handleDelete(vaccine._id)}
                      style={{ ...buttonStyle, ...buttonHoverStyle }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      </div>
    </>
  );
};

export default VaccinePostedPage;


const containerStyle = {
  maxWidth: "1100px",
  margin: "0 auto",
};

const tableContainerStyle = {
  overflowX: "auto",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  borderRadius: "8px",
};

const tableStyle = {
  width: "100%",
  borderCollapse: "collapse",
  marginTop: "20px",
  borderRadius: "8px",
  overflow: "hidden",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
};

const tableHeaderStyle = {
  border: "1px solid #ddd",
  padding: "12px",
  backgroundColor: "#0291d7",
  color: "white",
  textAlign: "left",
  textTransform: "uppercase",
  fontSize: "16px",
};

const buttonStyle = {
  backgroundColor: "#ec2437",
  color: "white",
  border: "none",
  padding: "8px 16px",
  borderRadius: "4px",
  cursor: "pointer",
  fontSize: "14px",
  fontWeight: "bold",
  transition: "background-color 0.3s",
};

const buttonHoverStyle = {
  backgroundColor: "#d32f2f",
};
