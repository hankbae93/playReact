import React, { Component } from 'react';

class Form extends Component {
    state = {
        KEY_HEADER: {'Authorization': `KakaoAK ece7d86d98810ba9ea844fe245cdb487`},
        value: '',        
    };

    searchBook = (e) => {
        e.preventDefault();
        const { value, KEY_HEADER } = this.state;
        const _getQuery = `?query=${value}`;
        fetch(`https://dapi.kakao.com/v3/search/book${_getQuery}`,
            {
                method: "get",
                headers: KEY_HEADER
            })
            .then((book_data) => book_data.json())            
            .then((book) => this.props.setBookData(book.documents))             
    };
        
    onChangeInput = (e) => {
        this.setState({
            value: e.target.value
        });
    };
    
    render() {
        const { value } = this.state;
        return(
            <form onSubmit={this.searchBook}>
                <input 
                type="text"  
                value={value} 
                onChange={this.onChangeInput}                 
                />
            </form>
        );
    }
}

export default Form;


