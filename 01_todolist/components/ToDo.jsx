import React, { memo } from 'react';

const ToDo = memo(({ text, id, todos, setTodos }) => {      
    const deleteToDo = () => {
        setTodos(todos.filter(todo => todo.content !== text));        
    };
    
    return (
        <li id={id}>
            {text}
            <button onClick={deleteToDo} >삭제</button>
        </li>
    );
});

export default ToDo;