import React, { useState, useContext, memo, useCallback } from 'react';
import { TableContext } from './../App';

const Form = memo(() => {
    const [row, setRow] = useState(10);
    const [cell, setCell] = useState(10);
    const [mine, setMine] = useState(20);
    const { dispatch } = useContext(TableContext);

    const onChangeRow = useCallback((e) => {
        setRow(e.target.value);
    },[row]);

    const onChangeCell = useCallback((e) => {
        setCell(e.target.value);
    },[cell]);

    const onChangeMine = useCallback((e) => {
        setMine(e.target.value);
    },[mine]);

    const onSubmitForm = useCallback((e) => {
        e.preventDefault();
        dispatch({
            type: 'START_GAME',
            row,
            cell,
            mine
        });
    },[row, cell, mine]);

    return (
        <form className="create_game" onSubmit={onSubmitForm}>            
            <input type="number" placeholder="세로" value={row} onChange={onChangeRow}/>               
            <input type="number" placeholder="가로" value={cell} onChange={onChangeCell}/>            
            <input type="number" placeholder="지뢰갯수" value={mine} onChange={onChangeMine}/>
            <button type="submit">시작</button>         
        </form>
    );
})

export default Form;