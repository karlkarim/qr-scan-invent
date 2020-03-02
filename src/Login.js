import React, { useCallback, useContext } from "react";
import { withRouter, Redirect } from "react-router";
import app from "./firebase.js";
import { AuthContext } from "./Auth.js";
import logo from './img/logo.svg';
import "./Login.css";

const Login = ({ history }) => {
  const handleLogin = useCallback(
    async event => {
      event.preventDefault();
      const { email, password } = event.target.elements;
      try {
        await app
          .auth()
          .signInWithEmailAndPassword(email.value, password.value);
        history.push("/");
      } catch (error) {
        alert(error);
      }
    },
    [history]
  );

  const { currentUser } = useContext(AuthContext);

  if (currentUser) {
    return <Redirect to="/" />;
  }

  return (
    <div className="main">
      <div className="logo">
            <img src={logo} alt="Logo" />
      </div>
      <div className="description">
        QR Inventory
      </div>
      <h1 className="loginSign" align="center">Login</h1>
      <form className="form1" onSubmit={handleLogin}>
            <div>     
                <input className="usern" align="center" name="email" type="email" placeholder="Email" />
            </div>
                <input className="pass" align="center" name="password" type="password" placeholder="Password" />          
            <div>
                <button type="submit">Login</button>
            </div>
      </form>

      {/* <form onSubmit={handleLogin}>
        <label>
          Email
          <input name="email" type="email" placeholder="Email" />
        </label>
        <label>
          Password
          <input name="password" type="password" placeholder="Password" />
        </label>
        <button type="submit">Log in</button>
      </form> */}
    </div>
  );
};

export default withRouter(Login);