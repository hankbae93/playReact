import React, { Component } from 'react';
import Ball from './Ball';
const getRandomNumbers = () => {
    const randomBox = Array(45)
        .fill()
        .map((item, i) => {
        return i + 1
    });
    const shuffle = [];
    while (randomBox.length > 0) {
        let candi = randomBox.splice(Math.floor(Math.random() * randomBox.length), 1)[0];
        shuffle.push(candi);
    }    
    
    const winBalls = shuffle.slice(0,6).sort((a, b) => {return a - b});
    const bonus = shuffle[shuffle.length - 1];
    return [...winBalls, bonus];
};

class App extends Component {
    state = {
        candidates : getRandomNumbers(),
        winBalls : [],
        bonus : null,
        redo: false
    };
    timeout = [];

    handleLotto = () => {
        const { candidates } = this.state;
        for (let i = 0; i < candidates.length - 1; i++) {
            this.timeout[i] = setTimeout(() => {                
                this.setState((prevState) => {
                    return {
                        winBalls: [
                            ...prevState.winBalls,
                            candidates[i]
                        ]
                    }
                });
            }, (i + 1) * 1000);
        }
        this.timeout[candidates.length - 1] = setTimeout(() => {
            this.setState({                
                bonus: candidates[candidates.length - 1],
                redo: true             
            });
        }, (candidates.length) * 1000)
    }

    replayLotto = () => {
        this.setState({
            candidates : getRandomNumbers(),
            winBalls : [],
            bonus : null,
            redo: false
        });        
        this.timeout.forEach((v) => clearTimeout(v));
    }

    componentDidMount() {
        this.handleLotto();
    }

    componentDidUpdate(prevProps, prevState) {
        if(this.state.winBalls.length === 0) {
            this.handleLotto();
        }
    }

    componentWillUnmount() {
        this.timeout.forEach((v) => clearTimeout(v));
    }

    render() {
        const {winBalls, bonus, redo} = this.state;
        return (
            <div>
                {redo && <button onClick={this.replayLotto}>다시시작</button>}
                <div class="balls">
                    {winBalls.map((v,i) => {
                        return <Ball key={i} number={v}/>
                    })}
                </div>
                <div>
                    보너스!
                    {bonus && <Ball key={bonus} number={bonus}/>}
                </div>
            </div>
        );
    }
}

export default App;