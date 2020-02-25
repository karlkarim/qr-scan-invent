import React, { useState, useEffect } from 'react';
import QRCode from 'qrcode.react';
import TextField from '../components/TextField/textField';
import Button, { STYLES } from '../components/Buttons/button';
import firebase from '../firebase';
import Modal from '../components/Modals/modal';
import QRCard from '../components/Cards/qrCard';
import logo from '../assets/tmdLogo.ico';

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
    const handleEditValue = (e) => {
        e.preventDefault();
        setItem({...item, name:e.target.value})
    }
    const handleModal = (id, itemName) => {
        setEditItem(true);
        setItem({id:id, name:itemName})
        console.log(id, itemName, editItem)

    }
    const addQR = async (value) => {
        if(!value) return
        try {
            const addQR = await firebase.firestore().collection('items').add({name: value})
            return addQR;
        } catch (error) {
            console.log(error);
        }
    }
    const updateItem = async (id, itemName) => {
        console.log(id, itemName)
        try {
            const update = await firebase.firestore().collection('items').doc(id).update({name:itemName})
            setEditItem(false)
            return update
        } catch (error) {
            console.log(error)
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
    <div className="container">
    <section className="section">
        <h1 className="title">Manage QR</h1>
    </section>
    <section>
        <div className="columns is-desktop">
            <div className="column is-two-thirds">
            <div className="box">
                <TextField textStyle='input' id='value' type='text' name='value' onChange={handleQrValue} value={qrValue}/>
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
                btn1={ <Button buttonStyle={STYLES[7]} buttonSize={'is-normal'} onClick={() => handleModal(item.id, item.name)}>Edit&nbsp;<i class="far fa-edit"></i></Button>}
                btn2={<Button buttonStyle={STYLES[5]} buttonSize={'is-normal'} onClick={() => deleteItem(item.id)}>Delete&nbsp;<i class="far fa-trash-alt"></i></Button>}
                btn3={<Button class='download' buttonStyle={STYLES[4]} buttonSize={'is-normal'} onClick={() => doDownload(item.id, item.name)}>Download&nbsp;<i class="fas fa-download"></i></Button>}
                />
                </div>
            ))}
            </div>
            </div>
        
        <Modal
            modalState={editItem}
            header={item.id}
            body={
                <>
                <TextField id='edit-item' type='text' onChange={handleEditValue} value={item.name} name='item-name' inputPlaceholder={item.name}/>
                </>
            }
            actions={
                <>
                <Button onClick={() => updateItem(item.id, item.name)}>Update</Button>
                <Button onClick={() => setEditItem(false)}>Cancel</Button>
                </>
                }/>
        </div>
    )
}

export default ManageQR;