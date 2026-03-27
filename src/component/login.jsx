import React from 'react';
import './login.css';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import AnimatedPage from './animation';
import { showSuccessAlert, showErrorAlert } from '../utils/customAlert';

const Login = () => {

  const navigate = useNavigate();

  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCredentials(prevCredentials => ({
      ...prevCredentials,
      [name]: value
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault(); 

    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/v1/users/login/`, credentials, {
          withCredentials: true
      });
      
      const token = response.data?.message?.accessToken || response.data?.accessToken;

      if (token) {
          localStorage.setItem("accessToken", token);
          localStorage.setItem("isLoggedIn", "true");
          
          console.log("Login successful:");
          await showSuccessAlert("Logged in successfully!");
          window.location.href = '/'; 
      } else {
          console.error("Login failed: No access token received");
          showErrorAlert("Login failed: No access token received");
      }
      
    } catch (error) {
      const errorMsg = error.response?.data?.message || error.message;
      console.error("Error logging in:", errorMsg);
      showErrorAlert(`Error logging in: ${errorMsg}`);
    }
  };

  // Keep your existing return ( ... ) statement exactly as it is below this line!

  return (
    <AnimatedPage>
    <div className="loginWrapper">
      <div className="loginCard">
        <h2 className="loginTitle">Login</h2>

        <form className="loginForm" onSubmit={handleLogin}>
          <div className="inputGroup">
            <label className="inputLabel">Email</label>
            <input
              type="email"
              placeholder="Enter email"
              className="inputField"
              name="email"
              value={credentials.email}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="inputGroup">
            <label className="inputLabel">Password</label>
            <input
              type="password"
              placeholder="Enter password"
              className="inputField"
              name="password"
              value={credentials.password}
              onChange={handleInputChange}
              required
            />
          </div>

          <button type="submit" className="loginButton" >Login</button>
        </form>

        <p className="signupText">
          Don't have an account? <Link to="/signup" className="signupLink">Sign Up</Link>
        </p>
      </div>
    </div>
    </AnimatedPage>
  );
};


export default Login