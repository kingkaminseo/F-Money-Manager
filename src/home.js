import React from 'react';
import './home.css';
import Navber from './components/navbar';

function Home() {
  function check () {
  if (localStorage.getItem('userName') == null) {
    alert("값이 비었습니다")
  }  else {
    alert ("일단 알았습니다.")
  }
}
    return (
        <div className="home-container">
          <Navber />
            <div className="content">
                <div className="card calendar">
                    <h2>달력</h2>
                    <p>여기에 달력 컴포넌트를 추가하세요.</p>
                </div>
                <div className="card friends-list">
                    <h2>친구 목록</h2>
                    <p>친구들을 관리하세요.</p>
                </div>
                <div className="card transaction-history">
                    <h2>거래 기록</h2>
                    <p>모든 거래 내역을 확인하세요.</p>
                </div>
                <div className="card loan-management">
                    <h2>대출/상환 관리</h2>123
                    <p>대출 및 상환 내역을 관리하세요.</p>
                </div>
                <button onClick={window.localStorage.clear()}>값삭제하기</button>
                <button onClick={check()}>로그인 확인하기</button>
            </div>
        </div>
    );
}

export default Home;
