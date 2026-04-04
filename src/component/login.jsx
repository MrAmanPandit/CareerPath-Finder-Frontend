import React, { useState } from 'react';
import './login.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import AnimatedPage from './animation';
import { showSuccessAlert, showErrorAlert } from '../utils/customAlert';
import { ArrowLeft, KeyRound, Mail, Lock } from 'lucide-react';

const Login = () => {
  const navigate = useNavigate();

  // Mode: 0=Login, 1=Forgot(Req Email), 2=Forgot(Req OTP), 3=Forgot(Req New Pwd)
  const [resetStep, setResetStep] = useState(0);

  // Mode: 0=Inactive, 1=Verify Unauthenticated Flow
  const [verifyStep, setVerifyStep] = useState(0);
  const [verifyOtp, setVerifyOtp] = useState('');

  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  });

  // Dedicated States for Reset Flow
  const [resetEmail, setResetEmail] = useState('');
  const [resetOtp, setResetOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCredentials(prev => ({ ...prev, [name]: value }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/v1/users/login`, credentials, {
        withCredentials: true
      });

      const token = response.data?.data?.accessToken || response.data?.message?.accessToken || response.data?.accessToken;
      const user = response.data?.data?.user;

      if (token) {
        localStorage.setItem("accessToken", token);
        if (user) localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("isLoggedIn", "true");

        await showSuccessAlert("Logged in successfully!");
        window.location.href = '/';
      } else {
        showErrorAlert("Login failed: No access token received");
      }
    } catch (error) {
      if (error.response?.status === 403) {
        // If unverified, auto-trigger the verify OTP and switch state
        handleSendVerifyOTP(e);
        return;
      }
      const errorMsg = error.response?.data?.message || error.message;
      showErrorAlert(`Error logging in: ${errorMsg}`);
    }
  };

  const handleSendVerifyOTP = async (e) => {
    if (e) e.preventDefault();
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/api/v1/users/send-verification-otp`, { email: credentials.email });
      showSuccessAlert("Verification OTP sent! Please check your email inbox.");
      setVerifyStep(1);
    } catch (error) {
      const errorMsg = error.response?.data?.message || error.message;
      showErrorAlert(errorMsg);
    }
  };

  const handleVerifyEmailUnauth = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/api/v1/users/verify-email-otp`, {
        email: credentials.email,
        otp: verifyOtp
      });
      showSuccessAlert("Account verified successfully! Logging you in...");
      setVerifyStep(0);
      setVerifyOtp('');
      await handleLogin(e); // Recursively log them in automatically!
    } catch (error) {
      const errorMsg = error.response?.data?.message || error.message;
      showErrorAlert(errorMsg);
    }
  };

  const handleSendResetOTP = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/api/v1/users/forgot-password-otp`, { email: resetEmail });
      showSuccessAlert("OTP sent! Please check your email inbox (or terminal).");
      setResetStep(2);
    } catch (error) {
      const errorMsg = error.response?.data?.message || error.message;
      showErrorAlert(errorMsg);
    }
  };

  // We transition from step 2 to 3 immediately after verifying OTP visually, or just submit it together with the new password.
  // Wait, in our backend API `/reset-password`, we need Email, OTP, and NewPassword simultaneously!
  // So Step 2 gets the OTP, and Step 3 sets the PWD, then we submit them together!
  const proceedToNewPassword = (e) => {
    e.preventDefault();
    if (resetOtp.length < 6) return showErrorAlert("Please enter a valid 6-digit OTP.");
    setResetStep(3);
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmNewPassword) return showErrorAlert("Passwords do not match!");

    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/api/v1/users/reset-password`, {
        email: resetEmail,
        otp: resetOtp,
        newPassword: newPassword
      });

      showSuccessAlert("Password Reset Successfully! You can now log in.");

      // Clean up and go back to login screen
      setResetStep(0);
      setResetEmail('');
      setResetOtp('');
      setNewPassword('');
      setConfirmNewPassword('');
      setCredentials({ email: resetEmail, password: '' });

    } catch (error) {
      const errorMsg = error.response?.data?.message || error.message;
      showErrorAlert(errorMsg);
    }
  }

  return (
    <AnimatedPage>
      <div className="loginWrapper">
        <div className="loginCard">

          {/* DEFAULT LOGIN SCREEN */}
          {resetStep === 0 && verifyStep === 0 && (
            <>
              <h2 className="loginTitle">Login</h2>
              <form className="loginForm" onSubmit={handleLogin}>
                <div className="inputGroup">
                  <label className="inputLabel">Email</label>
                  <input type="email" placeholder="Enter email" className="inputField" name="email" value={credentials.email} onChange={handleInputChange} required />
                </div>
                <div className="inputGroup">
                  <label className="inputLabel">
                    Password
                    <button type="button" className="forgot-pwd-link" onClick={() => setResetStep(1)}>Forgot Password?</button>
                  </label>
                  <input type="password" placeholder="Enter password" className="inputField" name="password" value={credentials.password} onChange={handleInputChange} required />
                </div>
                <button type="submit" className="loginButton" >Login</button>
              </form>
              <p className="signupText">
                Don't have an account? <Link to="/signup" className="signupLink">Sign Up</Link>
              </p>
            </>
          )}

          {/* FORGOT PWD: STEP 1 - REQUEST EMAIL */}
          {resetStep === 1 && (
            <div className="reset-flow-ui">
              <button className="back-btn" onClick={() => setResetStep(0)}><ArrowLeft size={20} /></button>
              <h2 className="loginTitle"><KeyRound className="title-icon" /> Reset Password</h2>
              <p className="reset-instruction">Enter your registered email address and we'll send you an OTP.</p>

              <form className="loginForm" onSubmit={handleSendResetOTP}>
                <div className="inputGroup">
                  <label className="inputLabel">Registered Email Address</label>
                  <input type="email" placeholder="hello@example.com" className="inputField" value={resetEmail} onChange={(e) => setResetEmail(e.target.value)} required />
                </div>
                <button type="submit" className="loginButton">Send OTP</button>
              </form>
            </div>
          )}

          {/* FORGOT PWD: STEP 2 - ENTER OTP */}
          {resetStep === 2 && (
            <div className="reset-flow-ui">
              <button className="back-btn" onClick={() => setResetStep(1)}><ArrowLeft size={20} /></button>
              <h2 className="loginTitle"><Mail className="title-icon" /> Verify Email</h2>
              <p className="reset-instruction">Enter the 6-digit code sent to <strong style={{ color: "#4ecdc4" }}>{resetEmail}</strong></p>

              <form className="loginForm" onSubmit={proceedToNewPassword}>
                <div className="inputGroup">
                  <input type="text" maxLength="6" placeholder="000000" className="inputField otp-style" value={resetOtp} onChange={(e) => setResetOtp(e.target.value.replace(/\D/g, ''))} required />
                </div>
                <button type="submit" className="loginButton verify-colors">Verify Code</button>
              </form>
              <button type="button" className="resend-inline-btn" onClick={handleSendResetOTP}>Resend Code</button>
            </div>
          )}

          {/* FORGOT PWD: STEP 3 - NEW PASSWORD */}
          {resetStep === 3 && (
            <div className="reset-flow-ui">
              <button className="back-btn" onClick={() => setResetStep(2)}><ArrowLeft size={20} /></button>
              <h2 className="loginTitle"><Lock className="title-icon" /> Secure Account</h2>
              <p className="reset-instruction">Create a strong new password for your account.</p>

              <form className="loginForm" onSubmit={handleResetPassword}>
                <div className="inputGroup">
                  <label className="inputLabel">New Password</label>
                  <input type="password" placeholder="Create new password" className="inputField" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required />
                </div>
                <div className="inputGroup">
                  <label className="inputLabel">Confirm New Password</label>
                  <input type="password" placeholder="Confirm your password" className="inputField" value={confirmNewPassword} onChange={(e) => setConfirmNewPassword(e.target.value)} required />
                </div>
                <button type="submit" className="loginButton update-colors">Update Password & Login</button>
              </form>
            </div>
          )}

          {/* UNVERIFIED EMAIL: STEP 1 - ENTER OTP */}
          {verifyStep === 1 && (
            <div className="reset-flow-ui">
              <button className="back-btn" onClick={() => setVerifyStep(0)}><ArrowLeft size={20} /></button>
              <h2 className="loginTitle"><Mail className="title-icon" /> Verify Account</h2>
              <p className="reset-instruction">Please verify your email to log in. Enter the 6-digit code sent to <strong style={{ color: "#4ecdc4" }}>{credentials.email}</strong></p>

              <form className="loginForm" onSubmit={handleVerifyEmailUnauth}>
                <div className="inputGroup">
                  <input type="text" maxLength="6" placeholder="000000" className="inputField otp-style" value={verifyOtp} onChange={(e) => setVerifyOtp(e.target.value.replace(/\D/g, ''))} required />
                </div>
                <button type="submit" className="loginButton verify-colors">Verify & Login</button>
              </form>
              <button type="button" className="resend-inline-btn" onClick={handleSendVerifyOTP}>Resend Verification Code</button>
            </div>
          )}

        </div>
      </div>
    </AnimatedPage>
  );
};

export default Login;