import { auth, db } from '../firebaseConfig';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, sendPasswordResetEmail, updatePassword, sendEmailVerification } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';

const saveUserData = async (userId, additionalData) => {
  try {
    const userDocRef = doc(db, 'users', userId);
    await setDoc(userDocRef, additionalData);
  } catch (error) {
    console.error('Error saving user data:', error);
    throw error;
  }
};

export const doCreateUserWithEmailAndPassword = async (email, password, additionalData) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    await saveUserData(userCredential.user.uid, additionalData);
    return userCredential;
  } catch (error) {
    throw error;
  }
};

export const doSignInWithEmailAndPassword = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential;
  } catch (error) {
    console.error("Error signing in: ", error);
    throw error;
  }
};

export const doSignInWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  try {
    const result = await signInWithPopup(auth, provider);
    return result;
  } catch (error) {
    console.error("Error signing in with Google: ", error);
    throw error;
  }
};

export const doPasswordReset = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
    console.log("Password reset email sent");
  } catch (error) {
    console.error("Error sending password reset email: ", error);
    throw error;
  }
};

export const doPasswordChange = async (password) => {
  const user = auth.currentUser;
  if (user) {
    try {
      await updatePassword(user, password);
      console.log("Password updated successfully");
    } catch (error) {
      console.error("Error updating password: ", error);
      throw error;
    }
  } else {
    console.error("No user is logged in.");
  }
};

export const doSendEmailVerification = async () => {
  const user = auth.currentUser;
  if (user) {
    try {
      await sendEmailVerification(user, {
        url: `${window.location.origin}/home`
      });
      console.log("Email verification sent");
    } catch (error) {
      console.error("Error sending email verification: ", error);
      throw error;
    }
  } else {
    console.error("No user is logged in.");
  }
};

export const doSignOut = async () => {
  try {
    await auth.signOut();
    console.log("User signed out successfully");
  } catch (error) {
    console.error("Error signing out: ", error);
    throw error;
  }
};