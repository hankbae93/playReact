import React, { Component } from 'react';

const rsp = {
    'scissors' : '-142px',
    'rock' : '0',
    'paper' : '-284px'
};

const scoreRsp = {
    'scissors' : 0,
    'rock' : -1,
    'paper' : 1
};

const findComPick = (coord) => {
    return Object.entries(rsp).find((v) => {
        return v[1] === coord
    })[0];
}


class App extends Component {
    state = {
        imgCoord : rsp.rock,
        result: '',
        score: 0,
    }
    interval;

    componentDidMount() {
        this.interval = setInterval(this.turningComputer, 100);
    }

    turningComputer = () => {
        const { imgCoord } = this.state;
        if(imgCoord === rsp.rock) {
            this.setState({ imgCoord : rsp.scissors });
        } else if (imgCoord === rsp.scissors) {
            this.setState({ imgCoord : rsp.paper });
        } else if (imgCoord === rsp.paper) {
            this.setState({ imgCoord : rsp.rock });
        }
    }
    

    onClickBtn = (e) => {
        clearInterval(this.interval);
        const { imgCoord, score } = this.state;
        const comPick = scoreRsp[findComPick(imgCoord)];
        const myPick = scoreRsp[e.target.id];
        const winLose = myPick - comPick;
        if ([-1, 2].includes(winLose)) {
                this.setState({ result: '승리!', score: score + 1});
        } else if (winLose === 0) {
                this.setState({ result: '무승부!'});                
        } else {
                this.setState({ result: '패배!', score: score - 1});
        }

        setTimeout(() => {this.interval = setInterval(this.turningComputer, 100);}, 2000);
    }

    render() {
        const { imgCoord, result, score } = this.state;
        return (
            <div className="App">
                <div id="computer" style={{backgroundPosition : `${imgCoord} 0`}}></div>
                <div>
                    <button id="scissors" onClick={this.onClickBtn}>가위</button>
                    <button id="rock" onClick={this.onClickBtn}>바위</button>
                    <button id="paper" onClick={this.onClickBtn}>보</button>
                </div>
                <div className="result">
                    {result}
                    <p>점수: {score}</p>
                </div>
            </div>
        );
    }
}

export default App;