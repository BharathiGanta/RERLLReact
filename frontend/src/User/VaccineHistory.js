import React, { useState, useEffect } from "react";
import axios from "../Common/Axios";
import Navbar from "./UserNavBar";
import PrintCertificate from "./PrintCertificate";

const VaccineHistoryPage = () => {
  const [vaccineHistory, setVaccineHistory] = useState([]);
  const [certificateData, setCertificateData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      axios
        .get("http://localhost:9002/slot/history")
        .then((res) => {
          setVaccineHistory(res.data);
        })
        .catch((error) => {
          console.error("Login error:", error);
          setVaccineHistory([]);
        });
    };

    fetchData();
  }, []);

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
      <div className="vaccinehistorycontainer">
        <h3 className="titleStyle">
          <strong>Vaccine History</strong>
        </h3>
        {(() => {
          if (vaccineHistory.length === 0) {
            return <p>No vaccine history available.</p>;
          } else if (certificateData) {
            console.log(certificateData);
            return (
              <PrintCertificate
                handleBack={setCertificateData}
                certificateData={certificateData}
              />
            );
          } else {
            return (
              <div>
                <table className="slot-table">
                  <thead>
                    <tr>
                      <th>Vaccine Name</th>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Date</th>
                      <th>Time</th>
                      <th>Family Members</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {vaccineHistory.map((slot, index) => (
                      <tr key={index}>
                        <td>{slot.vaccineName}</td>
                        <td>{slot.name}</td>
                        <td>{slot.email}</td>
                        <td>{slot.date}</td>
                        <td>{slot.time}</td>
                        <td>
                          {slot.familyMembers.map(
                            (familyMember, memberIndex) => (
                              <div key={memberIndex}>
                                <p>Name: {familyMember.name}</p>
                                <p>Age: {familyMember.age}</p>
                                {memberIndex <
                                  slot.familyMembers.length - 1 && <hr />}{" "}
                              </div>
                            )
                          )}
                        </td>
                        <td>
                          {slot.status}{" "}
                          {slot.status === "Completed" && (
                            <button
                              onClick={() => setCertificateData(slot)}
                            >
                              View Certificate
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            );
          }
        })()}
      </div>
      </div>
    </>
  );
};

export default VaccineHistoryPage;
