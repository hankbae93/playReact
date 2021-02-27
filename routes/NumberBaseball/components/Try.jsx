import React, { memo } from 'react';

const Try = memo(({ data }) => {
    return (
        <li>
            {data.count}번째 시도
            <strong>"{data.try}"</strong> - {data.result}
        </li>
    );
});


export default Try;