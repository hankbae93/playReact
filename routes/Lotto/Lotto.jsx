import React, {useState, useEffect, useRef, useMemo, useCallback} from 'react';
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

const Lotto = () => {
    const lottoNumbers = useMemo(() => getRandomNumbers(), []);
    const [candidates, setCandidates] = useState(lottoNumbers);
    const [winBalls, setWinBalls] = useState([]);
    const [bonus, setBonus] = useState(null);
    const [redo, setRedo] = useState(false);
    const timeout = useRef([]);    

    useEffect(()=> {
        handleLotto();
        return () => { 
            timeout.current.forEach((v) => {clearTimeout(v)});
        }
    },[timeout.current])

    const handleLotto = () => {        
        for (let i = 0; i < candidates.length - 1; i++) {
            timeout.current[i] = setTimeout(() => {   
                setWinBalls((current) => [...current, candidates[i]]);                      
            }, (i + 1) * 1000);
        }                                         
                
        timeout.current[candidates.length - 1] = setTimeout(() => {
            setBonus(candidates[candidates.length - 1]);
            setRedo(true);            
        }, (candidates.length) * 1000);
    };

    const replayLotto = useCallback(() => {
        setCandidates(getRandomNumbers());
        setWinBalls([]);
        setBonus(null);
        setRedo(false);
        timeout.current = [];        
    }, [candidates]);

    return (
        <div id="Lotto">
            {redo && <button onClick={replayLotto}>다시시작</button>}
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
    )
}


export default Lotto;