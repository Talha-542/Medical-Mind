import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../../firebaseConfig'; // Import Firestore
import { signOut, onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore'; // Import Firestore methods
import styles from './Dashboard.module.css'; 

export default function Dashboard() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          // Fetch additional user data from Firestore
          const userDocRef = doc(db, 'users', user.uid); // Fetch doc by UID
          const userDoc = await getDoc(userDocRef);
          
          if (userDoc.exists()) {
            setUserData(userDoc.data()); // Set the additional user data
          } else {
            console.error('No such user document!');
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
        } finally {
          setLoading(false); // Stop loading once data is fetched
        }
      } else {
        navigate('/sign-in'); // Redirect to sign-in if not authenticated
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      navigate('/sign-in');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  if (loading) {
    return <p>Loading user data...</p>;
  }

  if (!userData) {
    return <p>No user data available.</p>;
  }

  return (
    <div className={styles.dashboardContainer}>
      <div className={styles.sidebar}>
        <h2>Dashboard</h2>
        <ul>
          <li>Profile</li>
          <li>Settings</li>
          <li>Notifications</li>
          <li onClick={handleSignOut}>Logout</li>
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
