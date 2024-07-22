import React, { useEffect } from 'react';
import './Login.css';
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-auth.js";
import { getFirestore, doc, setDoc } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-firestore.js";

function Login() {
    // Your web app's Firebase configuration
    const firebaseConfig = {
        apiKey: "AIzaSyDIIMXKdc0TSdBqSf1PlDsMAHC97Nbhxmw",
        authDomain: "f-money-8a633.firebaseapp.com",
        projectId: "f-money-8a633",
        storageBucket: "f-money-8a633.appspot.com",
        messagingSenderId: "379252633035",
        appId: "1:379252633035:web:ceaa239b534e003b9cda4e",
        measurementId: "G-91BPGENQZG"
    };

    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);
    const db = getFirestore(app);

    useEffect(() => {
        const signupForm = document.getElementById("signup-form");

        const handleSubmit = async (e) => {
            e.preventDefault();
            const email = document.getElementById("email").value;
            const password = document.getElementById("password").value;
            const name = document.getElementById("name").value;

            try {
                // Create user
                const userCredential = await createUserWithEmailAndPassword(auth, email, password);

                // Store additional information in Firestore
                await setDoc(doc(db, "users", userCredential.user.uid), {
                    email: email,
                    name: name
                });

                console.log("회원가입 성공", userCredential.user);
            } catch (error) {
                console.error("회원가입 실패", error.message);
            }
        };

        signupForm.addEventListener("submit", handleSubmit);

        // Cleanup function to remove the event listener
        return () => {
            signupForm.removeEventListener("submit", handleSubmit);
        };
    }, [auth, db]);

    return (
        <div>
            <h1 className='signHeader'>F-Money manager</h1>
            <h3 className='signTag'>Sign in</h3>
            <form id='signup-form'>
                <label htmlFor="email">아이디</label>
                <input type="email" placeholder='아이디' id='email'/><br />

                <label htmlFor="password">비밀번호</label>
                <input type="password" placeholder='비밀번호' id='password' style={{color: 'black'}}/> <br />

                <label htmlFor="name">이름</label>
                <input type="text" placeholder='이름' id='name'/> <br />

                <button type="submit" id='submit'>회원가입</button>
            </form>
        </div>
    );
}

export default Login;
