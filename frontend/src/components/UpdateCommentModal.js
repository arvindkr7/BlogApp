// src/components/UpdatePostModal.js

import { Button, Form, Modal } from 'react-bootstrap';
import React, { useState } from 'react';

import api from '../utils/api';

const UpdateCommentModal = ({ show, handleClose, comment, onUpdate }) => {
    const [text, setTitle] = useState(comment.text);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await api.put(`/comments/${comment.id}/`, { text, post: comment.post });
            onUpdate(response.data);
            handleClose();
        } catch (error) {
            console.error('Error updating the post:', error);
        }
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Edit Comment</Modal.Title>
            </Modal.Header>
            <Form onSubmit={handleSubmit}>
            <Modal.Body>
                <Form.Floating className='mb-3'>
                    <Form.Control
                    id='updateCommentField'
                        type="text"
                        value={text}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                    <label htmlFor="updateCommentField">Comment</label>
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

export default UpdateCommentModal;
