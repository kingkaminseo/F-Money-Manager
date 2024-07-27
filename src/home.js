import React, { useState, useEffect } from 'react';
import './home.css';
import Navber from './components/navbar';
import Modal from 'react-modal';

// React Modal 설정
Modal.setAppElement('#root'); // 모달이 열릴 때 앱의 메인 요소를 설정

function Home() {
  const [open, setOpen] = useState(false);
  const [dates, setDates] = useState([]);

  useEffect(() => {
    const generateCalendar = () => {
      const currentDate = new Date();
      const currentYear = currentDate.getFullYear();
      const currentMonth = currentDate.getMonth();
      
      const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
      const lastDateOfMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
      
      const calendarDates = [];
      let date = 1;
      
      for (let i = 0; i < 6; i++) {
        const week = [];
        for (let j = 0; j < 7; j++) {
          if (i === 0 && j < firstDayOfMonth) {
            week.push('');
          } else if (date > lastDateOfMonth) {
            week.push('');
          } else {
            week.push(date);
            date++;
          }
        }
        calendarDates.push(week);
      }
      
      setDates(calendarDates);
    };
    
    generateCalendar();
  }, []);

    if (localStorage.getItem('userName') == null) {
      alert("세션이 만료되었습니다. 재로그인이 필요합니다");
      window.location.href = './sign';
    } else {
    }
  

  function toggleModal() {
    setOpen(prevOpen => !prevOpen);
  }

  return (
    <div className="home-container">
      <Navber />
      <div className="content">
        <div className="card calendar" style={{textAlign: 'center'}}>
          <h2>달력</h2>
          <p>{new Date().toLocaleString('ko-KR', { year: 'numeric', month: 'long' })}</p>
          <table className="calendar-table" style={{ width:'90%', textAlign:'center', marginLeft: '5%'}}>
            <thead>
              <tr style={{border: '1px solid black'}}>
                <th>일</th>
                <th>월</th>
                <th>화</th>
                <th>수</th>
                <th>목</th>
                <th>금</th>
                <th>토</th>
              </tr>
            </thead>
            <tbody>
              {dates.map((week, weekIndex) => (
                <tr key={weekIndex}>
                  {week.map((date, dateIndex) => (
                    <td key={dateIndex} className={date ? "day" : "empty"}>
                        <a onClick={toggleModal}>
                      {date}
                      </a>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
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
        <button>로그인 확인하기</button>
      </div>
      <button onClick={toggleModal}>모달 창 띄우기</button>
      <Modal
        isOpen={open}
        className="ReactModal__Content"
        overlayClassName="ReactModal__Overlay"
        onRequestClose={toggleModal}
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
