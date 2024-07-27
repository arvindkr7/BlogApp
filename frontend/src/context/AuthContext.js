// src/context/AuthContext.js

import React, { createContext, useEffect, useState } from 'react';

import { getUserInfoFromToken } from '../utils/auth';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState({ username: null });
    useEffect(() => {
        const token = localStorage.getItem('access_token');
        if (token) {
            setIsAuthenticated(true);
            const { username } = getUserInfoFromToken();
            setUser({ username });
        }
        setLoading(false);
    }, []);

    const login = (token, username) => {
        localStorage.setItem('access_token', token);
        localStorage.setItem('username', username);
        setIsAuthenticated(true);
        setUser({ username });
    };

    const logout = () => {
        setIsAuthenticated(false);
        setUser({ username: null });
        localStorage.removeItem('access_token');
        localStorage.removeItem('username');
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, loading, user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
