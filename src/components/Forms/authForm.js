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
        <div className='authContainer'>
        <form className='authForm' onSubmit={onSubmit}>
            <TextField textStyle='defaultIpnut' inputType='text' inputName='email' inputPlaceholder='Email'/>
            <TextField textStyle='defaultIpnut' inputType='password' inputName='password'inputPlaceholder='Password'/>
        </form>
        <div className='formActionBtns'>
            <Button buttonSize={'btn-medium'} buttonStyle={'btn-primary-outline'} isPill={true} type='submit'>{checkFormType.btnCTA}</Button>
            <Button buttonSize={'btn-medium'} buttonStyle={'btn-primary-outline'} isPill={true} type='submit'>{checkFormType.btnCTA}</Button>
        </div>
        </div>
        <div style={{textAlign:'right',marginRight: '30px',
            marginTop: '30px', paddingBottom: '30px'}}>
    <Link
        to={checkFormType.navLink}
        style={{
            textDecoration:'none',
            'a:visited': '#766aaf',
            color: '#766aaf',
            marginBottom: '30px'
        }}
    >{checkFormType.navLinkText}</Link>
    </div>
    </div>
    )
}

export default AuthForm;