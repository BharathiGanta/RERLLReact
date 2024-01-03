import React, { useState, useEffect } from "react";
import axios from "./Axios";
import { useNavigate, Link } from 'react-router-dom';
import { Button } from "@mui/material";
import CommonNavbar from "../Common/CommonNavbar";
const allSecurityQuestions = [
  "What was the name of your elementary school?",
  "In which city were you born?",
  "What is the name of your first pet?",
  "What is your favorite movie?",
  "Who is your favorite teacher?"
];

const RegisterPage = () => {
  const history = useNavigate();

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    reEnterPassword: "",
    securityQuestion1: "",
    securityAnswer1: "",
    securityQuestion2: "",
    securityAnswer2: ""
  });

  const [validationErrors, setValidationErrors] = useState({
    name: "",
    email: "",
    password: "",
    reEnterPassword: "",
    securityAnswer1: "",
    securityAnswer2: ""
  });

  const [error, setError] = useState(null);

  useEffect(() => {
    const [securityQuestion1, securityQuestion2] = getRandomQuestions();
    setUser((prevUser) => ({
      ...prevUser,
      securityQuestion1,
      securityQuestion2
    }));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value
    }));

    setValidationErrors((prevErrors) => ({
      ...prevErrors,
      [name]: ""
    }));

    if (name === 'email') {
      setError(null);
    }
  };

  const validateFields = () => {
    let isValid = true;
    const newValidationErrors = {};


    Object.keys(user).forEach((key) => {
      if (!user[key]) {
        newValidationErrors[key] = `${key.charAt(0).toUpperCase() + key.slice(1)} is required`;
        isValid = false;
      }
    });


    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (user.email && !emailRegex.test(user.email)) {
      newValidationErrors.email = "Invalid email format";
      isValid = false;
    }

    if (user.password.length < 6) {
      newValidationErrors.password = "Password must be at least 6 characters long";
      isValid = false;
    }


    if (user.password !== user.reEnterPassword) {
      newValidationErrors.reEnterPassword = "Passwords do not match";
      isValid = false;
    }

    setValidationErrors(newValidationErrors);
    return isValid;
  };

  const getRandomQuestions = () => {
    const shuffledQuestions = allSecurityQuestions.sort(() => 0.5 - Math.random());
    return shuffledQuestions.slice(0, 2);
  };

  const register = () => {
    if (validateFields()) {
      axios.post("http://localhost:9002/register", user)
        .then((res) => {
          alert(res.data.message);
          if (history && history.push) {
            history("/login");
          }
          setError(null);
        })
        .catch((error) => {
          if (error.response && error.response.status === 400 && error.response.data && error.response.data.message === "User already registered") {
            setError(<p style={{ textAlign:'center',color:'red'}}>User with this email already exists</p>);

          } else {
            setError("An error occurred during registration.");
          }

        });

    }
  };
  return (
    <>
    <CommonNavbar/>
    <div
      style={{
        textAlign: 'center',
        padding: '20px',
        backgroundImage: 'url("../homepageimg.webp")', 
        backgroundSize: 'cover', 
        height: '100vh', 
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
    <div className="register-container">
      <h1 style={{ textAlign: 'center' }}>Register</h1> <br></br>
      {renderInput("name", "Your Name")}
      {renderInput("email", "Your Email")}
      {renderInput("password", "Your Password", "password")}
      {renderInput("reEnterPassword", "Re-enter Password", "password")}
      {renderSelect("securityQuestion1", "Security Question 1", user.securityQuestion1)}
      {renderInput("securityAnswer1", "Your Answer")}
      {renderSelect("securityQuestion2", "Security Question 2", user.securityQuestion2)}
      {renderInput("securityAnswer2", "Your Answer")}

      {error && (
        <div className="error-popup">
          <p className="error-message">{error}</p>
        </div>
      )}

      <Button variant="contained" color="success" onClick={register}>Register</Button><br></br><br></br>     
       <p style={{ color: 'black' }}>Already have an account?
       &nbsp; &nbsp; <Link to="/login" style={{ color: 'blue' }}> Login</Link></p>
      

    </div>
    </div>
    </>
  );

function renderInput(name, placeholder, type = "text") {
  return (
    <>
      <input
        type={type}
        name={name}
        value={user[name]}
        placeholder={placeholder}
        onChange={handleChange}
      />
      {validationErrors[name] && <p className="error-message">{validationErrors[name]}</p>}
    </>
  );
}

function renderSelect(name, label, value) {
  return (
    <>
      <label htmlFor={name}>{label}</label>
      <select name={name} value={value} onChange={handleChange} disabled>
        <option value="" disabled>Select {label}</option>
        {allSecurityQuestions.map((question, index) => (
          <option key={index} value={question}>{question}</option>
        ))}
      </select>
    </>
  );
}
};

export default RegisterPage;