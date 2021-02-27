import React, { useContext, memo } from 'react';
import { TableContext } from '../MineSearch';
import Tr from './Tr';

const Table = memo(() => {
    const { tableData } = useContext(TableContext);
    return (
        <table>
            <tbody>      
                {tableData.map((v, i) => {
                    return <Tr key={i} rowIndex={i} />
                })}          
                
            </tbody>
        </table>
    );
})

export default Table;