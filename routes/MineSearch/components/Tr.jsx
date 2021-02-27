import React, { useContext, memo } from 'react';
import { TableContext } from '../MineSearch';
import Td from './Td';

const Tr = memo(({ rowIndex }) => {
    const { tableData } = useContext(TableContext);
    return (
        <tr>
            {tableData[rowIndex].map((v, i) => {
                return <Td key={i} rowIndex={rowIndex} cellIndex={i}/>
            })}
        </tr>
    );
})

export default Tr;