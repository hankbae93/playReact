import React, { useState, useEffect } from 'react';
import Form from './components/Form';
import ToDolist from './components/ToDolist';

const App = () => {    
    const [todos, setTodos] = useState([]);

    useEffect(()=> {
        getLocalTodos();
    }, []);

    useEffect(() => {                   
        saveLocalTodos();
    }, [todos]);         

    const saveLocalTodos = () => {
        localStorage.setItem('todos', JSON.stringify(todos)); 
    }

    const getLocalTodos = () => {        
        if (localStorage.getItem('todos')) {
            const getTodos = JSON.parse(localStorage.getItem('todos'));
            setTodos(getTodos);
        }
    };
    
    return (        
        <div className="App">
            <h1>RanJa ToDoLIST</h1>
            <Form 
                todos={todos}
                setTodos={setTodos}
            />
            <ToDolist
                todos={todos}
                setTodos={setTodos}
            />
        </div>
    );
}

export default App;
