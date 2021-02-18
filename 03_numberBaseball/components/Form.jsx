import React, { useState, useRef, memo } from 'react';

const getNumbers = () => {
    const arr = [];
    for (let i = 1; i < 10; i++) {
        arr[i - 1] = i;
    }    
    const answerArr = arr.sort((a, b) => Math.random() - Math.random()).splice(0,4).join('');    
    return answerArr;
};

const Form = memo(({ tries, setTries }) => {
    const [answer, setAnswer] = useState(getNumbers());
    const [value, setValue] = useState('');
    const [count, setCount] = useState(1);    
    const [result, setResult] = useState('');
    const inputRef = useRef();

    const onSubmitForm = (e) => {
        e.preventDefault();      
        
        if (answer === value) {
            setResult('HOMERUN ~!');
            setTries([]);
            setCount(1);
            setValue('');
            setAnswer(getNumbers());            
            inputRef.current.focus();            
        } else if (count < 10) {
            let strike = 0;
            let ball = 0;
            //볼 또는 스트라이크 체크
            for (let i = 0; i < answer.length; i++) {
                if (answer.includes(value[i])) {
                    if (answer.indexOf(value[i]) === i) {
                        strike++;
                    } else {
                        ball++;
                    }
                } 
            }
            setTries((prevTries) => {
                return [
                    ...prevTries,
                    {
                        try: value,
                        result: `${strike}스트라이크 ${ball}볼`, 
                        count: count
                    }
                ]
            });
            setCount(count + 1);
            setValue('');
            inputRef.current.focus();  
        } else {
            alert('실패하셨습니다. 게임을 다시 시작합니다.');
            setTries([]);
            setResult(`정답은 ${answer}`);            
            setCount(1);
            setAnswer(getNumbers());            
            inputRef.current.focus();            
        }
    };

    const onChangeInput = (e) => {
        setValue(e.target.value);
    };

    return (
        <>
            <div className="result">
                <strong>{result}</strong>
            </div>
            <form onSubmit={onSubmitForm}>
                <input 
                ref={inputRef}
                type="number"
                value={value}
                onChange={onChangeInput}
                min="1000"
                max="9999"
                />
            </form>
        </>
    );
});

export default Form;