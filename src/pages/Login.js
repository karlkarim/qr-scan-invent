import React, { useCallback, useContext, setGlobal } from "reactn";
import { withRouter, Redirect } from "react-router";
import app from "../firebase.js";
import { AuthContext } from "../Auth.js";
import AuthForm from '../components/Forms/authForm';

const Login = ({ history }) => {
  const handleLogin = useCallback(
    async event => {
      event.preventDefault();
      const { email, password } = event.target.elements;
      try {
        const dbQuery = await app.firestore().collection('users').where('email', '==', email.value).get()
        const userData = dbQuery.docs.map(user => ({
          id: user.id,
          ...user.data()
        }))
      localStorage.setItem('user-data', JSON.stringify(userData));
      setGlobal({loggedInUserData: userData})
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
      <AuthForm formType="login" onSubmit={handleLogin} />
  );
};

export default withRouter(Login);