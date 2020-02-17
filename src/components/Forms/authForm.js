import React from 'react';
import TextField from '../TextField/textField';
import { Link } from 'react-router-dom';
import Button from '../Buttons/button';
import './authForm.css';
import logo from '../../assets/logo.png';
export const LOGIN = [{
    type:'login',
    btnCTA: 'Login',
    title: 'Login',
    navLink: '/signup',
    navLinkText: 'Don\'t have an account yet ?'
}]
export const SIGNUP = [{
    type:'signup',
    btnCTA: 'Signup',
    title: 'Sign up',
    navLink: '/login',
    navLinkText: 'I have an account, login'
}]
const AuthForm = ({
    formType,
    onSubmit
}) => {
    const checkFormType = formType === 'signup' ? SIGNUP[0] : LOGIN[0]
    return (
    <div className='container'>
        <div className='logo'>
            <img src={logo} alt='Logo' />
        </div>
        <div className='logo'>QR Inventory</div>
        <h1 className='sign' align='center'>{checkFormType.title}</h1>
        <form onSubmit={onSubmit} className='form1'>
            <TextField textStyle='defaultIpnut' inputType='text' inputName='email'/>
            <TextField textStyle='defaultIpnut' inputType='password' inputName='password'/>
            <Button buttonStyle={'btn-karl-custom'} type='submit'>{checkFormType.btnCTA}</Button>
        </form>
    <Link to={checkFormType.navLink}>{checkFormType.navLinkText}</Link>
    </div>
    )
}

export default AuthForm;