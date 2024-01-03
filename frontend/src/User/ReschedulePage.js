import React, { useState, useEffect } from "react";
import Navbar from "./UserNavBar";
import axios from "../Common/Axios";

const ReschedulePage = () => {
  const [ongoingSlot, setOngoingSlot] = useState({
    slotId: null,
    vaccineName: "",
    name: "",
    email: "",
    date: "",
    time: "",
    familyMembers: [],
  });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    getOngoingSlot();
  }, []);

  const getOngoingSlot = () => {
    axios
      .get("http://localhost:9002/slot/ongoing")
      .then((res) => {
        const { _id, vaccineName, name, email, date, time, familyMembers } =
          res.data;
        setOngoingSlot({
          slotId: _id,
          vaccineName,
          name,
          email,
          date,
          time,
          familyMembers,
        });
      })
      .catch((error) => {
        console.log("Error occurred while fetching the slot", error);
        setOngoingSlot(null);
      });
  };

  const handleChange = (e) => {
    setOngoingSlot({ ...ongoingSlot, [e.target.name]: e.target.value });
  };

  const handleReschedule = (event) => {
    event.preventDefault();
    axios
      .put(`http://localhost:9002/slot/reschedule/${ongoingSlot.slotId}`, {
        date: ongoingSlot.date,
        time: ongoingSlot.time,
      })
      .then((response) => {
          console.error("Rescheduled the slot successfully");
          setOngoingSlot(null);
          setSubmitted(true);
        })
  .catch((error) => {
    console.error("Error occurred while rescheduling the slot", error);
    setOngoingSlot(null);
  });
  };

return (
  <>
    <Navbar />
    <div
      style={{
        padding: '20px',
        backgroundImage: 'url("../userbg1.jpg")',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',  // Add this line to prevent repetition
        height: '100vh',
        overflow: 'hidden',

      }}
    >
      <div className="containerStyle">
        <h2 className="titleStyle">
          <strong>Reschedule Vaccine Slot</strong>
        </h2>
        {(() => {
          if (submitted) {
            return (
              <div>
                <p>
                  <center><strong>
                    Your vaccine slot has been rescheduled successfully!
                  </strong></center>
                </p>
              </div>
            );
          } else if (ongoingSlot === null) {
            return (
              <div>
                <p>
                  <center><strong>No ongoing slot. Please book a slot if needed!</strong></center>
                </p>
              </div>
            );
          } else {
            return (
              <div>
                <div>
                  <label htmlFor="vaccineName" style={{ display: 'inline-block', marginRight: '10px' }}>
                    Vaccine Name:
                  </label>
                  <input
                    id="vaccineName"
                    name="vaccineName"
                    type="text"
                    value={ongoingSlot.vaccineName}
                    readOnly
                    style={{ display: 'inline-block', width: '75%' }}
                  />
                </div>

                <div>
                  <label htmlFor="name" style={{ display: 'inline-block', marginRight: '10px' }}>
                    Name:
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    value={ongoingSlot.name}
                    readOnly
                    style={{ display: 'inline-block', width: '75%', marginLeft: '58px' }}
                  />
                </div>

                <div>
                  <label htmlFor="email" style={{ display: 'inline-block', marginRight: '10px' }}>
                    Email:
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="text"
                    value={ongoingSlot.email}
                    readOnly
                    style={{ display: 'inline-block', width: '75%', marginLeft: '62px' }}
                  />
                </div>

                <div>
                  <label htmlFor="date" style={{ display: 'inline-block', marginRight: '10px' }}>
                    Date:
                  </label>
                  <input
                    id="date"
                    name="date"
                    type="date"
                    value={ongoingSlot.date}
                    onChange={(e) => handleChange(e)}
                    style={{ display: 'inline-block', width: '75%', marginLeft: '66px' }}
                  />
                </div>

                <div>
                  <label htmlFor="time" style={{ display: 'inline-block', marginRight: '10px' }}>
                    Time:
                  </label>
                  <input
                    id="time"
                    name="time"
                    type="time"
                    value={ongoingSlot.time}
                    onChange={(e) => handleChange(e)}
                    style={{ display: 'inline-block', width: '75%', marginLeft: '65px' }}
                  />
                </div>


                <div>
                  <label htmlFor="familyMembers" style={{ textAlign: 'center', display: 'block', margin: '10px', fontWeight: 'bold' }}>
                    Family Members:
                  </label>
                  {ongoingSlot.familyMembers.length === 0 ? (
                    <span id="familyMembers">None</span>
                  ) : (
                    ongoingSlot.familyMembers.map((familyMember, memberIndex) => (
      <div key={memberIndex} style={{ marginBottom: '10px' }}>
        <label htmlFor={`familyMemberName${memberIndex + 1}`} style={{ display: 'inline-block', width: '80px', marginRight: '10px' }}>
          Name:
        </label>
        <input
          type="text"
          id={`familyMemberName${memberIndex + 1}`}
                  name={`familyMemberName${memberIndex + 1}`}
                  value={familyMember.name}
                  readOnly
                  style={{ display: 'inline-block', width: '150px' }}
        />

                  <label htmlFor={`familyMemberAge${memberIndex + 1}`} style={{ display: 'inline-block', width: '40px', marginLeft: '20px', marginRight: '10px' }}>
                  Age:
                </label>
                <input
                  type="number"
                  id={`familyMemberAge${memberIndex + 1}`}
                name={`familyMemberAge${memberIndex + 1}`}
                value={familyMember.age}
                readOnly
                style={{ display: 'inline-block', width: '60px' }}
        />

                {memberIndex < ongoingSlot.familyMembers.length - 1 && <hr />}
              </div>
            ))
  )}
      </div>

      <div className="buttonContainer">
        <button
          type="submit"
          className="buttonStyle"
          onClick={handleReschedule}
        >
          <strong>Reschedule Slot</strong>
        </button>
      </div>



    </div>
    );
          }
        })()}
  </div >
      </div >
    </>
    
  );
};

export default ReschedulePage;