import React, { useCallback, useContext, setGlobal } from "reactn";
import { withRouter, Redirect } from "react-router";
import app from "../../../firebase.js";
import { AuthContext } from "../../auth/Auth";
import logo from '../../../img/logo.svg';
import "./index.css";
import { Link } from "react-router-dom";


const Login = ({ history }) => {
  const handleLogin = useCallback(
    async event => {
      event.preventDefault();
      
      const { email, password } = event.target.elements;
      try {
        const query = await app.firestore().collection('users').where('email', '==', email.value).get();
        const userData = query.docs.map(user => ({
            id: user.id,
            ...user.data()
        }))
        localStorage.setItem('user-data', JSON.stringify(userData))
        setGlobal({loggedInUserData : userData})
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
                <button className="formButton" type="submit">Login</button>
            </div>
      </form>

      <div className="signup-link">
        <Link to = '/signup'>Don't have an account?Sign up here</Link>
      </div>

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