import React from 'react';
import app from "./firebase";

const Home = () => {
    return (
        <>

            <h1>Home page</h1>
            <button onClick={() => app.auth().signOut()}>Sign Out</button>
            <button onClick={() => app.auth().QRScan()}>QR Scan</button>
        </>    
    );
};

export default Home;