import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

import Appbar from './components/Appbar';
import { AuthProvider } from './context/AuthContext';
import { Container } from 'react-bootstrap';
import Login from './components/Login';
import PostDetail from './components/PostDetail';
import PostList from './components/PostList';
import ProtectedRoute from './components/ProtectedRoute';
import React from 'react';
import Signup from './components/Signup';

const App = () => {
    return (
        <AuthProvider>
            <Router>
                <Appbar />
                <Container>
                    <Routes>
                        <Route path="/" element={<PostList />} />
                        <Route path="/posts/:id" element={<PostDetail />} />
                        <Route path="/signup" element={<Signup />} />
                        <Route path="/login" element={<Login />} />
                    </Routes>
                </Container>
            </Router>
        </AuthProvider>
    );
};

export default App;
