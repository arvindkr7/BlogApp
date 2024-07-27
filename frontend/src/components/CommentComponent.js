import React, { useContext, useEffect, useState }  from 'react';

import AuthContext from '../context/AuthContext';
import { Button } from 'react-bootstrap';
import UpdateCommentModal from './UpdateCommentModal';
import api from '../utils/api';

const CommentComponent = ({ commentData }) => {
    const { isAuthenticated, user} = useContext(AuthContext);
    const [comment, setComment] = useState(null);
    const [showModal, setShowModal] = useState(false);

    console.log(commentData);

    useEffect(() => {
        
            setComment(commentData);
        

        },[commentData])

    const handleUpdate = (updatedComment) => {
        setComment(updatedComment);
    };

    const deleteComment = async (commentId) => {
        try {
            const response = await api.delete(`/comments/${commentId}/`);
            console.log(response.data.message);
            setComment(null);
            // Update your UI to reflect the deletion
        } catch (error) {
            console.error('Error deleting comment:', error.response?.data?.error || error.message);
        }
    };

    const handleDelete = () => {
        if (window.confirm('Are you sure you want to delete this comment?')) {
            deleteComment(comment.id);
        }
    };

    if(!comment) return;
    
    return (
        <div>
            <div className='d-flex justify-content-between'><span><strong className={isAuthenticated && user && user.username === comment.author ? 'text-success': ''}>{comment.author}</strong> &nbsp; {comment.text}
            </span>
            {isAuthenticated && user && user.username === comment.author && (<span>
                <span role='button' className='text-success mx-3' onClick={() => setShowModal(true)}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-fill" viewBox="0 0 16 16">
                    <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.5.5 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11z"/>
                    </svg></span> 
                    
            <span role='button' className='text-danger' onClick={handleDelete}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash3" viewBox="0 0 16 16">
  <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5"/>
</svg></span> </span>) }
            </div>
            <UpdateCommentModal
            show={showModal}
            handleClose={() => setShowModal(false)}
            comment={comment}
            onUpdate={handleUpdate}
            />
        </div>
    );
};

export default CommentComponent;
