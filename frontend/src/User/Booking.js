import React, { useState, useEffect } from "react";
import NavBar from "./UserNavBar";
import axios from "../Common/Axios";
import { getCurrentDate, getCurrentTime } from "../Common/CommonUtils";
import Select from "react-select";
import './BookingPage.css'

const Booking = () => {
  const [formData, setFormData] = useState({
    vaccineName: "",
    date: "",
    time: "",
    familyMembers: [],
  });

  const [vaccinationPlace, setVaccinationPlace] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});
  const [availableVaccines, setAvailableVaccines] = useState(null);
  const [allowSlotBooking, setAllowSlotBooking] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:9002/vaccine/vaccine-posted")
      .then((res) => {
        const vaccineMap = res.data.reduce((map, vaccine) => {
          map.set(vaccine.name, vaccine.placesOfVaccination);
          return map;
        }, new Map());

        setAvailableVaccines(vaccineMap);
      })
      .catch((error) => console.error("Error fetching vaccines:", error));

    axios
      .get("http://localhost:9002/slot/ongoing")
      .then((res) => setAllowSlotBooking(false))
      .catch((error) => setAllowSlotBooking(true));
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleVaccineChange = (selectedOption) => {
    setVaccinationPlace(selectedOption);
  };

  const handleFamilyMemberChange = (id, field, value) => {
    const updatedFamilyMembers = formData.familyMembers.map((member) =>
      member.id === id ? { ...member, [field]: value } : member
    );
    setFormData({
      ...formData,
      familyMembers: updatedFamilyMembers,
    });
  };

  const handleAddFamilyMember = () => {
    const newFamilyMember = {
      id: formData.familyMembers.length + 1,
      name: "",
      age: "",
    };

    setFormData({
      ...formData,
      familyMembers: [...formData.familyMembers, newFamilyMember],
    });
  };

  const handleDeleteFamilyMember = (id) => {
    const updatedFamilyMembers = formData.familyMembers.filter(
      (member) => member.id !== id
    );
    setFormData({
      ...formData,
      familyMembers: updatedFamilyMembers,
    });
  };

  const validateFormData = () => {
    const errors = {};

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!validateFormData()) {
      return;
    }


    const familyMembersData = formData.familyMembers.map((member) => ({
      name: member.name,
      age: member.age,
    }));


    const slotData = {
      vaccineName: formData.vaccineName,
      placesOfVaccination: vaccinationPlace.value,
      date: formData.date,
      time: formData.time,
      familyMembers: familyMembersData,
    };


    await axios
      .post("http://localhost:9002/slot/book-slot", slotData)
      .then((res) => {
        console.log("Slot booked successfully");
        setFormData({
          vaccineName: "",
          date: "",
          time: "",
          familyMembers: [],
        });
        setSubmitted(true);
      })
      .catch((error) => {
        console.error("Error booking slot:", error);
      });
  };

  return (
    <>
      <NavBar />
      <body>
      <div
      style={{
        padding: '20px',
        backgroundImage: 'url("../userbg1.jpg")', 
        backgroundSize: 'cover', 
        height: '180vh',
      }}
    >
      <div className="containerStyle">
        <h2 className="titleStyle">
          <strong>Book Vaccine Slot </strong>
        </h2>
        {(() => {
          if (!availableVaccines || availableVaccines.size === 0) {
            return (
              <div>
                <p>
                  <strong>No vaccines available at the moment!</strong>
                </p>
              </div>
            );
          } else if (!allowSlotBooking) {
            return (
              <div>
                <p>
                  <center><strong>
                    There is already ongoing slot, Please check the reschedule
                    page if you want reschedule it!
                  </strong></center>
                </p>
              </div>
            );
          } else if (submitted) {
            return (
              <div className="thankYouMessage">
                <p>
                  <strong>Thank you for booking your vaccine slots!</strong>
                </p>
              </div>
            );
          } else {
            return (
              <form className="formStyle" onSubmit={handleSubmit}>
                <label className="labelStyle" htmlFor="vaccineName">
                  <strong>Select Vaccine</strong>
                </label>
                <select
                  className="form-select"
                  id="vaccineName"
                  name="vaccineName"
                  value={formData.vaccineName}
                  onChange={handleChange}
                  required
                >
                  <option value="" disabled>
                    Select Vaccine
                  </option>
                  {Array.from(availableVaccines.keys()).map(
                    (vaccine, index) => (
                      <option key={index} value={vaccine}>
                        {vaccine}
                      </option>
                    )
                  )}
                </select>
                {validationErrors.vaccineName && (
                  <p className="errorStyle">{validationErrors.vaccineName}</p>
                )}
                {formData.vaccineName !== "" && (
                  <Select
                    value={vaccinationPlace}
                    onChange={handleVaccineChange}
                    options={availableVaccines
                      .get(formData.vaccineName)
                      .map((city) => ({ label: city, value: city }))}
                    isSearchable
                    placeholder="Select a city"
                  />
                )}

                <label className="labelStyle" htmlFor="date">
                  <strong>Date</strong>
                </label>
                <input
                  type="date"
                  id="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  min={getCurrentDate()}
                  required
                />
                {validationErrors.date && (
                  <p className="errorStyle">{validationErrors.date}</p>
                )}

                <label className="labelStyle" htmlFor="time">
                  <strong>Time</strong>
                </label>
                <input
                  type="time"
                  id="time"
                  name="time"
                  value={formData.time}
                  onChange={handleChange}
                  min={getCurrentTime()}
                  required
                />
                {validationErrors.time && (
                  <p className="errorStyle">{validationErrors.time}</p>
                )}

                <div className="familyMembersContainer">
                  {formData.familyMembers.map((member, index) => (
                    <div key={member.id} className="familyMember">
                      <label htmlFor={`familyMemberName${index + 1}`}>
                        Name
                      </label>
                      <input
                        type="text"
                        id={`familyMemberName${index + 1}`}
                        name={`familyMemberName${index + 1}`}
                        value={member.name}
                        onChange={(e) =>
                          handleFamilyMemberChange(
                            member.id,
                            "name",
                            e.target.value
                          )
                        }
                      />
                      {validationErrors.familyMembers &&
                        validationErrors.familyMembers[index] &&
                        validationErrors.familyMembers[index].name && (
                          <p className="errorStyle">
                            {validationErrors.familyMembers[index].name}
                          </p>
                        )}

                      <label htmlFor={`familyMemberAge${index + 1}`}>Age</label>
                      <input
                        type="number"
                        id={`familyMemberAge${index + 1}`}
                        name={`familyMemberAge${index + 1}`}
                        value={member.age}
                        onChange={(e) =>
                          handleFamilyMemberChange(
                            member.id,
                            "age",
                            e.target.value
                          )
                        }
                      />
                      {validationErrors.familyMembers &&
                        validationErrors.familyMembers[index] &&
                        validationErrors.familyMembers[index].age && (
                          <p className="errorStyle">
                            {validationErrors.familyMembers[index].age}
                          </p>
                        )}

                      <button
                        type="button"
                        onClick={() => handleDeleteFamilyMember(member.id)}
                      >
                        Delete
                      </button>
                    </div>
                  ))}
                  <br></br><button type="button" onClick={handleAddFamilyMember}>
                    Add Family Member
                  </button>
                  {validationErrors.familyMembers &&
                    validationErrors.familyMembers.map((errors, index) => (
                      <div key={index} className="errorStyle">
                        {errors.name && <p>{errors.name}</p>}
                        {errors.age && <p>{errors.age}</p>}
                      </div>
                    ))}
                </div>

                <div className="buttonContainer">
                  <button type="submit" className="buttonStyle">
                    <strong>Book Slot</strong>
                  </button>
                </div>
              </form>
            );
          }
        })()}
      </div>
      </div>
      </body>
    </>
  );
};

export default Booking;
