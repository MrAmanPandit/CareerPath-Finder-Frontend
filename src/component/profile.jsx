import React from 'react';
import { useState } from 'react';
import './profile.css';
import { useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import AnimatedPage from './animation';
import SkeletonLoader from './SkeletonLoader';
import { showSuccessAlert, showErrorAlert, showConfirmationAlert } from '../utils/customAlert';
import StudentDashboard from './StudentDashboard';
import { ShieldCheck, Download, Trash2, Bell, Cpu, ExternalLink } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.5, ease: "easeOut" } 
  }
};

const staggerContainer = {
  visible: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

const Profile = () => {

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // OTP Verification States
  const [showVerifyModal, setShowVerifyModal] = useState(false);
  const [verifyType, setVerifyType] = useState(null); // 'email' or 'phone'
  const [otp, setOtp] = useState('');
  
  // Privacy & Data States
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [privacyPrefs, setPrivacyPrefs] = useState({
    wantsMarketingEmails: true,
    wantsAiInsights: true
  });

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

  const handleTogglePreference = async (key) => {
    try {
      const newValue = !privacyPrefs[key];
      const response = await axios.patch(`${import.meta.env.VITE_API_URL}/api/v1/users/privacy-preferences`, 
        { [key]: newValue },
        { headers: { Authorization: `Bearer ${localStorage.getItem("accessToken")}` }, withCredentials: true }
      );
      setPrivacyPrefs(response.data.data);
      showSuccessAlert("Privacy preference updated!");
    } catch (err) {
      showErrorAlert("Failed to update preference");
    }
  };

  const handleExportData = async () => {
    setIsExporting(true);
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/v1/users/export-data`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("accessToken")}` },
        withCredentials: true
      });
      
      const dataStr = JSON.stringify(response.data.data, null, 2);
      const dataBlob = new Blob([dataStr], { type: 'application/json' });
      const url = URL.createObjectURL(dataBlob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `CareerPath_Finder_MyData_${user?.firstName}.json`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      showSuccessAlert("Your personal data has been prepared and downloaded.");
    } catch (err) {
      showErrorAlert("Failed to export data");
    } finally {
      setIsExporting(false);
    }
  };

  const handleDeleteAccount = async () => {
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/api/v1/users/delete-account`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("accessToken")}` },
        withCredentials: true
      });
      
      localStorage.clear();
      await showSuccessAlert("Your account has been permanently deleted. We're sorry to see you go.");
      window.location.href = '/signup';
    } catch (err) {
      showErrorAlert("Failed to delete account. Please try again.");
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
        if (response.data.data.privacyPreferences) {
          setPrivacyPrefs(response.data.data.privacyPreferences);
        }
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
            <div className="profileAvatar">
              {user?.avatar ? (
                <img src={user.avatar} alt="Profile" className="avatarImage" />
              ) : (
                getInitial(user?.firstName)
              )}
            </div>
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

          <motion.div 
            className="privacySettingsSection"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={cardVariants}
          >
            <div className="sectionSubHeader">
              <ShieldCheck size={20} className="headerIcon" />
              <h3>Security & Privacy Management</h3>
            </div>
            
            <motion.div className="privacyGrid" variants={staggerContainer}>
              <motion.div className="privacyControl" variants={cardVariants} whileHover={{ x: 5 }}>
                <div className="controlInfo">
                  <span className="controlTitle"><Bell size={16} /> Marketing Communications</span>
                  <p>Receive updates about new career features and roadmaps.</p>
                </div>
                <label className="switch">
                  <input 
                    type="checkbox" 
                    checked={privacyPrefs.wantsMarketingEmails} 
                    onChange={() => handleTogglePreference('wantsMarketingEmails')}
                  />
                  <span className="slider round"></span>
                </label>
              </motion.div>

              <motion.div className="privacyControl" variants={cardVariants} whileHover={{ x: 5 }}>
                <div className="controlInfo">
                  <span className="controlTitle"><Cpu size={16} /> Personalized AI Insights</span>
                  <p>Allow Yam AI to process profile data for tailored guidance.</p>
                </div>
                <label className="switch">
                  <input 
                    type="checkbox" 
                    checked={privacyPrefs.wantsAiInsights} 
                    onChange={() => handleTogglePreference('wantsAiInsights')}
                  />
                  <span className="slider round"></span>
                </label>
              </motion.div>
            </motion.div>

            <div className="dataActions">
              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="exportBtn" 
                onClick={handleExportData} 
                disabled={isExporting}
              >
                <Download size={18} /> {isExporting ? "Preparing Data..." : "Download My Data (JSON)"}
              </motion.button>
              
              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="deleteAccountBtnSec" 
                onClick={() => setShowDeleteModal(true)}
              >
                <Trash2 size={18} /> Delete Account Permanently
              </motion.button>
            </div>
            
            <p className="privacyNote">
              <ExternalLink size={12} /> View our fully updated <Link to="/privacy-policy" className="legalLink">Security Policy</Link> for more details.
            </p>
          </motion.div>

          <div className="divider"></div>

          {/* Action Buttons */}
          <div className="profileActions">
            {user?.role === 'admin' && (
              <>
                <Link to="/admin/dashboard" className="editBtn" style={{ backgroundColor: '#2563eb', color: 'white', border: 'none' }}>
                  Go to Admin Panel
                </Link>
                <Link to="/mentor/dashboard" className="editBtn" style={{ backgroundColor: '#8b5cf6', color: 'white', border: 'none' }}>
                  Go to Mentor Panel
                </Link>
              </>
            )}
            {user?.role === 'mentor' && (
              <Link to="/mentor/dashboard" className="editBtn" style={{ backgroundColor: '#8b5cf6', color: 'white', border: 'none' }}>
                Go to Mentor Panel
              </Link>
            )}
            <Link to="/edit-details" className="editBtn">Edit Details</Link>
            <button className="logoutBtn" onClick={handleLogout}>Log Out</button>
          </div>

          {/* Account Deletion Confirmation Modal */}
          <AnimatePresence>
            {showDeleteModal && (
              <div className="modal-overlay">
                <motion.div 
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.9, opacity: 0 }}
                  className="otp-modal-profile danger-modal"
                >
                  <div className="warningIcon"><Trash2 size={40} /></div>
                  <h3>Permanent Account Deletion</h3>
                  <p>This action <strong>cannot be undone</strong>. You will lose all your saved roadmaps, courses, and personalized insights.</p>
                  <div className="modal-actions-profile">
                    <button className="modal-btn delete-action" onClick={handleDeleteAccount}>Yes, Delete Permanently</button>
                    <button className="modal-btn cancel-action" onClick={() => setShowDeleteModal(false)}>Cancel & Stay</button>
                  </div>
                </motion.div>
              </div>
            )}
          </AnimatePresence>

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