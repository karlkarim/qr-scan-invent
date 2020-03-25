import React, { useGlobal, useState, useEffect } from 'reactn';
import app from 'firebase'
import TextField from '../TextField/index';
import Button, { STYLES } from '../Buttons/button';
import './addUser.css';

const AddUserForm = ({userData}) => {
    const [ dialogState, setDialogState ] = useGlobal('dialogState')
    // eslint-disable-next-line
    const [ msg, setMsg ] = useGlobal('notificationMsg');
    const [uData, setUData ] = useState(userData);
    const [ loggedInUserData ] = useGlobal('loggedInUserData');
    const [ radioChecked, setRadioChecked ] = useState(userData.role);
    
    const handleRadio = (event) => {
       if(event) {
           console.log(event.target.value)
           setRadioChecked(event.target.value);
       }
    }
    console.log('muuda',radioChecked)
    const handleDialog = (type, msg) => {
        type === 'success' ?
        setMsg({show: true, msg:msg, variant:'success'}) && setDialogState(!dialogState) :
        setMsg({show: true, msg:msg, variant:''})

    }
    const addNewUser = async event => {
        event.preventDefault();
        const { email, password, username, fName, lName, role } = event.target.elements;
        let message = `New user ${fName.value.concat(lName.value)} has been added!`;

        try {
          const addUser = await app.auth()
            .createUserWithEmailAndPassword(email.value, password.value);
            app.firestore().collection('users').doc(username.value).set({
              firstName: fName.value,
              lastName: lName.value,
              email: email.value,
              role: role.value,
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
        const { email, fName, lName, uId, role } = event.target.elements;
        let message = `User data updated !`;
        try {
            const update = await app.firestore()
                .collection('users').doc(uId.value)
                .update({ firstName: fName.value,lastName:lName.value, role: role.value, email: email.value })
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
        setRadioChecked(userData.role)
    },[userData])

    return (
        !userData ?
        <form onSubmit={addNewUser}>
            <div className='left-side'>
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
                buttonStyle={STYLES[0]}
                children={<>Save&nbsp;<i className="far fa-save"></i></>}
                />
                </div>
            </div>
            
            </div>
            <div className='vertical-line'></div>
            <div className='right-side'>
                <div className='side-title'>User permissions</div>
            <input type="radio" id="admin" name="role" value="admin" />&nbsp;
            <label htmlFor="admin">Admin</label>&nbsp;
            <input type="radio" id="editor" name="role" value="editor" />&nbsp;
            <label htmlFor="editor">Editor</label>&nbsp;
            <input type="radio" id="user" name="role" value="user" />&nbsp;
            <label htmlFor="user">User</label>&nbsp;
            </div>
        </form>
        
        :
        
        <form onSubmit={editUser}>
        <div className='left-side'>
        <input hidden value={uData.id} name='uId'/>
        <div className='side-title'>User info</div>
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
            buttonStyle={STYLES[0]}
            children={<>Save&nbsp;<i className="far fa-save"></i></>}
            />
            </div>
            </div>
            </div>
            <div className='vertical-line'></div>
            <div className='right-side'>
                <div className='side-title'>User permissions</div>
            <input onChange={handleRadio} checked={radioChecked === 'admin'} type="radio" id="admin" name="role" value="admin" />&nbsp;
            <label htmlFor="admin">Admin</label>&nbsp;
            <input onChange={handleRadio} checked={radioChecked === 'editor'} type="radio" id="editor" name="role" value="editor" />&nbsp;
            <label htmlFor="editor">Editor</label>&nbsp;
            <input onChange={handleRadio} checked={radioChecked === 'user'} type="radio" id="user" name="role" value="user" />&nbsp;
            <label htmlFor="user">User</label>&nbsp;
            </div>
        </form>
        
     );
}
 
export default AddUserForm;