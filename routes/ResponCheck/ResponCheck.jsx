import React, { Component } from 'react';
import './ResponCheck.css';
class ResponCheck extends Component {
    state = {
        text: '클릭하면 시작',
        mode: 'ready',
        result: [],
    };

    timer;
    startTime;
    endTime;

    responCheck = (e) => {
        const { mode, result } = this.state;        
        if (mode === 'ready') {
            this.setState({
                mode: 'waiting',
                text: '빨간색이 되면 바로 클릭하세요!'
            });
            this.startTime = new Date();
            this.timer = setTimeout(() => {
                this.setState({
                    mode: 'now',
                    text: '클릭!!!'
                });                    
            },1000 + Math.random() * 2000);
        } else if (mode === 'waiting') {
            this.setState({
                mode: 'ready',
                text: '바뀌기 전에 클릭하셨습니다. 다시 누르면 시작합니다.'
            });            
            clearTimeout(this.timer);
        } else {
            this.endTime = new Date();
            this.setState((prevState) => {
                return {
                    mode: 'ready', 
                    text: '클릭하면 시작',
                    result: [
                        ...prevState.result,
                        (this.endTime -this.startTime)
                    ],
                }                
            });
        }
    };

    speedAverage = () => {
        const { result } = this.state;
        if (result[0]) {
            const speed = (result.reduce((a,b) => a + b) / result.length);            
            return `평균 ${speed}ms`;
        }        
    }

    render() {
        const { text, mode, result } = this.state;
        return(
            <div id="ResponCheck">
                <div 
                className={mode}
                onClick={this.responCheck}
                >
                    {text}
                </div>
                <p>
                    {this.speedAverage()}
                </p>
            </div>
        );
    }
}

export default ResponCheck;