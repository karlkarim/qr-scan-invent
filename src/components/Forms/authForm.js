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
    subtitle: 'Please login to proceed',
    navLink: '/signup',
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
    onSubmit
}) => {
    const checkFormType = formType === 'signup' ? SIGNUP[0] : LOGIN[0]
    return (
        <section class="hero is-fullheight">
        <div class="hero-body">
            <div class="container has-text-centered">
                <div class="column is-4 is-offset-4">
                    <h3 class="title">{checkFormType.title}</h3>
                    <hr class="login-hr" />
                    <p class="subtitle">{checkFormType.subtitle}</p>
                    <div class="box">
                        <figure class="avatar">
                            <img src={logo} />
                        </figure>
                        <form onSubmit={onSubmit}>
                            <div class="field">
                                <div class="control">
                                    <input class="input is-large" name='email' type="email" placeholder="Your Email" autofocus="" />
                                </div>
                            </div>

                            <div class="field">
                                <div class="control">
                                    <input class="input is-large" name='password' type="password" placeholder="Your Password" />
                                </div>
                            </div>
                            <button class="button is-block is-info is-large is-fullwidth">{checkFormType.btnCTA} <i class="fa fa-sign-in" aria-hidden="true"></i></button>
                        </form>
                    </div>
                    <p class="has-text-grey">
                    <Link
                        to={checkFormType.navLink}
                        >{checkFormType.navLinkText}</Link>
                    </p>
                </div>
            </div>
        </div>
    </section>




    // <div className='container'>
    //     <div className='logo'>
    //         <img src={logo} alt='Logo' />
    //     </div>
    //     <div className='logo'>QR Inventory</div>
    //     <h1 className='sign' align='center'>{checkFormType.title}</h1>
    //     <div className='authContainer'>
    //     <form className='authForm' onSubmit={onSubmit}>
    //         <TextField textStyle='defaultIpnut' inputType='text' inputName='email' inputPlaceholder='Email'/>
    //         <TextField textStyle='defaultIpnut' inputType='password' inputName='password'inputPlaceholder='Password'/>
    //     <div className='formActionBtns'>
    //         <Button buttonSize={'btn-medium'} buttonStyle={'btn-primary-outline'} isPill={true} type='submit'>{checkFormType.btnCTA}</Button>
    //         {/* <Button buttonSize={'btn-medium'} buttonStyle={'btn-primary-outline'} isPill={true} type='submit'>{checkFormType.btnCTA}</Button> */}
    //     </div>
    //     </form>
    //     </div>
    //     <div style={{textAlign:'right',marginRight: '30px',
    //         marginTop: '30px', paddingBottom: '30px'}}>
    // <Link
    //     to={checkFormType.navLink}
    //     style={{
    //         textDecoration:'none',
    //         'a:visited': '#766aaf',
    //         color: '#766aaf',
    //         marginBottom: '30px'
    //     }}
    // >{checkFormType.navLinkText}</Link>
    // </div>
    // </div>
    )
}

export default AuthForm;