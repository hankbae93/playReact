import React from 'react';
import Book from './Book';

const BookList = ({ bookList }) => {
    return(
        <ul>
            {bookList.map((item, i)=> {
                return (
                    <Book
                    book={item}
                    key={i}
                    />
                );
            })}            
        </ul>
    );
};

export default BookList;