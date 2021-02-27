import React, { useReducer, useEffect } from 'react';
import Table from './components/Table';
import './TicTacToe.css';

const initialState = {
    winner: '',
    turn: 'O',
    tableData: [
        ['','',''],
        ['','',''],
        ['','',''],
    ],
    recentCell: [-1,-1]
};

export const SET_WINNER = 'SET_WINNER';
export const CLICK_CELL = 'CLICK_CELL';
const CHANGE_TURN = 'CHANGE_TURN';
const RESET_GAME = 'RESET_GAME';

const reducer = (state, action) => {
    switch (action.type) {
        case SET_WINNER :
            return {
                ...state,
                winner : action.winner
            }                    
        case CLICK_CELL:
            const tableData = [...state.tableData];    
            tableData[action.rowIndex] = [...tableData[action.rowIndex]];        
            tableData[action.rowIndex][action.cellIndex] = state.turn;
            
            return {
                ...state,
                tableData,
                recentCell : [action.rowIndex, action.cellIndex]
            }
        case CHANGE_TURN:
            return {
                ...state,
                turn : state.turn === 'O' ? 'X' : 'O',
            }
        case RESET_GAME: {
            return {
                ...state,
                turn: 'O',
                tableData: [
                    ['','',''],
                    ['','',''],
                    ['','','']
                ],
                recentCell: [-1,-1],
                }
        }
        default:
            return state;
    }
}



const TicTacToe = () => {
    const [ state, dispatch ] = useReducer(reducer, initialState);
    const { winner, turn, tableData, recentCell } = state;

    useEffect(() => {
        const [ col, row ] = recentCell;
        if(row < 0) return; 
        let win = false;
        //가로줄 검사       
        if (tableData[col][0] === turn && 
            tableData[col][1] === turn &&
            tableData[col][2] === turn) { 
                win = true;
        // 세로줄 검사
        } else if (tableData[0][row] === turn && 
                tableData[1][row]=== turn &&
                tableData[2][row] === turn) { 
                    win = true;
        // 대각선 검사
        } else if (tableData[0][0] === turn && 
                tableData[1][1] === turn &&
                tableData[2][2] === turn) { 
                    win = true;    
        } else if (tableData[2][0] === turn && 
                tableData[1][1] === turn &&
                tableData[0][2] === turn) { 
                    win = true;            
        } 
        console.log(win)
        if(win) { // 승리시
            dispatch({ type: SET_WINNER, winner: turn });
            dispatch({ type : RESET_GAME });
        } else {
            let all = true;
            tableData.forEach((row) => {
                row.forEach((cell) => {
                    if(!cell) {
                        all = false;
                    }
                });
            });

            if (all) {
                dispatch({ type : RESET_GAME });
            } else {
                dispatch({ type: CHANGE_TURN });
            }
        }
    },[recentCell]);
   
    return (       
        <div id="TicTacToe">
            <h1>TIC TAC TOE</h1>
            <Table tableData={tableData} dispatch={dispatch}/>
            <div id="result">{turn}턴 - 승자는 {winner}</div>
        </div>
    );
}

export default TicTacToe;