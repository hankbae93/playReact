import React, { useReducer, createContext, useEffect, useMemo } from 'react';
import Form from './components/Form';
import Table from './components/Table';
import './MineSearch.css';
export const CODE = {
    NORMAL : -1,
    FLAG : -2,
    QMARK : -3,
    FLAG_MINE : -4,
    QMARK_MINE : -5,
    CLICK_MINE: -6,
    MINE : -7,
    OPENED : 0,
}

export const TableContext = createContext({
    tableData: [],
    halted: true,
    dispatch: () => {},
});

const plantMine = (row, cell, mine) => {
    // 테이블 데이타 생성
    const data = []; 
    for (let i = 0; i < row; i++) {
        const tr = [];
        for (let j = 0; j < cell; j++) {
            tr[j] = CODE.NORMAL;
        }
        data.push(tr);
    }
    // 마인 랜덤으로 심기
    const shuffle = Array(row * cell)
        .fill()
        .map((v, i) => i)
        .sort(() => Math.random() - 0.5);
    for (let k = 0; k < mine; k++) {
        const row = Math.floor(shuffle[k] / cell);
        const col = shuffle[k] % cell;
        data[row][col] = CODE.MINE;
    }    
    
    return data;
}

const initialState = {
    data: {
        row: 0,
        cell: 0,
        mine: 0
    },
    tableData : [],
    timer : 0,
    openCount: 0,
    result : '',    
    halted: true,
};

// action.type
export const START_GAME = 'START_GAME';
export const FLAG_CELL = 'FLAG_CELL';
export const QMARK_CELL = 'QMARK_CELL';
export const NORMALIZE_CELL = 'NORMALIZE_CELL';
export const OPEN_CELL = 'OPEN_CELL';
export const CLICK_MINE = 'CLICK_MINE';
export const INCREMENT_TIMER = 'INCREMENT_TIMER';

const reducer = (state, action) => {
    switch (action.type) {
        case  START_GAME :                       
            return {
                ...state,
                data: {
                    row: action.row,
                    cell: action.cell,
                    mine: action.mine
                },
                tableData : plantMine(action.row, action.cell, action.mine),
                timer : 0,
                openCount: 0,
                result : '',    
                halted: false, 
            };
        case OPEN_CELL: {
            const tableData = [...state.tableData];
            const row = action.row;
            const cell = action.cell;
            let open_count = 0;
            const checked = [];
                           
                
            const checkAround = (row, cell) => {
                if (row < 0 || row >= tableData.length || cell < 0 || cell >= tableData[0].length) return;
                if([CODE.OPENED, CODE.FLAG, CODE.FLAG_MINE, CODE.QUESTION_MINE, CODE.QUESTION].includes(tableData[row][cell])) return;
                if (checked.includes(row + '/' + cell)) {
                    return;
                } else {
                    checked.push(row + '/' + cell);
                } // 한 번 연칸은 무시하기
                
                const around = [tableData[row][cell - 1], tableData[row][cell + 1]];
                if (tableData[row + 1]) { // 클릭한 칸보다 윗줄이 있을 시
                    around.push(
                        tableData[row + 1][cell -1], tableData[row + 1][cell], tableData[row + 1][cell + 1]
                    );
                }
                if (tableData[row - 1]) { // 클릭한 칸보다 아랫줄이 있을 시
                    around.push(
                        tableData[row - 1][cell -1], tableData[row - 1][cell], tableData[row - 1][cell + 1]
                    );
                }
                const mineCount = around.filter((v) => v < CODE.FLAG_MINE).length;
                if (mineCount === 0) {
                    const reClickList = [[row, cell -1], [row, cell + 1]];
                    if (row - 1 > -1) { // 클릭한 칸보다 윗줄이 있을 시
                        reClickList.push(
                            [row - 1, cell -1], [row - 1, cell], [row - 1, cell + 1]
                        );
                    }
                    if (row + 1 < tableData.length) { // 클릭한 칸보다 아랫줄이 있을 시
                        reClickList.push(
                            [row + 1, cell -1], [row + 1, cell], [row + 1, cell + 1]
                        );
                    }                        
                    reClickList.forEach((num) => {                            
                        if (tableData[num[0]][num[1]] !== CODE.OPENED) {
                            checkAround(num[0],num[1]);
                        }                            
                    });
                            
                }   
                if(tableData[row][cell] === CODE.NORMAL) {
                    open_count += 1;
                }                   
                tableData[row][cell] = mineCount;
            }
            checkAround(row, cell);

            let halted = false;
            let result = '';                
            if (state.openCount + open_count === state.data.row * state.data.cell - state.data.mine) {
                halted = true;
                result = `${state.timer}초만에 승리하셨습니다~`;
            }
            return {
                ...state,
                tableData,
                openCount: state.openCount + open_count,
                halted,
                result
            }
        }   
        case CLICK_MINE : {
            const tableData = [...state.tableData];
            tableData[action.row][action.cell] = CODE.CLICK_MINE;            
            return {
                ...state,
                tableData,
                halted: true,
                result: '실패하셨습니다!',
            }
        }
        case FLAG_CELL : { 
            const tableData = [...state.tableData];
            if (tableData[action.row][action.cell] === CODE.MINE) {                
                tableData[action.row][action.cell] = CODE.FLAG_MINE;
            } else {                
                tableData[action.row][action.cell] = CODE.FLAG;
            }
            return {
                ...state,
                tableData
            } 
        }
        case QMARK_CELL : {
            const tableData = [...state.tableData];
            if (tableData[action.row][action.cell] === CODE.FLAG_MINE) {                
                tableData[action.row][action.cell] = CODE.QMARK_MINE;
            } else {                
                tableData[action.row][action.cell] = CODE.QMARK;
            }
            return {
                ...state,
                tableData
            }
        }              
        case NORMALIZE_CELL : {
            const tableData = [...state.tableData];
            if (tableData[action.row][action.cell] === CODE.QMARK_MINE) {                
                tableData[action.row][action.cell] = CODE.MINE;
            } else {                
                tableData[action.row][action.cell] = CODE.NORMAL;
            }
            return {
                ...state,
                tableData
            }
        }              
        case INCREMENT_TIMER : 
            return {
                ...state,
                timer: state.timer + 1
            }
        default:
            return state;
    }
};

const MineSearch = () => {
    const [ state, dispatch ] = useReducer(reducer, initialState);
    const { tableData, halted, timer, result, openCount } = state;

    const value = useMemo(() => {
        return { halted, tableData, dispatch }
    }, [tableData, halted])
    
    useEffect(() => {
        let timer;
        if (halted === false) {
            timer = setInterval(() => {
                dispatch({ type: INCREMENT_TIMER })
            }, 1000);
        }
        return () => {
            clearInterval(timer);
        }
    },[halted])


    return (        
        <TableContext.Provider value={value}>
            <div id="MineSearch">
                <Form/>
                <Table />      
                <div className="status">
                    <p>{result}</p>     
                    {halted ? null : <div>{timer}초</div>}
                </div>
            </div>
        </TableContext.Provider>        
    );
}
        

export default MineSearch;
                    

            

