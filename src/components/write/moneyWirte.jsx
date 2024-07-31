import React, { useEffect, useState } from 'react';
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-auth.js";
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-firestore.js";

function Moneywrite() {
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

    const [entries, setEntries] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchEntries = async (user) => {
            try {
                const userDocRef = doc(db, "users", user.uid);
                const userDoc = await getDoc(userDocRef);
                if (userDoc.exists()) {
                    const userData = userDoc.data();
                    setEntries(userData.entries || []);
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
                fetchEntries(user);
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
            <div>
                {error && <p className="error-message">{error}</p>}
                <ul className="entries-list">
                    {entries.map((entry, index) => (
                        <li key={index} className="entry-item">
                            <h5>{index + 1}</h5>
                            <h3>{entry.postName}→{entry.sendName}</h3>
                            <p>대출금: {entry.money}₩</p>
                            <p>{entry.payback}</p>
                        </li>
                    ))}
                </ul>
            </div>
    );
}

export default Moneywrite;
