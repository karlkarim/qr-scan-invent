import React, {useState} from 'react';
import QrReader from 'react-qr-reader';

const QRScan = () => {
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
    
    
    
    
    <div className="container is-fluid">
    
      <div className="card">
          <QrReader
            delay={300}
            onError={handleError}
            onScan={handleScan}
            style={{ width: '25%' }}
          />
          <p>{data}</p>
      </div> 
     
    </div>
      
  );
};
 
export default QRScan;
  