import React, { useState, useRef } from 'react';
import Form from './components/Form';
import Try from './components/Try';

const App = () => {
    const [tries, setTries] = useState([]);    

    return (
        <div className="App">
                <Form
                tries={tries}
                setTries={setTries}
                />
                <ul>
                    {tries.map((tryInfo, i) => {
                        return(
                            <Try
                            key={i}
                            data={tryInfo}
                            />
                        )
                    })}
                </ul>
            </div>
    );
}


export default App;