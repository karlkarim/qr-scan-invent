import React from 'react';
import { Link } from 'react-router-dom';
import Button, { STYLES } from '../Buttons/button';
import logo from '../../assets/warehouses.svg';
import user from '../../assets/user.svg';
import TextField from '../TextField/index';
import TextFieldWithIcon from '../TextField/textFieldWithIcon';
import './authForm.css';

export const LOGIN = [{
	type:'login',
	btnCTA: 'Login',
	title: 'Welcome to Inventory managemnet system',
	subtitle: 'Please login to proceed',
	navLink: '/login',
	navLinkText: 'Don\'t have an account yet ?'
}]
export const SIGNUP = [{
	type:'signup',
	btnCTA: 'Signup',
	title: 'Sign up',
	subtitle: 'Please signup to proceed',
	navLink: '/login',
	navLinkText: 'I have an account, login'
}]
const AuthForm = ({
	formType,
	onSubmit,
	emailErrorMsg,
	usernameErrorMsg
}) => {
	const checkFormType = formType === 'signup' ? SIGNUP[0] : LOGIN[0]
	return (
		<div className='auth-form-root'>
			<div className='top-bg'></div>
			<div className='bottom-bg'></div>
			<div className='auth-form-top'>
				<h3 className="auth-form-title">{checkFormType.title}</h3>
				<img src={logo} style={{height: '40%'}} alt={'logo'}/>
			</div>
			<div className='auth-form-bottom'>
			<p className="subtitle">{checkFormType.subtitle}</p>
		<form onSubmit={onSubmit} autoComplete='off'>
			<div className='auth-inputs'>
		<TextFieldWithIcon
			icon='far fa-user'
			inputType='email'
			inputName='email'
			inputPlaceholder='Email'
		/>
		{/* <p className="help is-danger">{emailErrorMsg}</p> */}
		{formType === 'signup' ? 
		<>
		<TextField
			inputType='text'
			inputName='username'
			inputPlaceholder='Username'
		/>
		<p className="help is-danger">{usernameErrorMsg}</p>
		<TextField
			inputType='text'
			inputName='fName'
			inputPlaceholder='First name'
		/>
		<TextField
			inputType='text'
			inputName='lName'
			inputPlaceholder='Last name'
		/>
		</>
		: ''
	}
	<TextFieldWithIcon
			icon='fas fa-lock'
			inputType='password'
			inputName='password'
			inputPlaceholder='Password'
		/>
		<div className='auth-form-actions'>
			<Button buttonStyle={STYLES[0]} children={
			<>{checkFormType.btnCTA}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
				<i className="far fa-arrow-alt-circle-right"></i></>
				}/>
			<Link to={checkFormType.navLink}>
				Forgot Password ?
			</Link>
		</div>
	</div>
	</form>
	<div className='auth-form-footer'>
		&copy; Operating since 2020
	</div>
	</div>
	</div>
	)
}

export default AuthForm;