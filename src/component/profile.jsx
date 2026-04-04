import React from 'react';
import { useState } from 'react';
import './profile.css';
import { useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import AnimatedPage from './animation';
import SkeletonLoader from './SkeletonLoader';
import { showSuccessAlert } from '../utils/customAlert';
import StudentDashboard from './StudentDashboard';

const Profile = () => {

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // OTP Verification States
  const [showVerifyModal, setShowVerifyModal] = useState(false);
  const [verifyType, setVerifyType] = useState(null); // 'email' or 'phone'
  const [otp, setOtp] = useState('');

  const handleSendOTP = async (type) => {
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/api/v1/otp/send-${type}-otp`, {}, {
        headers: { Authorization: `Bearer ${localStorage.getItem("accessToken")}` },
        withCredentials: true
      });
      setVerifyType(type);
      setShowVerifyModal(true);
    } catch (err) {
      // Ignore if error is sent but ignore alert for silent resends, wait we don't have silent resend.
      showErrorAlert(`Failed to send ${type} OTP`);
    }
  };

  const handleVerifyOTP = async () => {
    if (!otp || otp.length < 6) return showErrorAlert("Enter valid 6-digit OTP");
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/api/v1/otp/verify-${verifyType}-otp`, { otp }, {
        headers: { Authorization: `Bearer ${localStorage.getItem("accessToken")}` },
        withCredentials: true
      });
      setUser({ ...user, [verifyType === 'email' ? 'isEmailVerified' : 'isPhoneVerified']: true });
      setShowVerifyModal(false);
      setOtp('');
      showSuccessAlert(`${verifyType === 'email' ? 'Email' : 'Phone'} verified!`);
    } catch (err) {
      showErrorAlert(err.response?.data?.message || "Verification failed");
    }
  };


  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        // 'withCredentials' is required if you are using cookies for JWT
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/v1/users/current-user`, {
          headers: {
            // Include this if you are using the Authorization Header instead of Cookies
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`
          }
        });

        setUser(response.data.data); // Correctly extract user from 'data' property
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load profile");
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  // 4. Show a loading screen while waiting for the backend
  if (loading) {
    return <SkeletonLoader type="profile" />;
  }


  // 5. Render the data!
  const getInitial = (name) => {
    // If name is undefined, null, or empty, return a default emoji
    if (!name) return "👤";

    // Otherwise, return the first letter capitalized safely
    return name.charAt(0).toUpperCase();
  };

  const handleLogout = async () => {
    try {
      // 1. Get the token to prove who is logging out
      const token = localStorage.getItem("accessToken");

      // 2. Tell the backend to clear the refresh tokens and cookies
      await axios.post(`${import.meta.env.VITE_API_URL}/api/v1/users/logout`, {}, {
        headers: {
          Authorization: `Bearer ${token}`
        },
        withCredentials: true
      });

    } catch (error) {
      console.error("Error during backend logout:", error);
      // We continue to the next steps even if the backend fails, 
      // so the user isn't permanently stuck logged in!
    } finally {
      // 3. Delete the breadcrumbs from the browser!
      localStorage.removeItem("accessToken");
      localStorage.removeItem("isLoggedIn");

      await showSuccessAlert("Logged out successfully!");

      // 4. Redirect the user back to the login page
      // Using window.location.href instead of navigate forces the React app 
      // to fully reload, which updates your Header instantly!
      window.location.href = '/login';
    }
  };

  return (
    <AnimatedPage>
      <div className="profileWrapper">
        <div className="profileCard">

          {/* Profile Header (Avatar & Name) */}
          <div className="profileHeader">
            <div className="profileAvatar">{getInitial(user?.firstName)}</div>
            <h2 className="profileName">{user?.firstName} {user?.lastName}</h2>
            <p className="profileRole">{user?.currentStudy || user?.grade} • Student</p>
          </div>

          <div className="divider"></div>

          {/* Essential User Details */}
          <div className="profileDetails">
            <div className="detailGroup">
              <span className="detailLabel">Email Address • </span>
              <span className="detailValue emailHighlight">
                {user?.email}
                {user?.isEmailVerified ? 
                  <span className="verified-badge">✔ Verified</span> : 
                  <button className="verify-btn-small" onClick={() => handleSendOTP('email')}>Verify Now</button>
                }
              </span>
            </div>

            <div className="detailGroup">
              <span className="detailLabel">Current Study • </span>
              <span className="detailValue currentStudyHighlight">{user?.currentStudy || user?.grade}</span>
            </div>

            <div className="detailGroup">
              <span className="detailLabel">Academic Branch • </span>
              <span className="detailValue branchHighlight">{user?.branch || user?.stream}</span>
            </div>

            <div className="detailGroup">
              <span className="detailLabel">Dream Career • </span>
              <span className="detailValue dreamHighlight">🎯 {user?.dream}</span>
            </div>

            <div className="detailGroup">
              <span className="detailLabel">Phone Number • </span>
              <span className="detailValue mobileHighlight">
                📞+91 - {user?.mobileNumber}
              </span>
            </div>

          </div>

          <StudentDashboard user={user} />

          {/* Action Buttons */}
          <div className="profileActions">
            <Link to="/edit-details" className="editBtn">Edit Details</Link>
            <button className="logoutBtn" onClick={handleLogout}>Log Out</button>
          </div>

          {/* OTP Verification Modal */}
          {showVerifyModal && (
            <div className="modal-overlay">
              <div className="otp-modal-profile">
                <h3>Verify {verifyType === 'email' ? 'Email' : 'Phone'}</h3>
                <p>Check the backend terminal for the mocked 6-digit OTP code.</p>
                <input 
                  type="text" 
                  maxLength={6} 
                  placeholder="Enter OTP" 
                  className="inputField otp-box-profile"
                  value={otp} 
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                />
                <div className="modal-actions-profile">
                  <button className="modal-btn verify-action" onClick={handleVerifyOTP}>Verify Code</button>
                  <button className="modal-btn cancel-action" onClick={() => {setShowVerifyModal(false); setOtp('')}}>Cancel</button>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </AnimatedPage>
  );
};

export default Profile;