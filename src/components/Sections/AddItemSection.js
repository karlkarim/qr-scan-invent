import React, {useState, useGlobal } from 'reactn';
import firebase from '../../firebase';
import TextField from '../../components/TextField';
import logo from '../../assets/tmdLogo.ico';
import QRCode from 'qrcode.react';
import Button, { STYLES } from '../../components/Buttons/button';
import ContentBox from '../ContentBox/index';
import './AddItem.css'
const AddItemSection = () => {
	const [qrValue, setQrValue] = useState('');
	const [ loggedInUserData ] = useGlobal('loggedInUserData');
	const [ msg, setMsg ] = useGlobal('notificationMsg');
	
	const handleQrValue = (e) => {
		e.preventDefault();
		setQrValue(e.target.value)
	}
	const addQR = async (value) => {
		if(!value) return
		let message = `Added new item ${value}`
		try {
			const addQR = await firebase.firestore().collection('items').doc(value).set({name: value, status: 'IN', location:'storage'})
			setQrValue('')
			const addLogs = await firebase.firestore().collection('activityLogs').add({
				action: 'INSERT',
				msg: 'Added new item',
				user: `${loggedInUserData[0].firstName} ${loggedInUserData[0].lastName}`,
				item: value,
				created_at: new Date()
			})
			setMsg({show: true, msg:message, variant:'success'})
			return (addQR, addLogs);
		} catch (error) {
			console.log(error);
			setMsg({show: true, msg:error, variant:'error'})
		}
	}
	return ( 
		<section>
		<ContentBox 
			title='Add new items'
			icon={<i className="fas fa-folder-plus"></i>}
			children={
				<>
				<div className='qr-sample-root'>
					<QRCode imageSettings={{excavate: true, height: 24,width: 24,src:`${logo}`}} renderAs='svg' includeMargin={true} level='H' value={qrValue} />
					<p>{qrValue}</p>
				</div>
				<div className='form-actions'>
					<TextField
					// error={qrValue ? false: true}
					textStyle='input'
					id='value'
					type='text'
					name='value'
					inputPlaceholder='Enter item name to add to the system'
					onChange={handleQrValue}
					value={qrValue}
					/>
					<Button
					buttonStyle={STYLES[0]}
					buttonSize={'is-normal'}
					type="submit"
					disabled={qrValue ? false: true}
					onClick={() => addQR(qrValue)}>
					Add item
					</Button>
				</div>
				</>
		}
		/>
		</section>
		);
	}
	
	export default AddItemSection;