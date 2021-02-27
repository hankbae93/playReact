import React, { Component } from 'react';

class Choice extends Component {
    checkChoice = (e) => {
        const userChoice = e.target.dataset.choice;
        this.props.onCheck(userChoice);
    };

    render() {
        const { data,value } = this.props;
        return (
            <li onClick={this.checkChoice} data-choice={value}>
                {data}
            </li>
        );
    }
}

export default Choice;