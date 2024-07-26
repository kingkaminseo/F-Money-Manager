import { useState } from "react";

function Navber() {

    const [open, setOpen] = useState("none");

    function oopen() {
        setOpen(open === "none" ? "block" : "none");
    }

    return (
        <div className="header">
            <h1>F-Money Manager</h1>
            <p>친구들과의 돈 관리를 간편하게
                <div style={{position:'fixed', right: '100px',top: '60px'}}>
                    <i style={{textAlign: 'right'}}><a onClick={oopen}>{localStorage.getItem('userName')+`님`}▿</a></i>
                    <div style={{display : open}}>
                        로그아웃
                    </div>

                </div>
            </p>
        </div>
    );
}

export default Navber;