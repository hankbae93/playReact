import React, { useContext, memo, useCallback } from 'react';
import { CODE, TableContext, FLAG_CELL, QMARK_CELL, NORMALIZE_CELL, OPEN_CELL, CLICK_MINE } from './../App';

const getTdStyle = (code) => {
    switch (code) {      
        case CODE.NORMAL :  
        case CODE.MINE :
            return {
                background : '#2b2b2b',
                color : '#fff',
                borderColor : '#fff'
            };
        case CODE.FLAG :
        case CODE.FLAG_MINE :
            return {
                background : '#00917c',
                color : '#2b2b2b',
            };
        case CODE.QMARK :
        case CODE.QMARK_MINE :
            return {
                background : '#ffbe0f',                
            };        
        case CODE.OPENED :
        case CODE.CLICK_MINE : 
            return {
                background : '#fff',
                color : '#2b2b2b',
            }
        default:
            return {
                background : '#fff',
                color : '#2b2b2b',
                borderColor : '#2b2b2b'
            }
    }
};

const getTdText = (code) => {
    switch (code) {
        case CODE.NORMAL:
            return '';
        case CODE.MINE:
            return 'X';
        case CODE.FLAG:
        case CODE.FLAG_MINE:
            return '🚩';
        case CODE.QMARK:
        case CODE.QMARK_MINE:
            return '❔';
        case CODE.CLICK_MINE:
            return '펑!';
        default:
            return code || '';
    }
};

const Td = memo(({ rowIndex, cellIndex }) => {
    const { tableData, dispatch, halted } = useContext(TableContext);

    const onClickTd = useCallback(() => {
        if(halted) return;
        switch(tableData[rowIndex][cellIndex]) {
            case CODE.NORMAL:
                dispatch({ type: OPEN_CELL, row: rowIndex, cell: cellIndex });
                return;
            case CODE.MINE:
                dispatch({ type: CLICK_MINE, row: rowIndex, cell: cellIndex });
                return;
        }
    },[tableData[rowIndex][cellIndex],halted])

    const onRightClickTd = useCallback((e) => {
        e.preventDefault();
        if(halted) return;
        switch(tableData[rowIndex][cellIndex]) {
            case CODE.NORMAL :
            case CODE.MINE :
                dispatch({ type: FLAG_CELL, row: rowIndex, cell: cellIndex });
                return;
            case CODE.FLAG :       
            case CODE.FLAG_MINE : 
                dispatch({ type: QMARK_CELL, row: rowIndex, cell: cellIndex });           
                return;                  
            case CODE.QMARK :
            case CODE.QMARK_MINE:  
                dispatch({ type: NORMALIZE_CELL, row: rowIndex, cell: cellIndex});              
                return;            
            default:
                return;
        }
    },[tableData[rowIndex][cellIndex],halted]);
                

    return (
        <td style={getTdStyle(tableData[rowIndex][cellIndex])} onClick={onClickTd} onContextMenu={onRightClickTd}>
            {getTdText(tableData[rowIndex][cellIndex])}
        </td>
    );
})

export default Td;