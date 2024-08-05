import React, { useEffect, useState } from 'react';
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-auth.js";
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-firestore.js";
import Navber from './navbar';

function Show() {
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

    const [friends, setFriends] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchFriends = async (user) => {
            try {
                const userDocRef = doc(db, "users", user.uid);
                const userDoc = await getDoc(userDocRef);
                if (userDoc.exists()) {
                    const userData = userDoc.data();
                    setFriends(userData.friend || []);
                } else {
                    console.error("No such document!");
                }
                setLoading(false);
            } catch (error) {
                console.error("Error getting document:", error);
                setError("데이터를 가져오는 데 실패했습니다.");
                setLoading(false);
            }
        };

        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                fetchFriends(user);
            } else {
                setError("사용자가 로그인하지 않았습니다.");
                setLoading(false);
            }
        });

        return () => unsubscribe();
    }, [auth, db]);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div style={{overflow: 'scroll', height : '160px'}}>

        <div style={{zIndex: '0', backgroundColor: '#ffffff', margin: '0', padding: '0', boxShadow: 'inset 0px 0px 6px 1px rgb(215, 206, 206)'}}>
                {error && <p className="error-message">{error}</p>}
                <ul className="friends-list" style={{margin: '0', padding: '0'}}>
                    {friends.map((friend, index) => (
                        <li key={index} className="friend-item" style={{padding : '15px', borderTop: index == 0 ? 'none' : '1px dashed #d6cfcf'}}>
                            {friend.friendname}
                        </li>
                        
                    ))}
                </ul>
        </div>
        </div>
    );
}

export default Show;
