// src/components/AddPost.js

import React, { useContext, useState } from 'react';

import AuthContext from '../context/AuthContext';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import api from '../utils/api';

const AddPost = ({ onPostAdded }) => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const { isAuthenticated } = useContext(AuthContext);

    const handleAddPost = async (e) => {
        e.preventDefault();
        if (!isAuthenticated) {
            alert('You must be logged in to add a post.');
            return;
        }
        try {
            const response = await api.post('/posts/', 
                { title, content }
              
            );
            setTitle('');
            setContent('');
            onPostAdded(response.data);
        } catch (error) {
            console.error('There was an error adding the post!', error);
        }
    };

    return (
        <Card>
      <Card.Header>Add a post</Card.Header>
      <Card.Body>
    
            <Form onSubmit={handleAddPost}>
                <Row className="justify-content-start">
                    <Col>
                    <Form.Floating>
                    <Form.Control maxLength={100} id='addTitleField' placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
                    <label htmlFor="addTitleField">Title</label>
                    </Form.Floating>
                    </Col>
                    <Col>
                    <Form.Floating>
                    <Form.Control id='addContentField'  as='textarea' rows={1} placeholder="Content" value={content}
                        onChange={(e) => setContent(e.target.value)} required />
                    <label htmlFor="addContentField">Content</label>
                    </Form.Floating>
                    </Col>
                    <Col md={2}>
                    <Button variant='success' type="submit">Add Post</Button>
                    </Col>
                </Row>
            </Form>
      </Card.Body>
    </Card>
        
    );
};

export default AddPost;
