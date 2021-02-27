import React, { useEffect } from 'react';
import Tr from './Tr';

const Table = ({ tableData, dispatch }) => {
    useEffect(() => {},
    [tableData])
    return (
        <table>
            <tbody>
                {Array(tableData.length).fill().map((tr, i) => {
                    return <Tr 
                    key={i}
                    rowIndex={i}
                    rowData={tableData[i]}
                    dispatch={dispatch}
                    />
                })}
            </tbody>
        </table>
    );
}

export default Table;