import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import CommonNavbar from "./CommonNavbar";

const ResetPassword = () => {
  const history = useNavigate();

  const [user, setUser] = useState({
    email: "",
    securityAnswer1: "",
    securityAnswer2: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [validationErrors, setValidationErrors] = useState({
    email: "",
    securityAnswer1: "",
    securityAnswer2: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [securityQuestions, setSecurityQuestions] = useState(null);
  const [showPasswordFields, setShowPasswordFields] = useState(false);
  const [securityAnswerError, setSecurityAnswerError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });

    setValidationErrors({
      ...validationErrors,
      [name]: "",
    });
  };

  const checkEmailAndProceed = () => {
    if (!user.email) {
      setValidationErrors({
        ...validationErrors,
        email: "Email is required",
      });
      return;
    }

    axios
      .post("http://localhost:9002/forgot-password-check-email", {
        email: user.email,
      })
      .then((res) => {
        if (res.data.securityQuestions) {
          setSecurityQuestions(res.data.securityQuestions);
        } else {
          setValidationErrors({
            ...validationErrors,
            email: "User not found",
          });
        }
      })
      .catch((error) => {
        console.error("Error checking email:", error);
        setValidationErrors({
          ...validationErrors,
          email: "Error checking email",
        });
      });
  };

  const validateFields = () => {
    let isValid = true;
    const newValidationErrors = {};

    Object.keys(user).forEach((key) => {
      if (!user[key]) {
        newValidationErrors[key] = `${
          key.charAt(0).toUpperCase() + key.slice(1)
        } is required`;
        isValid = false;
      }
    });

    setValidationErrors(newValidationErrors);
    return isValid;
  };

  const resetPassword = () => {
    if (!securityQuestions) {
      checkEmailAndProceed();
    } else {
      axios
        .post("http://localhost:9002/reset-password-check-answers", {
          email: user.email,
          securityAnswer1: user.securityAnswer1,
          securityAnswer2: user.securityAnswer2,
        })
        .then((res) => {
          console.log("Server Response:", res.data);
          setShowPasswordFields(true);

          setSecurityAnswerError("");
        })
        .catch((error) => {
          console.error("Axios error:", error.message);

          setSecurityAnswerError(
            <div style={{ color: "red", textAlign: "center" }}>
              "Incorrect security answers. Please try again."
            </div>
          );
        });
    }
  };

  const submitNewPassword = () => {
    if (validateFields()) {
      axios
        .post("http://localhost:9002/reset-password", user)
        .then((res) => {
          alert(res.data.message);
            history("/login");
        })
        .catch((error) => {
          if (error.response) {
            console.error("Response error:", error.response.data);
            console.error("Response status:", error.response.status);
            console.error("Response headers:", error.response.headers);

            if (error.response.status === 401) {
              setSecurityAnswerError(
                "Incorrect security answers. Please try again."
              );
            }
          } else if (error.request) {
            console.error("Request error:", error.request);
          } else {
            console.error("Axios error:", error.message);
          }
        });
    }
  };

  return (
    <>
    <CommonNavbar />
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
    
    <div className="password-container">
      <h1 style={{ textAlign: "center" }}>Forgot Password</h1> <br></br>
      {!securityQuestions && (
        <>
          <p style={{ color: "black" }}>
            Enter your registered Email to reset your password.
          </p>{" "}
          <br></br>
          <input
            type="text"
            name="email"
            value={user.email}
            onChange={handleChange}
            placeholder="Enter your Email"
          />
          <br></br>
          <br></br>
          <button className="button" onClick={resetPassword}>
            Reset password
          </button>
        </>
      )}
      {securityQuestions && !showPasswordFields && (
        <>
          <p style={{ color: "black", textAlign: "center" }}>
            Answer the security questions to verify your identity.
          </p>{" "}
          <br></br>
          <div>
            <p>{securityQuestions.securityQuestion1}</p>
            <input
              type="text"
              name="securityAnswer1"
              value={user.securityAnswer1}
              onChange={handleChange}
              placeholder="Answer to Security Question 1"
            />
            {validationErrors.securityAnswer1 && (
              <p className="error-message">
                {validationErrors.securityAnswer1}
              </p>
            )}
          </div>
          <div>
            <p>{securityQuestions.securityQuestion2}</p>
            <input
              type="text"
              name="securityAnswer2"
              value={user.securityAnswer2}
              onChange={handleChange}
              placeholder="Answer to Security Question 2"
            />
            {validationErrors.securityAnswer2 && (
              <p className="error-message">
                {validationErrors.securityAnswer2}
              </p>
            )}
          </div>
          <button className="button" onClick={resetPassword}>
            Next
          </button>
        </>
      )}
      {securityQuestions && showPasswordFields && (
        <>
          <div>
            <p>New Password</p>
            <input
              type="password"
              name="newPassword"
              value={user.newPassword}
              onChange={handleChange}
              placeholder="Enter new password"
            />
            {validationErrors.newPassword && (
              <p className="error-message">{validationErrors.newPassword}</p>
            )}
          </div>
          <div>
            <p>Confirm Password</p>
            <input
              type="password"
              name="confirmPassword"
              value={user.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm new password"
            />
            {validationErrors.confirmPassword && (
              <p className="error-message">
                {validationErrors.confirmPassword}
              </p>
            )}
          </div>
          <Button
            variant="contained"
            color="primary"
            onClick={submitNewPassword}
          >
            Submit Password
          </Button>
        </>
      )}
      {validationErrors.email && (
        <p className="error-message">{validationErrors.email}</p>
      )}
      {securityAnswerError && (
        <p className="error-message">{securityAnswerError}</p>
      )}
    </div>
    </div>
    </>
  );
};

export default ResetPassword;