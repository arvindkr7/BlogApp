// src/components/PostDetail.js

import { Badge, Button, Col, Row } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import React, { useContext, useEffect, useState } from 'react';

import AddComment from './AddComment';
import AuthContext from '../context/AuthContext';
import Card from 'react-bootstrap/Card';
import CommentList from './CommentList';
import UpdatePostModal from './UpdatePostModal';
import api from '../utils/api';
import formatDate from '../utils/formatDate';

const PostDetail = ({postData}) => {
    const { id } = useParams();
    const [post, setPost] = useState(null);
    const [comments, setComments] = useState(null);
    const { isAuthenticated, user} = useContext(AuthContext);
    const [showModal, setShowModal] = useState(false);

    console.log('postDetail postData', postData);

    const handleUpdate = (updatedPost) => {
        setPost(updatedPost);
    };
    useEffect(() => {
        if (postData){
            setPost(postData);
            setComments(postData.comments);
        }
        if (id){
        api.get(`/posts/${id}/`)
            .then(response => {
                setPost(response.data);
                setComments(response.data.comments);
            })
            .catch(error => {
                console.error('There was an error fetching the post!', error);
            });
        }
    }, [id, postData]);

    const handleCommentAdded = (newPost) => {
        setComments([newPost, ...comments]);
    };
    
    

    const handleLike = async () => {
        try {
            const response = await api.post(`/posts/${post.id}/like/`);
            setPost(response.data);
        } catch (error) {
            console.error('Error liking the post:', error);
        }
    };

    const deletePost = async () => {
        try {
            const response = await api.delete(`/posts/${post.id}/`);
            console.log("deleted",response);
            // Update your UI to reflect the deletion
            setPost(null);
            setComments(null);
        } catch (error) {
            console.error('Error deleting post:', error.response?.data?.error || error.message);
        }
    };

    const handleDelete = () => {
        if (window.confirm('Are you sure you want to delete this post?')) {
            deletePost();
        }
    };


    if (!post) return;
    
    return (
        <div>
            <Card shadow='lg' border={user.username === post.author ? 'success': ''}>
                <Card.Header>
                <Row>
                    <Col>
                        <Card.Title className='text-break'>
                            <Link to={`/posts/${post.id}`} className="text-decoration-none"> {post.title}
                            </Link>
                        </Card.Title>
                        <Card.Text className='text-muted'>Posted by  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person-circle" viewBox="0 0 16 16">
                            <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0"/>
                            <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"/>
                            </svg> {post.author} on {formatDate(post.published_date)}
                        </Card.Text>
                    </Col>
                    <Col sm={2} className=' d-flex align-items-center justify-content-end'>
                    <div>
                    {isAuthenticated && user && user.username === post.author && 
                        (<>
                        <span className='text-success' role='button' onClick={() => setShowModal(true)}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-fill" viewBox="0 0 16 16">
                            <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.5.5 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11z"/>
                            </svg>
                        </span>
                        <span role='button' className='text-danger mx-3' onClick={handleDelete}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash3" viewBox="0 0 16 16">
                            <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5"/>
                            </svg>
                        </span>
                        </>
                        )
                    }
                
                <Button className='rounded' size='sm' disabled={!isAuthenticated} onClick={handleLike} variant={post.likes.includes(user.username) ? 'success' : 'outline-primary'}> {post.likes.length} { post.likes.includes(user.username) ? 
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-heart-fill" viewBox="0 0 16 16">
                    <path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314"/></svg> : 
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-heart" viewBox="0 0 16 16">
                    <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143q.09.083.176.171a3 3 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15"/></svg>}
                </Button> 
                </div>
                    </Col>
                </Row>
                </Card.Header>
                    
                <Card.Body>
                
                <Card.Text>{post.content}</Card.Text>
                
                </Card.Body>
                
            <Card.Footer>
            {isAuthenticated  && (<><AddComment onCommentAdded={handleCommentAdded}  postId={post.id}/> </>)}
            <CommentList comments={comments} />
            </Card.Footer>
                
            </Card>

            <UpdatePostModal
                        show={showModal}
                        handleClose={() => setShowModal(false)}
                        post={post}
                        onUpdate={handleUpdate}
                    />
        </div>
    );
};

export default PostDetail;
