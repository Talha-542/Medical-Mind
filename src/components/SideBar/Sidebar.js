import  {useState}from 'react'
import styles from './SideBar.module.css'
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebaseConfig'; 




export default function Sidebar() {
    const [userData, setUserData] = useState(null);
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
      
    </div>
  )
}
