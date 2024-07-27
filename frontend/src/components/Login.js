// src/components/Login.js

import React, { useContext, useState } from 'react';

import { Alert } from 'react-bootstrap';
import AuthContext from '../context/AuthContext';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Toast from 'react-bootstrap/Toast';
import api from '../utils/api';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const { login } = useContext(AuthContext);

    const handleLogin = async (e) => {
        e.preventDefault();
        console.log("logging in");
        try {
            const response = await api.post('/auth/login/', { username, password });
            const token = response.data.access_token;
            login(token, username);
            <Toast bg='success' show={true} delay={3000} autohide>
            <Toast.Header>
              
              <strong className="me-auto">Login</strong>
            </Toast.Header>
            <Toast.Body>Hello, {username}! Login successful</Toast.Body>
          </Toast>
            navigate('/');
        } catch (error) {
        <Alert variant='danger'>
            <Alert.Heading>
              Login Error
            </Alert.Heading>
            <p>Hello, {username}! Login error</p>
        </Alert>
            console.error('There was an error logging in!', error);
        }
    };

    return (
        <div>
            <h1>Login</h1>
            <Form onSubmit={handleLogin}>
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
                <Button size='lg' variant='success' type="submit">Login</Button>
            </Form>
            <div>
                <br/>
                <p>Don't have an account? &nbsp;
                <Button size='sm' variant='outline-primary' href='/signup'>Register</Button>
                </p>
            </div>
        </div>
    );
};

export default Login;
