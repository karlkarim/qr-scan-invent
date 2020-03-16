import React, {useState} from 'react';
import QrReader from 'react-qr-reader';
import './style.css'


const QRScanForm = () => {
    const [data, setData ] = useState('')
    
    const handleScan = data => {
        if (data) {
          setData(data)
          console.log(data);
        }
    }

    const handleError = err => {
        console.error(err)
    }
    return (

    <>    
    <div className="qrHero">
        <h1>QR Scan</h1>
        <p>Scan QR code to borrow item</p>
    </div>
    
    <div className="qrcard-container">
    
      <div className="qrcard">
          <QrReader
            delay={300}
            onError={handleError}
            onScan={handleScan}
            style={{ width: '90%' }}
          />
          <p>{data}</p>
      </div> 
     
    </div>
    </>
      
  );
};
 
export default QRScanForm;
  