import React from "react";
import { withRouter } from "react-router";
//import app from "../firebase";
import SigninForm from '../components/forms/signupForm'



const SignUp = ({ history }) => {
  return(
    <SigninForm/>
  )};

export default withRouter(SignUp);