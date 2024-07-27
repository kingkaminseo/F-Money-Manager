import { useState } from "react";
import Modal from 'react-modal';

function Navber() {


    const [open, setOpen] = useState("none");
    

    function oopen() {
        setOpen(open === "none" ? "block" : "none");
    }

    function toggleModal() {
        setOpen(prevOpen => !prevOpen);
      }
    

    return (
        <div className="header">
            <h1>F-Money Manager</h1>
            <p>친구들과의 돈 관리를 간편하게
                <div style={{position:'fixed', right: '100px',top: '60px'}}>
                    <i style={{textAlign: 'right', }}><a onClick={oopen}>{localStorage.getItem('userName')+`님`}▿</a></i>
                    <div style={{display : open, border: '1px solid black', }}>
                        <a href="#" onClick={toggleModal}>
                        로그아웃
                        </a>
                    </div>

                </div>
            </p>
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

export default Navber;