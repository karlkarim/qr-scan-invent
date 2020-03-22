import React, { useState, useGlobal } from 'reactn';
import QrReader from 'react-qr-reader';
import DialogBox from '../dialogBox'
import './style.css'
import firebase from '../../firebase'


const QRScanForm = () => {
    const [data, setData ] = useState('')
    const [ dialogState, setDialogState ] = useGlobal('dialogState');
    const [ returning, setReturning ] = useState(false)
    const [ loggedInUserData ] = useGlobal('loggedInUserData');
    const handleScan = data => {
        if (data) {
          let item = data.replace(/[&\/\\#,+()$~%.'":*?<>{}]/g,'_');
          let docRef = firebase.firestore().collection('items').doc(item);
          docRef.get().then(function(doc){
            if(doc.exists && doc.data().status==='OUT'){
              setDialogState(true);
              setReturning(true);
            }else{
              setDialogState(true)
            }
          })          
          setData(data)
          console.log(data);
        }
    }

    const handleError = err => {
        console.error(err)
    }
    
    const returnObject = (item) => {
      // firebase asju
      let docRef = firebase.firestore().collection('items').doc(item);
      const returnAction = async(item) => {
        await docRef.get().then(function(doc){
          firebase.firestore().collection('items').doc(item)
          .set({ returnedDate: new Date(), returnedBy: loggedInUserData[0].firstName, status:'IN', location: 'storage'},{merge: true})
          .then(function(){
            setDialogState(false)
          })   .catch(function(error){
                console.log(error)
          })
        })
      }
      return (
        <div className=''>
          <h4>Returning <b>{item}</b> back to storage ?</h4>
          <button onClick={() => returnAction(item)}> Return</button>
          <button> Cancel</button>
        </div>
      )
    }

    const takeObject = (item) => {
      // firebase asju

      return (
        <div className=''>
          <h4>Take <b>{item}</b> from storage ?</h4>
          <button> Take</button>
          <button> Cancel</button>
        </div>
      )
    }

    return (

    <>    
    <div className="qrHero">
        <h1>QR Scan</h1>
        <p onClick={() => setDialogState(true)} >Scan QR code to borrow item</p>
        
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
    <DialogBox 
      header={returning ? 'Return item' : 'Take item'}
      body={returning ? returnObject(data) : takeObject(data)}
    />
    </>
      
  );
};
 
export default QRScanForm;
  