import React, { useState, useEffect } from 'react';
import QRCode from 'qrcode.react';
import TextField from '../components/TextField/textField';
import Button, { STYLES } from '../components/Buttons/button';
import firebase from '../firebase';
import Modal from '../components/Modals/modal';
const ManageQR = () => {
    const [qrValue, setQrValue] = useState('');
    const [items, setItems ] = useState([])
    const [editItem, setEditItem ] = useState(false);
    const [item, setItem ] = useState({
        id: '',
        name: ''
    })
    const handleQrValue = (e) => {
        e.preventDefault();
        setQrValue(e.target.value)
    }
    const handleModal = (id, itemName) => {
        setEditItem(true);
        setItem({id:id, name:itemName})
        console.log(id, itemName, editItem)

    }
    const addQR = async (value) => {
        try {
            const addQR = await firebase.firestore().collection('items').add({name: value})
            return addQR;
        } catch (error) {
            console.log(error);
        }
    }
    const deleteItem = async (item) => {
        try {
            const deleteItem = await firebase.firestore().collection('items').doc(item).delete()
            return deleteItem
        } catch (error) {
            console.log(error);
        }
    }
    const getItems = async () => {
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
useEffect(() => {
    getItems();
},[])
    return (
        
        <div className="content">
            <div className='header'>
            <h1>Manage QR</h1>
            </div>
            <div className='qr-section'>
        <div className='box-card'>
            <label htmlFor='value'>Eseme nimi</label>
        <TextField type='text' name='value' onChange={handleQrValue} value={qrValue}/>
        <Button buttonStyle={STYLES[2]} buttonSize={'btn-medium'} type="submit" onClick={() => addQR(qrValue)}>
            Lisa
        </Button>
        </div>
        <div className='box-card'>
        <QRCode imageSettings={{excavate: true, height: 24,width: 24,src:'http://tmd.ee/wp-content/uploads/2018/03/favicon.ico'}} renderAs='svg' includeMargin={true} level='H' value={qrValue} />
        </div>
        </div>
        <div className='box-card'>
            <div className='item-list-container'>
            {items.map(item => (
                <div key={item.id} className='list-item'>
                <p key={item.id}>{item.name}</p>
                <div className='item-actions'>
                    <Button buttonStyle={STYLES[5]} onClick={() => handleModal(item.id, item.name)}>Edit</Button>
                    <Button buttonStyle={STYLES[6]} onClick={() => deleteItem(item.id)}>Delete</Button>
                </div>
                <div>
                    <QRCode imageSettings={{excavate: true, height: 24,width: 24,src:'http://tmd.ee/wp-content/uploads/2018/03/favicon.ico'}} renderAs='svg' includeMargin={true} level='H' value={item.name} />
                </div>
                </div>
            ))}
            </div>
        </div>
        <Modal
            modalState={editItem}
            header={item.name}
            body={
                <TextField type='text' name='item-name' value={item.name} inputPlaceholder={item.name}/>
            }
            actions={
                <>
                <Button>Update</Button>
                <Button onClick={() => setEditItem(false)}>Cancel</Button>
                </>
                }/>
        </div>
    )
}

export default ManageQR;