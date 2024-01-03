import React, { useState, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "./Axios";
import CommonNavbar from "./CommonNavbar";
import ReCAPTCHA from "react-google-recaptcha";
import { useUser } from "./UserContext";
import "./Style.css";

const LoginPage = () => {
  const { setLoginUser } = useUser();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const [captchaValue, setCaptchaValue] = useState("");
  const captchaRef = useRef(null);
  const [validationErrors, setValidationErrors] = useState({
    email: "",
    password: "",
    captcha: "",
  });
  const [loginError, setLoginError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

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
    setLoginError("");
  };

  const handleCaptchaChange = (value) => {
    console.log(value);
    setCaptchaValue(value);
    setValidationErrors({
      ...validationErrors,
      captcha: "",
    });
  };

  const handleReloadCaptcha = () => {
    if (captchaRef.current) {
      captchaRef.current.reset();
      setCaptchaValue(null);
    }
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

    if (captchaValue === "") {
      newValidationErrors.captcha = "Please complete the reCAPTCHA";
      isValid = false;
    }

    setValidationErrors(newValidationErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateFields()) {
      setLoading(true);
      const { email, password } = user;
      axios
        .post("http://localhost:9002/login", {
          email,
          password,
          captcha: captchaValue,
        })
        .then((res) => {
          console.log(res.data);
          setLoginUser(res.data.user);
          // Save the email in local storage
          localStorage.setItem("userEmail", email);

          if (res.data.user.role === "ADMIN") {
            navigate("/admin-dashboard");
          } else {
            navigate("/UserHome");
          }
        })
        .catch((error) => {
          console.error("Login error:", error);
          handleReloadCaptcha();
          if (error.response && error.response.status === 401) {
            setLoginError(error.response.data.message);
          } else {
            setLoginError("An error occurred during login");
          }
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };

  return (
    <>
      <CommonNavbar />
      <div
        style={{
          textAlign: "center",
          padding: "20px",
          backgroundImage: 'url("../homepageimg.webp")',
          backgroundSize: "cover",
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <form className="login-container" onSubmit={handleSubmit}>
          <center>
            <h1>Login</h1>
          </center>
          <br />
          <br />
          <input
            type="text"
            name="email"
            placeholder="Email"
            value={user.email}
            onChange={handleChange}
          />
          <div className="error-message">{validationErrors.email}</div>
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={user.password}
            onChange={handleChange}
          />
          <div className="error-message">{validationErrors.password}</div>

          <ReCAPTCHA
            ref={captchaRef}
            sitekey="6LdaQTopAAAAAOj4-IIH_lA7xJS0a1ONM__LdsAT"
            onChange={handleCaptchaChange}
          />
          <div className="error-message">{validationErrors.captcha}</div>

          {loginError && (
            <div className="login-error-message-below">{loginError}</div>
          )}

          <button type="submit" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
          <br></br>
          <br></br>
          <p>
            Don't Have an account?
            <Link
              to="/RegisterPage"
              style={{ textDecoration: "none", color: "blue" }}
            >
              &nbsp; &nbsp; <u>Register</u>
            </Link>
          </p>
          <p>
            Forgot Password?
            <Link
              to="/userresetpass"
              style={{ textDecoration: "none", color: "blue" }}
            >
              &nbsp; &nbsp; <u>click here</u>
            </Link>
          </p>
        </form>
      </div>
    </>
  );
};

export default LoginPage;