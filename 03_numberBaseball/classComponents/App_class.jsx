import React, { Component } from 'react';
import Try from './Try';

const getNumbers = () => {
    const arr = [];
    for (let i = 1; i < 10; i++) {
        arr[i - 1] = i;
    }    
    const answerArr = arr.sort((a, b) => Math.random() - Math.random()).splice(0,4).join('');    
    return answerArr;
};

class App extends Component {
    state = {
        answer: getNumbers(),
        value: '',   
        count: 1,     
        tries: [],
        result:''
    };

    onSubmitForm = (e) => {
        e.preventDefault();
        const { answer, value, tries, count } = this.state;     
        
        if (answer === value) {
            this.setState({
                result: 'HOMERUN',
                tries: [],     
                count: 1,           
                answer: getNumbers()                        
            });            
            alert('정답입니다! 게임을 다시 시작합니다');
            this.input.focus();            
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
            this.setState((prevState) => {
                return {                    
                    tries: [
                        ...prevState.tries,
                        { 
                            try : value,
                            result: `${strike}스트라이크 ${ball}볼`, 
                            count: prevState.count 
                        }
                    ],
                    count: prevState.count + 1,
                    value:''
                }
            });
            this.input.focus(); 
        } else {
            alert('실패하셨습니다. 게임을 다시 시작합니다.');
            this.setState((prevState) => {
                return {
                    tries: [],
                    value: '',
                    count: 1,
                    result: `정답은 ${prevState.answer}`,
                    answer: getNumbers()
                }
            });
            this.input.focus();
        }
    };
        

    onChangeInput = (e) => {
        this.setState({ value : e.target.value });
    };

    inputRef = (c) => { this.input = c;}

    render() {
        const { value, result, tries } = this.state;
        return(
            <div className="App">
                <div className="result">
                    <strong>{result}</strong>
                </div>
                <form onSubmit={this.onSubmitForm}>
                    <input 
                    ref={this.inputRef}
                    type="number"
                    value={value}
                    onChange={this.onChangeInput}
                    min="1000"
                    max="9999"
                    />
                </form>
                <ul>
                    {tries.map((tryInfo, i) => {
                        return(
                            <Try
                            key={i}
                            tryInfo={tryInfo}
                            />
                        )
                    })}
                </ul>
            </div>
        )
    }
}

export default App;