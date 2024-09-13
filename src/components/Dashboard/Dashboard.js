import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth, db } from '../../firebaseConfig';
import { signOut, onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import styles from './Dashboard.module.css';

export default function Dashboard() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const userDocRef = doc(db, 'users', user.uid);
          const userDoc = await getDoc(userDocRef);

          if (userDoc.exists()) {
            setUserData(userDoc.data());
          } else {
            console.error('No such user document!');
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
        } finally {
          setLoading(false);
        }
      } else {
        navigate('/sign-in');
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


  const hasMedicalRecord = userData.medical && userData.medical.trim() !== '';

  const isPdf = hasMedicalRecord && userData.medical.endsWith('.pdf');

  return (
    <div className={styles.dashboardContainer}>
      <div className={styles.sidebar}>
        <h2>Dashboard</h2>
        <ul>
          <Link className={styles.dashLink} to='/dashboard'><li>Profile</li></Link>
          <Link to='/dashboard/edit'><li className={styles.dashLink}>Edit Profile</li></Link>
          <li>Notifications</li>
          <li onClick={handleSignOut}>Logout</li>
        </ul>
      </div>
      <div className={styles.mainContent}>
        <h1>Welcome, {userData.firstName} {userData.lastName}</h1>
        <div className={styles.userInfo}>
          <p><strong>Email:</strong> {userData.email}</p>
          <p><strong>Profession:</strong> {userData.profession}</p>
          <p><strong>Education:</strong> {userData.education}</p>

          {/* Display appropriate message based on the presence of a medical record */}
          <p><strong>Medical Record: </strong>{hasMedicalRecord ? 'Available ✅' : 'Not Available'}</p>

        
        </div>
      </div>
    </div>
  );
}
