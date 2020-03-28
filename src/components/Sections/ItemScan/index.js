import React, { useState, useGlobal } from 'reactn';
import QrReader from 'react-qr-reader'
import Modal from '../../Modals/modal';
import firebase from "../../../firebase";
import './index.css';
import Button, { STYLES } from '../../Buttons/button';
import DatePicker from 'react-date-picker';
import ContentBox from '../../ContentBox/index';

const ItemScan = () => {
  
  // eslint-disable-next-line no-unused-vars
  const [ dialogState, setDialogState ] = useGlobal('dialogState');
  const [ loggedInUserData ] = useGlobal('loggedInUserData');
  // eslint-disable-next-line no-unused-vars
  const [ msg, setMsg ] = useGlobal('notificationMsg');
  const [ item, setItem ] = useState('')
  const [ returnItem, setReturnItem ] = useState(false)
  const [selectedDate, setSelectedDate] = useState(new Date());
  const handleDateChange = date => {
        setSelectedDate(date);
    };
  const handleScan = data => {
    if (data) {
      // eslint-disable-next-line
      let item = data.replace(/[&\/\\#,+()$~%.'":*?<>{}]/g,'_');
      let docRef = firebase.firestore().collection('items').doc(item);

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
  const takeObject = (item) => {
    // let docRef = firebase.firestore().collection("items").doc(item);
    
    let message = `You have took ${item} successfully !`;
    const takeAction = async (item)  => {
      try {
      const addLogs = await firebase.firestore().collection('activityLogs').add({
        action: 'UPDATE',
        msg: 'Took an item',
        user: `${loggedInUserData[0].firstName} ${loggedInUserData[0].lastName}`,
        item: item,
        created_at: new Date()
    })
        const takeObject = await firebase.firestore().collection('items').doc(item)
        .set({
          returnDate: selectedDate,
          takenBy: loggedInUserData[0].firstName,
          status:'OUT',
          location: 'unknown',
          takenDate: new Date()},
          {merge:true})
        setMsg({show: true, msg:message, variant:'success'})
        return (takeObject, addLogs);
    } catch (error) {
        console.log(error);
        setMsg({show: true, msg:error, variant:'error'})
    }
}
    return (
    <div className='return-message'>
      <h4>You are about to take {item} from storage ?</h4>
      <p>If you want to continue click Take button.</p>
      <div className='date-picker'>
        <DatePicker
          value={selectedDate}
          
          onChange={handleDateChange} />
      </div>
      <Button buttonStyle={STYLES[3]} onClick={() => takeAction(item)} children='Take'/>
      <Button buttonStyle={STYLES[4]} onClick={() => setDialogState(false)} children='Cancel'/>
    </div>
    )
    }
  const returnObject = (item) => {
    let docRef = firebase.firestore().collection('items').doc(item);
    let message = `You have returned ${item} successfully !`;
    const returnAction = async (item)  => {
      const addLogs = await firebase.firestore().collection('activityLogs').add({
        action: 'UPDATE',
        msg: 'Returned an item',
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
          <ContentBox
            title='Scan items'
            icon={<i className='fas fa-qrcode'></i>}
            children={
              <div className='qr-container'>
            <QrReader
                  delay={500}
                  onError={handleError}
                  onScan={handleScan}
                  style={{ width: '100%' }}
                />
                </div>
            }
          />
    <Modal
      header={returnItem ? 'Return item' : 'Take Item'}
      body={returnItem ? returnObject(item) : takeObject(item)}
    />
    </section>
     );
}
 
export default ItemScan;