import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { auth, db } from '../../firebaseConfig';
import { signOut, onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import styles from './AllPatients.module.css'
import PatientsList from './PatientList';





export default function AllPatients() {

  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      navigate('/sign-in');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.sidebar}>
        <h2>Dashboard</h2>
        <ul>
          <Link className={styles.dashLink} to='/doctor-dashboard'><li>Profile</li></Link>
          <Link className={styles.dashLink} to='/doctor-dashboard/patients'><li >View All Patients</li></Link>
          <li>Calendar</li>
          <li>Notifications</li>
          <li onClick={handleSignOut}>Logout</li>
        </ul>
      </div>
      
      <div><PatientsList/></div>
    </div>
  )
}
