import React, { useState } from 'react';
import Form from './components/Form';
import BookList from './components/BookList';
import './BookSearch.css';

const BookSearch = () => {
    const [bookList, setBookList] = useState([]);

    return (
        <div className="book_search">
            <div>
                <h1>카카오 책 검색</h1>
                <Form             
                setBookList={setBookList}
                />
            </div>            
            <BookList 
            bookList={bookList}
            />
        </div>
    );
};

export default BookSearch;