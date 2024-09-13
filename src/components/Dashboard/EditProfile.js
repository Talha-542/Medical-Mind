import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { auth, db, storage } from '../../firebaseConfig'; // Import storage from Firebase
import { signOut, onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage'; // Firebase storage methods
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import styles from './EditProfile.module.css';

export default function EditProfile() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editUser, setEditUser] = useState(false); // State to toggle edit form
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    profession: '',
    education: '',
    role: '',
    medical: '', // For storing the single image or PDF URL
  });
  const [medicalImage, setMedicalImage] = useState(null); // State to store selected file (image/PDF)
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
      setEditUser(false); 
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
          <li onClick={() => setEditUser(true)}>Edit Profile</li>
          <li>Notifications</li>
          <li onClick={handleSignOut}>Logout</li>
        </ul>
      </div>
      <div className={styles.mainContent}>
        <div className={styles.editIcon} onClick={() => setEditUser(true)}>
          <FontAwesomeIcon icon={faPencilAlt} />
          {!editUser && <span> Click on the pencil</span>}
        </div>

        {editUser && (
          <form onSubmit={handleUpdate} className={styles.editForm} ref={editFormRef}>
            <h2>Edit User</h2>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              placeholder="First Name"
            />
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              placeholder="Last Name"
            />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              disabled
            />
            <input
              type="text"
              name="profession"
              value={formData.profession}
              onChange={handleChange}
              placeholder="Profession"
            />
            <input
              type="text"
              name="education"
              value={formData.education}
              onChange={handleChange}
              placeholder="Education"
            />
            <label htmlFor="medicalImage">Upload Medical Record:</label>
            <input
              type="file"
              id="medicalImage"
              name="medicalImage"
              onChange={handleFileChange}
              accept="image/*, application/pdf"
            />

            <button className={styles.update} type="submit">Update</button>
            <button className={styles.cancel} type="button" onClick={() => setEditUser(false)}>Cancel</button>
          </form>
        )}
      </div>
    </div>
  );
}
