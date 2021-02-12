import React from 'react';
import ToDo from './ToDo';

const ToDolist = ({ todos, setTodos }) => {
    return (
        <ul>
            {todos.map((item, i) => {
                return (
                    <ToDo
                    text={item.content}
                    id={i}
                    key={item.content + i}
                    todos={todos}
                    setTodos={setTodos}
                    />
                );
            })}
        </ul>
    );
};

export default ToDolist;