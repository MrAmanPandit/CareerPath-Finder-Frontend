import React from 'react';
import './signup.css';
import { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const Signup = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    firstName: '',
    lastName: '',
    email: '',
    mobileNumber: '',
    grade: '',
    stream: '',
    dream: '',
    password: '',
    confirmPassword: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser(prevUser => ({
      ...prevUser,
      [name]: value
    }));
  };

  const handleSignup = async (e) => {
    e.preventDefault(); // Prevents the page from reloading
    
    if (user.password !== user.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      // 1. Send a POST request to your backend URL
      const response = await axios.post('${import.meta.env.VITE_API_URL}/api/v1/users/signup',{
           firstName: user.firstName,
           lastName: user.lastName,
           email: user.email,
           password: user.password,
           grade: user.grade,
           stream: user.stream,
           dream: user.dream,
           mobileNumber: user.mobileNumber
        }
      );

      // 2. Handle the successful response!
      console.log("Success!", response.data);
      alert("User registered successfully!");
     
      navigate('/'); // Redirect to home page after successful signup
    } catch (error) {
      // 3. Catch any 400 or 409 errors sent by your backend
      console.error("Error signing up:", error.response?.data?.message || error.message);
    }
  };
  return (
    <div className="signupWrapper">
      <div className="signupCard">
        <h2 className="signupTitle">Create Account</h2>
        <p className="signupSubtitle">Join CareerPath Finder and discover your future.</p>
        
        <form className="signupForm" onSubmit={handleSignup}>
          <div className="inputGroup">
            <label className="inputLabel" htmlFor="firstName">First Name</label>
            <input 
            type="text" 
            placeholder="Enter your first name" 
            className="inputField"
            value={user.firstName}
            onChange={handleInputChange}
            name="firstName"
            required />
          </div>
          
          <div className="inputGroup">
            <label className="inputLabel" htmlFor="lastName">Last Name</label>
            <input 
            type="text" 
            placeholder="Enter your last name" 
            className="inputField"
            value={user.lastName}
            onChange={handleInputChange}
            name="lastName"
            required />
          </div>

          <div className="inputGroup">
            <label className="inputLabel" htmlFor="email">Email</label>
            <input 
            type="email" 
            placeholder="Enter your email" 
            className="inputField"
            value={user.email}
            onChange={handleInputChange}
            name="email"
            required />
          </div>

          <div className="inputGroup">
            <label className="inputLabel" htmlFor="mobileNumber">Phone Number</label>
            <input 
            type="tel" 
            placeholder="Enter your phone number" 
            className="inputField"
            value={user.mobileNumber}
            onChange={handleInputChange}
            name="mobileNumber"
            required />
          </div>

          {/* Side-by-side inputs for Grade and Stream */}
          <div className="inputRow">
            <div className="inputGroup">
              <label className="inputLabel" htmlFor="grade">Grade / Class</label>
              <input 
              type="text" 
              placeholder="e.g., 11th, 12th, College" 
              className="inputField"
              value={user.grade}
              onChange={handleInputChange}
              name="grade"
              required />
            </div>
    
            <div className="inputGroup">
              <label className="inputLabel" htmlFor="stream">Stream</label>
              <input 
              type="text" 
              placeholder="e.g., Science, Commerce, Arts" 
              className="inputField"
              value={user.stream}
              onChange={handleInputChange}
              name="stream"
              required />
            </div>
            
          </div>

          <div className="inputGroup">
            <label className="inputLabel" htmlFor="dream">Dream (Future Job)</label>
            <input 
            type="text" 
            placeholder="e.g., Software Engineer, Doctor" 
            className="inputField"
            value={user.dream}
            onChange={handleInputChange}
            name="dream"
            required />
          </div>

          {/* Side-by-side inputs for Passwords */}
          <div className="inputRow">
            <div className="inputGroup">
              <label className="inputLabel" htmlFor="password">Password</label>
              <input 
              type="password" 
              placeholder="Create password" 
              className="inputField"
              value={user.password}
              onChange={handleInputChange}
              name="password"
              required />
            </div>
            
            <div className="inputGroup">
              <label className="inputLabel" htmlFor="confirmPassword">Confirm Password</label>
              <input 
              type="password" 
              placeholder="Confirm password" 
              className="inputField"
              value={user.confirmPassword}
              onChange={handleInputChange}
              name="confirmPassword"
              required />
            </div>
          </div>
          
          <button type="submit" className="signupButton">Sign Up</button>
        </form>
        
        <p className="loginText">
          Already have an account? <Link to="/login" className="loginLink">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;