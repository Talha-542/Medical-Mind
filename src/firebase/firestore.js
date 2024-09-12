import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig';

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
