import React, { useContext, useState } from 'react';

import AuthContext from '../context/AuthContext';
import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';
import { Card } from 'react-bootstrap';
import CommentComponent from './CommentComponent';
import { Link } from 'react-router-dom';
import ListGroup from 'react-bootstrap/ListGroup';

const CommentList = ({ comments }) => {
    const { isAuthenticated, user} = useContext(AuthContext);

    const [showAll, setShowAll] = useState(false);
   
    if (!comments) return <div>Loading...</div>;

    const displayedComments = showAll ? comments : comments.slice(0, 3);

    return (
        <div className='my-2'>
            {comments.length === 0 ? (
                <p>No comments available. Be the first to add one! {!isAuthenticated && <Link className='text-decoration-none' to='/login'>Login please</Link>}</p>
            ) : (
                <div>
                    <ListGroup>
                        {displayedComments.map(comment => (
                            <ListGroup.Item key={comment.id} >
                                <CommentComponent commentData={comment} />
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                    {comments.length > 3 && (
                            <>
                            <Badge role='button' className='float-end mt-2 border border-dark text-dark'
                                bg='light' 
                                size="sm" 
                                onClick={() => setShowAll(!showAll)}
                            >
                                {showAll ? 'Show less' : <> Show all ({comments.length}) comments </>} 
                                
                            </Badge>
                            </>
                        
                    )}
                </div>
            )}
        </div>
    );
};

export default CommentList;
