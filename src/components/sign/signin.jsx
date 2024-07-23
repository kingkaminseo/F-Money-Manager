import React, { useEffect } from 'react';
import './Login.css';
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.12.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.12.0/firebase-auth.js";
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/9.12.0/firebase-firestore.js";

function Login() {
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

    useEffect(() => {
        const loginForm = document.getElementById("login-form");

        const handleLogin = async (e) => {
            e.preventDefault();
            const email = document.getElementById("login-email").value;
            const password = document.getElementById("login-password").value;

            try {
                const userCredential = await signInWithEmailAndPassword(auth, email, password);
                const userDoc = await getDoc(doc(db, "users", userCredential.user.uid));

                if (userDoc.exists()) {
                    const userData = userDoc.data();
                    document.getElementById('login-error').innerText = "";
                    document.getElementById('login-succes').innerText = `로그인성공! ${userData.name}님 환영합니다!`;
                    localStorage.setItem('userName',userData.name)
                    localStorage.setItem('userId',userData.email)
                    setTimeout(() => {
                        window.location.href = '/'
                    }, 2000);
                } else {
                    console.log("사용자 데이터를 찾을 수 없습니다.");
                    document.getElementById('login-error').innerText = "사용자 데이터를 찾을 수 없습니다.";
                }
            } catch (error) {
                console.error("로그인 실패", error.message);
                document.getElementById('login-error').innerText = "아이디나 비밀번호가 다릅니다.";
            }
        };

        loginForm.addEventListener("submit", handleLogin);

        return () => {
            loginForm.removeEventListener("submit", handleLogin);
        };
    }, [auth, db]);

    return (
        <div className="container">
            <h1 className='signHeader'>F-Money manager</h1>
            
            <div className="form-container">
                <h2>Login</h2>
                <form id='login-form'>
                    <label htmlFor="login-email">이메일</label>
                    <input type="email" placeholder='아이디' id='login-email' className='sginInput'/>
                    <label htmlFor="login-password">비밀번호</label>
                    <input type="password" placeholder='비밀번호' id='login-password' className='sginInput'/>
                    <button type="submit" id='login-submit'>로그인</button>
                    <p id='login-error' style={{color:'red'}}></p>
                    <p id='login-succes' style={{color:'green'}}></p>
                </form>
            </div>
        </div>
    );
}

export default Login;
