import React, { useState, useEffect, useGlobal } from 'reactn';
import Modal from '../../components/Modals/modal';
import TextField from '../../components/TextField';
import Button, { STYLES } from '../../components/Buttons/button';
import './listItem.css'
import firebase from '../../firebase';
import { Link } from 'react-router-dom';
import Loader from 'react-loader-spinner';
import QRCode from 'qrcode.react';
const ListAndEditItems = () => {
    const [ loggedInUserData ] = useGlobal('loggedInUserData');
    const [dialogState, setDialogState ] = useGlobal('dialogState');
    const [ msg, setMsg ] = useGlobal('notificationMsg');
    const [modalType, setModalType ] = useState('');
    const [items, setItems ] = useState([])
    const [item, setItem ] = useState({
        id: '',
        name: ''
    })
    const handleModal = (mode, id, itemName) => {
        setModalType(mode);
        console.log(modalType);
        setDialogState(!dialogState);
        setItem({id:id, name:itemName})

    }
    const handleEditValue = (e) => {
        e.preventDefault();
        setItem({...item, name:e.target.value})
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
    const deleteItem = async (item) => {
        let message = `Item with id: ${item} was deleted !`
        try {
            const deleteItem = await firebase.firestore().collection('items').doc(item).delete()
            const addLogs = await firebase.firestore().collection('activityLogs').add({
                action: 'DELETE',
                msg: 'Deleted item',
                user: `${loggedInUserData[0].firstName} ${loggedInUserData[0].lastName}`,
                item: item,
                created_at: new Date()
            })
            setMsg({show: true, msg:message, variant:'error'})
            return (deleteItem, addLogs);
        } catch (error) {
            console.log(error);
        }
    }
    const updateItem = async (id, itemName) => {
        let message = `Item with id: ${id} was renamed to ${itemName} !`
        try {
            const update = await firebase.firestore().collection('items').doc(id).update({name:itemName})
            const addLogs = await firebase.firestore().collection('activityLogs').add({
                action: 'UPDATE',
                msg: 'Updated item',
                user: `${loggedInUserData[0].firstName} ${loggedInUserData[0].lastName}`,
                item: itemName,
                created_at: new Date()
            })
            setMsg({show: true, msg:message, variant:'success'}) && setDialogState(!dialogState)
            return (update, addLogs);
        } catch (error) {
            console.log(error)
            setMsg({show: true, msg:error, variant:'error'})
        }
    }
    const doDownload = (svgId, name) => {
        let message = `Starting to download item: ${name} !`
        let svg = document.getElementById(svgId);
        let converted = new XMLSerializer().serializeToString(svg)
        let dataUrl = encodeURIComponent(converted)
        let dl = document.createElement("a");
        document.body.appendChild(dl); // This line makes it work in Firefox.
        dl.setAttribute("href", `data:image/svg+xml, ${dataUrl}`);
        dl.setAttribute("download", `${name}.svg`);
        dl.click();
        setMsg({show: true, msg:message, variant:'success'})
    }
    useEffect(() => {
        getItems();
    },[])
    return ( 
        <section>
            <div className='card-wrapper'>
                {items.length ?
                <div>
                {items.map( item => (
                    <div className='item-row' key={item.id}>
                        <p className='item-title'>{item.name} <Link onClick={() => handleModal('qr-code', item.id, item.name)}>View code</Link></p>
                        <div className='item-actions'>
                        <Button buttonStyle={STYLES[2]} buttonSize={'is-normal'} onClick={() => handleModal('edit', item.id, item.name)}>Edit&nbsp;<i className="far fa-edit"></i></Button>
                        <Button buttonStyle={STYLES[4]} buttonSize={'is-normal'} onClick={() => deleteItem(item.id)}>Delete&nbsp;<i className="far fa-trash-alt"></i></Button>
                        <Button className='download' buttonStyle={STYLES[3]} buttonSize={'is-normal'} onClick={() => doDownload(item.id, item.name)}>Download&nbsp;<i className="fas fa-download"></i></Button>
                        </div>
                        <QRCode style={{display:'none'}} id={item.id} imageSettings={{excavate: true, height: 24,width: 24,src:'http://tmd.ee/wp-content/uploads/2018/03/favicon.ico'}} renderAs='svg' includeMargin={true} level='H' value={item.name} />
                {/* <QRCard
                    header={item.name}
                    content={<QRCode id={item.id} imageSettings={{excavate: true, height: 24,width: 24,src:'http://tmd.ee/wp-content/uploads/2018/03/favicon.ico'}} renderAs='svg' includeMargin={true} level='H' value={item.name} />}
                    btn1={ <Button buttonStyle={STYLES[7]} buttonSize={'is-normal'} onClick={() => handleModal(item.id, item.name)}>Edit&nbsp;<i className="far fa-edit"></i></Button>}
                    btn2={<Button buttonStyle={STYLES[5]} buttonSize={'is-normal'} onClick={() => deleteItem(item.id)}>Delete&nbsp;<i className="far fa-trash-alt"></i></Button>}
                    btn3={<Button className='download' buttonStyle={STYLES[4]} buttonSize={'is-normal'} onClick={() => doDownload(item.id, item.name)}>Download&nbsp;<i className="fas fa-download"></i></Button>}
                    /> */}
                    </div>
                ))}</div> :
                    <div style={{textAlign: 'center'}}>
                <Loader
                type="Puff"
                color="#00BFFF"
                height={100}
                width={100}
            />
            </div>
            }
            </div>
            <Modal
            modalState={dialogState}
            header={modalType === 'edit' ? item.name : item.name}
            body={
                    modalType === 'edit' ?
                    <TextField id='edit-item' type='text' onChange={handleEditValue} value={item.name} name='item-name' inputPlaceholder={item.name}/>
                    :
                    <div style={{textAlign: 'center'}}>
                    <QRCode id={item.id} imageSettings={{excavate: true, height: 24,width: 24,src:'http://tmd.ee/wp-content/uploads/2018/03/favicon.ico'}} renderAs='svg' includeMargin={true} level='H' value={item.name} />
                    </div>
            }
            actions={
                modalType === 'edit' ?
                <>
                <Button buttonStyle={STYLES[2]} onClick={() => updateItem(item.id, item.name)}>Update</Button>
                <Button buttonStyle={STYLES[3]} onClick={() => setDialogState(!dialogState)}>Cancel</Button>
                </> :
                ''
                }/>
        </section>
     );
}
 
export default ListAndEditItems;