import React, { useCallback } from "react";
import { withRouter } from "react-router";
import app from "../firebase";
import AuthForm from '../components/Forms/authForm';
const SignUp = ({ history }) => {
  const handleSignUp = useCallback(async event => {
    event.preventDefault();
    const { email, password } = event.target.elements;
    try {
      await app
        .auth()
        .createUserWithEmailAndPassword(email.value, password.value);
      history.push("/");
    } catch (error) {
      alert(error);
    }
  }, [history]);

  return (
    <div>
      <AuthForm onSubmit={handleSignUp} formType="signup"/>
    </div>
  );
};

export default withRouter(SignUp);