import React, { useState } from 'react';
import './signup.css';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import AnimatedPage from './animation';
import { showSuccessAlert, showErrorAlert } from '../utils/customAlert';
import { CheckCircle, Mail, Phone, ArrowRight } from 'lucide-react';

const Signup = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1); // 1 = Signup Form, 2 = OTP Verification

  const [user, setUser] = useState({
    firstName: '',
    lastName: '',
    email: '',
    mobileNumber: '',
    currentStudy: '',
    branch: '',
    dream: '',
    password: '',
    confirmPassword: ''
  });

  // OTP Verification States
  const [emailOTP, setEmailOTP] = useState('');
  const [isEmailVerified, setIsEmailVerified] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser(prevUser => ({
      ...prevUser,
      [name]: value
    }));
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    if (user.password !== user.confirmPassword) {
      showErrorAlert("Passwords do not match!");
      return;
    }

    try {
      // 1. Register User
      await axios.post(`${import.meta.env.VITE_API_URL}/api/v1/users/signup`, {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        password: user.password,
        currentStudy: user.currentStudy,
        branch: user.branch,
        dream: user.dream,
        mobileNumber: user.mobileNumber
      });

      // 2. Automatically Login to get JWT cookies needed for OTP routes
      await axios.post(`${import.meta.env.VITE_API_URL}/api/v1/users/login`,
        { email: user.email, password: user.password },
        { withCredentials: true }
      );

      // 3. Send Initial OTPs
      await sendOTP('email');

      showSuccessAlert("Account created! Please verify your details.");

      // 4. Move to OTP Verification Step
      setStep(2);

    } catch (error) {
      const errorMsg = error.response?.data?.message || error.message;
      showErrorAlert(`Signup failed: ${errorMsg}`);
    }
  };

  const sendOTP = async (type) => {
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/api/v1/otp/send-${type}-otp`, {}, { withCredentials: true });
      showSuccessAlert(`${type === 'email' ? 'Email' : 'Phone'} OTP sent successfully!`);
    } catch (err) {
      const errorMsg = err.response?.data?.message || err.message;
      showErrorAlert(`Failed to send ${type} OTP: ${errorMsg}`);
    }
  };

  const verifyOTP = async (type) => {
    const otpValue = type === 'email' ? emailOTP : phoneOTP;
    if (!otpValue || otpValue.length < 6) {
      showErrorAlert("Please enter a valid 6-digit OTP.");
      return;
    }

    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/api/v1/otp/verify-${type}-otp`,
        { otp: otpValue },
        { withCredentials: true }
      );

      if (type === 'email') setIsEmailVerified(true);

      showSuccessAlert(`${type === 'email' ? 'Email' : 'Phone'} successfully verified!`);
    } catch (error) {
      const errorMsg = error.response?.data?.message || error.message;
      showErrorAlert(errorMsg);
    }
  };

  const completeRegistration = () => {
    // If user clicks finish (even if unverified, it falls back to Option B from plan)
    window.location.href = '/'; // Forces full reload to update UserContext globally
  };

  return (
    <AnimatedPage>
      <div className="signupWrapper">
        <div className="signupCard">

          {step === 1 ? (
            <>
              <h2 className="signupTitle">Create Account</h2>
              <p className="signupSubtitle">Join CareerPath Finder and discover your future.</p>

              <form className="signupForm" onSubmit={handleSignup}>
                <div className="inputGroup">
                  <label className="inputLabel" htmlFor="firstName">First Name</label>
                  <input type="text" placeholder="First name" className="inputField" value={user.firstName} onChange={handleInputChange} name="firstName" required />
                </div>
                <div className="inputGroup">
                  <label className="inputLabel" htmlFor="lastName">Last Name</label>
                  <input type="text" placeholder="Last name" className="inputField" value={user.lastName} onChange={handleInputChange} name="lastName" required />
                </div>
                <div className="inputGroup">
                  <label className="inputLabel" htmlFor="email">Email</label>
                  <input type="email" placeholder="Email address" className="inputField" value={user.email} onChange={handleInputChange} name="email" required />
                </div>
                <div className="inputGroup">
                  <label className="inputLabel" htmlFor="mobileNumber">Phone Number</label>
                  <input type="tel" placeholder="Mobile number" className="inputField" value={user.mobileNumber} onChange={handleInputChange} name="mobileNumber" required />
                </div>

                <div className="inputRow">
                  <div className="inputGroup">
                    <label className="inputLabel" htmlFor="currentStudy">Current Study / Qualification</label>
                    <input type="text" placeholder="e.g., 12th, B.Tech, MCA" className="inputField" value={user.currentStudy} onChange={handleInputChange} name="currentStudy" required />
                  </div>
                  <div className="inputGroup">
                    <label className="inputLabel" htmlFor="branch">Branch / Specialization</label>
                    <input type="text" placeholder="e.g., Science, CS, Finance" className="inputField" value={user.branch} onChange={handleInputChange} name="branch" required />
                  </div>
                </div>

                <div className="inputGroup">
                  <label className="inputLabel" htmlFor="dream">Dream (Future Job)</label>
                  <input type="text" placeholder="e.g., Software Engineer, Doctor" className="inputField" value={user.dream} onChange={handleInputChange} name="dream" required />
                </div>

                <div className="inputRow">
                  <div className="inputGroup">
                    <label className="inputLabel" htmlFor="password">Password</label>
                    <input type="password" placeholder="Create password" className="inputField" value={user.password} onChange={handleInputChange} name="password" required />
                  </div>
                  <div className="inputGroup">
                    <label className="inputLabel" htmlFor="confirmPassword">Confirm Password</label>
                    <input type="password" placeholder="Confirm password" className="inputField" value={user.confirmPassword} onChange={handleInputChange} name="confirmPassword" required />
                  </div>
                </div>

                <button type="submit" className="signupButton">Proceed to Verify</button>
              </form>
              <p className="loginText">
                Already have an account? <Link to="/login" className="loginLink">Login</Link>
              </p>
            </>
          ) : (
            <div className="otp-verification-container">
              <h2 className="signupTitle">Secure Your Account</h2>
              <p className="signupSubtitle">Please enter the 6-digit verification code sent to your email.</p>

              <div className="otp-section-card">
                <div className="otp-section-header">
                  <Mail className="otp-icon-gold" size={24} />
                  <div>
                    <h4>Email Verification</h4>
                    <span>{user.email}</span>
                  </div>
                  {isEmailVerified && <CheckCircle className="verified-check" size={24} />}
                </div>

                {!isEmailVerified ? (
                  <div className="otp-input-area">
                    <input
                      type="text"
                      maxLength="6"
                      placeholder="Enter 6-digit Code"
                      className="inputField otp-box"
                      value={emailOTP}
                      onChange={(e) => setEmailOTP(e.target.value.replace(/\D/g, ''))}
                    />
                    <div className="otp-action-buttons">
                      <button className="otp-btn verify-btn" onClick={() => verifyOTP('email')}>Verify</button>
                      <button className="otp-btn resend-btn" onClick={() => sendOTP('email')}>Resend</button>
                    </div>
                  </div>
                ) : (
                  <div className="success-banner">Email Securely Verified</div>
                )}
              </div>

              <button
                className={`signupButton complete-btn ${isEmailVerified ? 'all-good' : ''}`}
                onClick={completeRegistration}
                disabled={!isEmailVerified}
              >
                {isEmailVerified ? 'Go to Dashboard' : 'Email Verification Required to Continue'}
                <ArrowRight size={18} style={{ marginLeft: '8px' }} />
              </button>
            </div>
          )}

        </div>
      </div>
    </AnimatedPage>
  );
};

export default Signup;