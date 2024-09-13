import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { auth, db, storage } from '../../firebaseConfig'; // Import storage from Firebase
import { signOut, onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage'; // Firebase storage methods
import styles from './EditProfile.module.css';

export default function EditProfile() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    profession: '',
    education: '',
    role: '',
    medical: '',
  });
  const [medicalImage, setMedicalImage] = useState(null);
  const navigate = useNavigate();
  const editFormRef = useRef(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const userDocRef = doc(db, 'users', user.uid);
          const userDoc = await getDoc(userDocRef);

          if (userDoc.exists()) {
            const userData = userDoc.data();
            setUserData(userData);
            setFormData(userData);
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setMedicalImage(file);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    let imageUrl = formData.medical;
    if (medicalImage) {
      if (imageUrl) {
        const previousFileRef = ref(storage, imageUrl);
        try {
          await deleteObject(previousFileRef);
        } catch (error) {
          console.error('Error deleting previous file:', error);
        }
      }

      const storageRef = ref(storage, `medical-records/${auth.currentUser.uid}/${medicalImage.name}`);
      await uploadBytes(storageRef, medicalImage);
      imageUrl = await getDownloadURL(storageRef);
    }

    try {
      const updatedData = {
        ...formData,
        medical: imageUrl,
      };

      const userDocRef = doc(db, 'users', auth.currentUser.uid);
      await updateDoc(userDocRef, updatedData);
      setUserData(updatedData);
    } catch (error) {
      console.error('Error updating user data:', error);
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
          <Link to='/dashboard'><li>Profile</li></Link>
          <li><Link to='/dashboard/edit'>Edit Profile</Link></li>
          <li>Notifications</li>
          <li onClick={handleSignOut}>Logout</li>
        </ul>
      </div>
      <div className={styles.mainContent}>
        <form onSubmit={handleUpdate} className={styles.editForm} ref={editFormRef}>
          <h2>Edit User</h2>

          <div className={styles.formGroup}>
            <label htmlFor="firstName">First Name:</label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              placeholder="First Name"
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="lastName">Last Name:</label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              placeholder="Last Name"
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              disabled
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="profession">Profession:</label>
            <input
              type="text"
              id="profession"
              name="profession"
              value={formData.profession}
              onChange={handleChange}
              placeholder="Profession"
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="education">Education:</label>
            <input
              type="text"
              id="education"
              name="education"
              value={formData.education}
              onChange={handleChange}
              placeholder="Education"
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="medicalImage">Upload Medical Record:</label>
            <input
              type="file"
              id="medicalImage"
              name="medicalImage"
              onChange={handleFileChange}
              accept="image/*, application/pdf"
            />
          </div>

          <button className={styles.update} type="submit">Update</button>
          <button className={styles.cancel} type="button" onClick={() => navigate('/dashboard')}>Cancel</button>
        </form>
      </div>
    </div>
  );
}
