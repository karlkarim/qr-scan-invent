import React, { useState } from 'react'
import QrReader from 'react-qr-reader'


import firebase from "../firebase";

const QR = () => {
    const [scanned, setScanned] = useState('')

  const handleScan = data => {
    setScanned(data)
    // if (data) {
    //   let item = data.replace(/[&\/\\#,+()$~%.'":*?<>{}]/g,'_');
    //   let docRef = firebase.firestore().collection("items").doc(item);

    //   docRef.get().then(function(doc) {
    //     if (doc.exists && doc.data().status === 'OUT') {
    //       setGlobal({
    //         modalOpen: true,
    //         returnItem: true
    //       })
    //     } else {
    //       setGlobal({
    //         modalOpen: true,
    //         returnItem: false
    //       })
    //       console.log("No such document!");
    //     }
    //   }).catch(function(error) {
    //     console.log("Error getting document:", error);
    //   });
    //   setGlobal({itemScanned: item})
    // }
  }
  const handleError = err => {
    console.error(err)
  }

    return (
        <section>
      <div className='columns'>
          <div className='column '> 
          <div class="card">
  <div class="card-image">
    <figure class="image">
    <QrReader
          delay={300}
          onError={handleError}
          onScan={handleScan}
          style={{ width: '20%' }}
        />
    </figure>
  </div>
  <div class="card-content">

    <div class="content">
    <p>{scanned}</p>
    </div>
  </div>
</div>
      </div>
      </div>
      </section>
    )

}
export default QR