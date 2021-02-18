import React, { useState, useEffect, useRef } from 'react';

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

const App = () => {
    const [imgCoord, setImgCoord] = useState(rsp.rock);
    const [result, setResult] = useState('');
    const [score, setScore] = useState(0);
    const interval = useRef();

    useEffect(() => {
        interval.current = setInterval(turningComputerPick, 100);
        return () => { // componentWillUnmount 역할            
            clearInterval(interval.current);
          }
    },[imgCoord])

    const turningComputerPick = () => {        
        if(imgCoord === rsp.rock) {
            setImgCoord(rsp.scissors);
        } else if (imgCoord === rsp.scissors) {
            setImgCoord(rsp.paper);
        } else if (imgCoord === rsp.paper) {
            setImgCoord(rsp.rock);
        }
    }

    const onClickBtn = (e) => {
        clearInterval(interval.current);        
        const comPick = scoreRsp[findComPick(imgCoord)];
        const myPick = scoreRsp[e.target.id];
        const winLose = myPick - comPick;
        if ([-1, 2].includes(winLose)) {
            setResult('승리!');
            setScore(score + 1);                
        } else if (winLose === 0) {
            setResult('무승부!');              
        } else {
            setResult('패배!');
            setScore(score - 1);
        }

        setTimeout(() => {interval.current = setInterval(turningComputerPick, 100);}, 2000);
    }

    return (
        <div className="App">
                <div id="computer" style={{backgroundPosition : `${imgCoord} 0`}}></div>
                <div>
                    <button id="scissors" onClick={onClickBtn}>가위</button>
                    <button id="rock" onClick={onClickBtn}>바위</button>
                    <button id="paper" onClick={onClickBtn}>보</button>
                </div>
                <div className="result">
                    {result}
                    <p>점수: {score}</p>
                </div>
            </div>
    );
}

export default App;