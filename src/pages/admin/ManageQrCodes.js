import React, { useState, useEffect, useGlobal } from 'reactn';
import QRCode from 'qrcode.react';
import TextField from '../../components/TextField';
import Button, { STYLES } from '../../components/Buttons/button';
import firebase from '../../firebase';
import Modal from '../../components/Modals/modal';
import QRCard from '../../components/Cards/qrCard';
import logo from '../../assets/tmdLogo.ico';

const ManageQR = () => {
    const [qrValue, setQrValue] = useState('');
    const [ loggedInUserData ] = useGlobal('loggedInUserData');
    const [items, setItems ] = useState([])
    const [dialogState, setDialogState ] = useGlobal('dialogState');
    const [item, setItem ] = useState({
        id: '',
        name: ''
    })
    const handleQrValue = (e) => {
        e.preventDefault();
        setQrValue(e.target.value)
    }
    const handleEditValue = (e) => {
        e.preventDefault();
        setItem({...item, name:e.target.value})
    }
    const handleModal = (id, itemName) => {
        setDialogState(!dialogState);
        setItem({id:id, name:itemName})

    }
    const addQR = async (value) => {
        if(!value) return
        try {
            const addQR = await firebase.firestore().collection('items').doc(value).set({name: value, satus: 'IN'})
            setQrValue('')
            const addLogs = await firebase.firestore().collection('activityLogs').add({
                action: 'INSERT',
                msg: 'Added new item',
                user: `${loggedInUserData[0].firstName} ${loggedInUserData[0].lastName}`,
                item: value,
                created_at: new Date()
            })
            return (addQR, addLogs);
        } catch (error) {
            console.log(error);
        }
    }
    const updateItem = async (id, itemName) => {
        console.log(id, itemName)
        try {
            const update = await firebase.firestore().collection('items').doc(id).update({name:itemName})
            const addLogs = await firebase.firestore().collection('activityLogs').add({
                action: 'UPDATE',
                msg: 'Updated item',
                user: `${loggedInUserData[0].firstName} ${loggedInUserData[0].lastName}`,
                item: itemName,
                created_at: new Date()
            })
            setDialogState(!dialogState)
            return (update, addLogs);
        } catch (error) {
            console.log(error)
        }
    }
    const deleteItem = async (item) => {
        try {
            const deleteItem = await firebase.firestore().collection('items').doc(item).delete()
            const addLogs = await firebase.firestore().collection('activityLogs').add({
                action: 'DELETE',
                msg: 'Deleted item',
                user: `${loggedInUserData[0].firstName} ${loggedInUserData[0].lastName}`,
                item: item,
                created_at: new Date()
            })
            return (deleteItem, addLogs);
        } catch (error) {
            console.log(error);
        }
    }
    const getItems = async () => {
        console.log('getting data from firestore...')
        try {
            firebase.firestore().collection("items").onSnapshot(items => {
                const item = items.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }))
                setItems(item)
            })
            return 
        } catch (error) {
            console.log(error)
        }
    }
    const doDownload = (svgId, name) => {
        let svg = document.getElementById(svgId);
        let converted = new XMLSerializer().serializeToString(svg)
        let dataUrl = encodeURIComponent(converted)
        let dl = document.createElement("a");
        document.body.appendChild(dl); // This line makes it work in Firefox.
        dl.setAttribute("href", `data:image/svg+xml, ${dataUrl}`);
        dl.setAttribute("download", `${name}.svg`);
        dl.click();
    }
useEffect(() => {
    getItems();
},[])
    return (
    <section>
        <h1 className="title">Manage QR</h1>
    <section>
        <div className="columns is-desktop">
            <div className="column is-two-thirds">
            <div className="box">
                <TextField error={qrValue ? false: true}textStyle='input' id='value' type='text' name='value' onChange={handleQrValue} value={qrValue}/>
                <Button buttonStyle={STYLES[2]} buttonSize={'is-normal'} type="submit" onClick={() => addQR(qrValue)}>
                    Lisa
                </Button>
            </div>
            </div>
            <div className="column">
            <div className="box" style={{textAlign: 'center'}}>
                <QRCode imageSettings={{excavate: true, height: 24,width: 24,src:`${logo}`}} renderAs='svg' includeMargin={true} level='H' value={qrValue} />
                <p>{qrValue}</p>
            </div>
            </div>
        </div>
        </section>
            <div className='container'>
            <div className='columns is-multiline'>
            {items.map( item => (
                <div className='column' key={item.id}>
            <QRCard
                header={item.name}
                content={<QRCode id={item.id} imageSettings={{excavate: true, height: 24,width: 24,src:'http://tmd.ee/wp-content/uploads/2018/03/favicon.ico'}} renderAs='svg' includeMargin={true} level='H' value={item.name} />}
                btn1={ <Button buttonStyle={STYLES[7]} buttonSize={'is-normal'} onClick={() => handleModal(item.id, item.name)}>Edit&nbsp;<i className="far fa-edit"></i></Button>}
                btn2={<Button buttonStyle={STYLES[5]} buttonSize={'is-normal'} onClick={() => deleteItem(item.id)}>Delete&nbsp;<i className="far fa-trash-alt"></i></Button>}
                btn3={<Button className='download' buttonStyle={STYLES[4]} buttonSize={'is-normal'} onClick={() => doDownload(item.id, item.name)}>Download&nbsp;<i className="fas fa-download"></i></Button>}
                />
                </div>
            ))}
            </div>
            </div>
        
        <Modal
            modalState={dialogState}
            header={item.id}
            body={
                <>
                <TextField id='edit-item' type='text' onChange={handleEditValue} value={item.name} name='item-name' inputPlaceholder={item.name}/>
                </>
            }
            actions={
                <>
                <Button onClick={() => updateItem(item.id, item.name)}>Update</Button>
                <Button onClick={() => setDialogState(!dialogState)}>Cancel</Button>
                </>
                }/>
        </section>
    )
}

export default ManageQR;