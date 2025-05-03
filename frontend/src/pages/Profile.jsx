// src/pages/Profile.jsx
import React from 'react';
import './Profile.css';
import { useAuth } from '../context/AuthContext';

function Profile() {
  const { user } = useAuth();

  return (
    <div className="profile-wrapper">
      <div className="profile-card">
        <div className="profile-top">
          <img
            className="profile-avatar"
            src="https://cdn-icons-png.flaticon.com/512/147/147144.png"
            alt="avatar"
          />
          <div className="profile-summary">
            <h2>{user?.name}</h2>
            <p className="tier">🌟 Premium Member</p>
            <p className="location">📍 Chennai, India</p>
          </div>
        </div>

        <div className="profile-info">
          <h3>Account Information</h3>
          <div className="info-row">
            <label>Email</label>
            <span>{user?.email}</span>
          </div>
          <div className="info-row">
            <label>Phone</label>
            <span>+91 98765 43210</span>
          </div>
          <div className="info-row">
            <label>Member Since</label>
            <span>{new Date(user?.createdAt || Date.now()).toLocaleDateString()}</span>
          </div>
          <div className="info-row">
            <label>Membership</label>
            <span>Gold Tier</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
