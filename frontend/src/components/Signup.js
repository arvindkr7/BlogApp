// src/components/Signup.js

import { Button, Form } from 'react-bootstrap';
import React, { useContext, useEffect, useState } from 'react';

import AuthContext from '../context/AuthContext';
import Logout from './Logout';
import api from '../utils/api';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const { isAuthenticated } = useContext(AuthContext);

    useEffect(() => {
        if (isAuthenticated) {
            navigate('/');
        }
    }, [isAuthenticated, navigate]);

    const handleSignup = async (e) => {
        e.preventDefault();
        try {
            await api.post('/auth/register/', { username, password });
            navigate('/login');
        } catch (error) {
            console.error('There was an error registering!', error);
        }
    };

    return (
        <div>
            <h1>Signup</h1>
            <Form onSubmit={handleSignup}>
            <Form.Group className="mb-3" controlId="formGroupUsername">
                <Form.Floating className="mb-3">
                <Form.Control id="usernameInput" type="text" placeholder="username" value={username} 
                    onChange={(e) => setUsername(e.target.value)} />
                    <label htmlFor="usernameInput">Username</label>
                </Form.Floating>
                
                
            </Form.Group>
            <Form.Group className="mb-3" controlId="formGroupPassword">
            <Form.Floating className="mb-3">
                    <Form.Control id="passwordInput" type="password" placeholder="Password" value={password}
                        onChange={(e) => setPassword(e.target.value)}/>
                        <label htmlFor="passwordInput">Password</label>
                        </Form.Floating>
            </Form.Group>
                <Button size='lg' type="submit">Register</Button>
            </Form>
            <div>
                <br/>
                <p>Already have an account? &nbsp;
                <Button size='sm' variant='success'href='/login'>Login</Button>
                </p>
            </div>
        </div>
    );
};

export default Signup;
