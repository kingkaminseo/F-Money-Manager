import React, { useState, useEffect } from 'react';
import './home.css';
import Navber from './components/navbar';
import Modal from 'react-modal';
import Moneywrite from './components/write/moneyWirte';
import AddFriend from './components/friend';
import Show from './components/show';

// React Modal 설정
Modal.setAppElement('#root'); // 모달이 열릴 때 앱의 메인 요소를 설정

function Home() {
  const [open, setOpen] = useState(false);
  const [dates, setDates] = useState([]);
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  useEffect(() => {
    const generateCalendar = (year, month) => {
      const firstDayOfMonth = new Date(year, month, 1).getDay();
      const lastDateOfMonth = new Date(year, month + 1, 0).getDate();
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

    generateCalendar(currentYear, currentMonth);
  }, [currentYear, currentMonth]);

  useEffect(() => {
    if (localStorage.getItem('userName') == null) {
      alert("세션이 만료되었습니다. 재로그인이 필요합니다");
      window.location.href = './sign';
    }
  }, []);

  function toggleModal() {
    setOpen(prevOpen => !prevOpen);
  }

  const storedDays = localStorage.getItem('days') || '';
  const daysArray = storedDays.split(',').map(day => parseInt(day));
  const currentDate = new Date();
  let nowDate = currentDate.getDate();

  const goToNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  const goToPreviousMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  useEffect(() => {
    document.getElementById('left').innerText = '<';
    document.getElementById('right').innerText = '>';
  })

  return (
    <div className="home-container">
      <Navber />
      <div className="content">
        <div className="card calendar" style={{ textAlign: 'center' }}>
          <h2>달력</h2>
          <div style={{display : 'flex', justifyContent : 'center'}}>
          <button onClick={goToPreviousMonth} id='left' style={{backgroundColor : 'white', color : 'black'}}></button>
          <p style={{width : '200px'}}>{new Date(currentYear, currentMonth).toLocaleString('ko-KR', { year: 'numeric', month: 'long' })}</p>
          <button onClick={goToNextMonth} id='right' style={{backgroundColor : 'white', color : 'black'}}></button>
          
          </div>

          <table className="calendar-table" style={{ width: '90%', textAlign: 'center', marginLeft: '5%' }}>
            <thead>
              <tr style={{ border: '1px solid black' }}>
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
                      <a onClick={toggleModal} style={{
                        border: daysArray.includes(date) ? "2px solid red" : "none",
                        borderRadius: '50%',
                        textDecoration: nowDate === date ? 'underline' : 'none',
                        padding: '3px'
                      }}>
                        {date}
                      </a>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="card friends-list" style={{ position: 'relative' }}>
          <h2>친구 목록</h2>
          <p>현재 나의 친구</p>
          <h4 style={{ fontWeight: 'normal', position: 'absolute', top: 0, right: '30px', cursor: 'pointer' }}>
            <a href='#' onClick={toggleModal}>친구 추가 +</a>
          </h4>
          <Show />
        </div>
        <div className="card transaction-history" style={{ position: 'relative' }}>
          <h2>거래 기록</h2>
          <h4 style={{ fontWeight: 'normal', position: 'absolute', top: 0, right: '30px', cursor: 'pointer' }}>
            <a href='/Add'>기록 추가 +</a>
          </h4>
          <p>모든 거래 내역을 확인하세요.</p>
          <Moneywrite />
        </div>
        <div className="card loan-management">
          <h2>대출/상환 관리</h2>
          <p>대출 및 상환 내역을 관리하세요.</p>
        </div>
      </div>
      <Modal
        isOpen={open}
        className="ReactModal__Content"
        overlayClassName="ReactModal__Overlay"
        onRequestClose={toggleModal}>
        <div className="modal-header">
          친구추가
        </div>
        <div className="modal-body">
          <AddFriend />
        </div>
        <div className="modal-footer">
          <button className="open-button" onClick={toggleModal}>닫기</button>
        </div>
      </Modal>
    </div>
  );
}

export default Home;
