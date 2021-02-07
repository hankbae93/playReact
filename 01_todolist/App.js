import React, { Component } from 'react';
import ToDo from './ToDo';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',  
      todos: []
    };
  }

  onSubmitTodos = (e) => {
    const { todos, value } = this.state;
    e.preventDefault();
    this.setState({
      todos: [
        ...todos,
        {'key' : `todo_${value}`, 'value': value}
      ],
      value: ''
    });
  };

  onChangeInput = (e) => {
    this.setState({
      value: e.target.value
    });
  };

  deleteTOdo = (e) => {
    const a = e.target.parentElement;
    const { todos } = this.state;
    this.setState({
      todos: todos.filter(todo => `${todo.value}` !== `${a.dataset.value}`)
    });   
  }  

  render() {
    const { value, todos } = this.state;
    return(
      <div className="App">
          <form onSubmit={this.onSubmitTodos}>
            <input 
            value={value}
            onChange={this.onChangeInput}
            />
          </form>
          <ul>
            {todos.map((todo, i) => {
              return (
                <ToDo 
                key={Math.random()}
                id={i}
                value={todo.value}    
                onDelete={this.deleteTOdo}       
                />
              );
            })}
          </ul>
          
      </div>
    );
  }
}

export default App;
