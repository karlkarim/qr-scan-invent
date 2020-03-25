import React, { useGlobal, useState, useEffect } from 'reactn';
import firebase from '../../../firebase';
import Modal from '../../Modals/modal';
import Button, { STYLES } from '../../Buttons/button';
import moment from 'moment';
import AddUserForm from '../../Forms/addUser';
import Tag, { variant } from '../../Tags/index';
import defAvatar from '../../../assets/default-avatar.png';
import './index.css'
import ContentBox from '../../ContentBox/index';

const ManageUsers = () => {
	const [users, setUsers] = useState([]);
	const [ dialogState, setDialogState ] = useGlobal('dialogState');
	const [ modalBody, setModalBody ] = useState({header: '', body: ''});
	const fetchUsers = async () => {
		try {
			const dbQuery = await firebase.firestore().collection('users').get()
			const users = dbQuery.docs.map(user => ({
				id: user.id,
				...user.data()
			}))
			setUsers(users);
		} catch (error) {
			console.log(error)
		}
	}
	const handleModal = (mode, userData) => {
		if(mode === 'add') {
			console.log(mode)
			setDialogState(!dialogState)
			setModalBody({header: 'Add new user', body: <AddUserForm userData=''/>})
		}
		if(mode === 'edit') {
			console.log(mode)
			setDialogState(!dialogState)
			setModalBody({header: 'Edit user', body: <AddUserForm userData={userData}/>})
		}
	}
	useEffect(() => {
		fetchUsers()
	}, [])
	return ( 
		
		
		<section>
		<ContentBox
			title='Manage users'
			icon={
				<Button
				buttonStyle={STYLES[6]}
				onClick={() => handleModal('add')}
				children={
					<i className="fas fa-user-plus"></i>
				}
				/>}
			children={
				users.map(user => (
					<div key={user.id} className='item-row'>
						<div className='item-header'>
							<div className='avatar'>
								<img src={defAvatar} alt={user.id}/>
									{user.firstName}&nbsp;{user.lastName}
								<div className='action'>
									<Button
									onClick={() => handleModal('edit', user)}
									children={<i className="fas fa-user-edit"></i>}
									buttonStyle={STYLES[0]}
									/>
								</div>
							</div>
						</div>
						<div className='item-info'>
							<div>
								Email: {user.email}
							</div>
							<div>
								User created: {moment(user.dateCreated).format('LL')}
							</div>
						</div>
						<div className='item-actions'>
							<Tag
							tagVariant={user.role === 'admin'? variant[0]: variant[2]}
							label={user.role ? user.role : 'N/A'}
							/>
						</div>
					</div>
					))
				}
				/>
					<Modal
					header={modalBody.header}
					body={modalBody.body}
					/>
					</section>
					);
				}
				
				export default ManageUsers;