import React from 'react';

const Book = ({ book }) => {
    return (
        <li>
            <div>
                    <h3>{book.authors[0]} - "{book.title}"</h3>
                    <p>{Boolean(book.contents) ? book.contents : "소개글이 없습니다."}</p>
                    <span>{book.price}WON</span>
                </div>                              
                <a target="_blank" href={book.url}><img src={book.thumbnail}/></a>  
                
        </li>
    );
};

export default Book;

