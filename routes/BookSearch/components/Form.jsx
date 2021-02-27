import React, { useState, memo } from 'react';
const KEY_HEADER = {'Authorization': `KakaoAK ece7d86d98810ba9ea844fe245cdb487`};

const Form = memo(({ setBookList }) => {
    const [value, setValue] = useState('');       

    const searchBook = (e) => {
        e.preventDefault();
        const _getQuery = `?query=${value}`;
        fetch(`https://dapi.kakao.com/v3/search/book${_getQuery}`,
            {
                method: "get",
                headers: KEY_HEADER
            })
            .then((book_data) => book_data.json())            
            .then((book) => setBookList(book.documents));
        setValue(''); 
    };

    const onChangeInput = (e) => {
        setValue(e.target.value);
    };

    return(
        <form onSubmit={searchBook}>
            <input 
            type="text"  
            value={value} 
            onChange={onChangeInput}                 
            />
        </form>
    );
});

export default Form;


