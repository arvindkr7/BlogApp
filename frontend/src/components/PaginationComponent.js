// src/components/Pagination.js

import { Pagination } from 'react-bootstrap';
import React from 'react';

const PaginationComponent = ({ currentPage, totalPages, onPageChange }) => {
    const handleClick = (pageNumber) => {
        onPageChange(pageNumber);
    };

    console.log("total pages", totalPages);

    return (
        <Pagination>
            {[...Array(totalPages)].map((_, index) => (
                <Pagination.Item
                    key={index + 1}
                    active={index + 1 === currentPage}
                    onClick={() => handleClick(index + 1)}
                >
                    {index + 1}
                </Pagination.Item>
            ))}
        </Pagination>
    );
};

export default PaginationComponent;
