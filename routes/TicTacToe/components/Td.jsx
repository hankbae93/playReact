import React, {memo, useRef} from 'react';
import {CLICK_CELL} from '../TicTacToe';

const Td = memo(({ rowIndex, cellIndex, cellData, dispatch }) => {   
    const ref = useRef();
    const onClickTd = () => {
        if(cellData) return;
        dispatch({
            type: CLICK_CELL,
            rowIndex,
            cellIndex
        });        
        ref.current.classList.add('open');
    }
    return (
        <td ref={ref} onClick={onClickTd}>
            {cellData}
        </td>
    );
})

export default Td;