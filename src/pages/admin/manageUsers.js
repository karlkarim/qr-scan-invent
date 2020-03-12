import React, { useGlobal, useState, useEffect } from 'reactn';
import firebase from '../../firebase';
import Modal from '../../components/Modals/modal';
import moment from 'moment';
import AddUserForm from '../../components/Forms/addUser';

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
    <div className='container'>
        <section>
            <h1>Manage Users</h1>
            <div className='content'>
            <button onClick={() => handleModal('add')} className="button is-link">Add User&nbsp;<i className="fas fa-user-plus"></i></button>
            </div>
        </section>
        <section>
            <div className='columns'>
                <div className='column'>
                    <div className='table-container'>
                        <table className='table'>
                            <thead>
                                <tr>
                                    <th>Username</th>
                                    <th>First Name</th>
                                    <th>Last Name</th>
                                    <th>Email</th>
                                    <th>Date Created</th>
                                </tr>
                            </thead>
                            <tbody>
                                    {users.map(user => (
                                <tr key={user.id}>
                                        <td><a onClick={() => handleModal('edit', user)}>{user.id}</a></td>
                                        <td>{user.firstName}</td>
                                        <td>{user.lastName}</td>
                                        <td>{user.email}</td>
                                        <td>{moment(user.dateCreated).format('LL')}</td>
                                </tr>
                                    ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </section>
        <Modal
            header={modalBody.header}
            body={modalBody.body}
        />
    </div> );
}
 
export default ManageUsers;