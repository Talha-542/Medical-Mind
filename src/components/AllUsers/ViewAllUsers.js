import React, { useState, useEffect } from 'react';
import { collection, getDocs, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../../firebaseConfig';
import styles from './ViewAllUsers.module.css';

export default function ViewAllUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editUser, setEditUser] = useState(null); // State to manage the user being edited
  const [formData, setFormData] = useState({}); // State to manage form data

  // Fetch Users Function
  const fetchUsers = async () => {
    try {
      const usersCollectionRef = collection(db, 'users');
      const userSnapshot = await getDocs(usersCollectionRef);
      const userList = userSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setUsers(userList);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  // Fetch users when component mounts
  useEffect(() => {
    fetchUsers();
  }, []);

  // Handle Edit Button Click
  const handleEdit = (user) => {
    setEditUser(user);
    setFormData({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      profession: user.profession,
      education: user.education,
      role: user.role,
    });
  };

  // Handle Form Input Change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle Update
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const docRef = doc(db, 'users', editUser.id);
      await updateDoc(docRef, formData);
      setEditUser(null);
      fetchUsers(); // Refresh user list
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  // Handle Delete
  const handleDelete = async (id) => {
    try {
      const docRef = doc(db, 'users', id);
      await deleteDoc(docRef);
      fetchUsers(); // Refresh user list
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  if (loading) {
    return <p>Loading users...</p>;
  }

  return (
    <div className={styles.container}>
      <h1>All Users</h1>
      {users.length > 0 ? (
        <ul className={styles.userList}>
          {users.map(user => (
            <li key={user.id} className={styles.userItem}>
              <p><strong>Name:</strong> {user.firstName} {user.lastName}</p>
              <p><strong>Email:</strong> {user.email}</p>
              <p><strong>Profession:</strong> {user.profession}</p>
              <p><strong>Education:</strong> {user.education}</p>
              <p><strong>Role:</strong> {user.role}</p>
              <button onClick={() => handleEdit(user)}>Edit</button>
              <button onClick={() => handleDelete(user.id)}>Delete</button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No users found.</p>
      )}

      {/* Edit Form */}
      {editUser && (
        <form onSubmit={handleUpdate}>
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
          <input
            type="text"
            name="role"
            value={formData.role}
            onChange={handleChange}
            placeholder="Role"
          />
          <button type="submit">Update</button>
          <button type="button" onClick={() => setEditUser(null)}>Cancel</button>
        </form>
      )}
    </div>
  );
}
