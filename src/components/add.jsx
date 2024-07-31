import React, { useState, useEffect } from 'react';
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-auth.js";
import { getFirestore, doc, updateDoc, getDoc } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-firestore.js";
import Navber from './navbar';

function Add() {
    const firebaseConfig = {
        apiKey: "AIzaSyDIIMXKdc0TSdBqSf1PlDsMAHC97Nbhxmw",
        authDomain: "f-money-8a633.firebaseapp.com",
        projectId: "f-money-8a633",
        storageBucket: "f-money-8a633.appspot.com",
        messagingSenderId: "379252633035",
        appId: "1:379252633035:web:ceaa239b534e003b9cda4e",
        measurementId: "G-91BPGENQZG"
    };

    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);
    const db = getFirestore(app);

    const [sendName, setSendName] = useState('');
    const [postName, setPostName] = useState('');
    const [money, setMoney] = useState('');
    const [how, setHow] = useState('');
    const [payback, setPayback] = useState('');
    const [rull, setRull] = useState('');
    const [details, setDetails] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [entries, setEntries] = useState([]);



    useEffect(() => {
        const fetchData = async () => {
            if (!auth.currentUser) return;

            try {
                const userId = auth.currentUser.uid;
                const userDocRef = doc(db, "users", userId);
                const userDoc = await getDoc(userDocRef);
                if (userDoc.exists()) {
                    const userData = userDoc.data();
                    setEntries(userData.entries || []);
                }
            } catch (error) {
                console.error("정보를 가져오는 데 실패했습니다.", error);
            }
        };

        fetchData();
    }, [auth.currentUser, db]);

    const handleAddInfo = async (e) => {
        e.preventDefault();
        console.log(how)
        if (!sendName || !postName || !money || !how || !payback || !rull || !details) {
          console.log("빈값이 있습니다");
          setError("비어있는 정보가 있습니다.");
          document.getElementById('containter').style.border = "2px solid red"
          return;
      } else {
          console.log("들어감")
          
          setError("");
        }
        if (!auth.currentUser) {
            console.error("사용자가 로그인하지 않았습니다.");
            setError("사용자가 로그인하지 않았습니다.");
            return;
        }

        const newEntry = {
            sendName,
            postName,
            money,
            how,
            payback,
            rull,
            details
        };

        const updatedEntries = [...entries, newEntry];

        try {
            const userId = auth.currentUser.uid;
            const userDocRef = doc(db, "users", userId);
            await updateDoc(userDocRef, { entries: updatedEntries });

            setEntries(updatedEntries);
            setSuccess('정보가 성공적으로 업데이트되었습니다!');
            setError('');
            setSendName('');
            setPostName('');
            setMoney('');
            setHow('');
            setPayback('');
            setRull('');
            setDetails('');
            document.getElementById('containter').style.border = "2px solid green";
            window.location.href = './'
           
            
        } catch (error) {
            console.error("정보 업데이트 실패", error);
            document.getElementById('containter').style.border = "2px solid red"
            setError("정보 업데이트 실패.");
            setSuccess('');
        }
    };

    return (
        <>
            <Navber />
            <div className="container" id='containter' style={{marginBottom: '100px'}}>
                <form onSubmit={handleAddInfo}>
                    <h1>서약서</h1>
                    <label htmlFor="sendName">대출자 성함</label>
                    <input
                        type="text"
                        placeholder='성함'
                        id='sendName'
                        value={sendName}
                        onChange={(e) => setSendName(e.target.value)}
                        className="sginInput"
                    />

                    <label htmlFor='postName'>대출 제공자 성함</label>
                    <input
                        type="text"
                        placeholder='성함'
                        id="postName"
                        value={postName}
                        onChange={(e) => setPostName(e.target.value)}
                        className="sginInput"
                    />

                    <label htmlFor='money'>대출금</label>
                    <input
                        type="number"
                        id="money"
                        value={money}
                        onChange={(e) => setMoney(e.target.value)}
                        className="sginInput"
                    />

                    <label htmlFor="how">어디에 소비할 것인가요?</label>
                    <select
                        id='how'
                        value={how}
                        onChange={(e) => setHow(e.target.value)}
                        className='sginInput'
                    >
                        <option value="" disabled>--선택해주세요--</option>
                        <option value="취미・여가">취미・여가</option>
                        <option value="이체">이체</option>
                        <option value="식비">식비</option>
                        <option value="카페・간식">카페・간식</option>
                        <option value="편의점・마트・잡화">편의점・마트・잡화</option>
                        <option value="쇼핑">쇼핑</option>
                        <option value="의료・건강・피트니스">의료・건강・피트니스</option>
                        <option value="교통・자동차">교통・자동차</option>
                        <option value="보험・세금・기타금융">보험・세금・기타금융</option>
                    </select>

                    <label htmlFor='payback'>언제 갚을 것입니까?</label>
                    <input
                        type="date"
                        id="payback"
                        value={payback}
                        onChange={(e) => setPayback(e.target.value)}
                        className="sginInput"
                    />

                    <label htmlFor='rull'>안 갚을 시 조건</label>
                    <input
                        type="text"
                        id="rull"
                        value={rull}
                        onChange={(e) => setRull(e.target.value)}
                        className="sginInput"
                    />

                    <label htmlFor='details'>기타 상세 정보</label>
                    <textarea
                        id="details"
                        value={details}
                        onChange={(e) => setDetails(e.target.value)}
                        className="sginInput"
                        style={{resize: 'vertical'}}
                    ></textarea>

                    {error && <p className='error-message' style={{color : 'red'}}>{error}</p>}
                    <button type="submit">서약서 작성</button>
             
                    {success && <p className='success-message'>{success}</p>}
                </form>
            </div>
        </>
    );
}

export default Add;
