import React, { Component } from 'react';

class ToDo extends Component {
    render() {
        const { value, id, onDelete } = this.props;
        return(
            <li id={id} data-value={value}>
                {value}
                <button onClick={onDelete}>삭제</button>
            </li>
        );
    }
}

export default ToDo;