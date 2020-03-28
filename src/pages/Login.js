import React, { useCallback, useContext, setGlobal } from "reactn";
import { withRouter, Redirect } from "react-router";
import app from "../firebase.js";
import { AuthContext } from "../Auth.js";
import AuthForm from '../components/Forms/authForm';

const Login = ({ history }) => {
  const transitions = () => {
    document.querySelector('.auth-form-top').classList.add('testing-top')
    document.querySelector('.auth-form-bottom').classList.add('testing-bottom')
  }
  const handleLogin = useCallback(
    async event => {
      event.preventDefault();
      const { email, password } = event.target.elements;
      try {
        const dbQuery = await app.firestore().collection('users')
        .where('email', '==', email.value)
        .get()
        const userData = dbQuery.docs.map(user => ({
          id: user.id,
          ...user.data()
        }))
      localStorage.setItem('user-data', JSON.stringify(userData));
      setGlobal({loggedInUserData: userData})
        await app
          .auth()
          .signInWithEmailAndPassword(email.value, password.value);
          transitions()
          setTimeout(() => {
            history.push("/");
          },1000);
      } catch (error) {
        alert(error);
      }
    },
    [history]
  );

  const { currentUser } = useContext(AuthContext);
  
  setTimeout(() => {
    if (currentUser) {
      return <Redirect to="/" />;
    }
    },100)
  return (
      <AuthForm formType="login" onSubmit={handleLogin} />
  );
};

export default withRouter(Login);