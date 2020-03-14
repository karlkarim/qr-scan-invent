import React, { useState, useGlobal, setGlobal } from 'reactn';
import QrReader from 'react-qr-reader'
import Modal from '../../Modals/modal';
import firebase from "../../../firebase";
import './index.css';
import Button, { STYLES } from '../../Buttons/button';

const ItemScan = () => {
  // const [dialogState, setdialogState] = useState('')
  const [ dialogState, setDialogState ] = useGlobal('dialogState');
  const [ loggedInUserData ] = useGlobal('loggedInUserData');
  const [ msg, setMsg ] = useGlobal('notificationMsg');
  const [ item, setItem ] = useState('')
  const [ returnItem, setReturnItem ] = useState(false)
  const handleScan = data => {
    if (data) {
      // eslint-disable-next-line
      let item = data.replace(/[&\/\\#,+()$~%.'":*?<>{}]/g,'_');
      let docRef = firebase.firestore().collection("items").doc(item);

      docRef.get().then(function(doc) {
        if (doc.exists && doc.data().status === 'OUT') {
          setDialogState(true);
          setReturnItem(true);
        } else {
          setDialogState(true);
          setReturnItem(false);
          console.log("No such document!");
        }
      }).catch(function(error) {
        console.log("Error getting document:", error);
      });
        setItem(item)
    }
  }
  const handleError = err => {
    console.error(err)
  }
  const takeObject = (item) => (
    <div className='return-message'>
      <h4>You are about to take {item} from storage ?</h4>
      <p>If you want to continue click Take button.</p>
      <Button buttonStyle={STYLES[3]} onClick={() => console.log('TODO function for taking')} children='Take'/>
      <Button buttonStyle={STYLES[4]} onClick={() => setDialogState(false)} children='Cancel'/>
    </div>
  )
  const returnObject = (item) => {
    let docRef = firebase.firestore().collection("items").doc(item);
    let message = `You have returned ${item} successfully !`;
    const returnAction = async (item)  => {
      const addLogs = await firebase.firestore().collection('activityLogs').add({
        action: 'UPDATE',
        msg: 'Retuned an item',
        user: `${loggedInUserData[0].firstName} ${loggedInUserData[0].lastName}`,
        item: item,
        created_at: new Date()
    })
      await docRef.get().then(function(doc) {
      if (doc.data().status === 'OUT') {
          firebase.firestore()
              .collection("items")
              .doc(`${item}`)
              .set({returnedDate: new Date(), takenBy: loggedInUserData[0].firstName, status:'IN', location: 'storage'},{merge:true})
              .then(function() {
                setDialogState(false);
                setMsg({show: true, msg:message, variant: 'success'})
              })
              .catch(function(error) {
                  console.error("Error writing document: ", error);
                  setMsg({show: true, msg:error, variant: 'error'})
              });
              return addLogs;
      } else {
          // doc.data() will be undefined in this case
          console.log("Something is fucked!");
      }
  }).catch(function(error) {
      console.log("Error getting document:", error);
  })
}
    return(
    <div className='return-message'>
      <h4>Returning {item} back to storage ?</h4>
      <p>If yes click the return button.</p>
      <Button buttonStyle={STYLES[3]} onClick={() => returnAction(item)} children='Return'/>
      <Button buttonStyle={STYLES[4]} onClick={() => setDialogState(false)} children='Cancel'/>
    </div>
    )
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
      header={returnItem ? 'Return item' : 'Take Item'}
      body={returnItem ? returnObject(item) : takeObject(item)}
    />
    </section>
     );
}
 
export default ItemScan;