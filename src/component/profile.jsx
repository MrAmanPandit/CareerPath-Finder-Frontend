import React from 'react';
import { useState } from 'react';
import './profile.css';
import { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
 
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                // 'withCredentials' is required if you are using cookies for JWT
                const response = await axios.get('http://localhost:3000/api/v1/users/current-user', {
                    headers: {
                        // Include this if you are using the Authorization Header instead of Cookies
                        Authorization: `Bearer ${localStorage.getItem("accessToken")}`
                    }
                });

                setUser(response.data.message); // Assuming your API wraps response in a 'data' object
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
    return <div>Loading your profile...</div>;
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
      await axios.post('http://localhost:3000/api/v1/users/logout', {}, {
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

      // 4. Redirect the user back to the login page
      // Using window.location.href instead of navigate forces the React app 
      // to fully reload, which updates your Header instantly!
      window.location.href = '/login'; 
    }
  };

  return (
    <div className="profileWrapper">
      <div className="profileCard">
        
        {/* Profile Header (Avatar & Name) */}
        <div className="profileHeader">
          <div className="profileAvatar">{getInitial(user?.firstName)}</div>
          <h2 className="profileName">{user?.firstName} {user?.lastName}</h2>
          <p className="profileRole">Student Grade • {user?.grade}</p>
        </div>

        <div className="divider"></div>

        {/* Essential User Details */}
        <div className="profileDetails">
          <div className="detailGroup">
            <span className="detailLabel">Email Address • </span>
            <span className="detailValue emailHighlight">{user?.email}</span>
          </div>
          
          <div className="detailGroup">
            <span className="detailLabel">Chosen Stream • </span>
            <span className="detailValue streamHighlight">{user?.stream}</span>
          </div>

          <div className="detailGroup">
            <span className="detailLabel">Dream Career • </span>
            <span className="detailValue dreamHighlight">🎯 {user?.dream}</span>
          </div>

           <div className="detailGroup">
            <span className="detailLabel">Phone Number • </span>
            <span className="detailValue dreamHighlight">📞91+ {user?.mobileNumber}</span>
          </div>

        </div>
        
        {/* Action Buttons */}
        <div className="profileActions">
          <button className="editBtn">Edit Details</button>
          <button className="logoutBtn" onClick={handleLogout}>Log Out</button>
        </div>

      </div>
    </div>
  );
};

export default Profile;