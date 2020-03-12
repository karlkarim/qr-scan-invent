import React, { useCallback, useState } from "react";
import { withRouter } from "react-router";
import app from "../firebase";
import AuthForm from '../components/Forms/authForm';
const SignUp = ({ history }) => {
  const [ emailErrorMsg, setEmailErrorMsg] = useState('')
  const [ usernameErrorMsg, setUsernameErrorMsg] = useState('')
  
  const handleSignUp = useCallback(async event => {
    event.preventDefault();
    const { email, password, username, fName, lName } = event.target.elements;
    try {
      const emailExists = await app.firestore().collection('users').doc(email.value).get().exists
      const userNameExists = await app.firestore().collection('users').doc(username.value).get().exists
      if(emailExists || userNameExists) {
        setEmailErrorMsg('Email already taken');
        setUsernameErrorMsg('Username already in use');
        return
      } else {
        await app
          .auth()
          .createUserWithEmailAndPassword(email.value, password.value);
          app.firestore().collection('users').doc(username.value).set({
            firstName: fName.value,
            lastName: lName.value,
            email: email.value,
            dateCreated: Date.now()
          })
        history.push("/");
      }
    } catch (error) {
      alert(error);
    }
  }, [history]);

  return (
      <AuthForm
        emailErrorMsg={emailErrorMsg}
        usernameErrorMsg={usernameErrorMsg}
        onSubmit={handleSignUp}
        formType="signup"/>
  );
};

export default withRouter(SignUp);