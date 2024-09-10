import { auth } from '../firebaseConfig';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signInWithPopup, 
  GoogleAuthProvider, 
  sendPasswordResetEmail, 
  updatePassword, 
  sendEmailVerification 
} from 'firebase/auth'; 
// Correct imports

// Function to create a user with email and password
export const doCreateUserWithEmailAndPassword = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    return userCredential;
  } catch (error) {
    throw error;
  }
};

// Function to sign in with email and password
export const doSignInWithEmailAndPassword = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential;
  } catch (error) {
    console.error("Error signing in: ", error);
    throw error;
  }
};

// Function to sign in with Google
export const doSignInWithGoogle = async () => {
  const provider = new GoogleAuthProvider(); // Initialize Google provider
  try {
    const result = await signInWithPopup(auth, provider); // Use signInWithPopup
    return result;
  } catch (error) {
    console.error("Error signing in with Google: ", error);
    throw error;
  }
};

// Function to send password reset email
export const doPasswordReset = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
    console.log("Password reset email sent");
  } catch (error) {
    console.error("Error sending password reset email: ", error);
    throw error;
  }
};

// Function to change the password of the current user
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

// Function to send email verification to the current user
export const doSendEmailVerification = async () => {
  const user = auth.currentUser;
  if (user) {
    try {
      await sendEmailVerification(user, {
        url: `${window.location.origin}/home` // Redirect URL after email verification
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