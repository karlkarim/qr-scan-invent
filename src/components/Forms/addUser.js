import React, { useGlobal, useState } from 'reactn';
import app from 'firebase'
import TextField from '../TextField/index';
import Button, { STYLES } from '../Buttons/button';

const AddUserForm = ({userData}) => {
    const [ dialogState, setDialogState ] = useGlobal('dialogState')
    const [ msg, setMsg ] = useGlobal('notificationMsg');
    const [uData, setUData ] = useState({
        fname: userData ? userData.firstName : '',
        lname: userData ? userData.lastName : ''
    })
    console.log(userData ? true : false)
    console.log(uData)
    const handleDoalig = (type, msg) => {

        // setDialogState(!dialogState)
        type === 'success' ?
        setMsg({show: true, msg:msg, variant:'success'}) && setDialogState(!dialogState) :
        setMsg({show: true, msg:msg, variant:''})

    }
    const addNewUser = async event => {
        event.preventDefault();
        console.log(event.target.elements)
        const { email, password, username, fName, lName } = event.target.elements;
        let message = `New user ${fName.value.concat(lName.value)} has been added!`;

        try {
          await app
            .auth()
            .createUserWithEmailAndPassword(email.value, password.value);
            app.firestore().collection('users').doc(username.value).set({
              firstName: fName.value,
              lastName: lName.value,
              email: email.value,
              dateCreated: Date.now()
            })
            handleDoalig('success', message);
        } catch (error) {
            let message = error.message;
            handleDoalig('error', message);
        }
      }
      const handleEditValues = (e, id) => {
        setUData(e.target.value)
        console.log(id)
    }
    const editUser = async (id) => {
        const event = window.event;
        event.preventDefault();
        console.log(id)
        console.log(event.target.elements)
        // try {
        //     console.log(fname.value)
        //     const update = await app.firestore().collection('users').doc(id).update({firstName: fname.value,lastName:lname.value})
        //     setDialogState(!dialogState)
        //     return update
        // } catch (error) {
        //     console.log(error)
        // }
    }
    console.log(userData)
    return (
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
     );
}
 
export default AddUserForm;