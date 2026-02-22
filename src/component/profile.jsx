import React from 'react';
import { useState } from 'react';
import './profile.css';
import { useEffect } from 'react';
import axios from 'axios';

const Profile = () => {
 const [userData, setUserData] = useState([]);

 useEffect(() => {
  axios.get('/api/profile')
    .then(response => {
      setUserData(response.data);
    })
    .catch(error => {
      console.error('Error fetching profile data:', error);
    });
 }, []);


  /// Updated function with a safety check
  const getInitial = (name) => {
    // If name is undefined, null, or empty, return a default emoji
    if (!name) return "👤"; 
    
    // Otherwise, return the first letter capitalized safely
    return name.charAt(0).toUpperCase();
  };

  return (
    <div className="profileWrapper">
      <div className="profileCard">
        
        {/* Profile Header (Avatar & Name) */}
        <div className="profileHeader">
          <div className="profileAvatar">{getInitial(userData.name)}</div>
          <h2 className="profileName">{userData.name}</h2>
          <p className="profileRole">Student • {userData.grade}</p>
        </div>

        <div className="divider"></div>

        {/* Essential User Details */}
        <div className="profileDetails">
          <div className="detailGroup">
            <span className="detailLabel">Email Address</span>
            <span className="detailValue">{userData.email}</span>
          </div>
          
          <div className="detailGroup">
            <span className="detailLabel">Chosen Stream</span>
            <span className="detailValue streamHighlight">{userData.stream}</span>
          </div>

          <div className="detailGroup">
            <span className="detailLabel">Dream Career</span>
            <span className="detailValue dreamHighlight">🎯 {userData.dream}</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="profileActions">
          <button className="editBtn">Edit Details</button>
          <button className="logoutBtn">Log Out</button>
        </div>

      </div>
    </div>
  );
};

export default Profile;