// src/components/AddPost.js

import React, { useState } from 'react';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import api from '../utils/api';

const AddComment = ({ onCommentAdded, postId }) => {
    const [comment, setComment] = useState('');

    const handleAddComment = async (e) => {
        e.preventDefault();
       
        try {
            const response = await api.post('/comments/', 
                { post: postId, text: comment }
              
            );

            setComment('');
            onCommentAdded(response.data);
        } catch (error) {
            console.error('There was an error adding the post!', error);
        }
    };

    return (
            <Form onSubmit={handleAddComment}>
            <InputGroup>
                    <Form.Control placeholder="Add a comment" type='text' value={comment}
                        onChange={(e) => setComment(e.target.value)} />
                    <Button size='sm' type='submit' variant="success" id="btn-add-comment"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chat-left-quote-fill" viewBox="0 0 16 16">
  <path d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H4.414a1 1 0 0 0-.707.293L.854 15.146A.5.5 0 0 1 0 14.793zm7.194 2.766a1.7 1.7 0 0 0-.227-.272 1.5 1.5 0 0 0-.469-.324l-.008-.004A1.8 1.8 0 0 0 5.734 4C4.776 4 4 4.746 4 5.667c0 .92.776 1.666 1.734 1.666.343 0 .662-.095.931-.26-.137.389-.39.804-.81 1.22a.405.405 0 0 0 .011.59c.173.16.447.155.614-.01 1.334-1.329 1.37-2.758.941-3.706a2.5 2.5 0 0 0-.227-.4zM11 7.073c-.136.389-.39.804-.81 1.22a.405.405 0 0 0 .012.59c.172.16.446.155.613-.01 1.334-1.329 1.37-2.758.942-3.706a2.5 2.5 0 0 0-.228-.4 1.7 1.7 0 0 0-.227-.273 1.5 1.5 0 0 0-.469-.324l-.008-.004A1.8 1.8 0 0 0 10.07 4c-.957 0-1.734.746-1.734 1.667 0 .92.777 1.666 1.734 1.666.343 0 .662-.095.931-.26z"/>
</svg></Button>
            </InputGroup>
            </Form>
        
    );
};

export default AddComment;
