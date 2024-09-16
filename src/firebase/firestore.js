import { collection, query, where, getDoc , getDocs , doc } from 'firebase/firestore';
import { db } from '../firebaseConfig';



//fetch user according to thier role
export const getUserRole = async (userId) => {
    try {
        const userDoc = doc(db, 'users', userId);
        const docSnap = await getDoc(userDoc);

        if (docSnap.exists()) {
            return docSnap.data().role; 
        } else {
            console.log('No such document!');
            return null;
        }
    } catch (error) {
        console.error('Error fetching user role: ', error);
        return null;
    }
};

//fetch user according to role === patient
export const getAllPatients = async () => {
    const patients = [];
    try {
        const q = query(collection(db, 'users'), where('role', '==', 'patient'));
        const querySnapshot = await getDocs(q);

        querySnapshot.forEach((doc) => {
            // Add each patient to the array
            patients.push({ id: doc.id, ...doc.data() });
        });

        return patients;
    } catch (error) {
        console.error('Error fetching patients: ', error);
        return [];
    }
};