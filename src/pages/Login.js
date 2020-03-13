import React from "reactn";
import { withRouter, Redirect } from "react-router";
import LoginForm from '../components/forms/loginForm'


const Login = ({ history }) => {
  return (
      <LoginForm/>
  )};

export default withRouter(Login);