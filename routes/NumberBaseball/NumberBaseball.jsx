import React, { useState, useRef } from 'react';
import Form from './components/Form';
import Try from './components/Try';
import './NumberBaseball.css';

const NumberBaseball = () => {
    const [tries, setTries] = useState([]);    

    return (
        <div className="NumberBaseball">
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


export default NumberBaseball;