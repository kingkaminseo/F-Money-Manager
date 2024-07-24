import React, { useState } from 'react';
import './home.css';
import Navber from './components/navbar';
import Modal from 'react-modal';

// React Modal 설정
Modal.setAppElement('#root'); // 모달이 열릴 때 앱의 메인 요소를 설정

function Home() {
  const [open, setOpen] = useState(false);

  function check() {
    if (localStorage.getItem('userName') == null) {
      alert("세션이 만료되었습니다. 재로그인이 필요합니다");
    } else {
      alert("일단 알았습니다.");
    }
  }

  function toggleModal() {
    setOpen(prevOpen => !prevOpen);
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
          <h2>대출/상환 관리</h2>
          <p>대출 및 상환 내역을 관리하세요.</p>
        </div>
        <button onClick={check}>로그인 확인하기</button>
      </div>
      <button onClick={toggleModal}>모달 창 띄우기</button>
      <Modal
        isOpen={open}
        onRequestClose={toggleModal}
        className="ReactModal__Content"
        overlayClassName="ReactModal__Overlay"  
      >
        <div className="modal-header">
          모달입니다.
        </div>
        <div className="modal-body">
          <p>여기에 모달 내용을 추가하세요.</p>
        </div>
        <div className="modal-footer">
          <button className="close-button" onClick={toggleModal}>닫기</button>
        </div>
      </Modal>
    </div>
  );
}

export default Home;
