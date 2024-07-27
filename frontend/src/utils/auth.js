// src/utils/auth.js

import {jwtDecode} from 'jwt-decode';

export const getUserInfoFromToken = () => {
    let username = localStorage.getItem('username');
    if (!username) return { username: username };

    const token = localStorage.getItem('access_token');
    if (!token) return null;

    console.log(`Access token: ${token}`);
    if (!username) 
        username = jwtDecode(token).username;
    return { username: username };
};
