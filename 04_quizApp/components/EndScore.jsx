import React, { PureComponent } from 'react';

class EndScore extends PureComponent {    
    render() {
        const { score, data } = this.props;
        const SCORE = Math.floor(score * (100/ data.length));
        return (
            <div className="score">
                <p>
                    <strong>{SCORE}</strong>
                    <i> / 100점</i>
                </p>
                <div>
                    {SCORE >= 50 ? "당신은 아이유에 대해 좀 아시는군요" : "당신은 아이유에 대해 조금도 모르시는군요;;"}
                </div>
            </div>
        );
    }
}

export default EndScore;