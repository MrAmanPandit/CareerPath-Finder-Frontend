import React from 'react';
import './signup.css';
import { Link } from 'react-router-dom';

const Signup = () => {
  return (
    <div className="signupWrapper">
      <div className="signupCard">
        <h2 className="signupTitle">Create Account</h2>
        <p className="signupSubtitle">Join CareerPath Finder and discover your future.</p>
        
        <form className="signupForm">
          <div className="inputGroup">
            <label className="inputLabel">Full Name</label>
            <input type="text" placeholder="Enter your full name" className="inputField" required />
          </div>

          <div className="inputGroup">
            <label className="inputLabel">Email</label>
            <input type="email" placeholder="Enter your email" className="inputField" required />
          </div>

          <div className="inputGroup">
            <label className="inputLabel">Phone Number</label>
            <input type="tel" placeholder="Enter your phone number" className="inputField" required />
          </div>

          {/* Side-by-side inputs for Grade and Stream */}
          <div className="inputRow">
            <div className="inputGroup">
              <label className="inputLabel">Grade / Class</label>
              <input type="text" placeholder="e.g., 11th, 12th, College" className="inputField" required />
            </div>
            
            <div className="inputGroup">
              <label className="inputLabel">Stream</label>
              <select className="inputField selectField" required defaultValue="">
                <option value="" disabled>Select a Stream</option>
                <option value="science">Science</option>
                <option value="commerce">Commerce</option>
                <option value="arts">Arts</option>
                <option value="undecided">Undecided</option>
              </select>
            </div>
          </div>

          <div className="inputGroup">
            <label className="inputLabel">Dream (Future Job)</label>
            <input type="text" placeholder="e.g., Software Engineer, Doctor" className="inputField" required />
          </div>

          {/* Side-by-side inputs for Passwords */}
          <div className="inputRow">
            <div className="inputGroup">
              <label className="inputLabel">Password</label>
              <input type="password" placeholder="Create password" className="inputField" required />
            </div>
            
            <div className="inputGroup">
              <label className="inputLabel">Confirm Password</label>
              <input type="password" placeholder="Confirm password" className="inputField" required />
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