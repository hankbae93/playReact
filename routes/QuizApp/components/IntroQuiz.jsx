import React, { Component } from 'react';

class IntroQuiz extends Component {      
    onClickStart = () => {
        this.props.changeMode('start');
    };

    render() {
        return(
            <div className="intro">
                <h1>Quiz about IU</h1>
                <button onClick={this.onClickStart}>시작</button>
            </div>
        );
    }
}

export default IntroQuiz;


