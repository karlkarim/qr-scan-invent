import React, { useGlobal, useState, useEffect } from 'reactn';
import firebase from '../../../firebase';
import Modal from '../../Modals/modal';
import Button, { STYLES } from '../../Buttons/button';
import moment from 'moment';
import AddUserForm from '../../Forms/addUser';
import defAvatar from '../../../assets/default-avatar.png';
import './index.css'
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
            setModalBody({header: 'Add new user', body: <AddUserForm />})
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
            <div className='card-wrapper'>
            <div className='header'>
            <h3>Manage Users</h3>
            <div>
            <Button
                buttonStyle={STYLES[3]}
                onClick={() => handleModal('add')}
                children={
                    <i className="fas fa-user-plus"></i>
                }
                />
                </div>
            </div>
                <div className='flex-row'>

                {users.map(user => (
            <div key={user.id} className='id-card-root purple-light'>
                <div className='avatar'>
                    <img src={defAvatar} alt={user.id}/>
                </div>
                <div className='user-info'>
                    <div>{user.firstName}&nbsp;{user.lastName}&nbsp;
                        <span>(#{user.id})</span>
                    </div>
                    <div>
                    {user.email}
                    </div>
                    <div>
                    {moment(user.dateCreated).format('LL')}
                    </div>
                    </div>
                    <div className='action'>
                    <Button
                        onClick={() => handleModal('edit', user)}
                        children={<i class="fas fa-user-edit"></i>}
                        buttonStyle={STYLES[3]}
                        />
                    </div>
            </div>
                ))}
                </div>
            </div>
            <Modal
                header={modalBody.header}
                body={modalBody.body}
            />
        </section>
     );
}
 
export default ManageUsers;