import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {  signOut } from 'firebase/auth'; 
import { auth } from '../../firebaseConfig'; 
import styles from './Dashboard.module.css';

export default function Dashboard() {
  const location = useLocation();
  const navigate = useNavigate();
  const { userData } = location.state || {}; 

  if (!userData) {
    return <p>No user data available. Please log in.</p>;
  }

  const handleSignOut = async () => {
    try {
      await signOut(auth); 
      navigate('/sign-in'); 
    } catch (error) {
      console.error('Error signing out: ', error);
    }
  };

  return (
    <div className={styles.dashboardContainer}>
      
      <div className={styles.sidebar}>
        <h2>Dashboard</h2>
        <ul>
          <li>Profile</li>
          <li>Settings</li>
          <li> Notifications</li>
          <li>
            <button className={styles.logoutButton} onClick={handleSignOut}>
              Logout
            </button>
          </li>
        </ul>
      </div>

      <div className={styles.mainContent}>
        <h1>Welcome, {userData.firstName} {userData.lastName}</h1>
        <div className={styles.userInfo}>
          <p><strong>Email:</strong> {userData.email}</p>
          <p><strong>Designation:</strong> {userData.designation}</p>
          <p><strong>Education:</strong> {userData.education}</p>
        </div>
      </div>
    </div>
  );
}
