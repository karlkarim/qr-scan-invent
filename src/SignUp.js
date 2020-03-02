import React, { useCallback } from "react";
import { withRouter } from "react-router";
import app from "./firebase";
import "./SignUp.css";
import logo from './img/logo.svg';

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
    <div className="main">
        <div className="logo">
            <img src={logo} alt="Logo" />
        </div>
        <div className="description">
            QR Inventory
        </div>
      <h1 className="sign" align="center">Sign up</h1>
      <form className="form1" onSubmit={handleSignUp}>
            <div>     
                <input className="usern" align="center" name="email" type="email" placeholder="Email" />
            </div>
                <input className="pass" align="center" name="password" type="password" placeholder="Password" />          
            <div>
                <button type="submit">Sign Up</button>
            </div>
      </form>
    </div>
  );
};

export default withRouter(SignUp);