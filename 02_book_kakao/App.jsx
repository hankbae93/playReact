import React, { useState } from 'react';
import Form from './components/Form';
import BookList from './components/BookList';

const App = () => {
    const [bookList, setBookList] = useState([]);

    return (
        <div className="App">
            <div class="book_search">
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

export default App;