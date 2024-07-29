import React, { useState, useEffect } from 'react';
import '../components/sign/Login.css'
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
    const [number, setNumber] = useState(0);
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
            const userId = auth.currentUser.uid;  // 현재 로그인한 사용자의 ID를 가져옵니다
            const userDocRef = doc(db, "users", userId);  // 현재 사용자의 문서 참조를 가져옵니다
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
                <h1>추가 정보 입력</h1>
                <label htmlFor="description">설명</label>
                <input type="text" placeholder='설명' id='description' value={description} onChange={(e) => setDescription(e.target.value)}/>

                <label htmlFor='number'>가격정보같은거라도 입력</label>
                <input type="number" id="number" value={number} onChange={(e) => setNumber(e.target.value)}/>
                <button type="submit">정보 추가</button>
                <p id='error' style={{color:'red'}}>{error}</p>
                <p id='success' style={{color: 'green'}}>{success}</p>
            </form>
        </div>
        </>
    );
}

export default Add;
