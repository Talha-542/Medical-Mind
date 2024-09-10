import React, { useEffect, useState, createContext, useContext } from "react";
import { auth } from "../../firebaseConfig";
import { onAuthStateChanged } from "firebase/auth"; // Import Firebase method


const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  
  const initializeUser = (user) => {
    if (user) {
      setCurrentUser(user);
      setUserLoggedIn(true);
    } else {
      setCurrentUser(null);
      setUserLoggedIn(false);
    }
    setLoading(false); 
  };

  useEffect(() => {    
    const unsubscribe = onAuthStateChanged(auth, initializeUser);
    return unsubscribe; 
  }, []);

  const value = {
    currentUser,
    userLoggedIn,
    loading,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children} {/* Ensure children are rendered only after loading */}
    </AuthContext.Provider>
  );
}

// Custom hook for using auth context in other components
export function useAuth() {
  return useContext(AuthContext);
}