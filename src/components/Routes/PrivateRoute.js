import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { auth } from '../firebaseConfig'; // Import Firebase auth
import { useAuthState } from 'react-firebase-hooks/auth'; // Use Firebase hooks to get user state

const PrivateRoute = ({ element: Component, ...rest }) => {
    const [user, loading] = useAuthState(auth); // Get the current user state

    if (loading) {
        return <div>Loading...</div>; // Optionally handle loading state
    }

    return (
        <Route
            {...rest}
            element={user ? Component : <Navigate to="/sign-in" />}
        />
    );
};

export default PrivateRoute;
