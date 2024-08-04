import React, { useState, useEffect } from 'react';
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-auth.js";
import { getFirestore, doc, updateDoc, getDoc } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-firestore.js";
import Navber from './navbar';

function AddFriend() {
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

    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [friend, setFriend] = useState([]);
    const [friendname, setFriendname] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            if (!auth.currentUser) return;

            try {
                const userId = auth.currentUser.uid;
                const userDocRef = doc(db, "users", userId);
                const userDoc = await getDoc(userDocRef);
                if (userDoc.exists()) {
                    const userData = userDoc.data();
                    setFriend(userData.friend || []);
                }
            } catch (error) {
                console.error("정보를 가져오는 데 실패했습니다.", error);
            }
        };

        fetchData();
    }, [auth.currentUser, db]);

    const handleAddInfo = async (e) => {
        e.preventDefault();
        if (!auth.currentUser) {
            console.error("사용자가 로그인하지 않았습니다.");
            setError("사용자가 로그인하지 않았습니다.");
            return;
        }

        const newEntry2 = {
            friendname
        };

        const updatedFriend = [...friend, newEntry2];

        try {
            const userId = auth.currentUser.uid;
            const userDocRef = doc(db, "users", userId);
            await updateDoc(userDocRef, { friend: updatedFriend });

            setFriend(updatedFriend);
            setSuccess('정보가 성공적으로 업데이트되었습니다!');
            setError('');

            const containerElement = document.getElementById('container');
            if (containerElement) {
                containerElement.style.border = "2px solid green";
            }

            window.location.href = './';
        } catch (error) {
            console.error("정보 업데이트 실패", error);
            const containerElement = document.getElementById('container');
            if (containerElement) {
                containerElement.style.border = "2px solid red";
            }
            setError("정보 업데이트 실패.");
            setSuccess('');
        }
    };

    return (
        <>
            <Navber />
                <form onSubmit={handleAddInfo}>
                    <label htmlFor="sendName">친구 성함</label>
                    <input
                        type="text"
                        placeholder='성함을 입력하세요'
                        id='sendName'
                        value={friendname}
                        onChange={(e) => setFriendname(e.target.value)}
                        className="sginInput"
                    />
                    {error && <p className='error-message' style={{ color: 'red' }}>{error}</p>}
                    <button type="submit">친구 추가하기</button>
                    {success && <p className='success-message'>{success}</p>}
                </form>
        </>
    );
}

export default AddFriend;
