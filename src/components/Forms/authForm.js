import React from 'react';

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
    onSubmit,
    emailErrorMsg,
    usernameErrorMsg
}) => {
    const checkFormType = formType === 'signup' ? SIGNUP[0] : LOGIN[0]
    return (
        <section className="hero is-fullheight">
        <div className="hero-body">
            <div className="container has-text-centered">
                <div className="column is-4 is-offset-4">
                    <h3 className="title">{checkFormType.title}</h3>
                    <hr className="login-hr" />
                    <p className="subtitle">{checkFormType.subtitle}</p>
                    <div className="box">
                        <figure className="avatar">
                            <img src={logo} style={{borderRadius: 0}} alt={'logo'}/>
                        </figure>
                        <form onSubmit={onSubmit}>
                            <div className="field">
                                <div className="control">
                                    <input className="input is-large" name='email' type="email" placeholder="Your Email" autoFocus="" />
                                </div>
                                <p className="help is-danger">{emailErrorMsg}</p>
                            </div>
                            {formType === 'signup' ? 
                            <>
                                <div className="field">
                                <div className="control">
                                    <input className="input is-large" name='username' type="text" placeholder="Username" />
                                </div>
                                <p className="help is-danger">{usernameErrorMsg}</p>
                            </div>
                            <div className="field">
                                <div className="control">
                                    <input className="input is-large" name='fName' type="text" placeholder="First Name" />
                                </div>
                            </div>
                            <div className="field">
                                <div className="control">
                                    <input className="input is-large" name='lName' type="text" placeholder="Last Name" />
                                </div>
                            </div>
                            </>
                             : ''
                            }
                            <div className="field">
                                <div className="control">
                                    <input className="input is-large" name='password' type="password" placeholder="Your Password" />
                                </div>
                            </div>
                            <button className="button is-block is-info is-large is-fullwidth">{checkFormType.btnCTA} <i className="fa fa-sign-in" aria-hidden="true"></i></button>
                        </form>
                    </div>
                    <p className="has-text-grey">
                    <Link
                        to={checkFormType.navLink}
                        >{checkFormType.navLinkText}</Link>
                    </p>
                </div>
            </div>
        </div>
    </section>
    )
}

export default AuthForm;