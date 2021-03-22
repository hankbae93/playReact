import React from 'react';
import { Link } from 'react-router-dom';
import './Navigation.css';

function Navigation() {
    return (
        <div id="navigation">
            <h1>Play React</h1>
            <ul>
                <li><Link to="/to_do_list">투두리스트</Link></li>
                <li><Link to="/mine_search">지뢰찾기</Link></li>
                <li><Link to="/number_baseball">숫자야구</Link></li>
                <li><Link to="/quiz_app">퀴즈 앱</Link></li>
                <li><Link to="/respon_check">반응속도 체크</Link></li>
                <li><Link to="/tictactoe">틱택토</Link></li>
                <li><Link to="/lotto">로또 추첨기</Link></li>
                <li><Link to="/book_search">책검색</Link></li>
            </ul> 
        </div>
    );
}

export default Navigation;