// src/components/UpdatePostModal.js

import { Button, Form, Modal } from 'react-bootstrap';
import React, { useState } from 'react';

import api from '../utils/api';

const UpdatePostModal = ({ show, handleClose, post, onUpdate }) => {
    const [title, setTitle] = useState(post.title);
    const [content, setContent] = useState(post.content);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await api.put(`/posts/${post.id}/`, { title, content });
            onUpdate(response.data);
            handleClose();
        } catch (error) {
            console.error('Error updating the post:', error);
        }
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Edit Post</Modal.Title>
            </Modal.Header>
            <Form onSubmit={handleSubmit}>
            <Modal.Body>
                <Form.Floating className='mb-3'>
                    <Form.Control
                        maxLength={100}
                        id='updateTitleField'
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                    <label htmlFor="updateTitleField">Title</label>
                </Form.Floating>
                <Form.Floating className='mb-3'>
                    <Form.Control
                        id='updateContentField'
                        as="textarea"
                        rows={5}
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        required
                    />
                    <label htmlFor="updateContentField">Content</label>
                </Form.Floating>
            <Modal.Footer>
            <Button variant="success" type="submit">
                Save Changes
            </Button>
            </Modal.Footer>
               
            </Modal.Body>
            </Form>
        </Modal>
    );
};

export default UpdatePostModal;
