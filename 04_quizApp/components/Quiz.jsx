import React, { Component } from 'react';
import Choice from './Choice';

class Quiz extends Component {
    state = {
        mark: 0,
        score: 0,       
    };

    checkAnswer = (userChoice) => {
        const { data } = this.props; 
        const { mark, score } = this.state;
        
        if (mark === data.length - 1) {
            if (userChoice === data[mark].answer) {                
                this.props.changeMode('end', score + 1);
            } else {
                this.props.changeMode('end', score);
            }                       
        } else {                   
            if (userChoice === data[mark].answer) {
                this.setState({
                    score: score + 1,
                    mark: mark + 1
                });
            } else {
                this.setState({
                    mark: mark + 1
                });
            } 
        }       
    };

    render() {
        const { data } = this.props;
        const { mark, end, score } = this.state;
        
        return (
            <div className="quiz">
                <p>
                    <strong>{data[mark].question}</strong>
                </p>
                <ul>
                    {data[mark].choice.map((item, idx) => {
                            return(
                                <Choice 
                                data={item}
                                key={idx}
                                value={idx}
                                onCheck={this.checkAnswer}
                                />   
                            );
                    })}
                </ul>
            </div>
        );
    }
}

export default Quiz;