import React, { useState, setGlobal } from 'reactn'
import QrReader from 'react-qr-reader'
import Modal from '../components/Modals/modal';

import firebase from "../firebase";

const QR = () => {
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
    <>
    <h1 className='title is-3'>Scan items</h1>
      <div className='columns'>
        <div className='column is-desktop'>
          <div className='box'>
          <QrReader
                delay={500}
                onError={handleError}
                onScan={handleScan}
                style={{ width: '100%' }}
              />
              </div>
          </div>
          </div>
    <Modal
      header={'lolo'}
      body={scanned}
    />
    </>
    )

}
export default QR