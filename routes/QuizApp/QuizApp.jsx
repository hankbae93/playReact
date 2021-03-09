import React, { Component } from 'react';
import IntroQuiz from './components/IntroQuiz';
import Quiz from './components/Quiz';
import EndScore from './components/EndScore';
import './QuizApp.css';

const QUIZ = [
    {
        question : "아이유의 생년월일은?",
        choice: [
            "1993년 5월 16일",
            "1994년 6월 16일",
            "1996년 5월 16일",
            "1993년 5월 18일",
        ],        
        answer: "0"
    },
    {
        question : "아이유의 21년 신곡 이름은?",
        choice: [
            "에잇",
            "Celebrity",
            "달빛요정역전만루홈런",
            "밤편지",
        ],        
        answer: "1"
    },{
        question : "아이유 소속사는?",
        choice: [
            "YG엔터테인먼트",
            "JYP엔터테인먼트",
            "SM엔터테인먼트",
            "EDAM엔터테인먼트",
        ],        
        answer: "3"
    },{
        question : "아이유 소속사는?",
        choice: [
            "YG엔터테인먼트",
            "JYP엔터테인먼트",
            "SM엔터테인먼트",
            "EDAM엔터테인먼트",
        ],        
        answer: "3"
    },{
        question : "아이유 소속사는?",
        choice: [
            "YG엔터테인먼트",
            "JYP엔터테인먼트",
            "SM엔터테인먼트",
            "EDAM엔터테인먼트",
        ],        
        answer: "3"
    },{
        question : "아이유 소속사는?",
        choice: [
            "YG엔터테인먼트",
            "JYP엔터테인먼트",
            "SM엔터테인먼트",
            "EDAM엔터테인먼트",
        ],        
        answer: "3"
    },

]

class QuizApp extends Component {
    state = {
        mode: 'ready',
        quiz: QUIZ,
        score: '',
    };      
  
    onChangeMode = (MODE, SCORE) => {
        this.setState({
            mode: MODE,
            score: SCORE
        });
    };

    onRenderMode = () => {
        const { mode, quiz, score } = this.state;
        switch (mode) {
            case 'ready':
                return (<IntroQuiz changeMode={this.onChangeMode}/>);                
            case 'start':
                return <Quiz data={quiz} changeMode={this.onChangeMode}/> ;               
            case 'end':
                return <EndScore score={score} data={quiz}/>;                
        }
    };

    render() {        
        return (
            <div id="QuizApp">
                {this.onRenderMode()}
            </div>
        );
    }
};

export default QuizApp;