// src/components/NavBar.js

import { Button, Container, Navbar } from 'react-bootstrap';
import React, { useContext } from 'react';

import AuthContext from '../context/AuthContext';
import { Link } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';

const NavBar = () => {
    const { user, isAuthenticated, logout } = useContext(AuthContext);

    console.log('username: ' + user.username);
    return (
        <>
        <Navbar sticky="top" className="bg-dark mb-3" data-bs-theme="dark">
        <Container>
            <Navbar.Brand href="/"> 
            <img
              alt="book logo"
              src="book-color.svg"
              width="30"
              height="30"
              className="d-inline-block align-top text-light"
            />{' '}
             Blog App</Navbar.Brand>
            <Nav className="ms-auto">{
                isAuthenticated? (<>
               
                 <Nav.Link href="/" className='rounded text-success'>Logged in as: {user.username}</Nav.Link>
                 
                 <Nav.Link>
                 <Button size='sm' variant='outline' onClick={logout}>Log out</Button>
                 </Nav.Link>
                
                </>): (<>
                <Nav.Link href='/login' className='text-success'>Please Login to add a post, comment or like</Nav.Link>
                 <Nav.Link href="/signup" className='active'>Register</Nav.Link>
                </>)
                }
               
            </Nav>
            </Container>
        </Navbar>

</>
    );
};

export default NavBar;
