import React, { useState, setGlobal } from 'reactn';
import QrReader from 'react-qr-reader'
import Modal from '../../Modals/modal';
import firebase from "../../../firebase";
import './index.css';
const ItemScan = () => {
    const [scanned, setScanned] = useState('')


  const handleScan = data => {
    if (data) {
      let item = data.replace(/[&\/\\#,+()$~%.'":*?<>{}]/g,'_');
      let docRef = firebase.firestore().collection("items").doc(item);

      docRef.get().then(function(doc) {
        if (doc.exists && doc.data().status === 'OUT') {
          setGlobal({
            dialogState: true,
            // returnItem: true
          })
        } else {
          setGlobal({
            modalOpen: true,
            returnItem: false
          })
          console.log("No such document!");
        }
      }).catch(function(error) {
        console.log("Error getting document:", error);
      });
        setScanned(item)
    }
  }
  const handleError = err => {
    console.error(err)
  }
    return ( 
        <section>
      <div className='card-wrapper'>
        
          <div className='scan-header'>
            <h4>Scan items &nbsp;<i className='fas fa-qrcode'></i></h4>
          </div>
          </div>
          <div className='card-wrapper'>
            <div className='qr-container'>
            <QrReader
                  delay={500}
                  onError={handleError}
                  onScan={handleScan}
                  style={{ width: '100%' }}
                />
                </div>
          </div>
    <Modal
      header={'lolo'}
      body={scanned}
    />
    </section>
     );
}
 
export default ItemScan;