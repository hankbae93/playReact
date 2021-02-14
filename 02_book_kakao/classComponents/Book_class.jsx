import React, { Component } from 'react';

class Books extends Component {
    render() {
        const { data } = this.props;
        return(
            <li>
                <div>
                    <h3>{data.authors[0]} - "{data.title}"</h3>
                    <p>{Boolean(data.contents) ? data.contents : "소개글이 없습니다."}</p>
                </div>                                
                <img src={data.thumbnail}/>
            </li>
        );
    }
}
export default Books;