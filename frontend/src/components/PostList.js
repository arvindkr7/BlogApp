import { Col, Container, ListGroup, ListGroupItem, Row } from 'react-bootstrap';
import React, { useContext, useEffect, useState } from 'react';

import AddPost from './AddPost';
import AuthContext from '../context/AuthContext';
import PaginationComponent from './PaginationComponent';
import PostDetail from './PostDetail';
import api from '../utils/api';

const PostList = () => {
    const [posts, setPosts] = useState([]);
    const { isAuthenticated } = useContext(AuthContext);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [pagesCalculated, setPagesCalculated] = useState(false);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await api.get(`/posts/?page=${currentPage}`);
                const { results = [], count = 0 } = response.data;

                console.log("API Response:", response.data);

                setPosts(results);

                if (!pagesCalculated) {
                    setTotalPages(Math.ceil(count / (results.length || 1))); // Prevent division by zero
                    setPagesCalculated(true);
                }
                
            } catch (error) {
                console.error('Error fetching posts:', error);
            }
        };

        fetchPosts();
    }, [currentPage, pagesCalculated]);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handlePostAdded = (newPost) => {
        setPosts([newPost, ...posts]);
    };

    return (
        <Container className='justify-content-center'>
            {isAuthenticated && <AddPost onPostAdded={handlePostAdded} />}
            <h1 className='my-3'>Posts</h1>
            {posts.length === 0 ? (
                <p>No posts available. Be the first to add one!</p>
            ) : (
                <>
                <div className='mb-5'>
                    <>
                        {posts.map(post => (
                             <ListGroupItem key={post.id} className='mb-4'>
                                <PostDetail postData={post} />
                            </ListGroupItem>
                        ))}
                    </>
                </div>
                <div className='d-flex justify-content-center fixed-bottom'>
                    <PaginationComponent currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
                </div>
                </>
            )}
        </Container>
    );
};

export default PostList;
