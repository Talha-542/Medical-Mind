import React, { useState, useEffect, useRef } from 'react';
import { collection, getDocs, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../../firebaseConfig';
import styles from './ViewAllUsers.module.css';
import { deleteUser, getAuth } from 'firebase/auth';

export default function ViewAllUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editUser, setEditUser] = useState(null); 
  const [formData, setFormData] = useState({}); 

  const editFormRef = useRef(null); 

  
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

  useEffect(() => {
    fetchUsers();
  }, []);

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
    
    
    setTimeout(() => {
      if (editFormRef.current) {
        editFormRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100); 
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const docRef = doc(db, 'users', editUser.id);
      await updateDoc(docRef, formData);
      setEditUser(null);
      fetchUsers(); 
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const docRef = doc(db, 'users', id);
      await deleteDoc(docRef);

      const auth = getAuth();
      const user = await auth.getUser(id); 
      await deleteUser(user); 
      fetchUsers(); 
    } catch (error) {
      console.error('Error deleting user and account:', error);
    }
  };

  if (loading) {
    return <p>Loading users...</p>;
  }

  return (
    <div className={styles.container}>
      <h1>All Users</h1>
      {users.length > 0 ? (
        <table className={styles.userTable}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Profession</th>
              <th>Education</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id}>
                <td>{user.firstName} {user.lastName}</td>
                <td>{user.email}</td>
                <td>{user.profession}</td>
                <td>{user.education}</td>
                <td>{user.role}</td>
                <td>
                  <button className={styles.editButton} onClick={() => handleEdit(user)}>Edit</button>
                  <button className={styles.deleteButton} onClick={() => handleDelete(user.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No users found.</p>
      )}
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
          <button className={styles.update} type="submit">Update</button>
          <button className={styles.cancel} type="button" onClick={() => setEditUser(null)}>Cancel</button>
        </form>
      )}
    </div>
  );
}
