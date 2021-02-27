import React, { useState, memo } from 'react';

const Form = memo(({ todos, setTodos }) => {
    const [value, setValue] = useState('');
    const onSubmitToDo = (e) => {
        e.preventDefault();
        setTodos([
            ...todos,
            { content: value }
        ]);
        setValue('');          
    };

    const onChangeInput = (e) => {        
        setValue(e.target.value);
    };   

    return (
        <form onSubmit={onSubmitToDo}>
                <input
                    value={value}
                    onChange={onChangeInput}
                />
        </form>
    );
});

export default Form;
