import React, { useState } from 'react';
import '../components/sign/Login.css';
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-auth.js";
import { getFirestore, doc, updateDoc } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-firestore.js";
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

    const [description, setDescription] = useState('');
    const [number, setNumber] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleAddInfo = async (e) => {
        e.preventDefault();

        if (!auth.currentUser) {
            console.error("사용자가 로그인하지 않았습니다.");
            setError("사용자가 로그인하지 않았습니다.");
            return;
        }

        try {
            const userId = auth.currentUser.uid;
            const userDocRef = doc(db, "users", userId);
            await updateDoc(userDocRef, {
                description: description,
                number: number
            });

            console.log("정보가 성공적으로 업데이트되었습니다.");
            setSuccess('정보가 성공적으로 업데이트되었습니다!');
            setError('');
        } catch (error) {
            console.error("정보 업데이트 실패", error);
            setError("정보 업데이트 실패.");
            setSuccess('');
        }
    };

    return (
        <>
            <Navber />
            <div className="container">
                <form onSubmit={handleAddInfo}>
                    <h1>서약서</h1>
                    <label htmlFor="description">대출자 성함</label>
                    <input
                        type="text"
                        placeholder='성함'
                        id='description'
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="sginInput"
                    />

                    <label htmlFor='provider-name'>대출 제공자 성함</label>
                    <input
                        type="text"
                        id="provider-name"
                        value={number}
                        onChange={(e) => setNumber(e.target.value)}
                        className="sginInput"
                    />

                    <label htmlFor='amount'>대출금</label>
                    <input
                        type="number"
                        id="amount"
                        value={number}
                        onChange={(e) => setNumber(e.target.value)}
                        className="sginInput"
                    />

                    <label htmlFor='purchase'>무엇을 샀습니까?</label>
                    <input
                        type="text"
                        id="purchase"
                        value={number}
                        onChange={(e) => setNumber(e.target.value)}
                        className="sginInput"
                    />

                    <label htmlFor='repayment'>언제 갚을 것입니까?</label>
                    <input
                        type="date"
                        id="repayment"
                        value={number}
                        onChange={(e) => setNumber(e.target.value)}
                        className="sginInput"
                    />

                    <label htmlFor='default-condition'>안 갚을 시 조건</label>
                    <input
                        type="text"
                        id="default-condition"
                        value={number}
                        onChange={(e) => setNumber(e.target.value)}
                        className="sginInput"
                    />

                    <label htmlFor='details'>기타 상세 정보</label>
                    <textarea
                        id="details"
                        value={number}
                        onChange={(e) => setNumber(e.target.value)}
                        className="sginInput"
                    ></textarea>

                    <button type="submit">정보 추가</button>
                    {error && <p className='error-message'>{error}</p>}
                    {success && <p className='success-message'>{success}</p>}
                </form>
            </div>
        </>
    );
}

export default Add;
