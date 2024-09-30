import React, { useEffect, useState, useRef } from 'react';
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-auth.js";
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-firestore.js";
import Modal from 'react-modal';

// Set app element for the modal
Modal.setAppElement('#root');

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
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedEntry, setSelectedEntry] = useState(null);

    const checkboxRef1 = useRef(null);
    const checkboxRef2 = useRef(null);

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

    const userName = localStorage.getItem("userName");

    const days = entries.map(entry => {
        const [year, month, day] = entry.payback.split('-');
        return day; // 일(day)만 반환
    });

    console.log(days);
    localStorage.setItem("days", days);

    const openModal = (entry) => {
        setSelectedEntry(entry);
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
        setSelectedEntry(null);
    };

    return (
        <div>
            {error && <p className="error-message">{error}</p>}
            <ul className="entries-list">
                {entries.map((entry, index) => (
                    <li key={index} className="entry-item" style={{ backgroundColor: entry.postName === userName ? "rgb(215,226,241)" : "rgb(254,242,245)" }}>
                        <button onClick={() => openModal(entry)}>자세히 보기🔍</button>
                        <h5>{index + 1}</h5>
                        <h3>{entry.postName} → {entry.sendName}</h3>
                        <p>대출금: {entry.money}₩</p>
                        <p>기간: {entry.payback}</p>
                    </li>
                ))}
            </ul>

            {/* Modal for entry details */}
            <Modal
                isOpen={modalOpen}
                className="ReactModal__Content"
                overlayClassName="ReactModal__Overlay"
                onRequestClose={closeModal}

            >
                <div className="modal-header">
                    자세히 보기
                </div>
                <div className="modal-body">
                    {selectedEntry && (
                        <>
                            <h3>{selectedEntry.postName} → {selectedEntry.sendName}</h3>
                            <ul>
                                <li>대출금: {selectedEntry.money}₩</li>
                                <li>기간: {selectedEntry.payback}</li>
                                <li>소비 종류: {selectedEntry.how}</li>
                                <li>규칙: {selectedEntry.rull}</li>
                                <li>상세 설명: {selectedEntry.details}</li>
                            </ul>
                        </>
                        
                    )}
                    <div style={{borderBottom : '1px solid black'}}></div>
                    <label>돈을 갚으셨습니까?</label>
                    <input type="checkbox" ref={checkboxRef1} onChange={() => console.log(checkboxRef1.current.checked)} /> <br />
                    <label>해당 기록을 삭제 하시겠습니까?</label>
                    <input type="checkbox" ref={checkboxRef2} />
                </div>
                <div className="modal-footer">
                    <button className="close-button" onClick={() => window.location.href = './'}>확인</button>
                </div>
            </Modal>
        </div>
    );
}

export default Moneywrite;
