// src/components/ProtectedRoute.js

import React, { useContext } from 'react';

import AuthContext from '../context/AuthContext';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ element }) => {
    const { isAuthenticated, loading } = useContext(AuthContext);

    if (loading) {
        return <div>Loading...</div>; // Or any other loading indicator
    }

    return isAuthenticated ? element : <Navigate to="/login" />;
};

export default ProtectedRoute;
