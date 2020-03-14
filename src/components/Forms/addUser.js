import React, { useGlobal, useState, useEffect } from 'reactn';
import app from 'firebase'
import TextField from '../TextField/index';
import Button, { STYLES } from '../Buttons/button';

const AddUserForm = ({userData}) => {
    const [ dialogState, setDialogState ] = useGlobal('dialogState')
    // eslint-disable-next-line
    const [ msg, setMsg ] = useGlobal('notificationMsg');
    const [uData, setUData ] = useState('');
    const [ loggedInUserData ] = useGlobal('loggedInUserData');

    const handleDialog = (type, msg) => {

        // setDialogState(!dialogState)
        type === 'success' ?
        setMsg({show: true, msg:msg, variant:'success'}) && setDialogState(!dialogState) :
        setMsg({show: true, msg:msg, variant:''})

    }
    const addNewUser = async event => {
        event.preventDefault();
        const { email, password, username, fName, lName } = event.target.elements;
        let message = `New user ${fName.value.concat(lName.value)} has been added!`;

        try {
          const addUser = await app.auth()
            .createUserWithEmailAndPassword(email.value, password.value);
            app.firestore().collection('users').doc(username.value).set({
              firstName: fName.value,
              lastName: lName.value,
              email: email.value,
              dateCreated: Date.now()
            })
            const addLogs = await app.firestore().collection('activityLogs').add({
                action: 'INSERT',
                msg: 'Added new user',
                user: `${loggedInUserData[0].firstName} ${loggedInUserData[0].lastName}`,
                item: `${fName.value} ${lName.value}`,
                created_at: new Date()
            })
            handleDialog('success', message);
            return (addUser, addLogs);
        } catch (error) {
            let message = error.message;
            handleDialog('error', message);
        }
      }
      const handleEditValues = (e, id) => {
        setUData(e.target.value)
    }
    const editUser = async event => {
        event.preventDefault();
        const { email, fName, lName, uId } = event.target.elements;
        let message = `User data updated !`;
        try {
            const update = await app.firestore()
                .collection('users').doc(uId.value)
                .update({ firstName: fName.value,lastName:lName.value, email: email.value })
            const addLogs = await app.firestore().collection('activityLogs').add({
                action: 'UPDATE',
                msg: 'Updated user with an ID',
                user: `${loggedInUserData[0].firstName} ${loggedInUserData[0].lastName}`,
                item: uId.value,
                created_at: new Date()
            })
            setDialogState(!dialogState)
            handleDialog('success', message);

            return (update, addLogs)
        } catch (error) {
            console.log(error)
            let message = error.message;
            handleDialog('success', message);
        }
    }
    useEffect(() => {
        setUData(userData);
    },[userData])

    return (
        !userData ?
        <form onSubmit={addNewUser}>
            <div className="field">
            <label>First Name</label>
            <div className="">
                <TextField inputName="fName" inputType="text" inputPlaceholder="First Name" />
            </div>
            </div>
            <div className="field">
            <label>Last Name</label>
            <div className="">
                <TextField inputName="lName" inputType="text" inputPlaceholder="Last Name" />
            </div>
            </div>
            <div className="field">
            <label>Email</label>
            <div className="">
                <TextField inputName="email" inputType="email" inputPlaceholder="Email" />
            </div>
            </div>
            <div className="field">
            <label>Username</label>
            <div className="">
                <TextField inputName="username" inputType="text" inputPlaceholder="Username" />
            </div>
            </div>
            <div className="field">
            <label>Password</label>
            <div className="">
                <TextField inputName="password" inputType="password" inputPlaceholder="Password" />
            </div>
            </div>
            <div className='field'>
                <div className=''>
                <Button
                buttonStyle={STYLES[3]}
                children={<i className="far fa-save"></i>}
                />
                </div>
            </div>
        </form>
        :
        <form onSubmit={editUser}>
        <input hidden value={uData.id} name='uId'/>
        <div className="field">
            <label>First Name</label>
            <div className="">
                <TextField value={uData ? uData.firstName: '??'} onChange={handleEditValues} inputName="fName" inputType="text" inputPlaceholder="First Name" />
            </div>
            </div>
            <div className="field">
            <label>Last Name</label>
            <div className="">
                <TextField value={uData ? uData.lastName: '??'} onChange={handleEditValues} inputName="lName" inputType="text" inputPlaceholder="Last Name" />
            </div>
            </div>
            <div className="field">
            <label>Email</label>
            <div className="">
                <TextField value={uData ? uData.email: '??'} onChange={handleEditValues} inputName="email" inputType="email" inputPlaceholder="Email" />
            </div>
            </div>
            <div className='field'>
            <div className=''>
            <Button
            buttonStyle={STYLES[3]}
            children={<i className="far fa-save"></i>}
            />
            </div>
        </div>
        </form>
     );
}
 
export default AddUserForm;