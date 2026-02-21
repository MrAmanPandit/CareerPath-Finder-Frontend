import React from 'react';
import './login.css';
import { Link } from 'react-router-dom';

const Login = () => {
  return (
    <div className="loginWrapper">
      <div className="loginCard">
        <h2 className="loginTitle">Login</h2>
        
        <form className="loginForm">
          <div className="inputGroup">
            <label className="inputLabel">Email</label>
            <input 
              type="email" 
              placeholder="Enter email" 
              className="inputField" 
              required 
            />
          </div>
          
          <div className="inputGroup">
            <label className="inputLabel">Password</label>
            <input 
              type="password" 
              placeholder="Enter password" 
              className="inputField" 
              required 
            />
          </div>
          
          <button type="submit" className="loginButton">Login</button>
        </form>
        
        <p className="signupText">
          Don't have an account? <Link to="/signup" className="signupLink">Sign Up</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;