import React, { Component } from 'react'; 
import Books from './Books';
import Form from './Form';

class App extends Component {
    state = {        
        data: []
    };       

    setBookData = (Book) => {
        this.setState({
            data: Book
        });
    }

    render() {
        const { data } = this.state;
        return (
            <div className="App">
                <h1>KaKao Book Search</h1>
                <Form 
                setBookData={this.setBookData}
                />
                <ul>
                    {data.map((item) => {
                        return(
                            <Books
                            key={Math.random()}
                            data={item} 
                            />
                        );
                    })}
                </ul>
            </div>
        )
    }
}

export default App;