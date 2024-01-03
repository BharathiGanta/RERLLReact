import React, { useState, useEffect } from 'react';
import axios from '../Common/Axios';
import NavBar from './UserNavBar';
const AvailableVaccine = ({ onSelectVaccine }) => {
  const [vaccines, setVaccines] = useState([]);

  useEffect(() => {
    const fetchVaccines = async () => {
      try {
        const response = await axios.get('http://localhost:9002/vaccine/vaccine-posted');
        setVaccines(response.data);
      } catch (error) {
        console.error('Error fetching vaccines:', error);
      }
    };

    fetchVaccines();
  }, []);

  return (
    <>
      <NavBar />
      <div
      style={{
        padding: '20px',
        backgroundImage: 'url("../userbg1.jpg")', 
        backgroundSize: 'cover', 
        height: '100vh', 
      }}
    >
      <div style={containerStyle}>
        <h2 className='availablevaccine' style={{ textAlign: 'center', marginBottom: '20px' }}>Available Vaccine</h2>
        <div style={tableContainerStyle}>
          <table style={tableStyle}>
            <thead>
              <tr>
                <th style={tableHeaderStyle}>Name</th>
                <th style={tableHeaderStyle}>Start Date</th>
                <th style={tableHeaderStyle}>End Date</th>
                <th style={tableHeaderStyle}>Place of Vaccination</th>
              </tr>
            </thead>
            <tbody>
              {vaccines.map((vaccine) => (
                <tr key={vaccine._id}>
                  <td style={tableCellStyle}>{vaccine.name}</td>
                  <td style={tableCellStyle}>{vaccine.startDate}</td>
                  <td style={tableCellStyle}>{vaccine.endDate}</td>
                  <td style={tableCellStyle}>{vaccine.placesOfVaccination.join(",")}</td>
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

// ... (styles)

const containerStyle = {
  maxWidth: '1000px',
  margin: '0 auto',
};

const tableContainerStyle = {
  overflowX: 'auto',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  borderRadius: '8px',
};

const tableStyle = {
  width: '100%',
  borderCollapse: 'collapse',
  marginTop: '20px',
  borderRadius: '8px',
  overflow: 'hidden',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
};

const tableHeaderStyle = {
  border: '1px solid #ddd',
  padding: '12px',
  backgroundColor: 'rgb(183, 0, 255)',
  color: 'white',
  textAlign: 'left',
  textTransform: 'uppercase',
  fontSize: '14px',
};

const tableCellStyle = {
  border: '1px solid #ddd',
  backgroundColor: 'white',
  padding: '12px',
  textAlign: 'left',
  fontSize: '14px',
};

export default AvailableVaccine;