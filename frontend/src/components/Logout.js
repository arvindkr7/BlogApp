import React from 'react';
import api from '../utils/api';

const Logout = () => {
  const handleLogout = async () => {
    const accessToken = localStorage.getItem('access_token');
    console.log('Access token: ' + accessToken);

    try {
      // Send a request to backend logout endpoint
      
      await api.post('/auth/logout/', { refresh_token: accessToken });

      // Clear access token from localStorage
      localStorage.removeItem('access_token');

      // Redirect to login or home page
      window.location.href = '/login'; // Example redirection
    } catch (error) {
      console.error('Error logging out:', error);
      // Handle error as needed
    }
  };

  return (
    <button onClick={handleLogout}>Logout</button>
  );
};

export default Logout;
