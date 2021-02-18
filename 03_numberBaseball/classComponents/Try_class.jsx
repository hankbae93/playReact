import React, { PureComponent } from 'react';

class Try extends PureComponent {
    render () {
        const { tryInfo } = this.props;
        return (
            <li>
                {tryInfo.count}번째 시도
                <strong>"{tryInfo.try}"</strong> - {tryInfo.result}
            </li>
        );
    }
}

export default Try;