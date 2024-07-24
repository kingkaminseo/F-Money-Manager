function Navber() {

    return (
        <div className="header">
        <h1>F-Money Manager</h1>
        <p>친구들과의 돈 관리를 간편하게<i>{localStorage.getItem('userName')+`uyuio`}</i></p>
    </div>
    );
}

export default Navber;