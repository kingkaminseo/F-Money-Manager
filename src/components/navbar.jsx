

function Navber() {

    return (
        <div style={{width: '100%', backgroundColor: '#8eabc7', position: 'fixed', top: '0'}}>
            <h2>F-Money Manager</h2>
            <p id="name">{localStorage.getItem('userName')}</p>
        </div>
    );
}

export default Navber;
