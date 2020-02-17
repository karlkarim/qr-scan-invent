import React from 'react';
import TextField from '../TextField/textField';
import Button from '../Buttons/button';
export const LOGIN = [{
    type:'login',
    btnCTA: 'Login',
    navLink: 'signup'
}]
export const SIGNUP = [{
    type:'signup',
    btnCTA: 'Signup',
    navLink: 'login'
}]
const AuthForm = ({
    formType,
    onSubmit
}) => {
    const checkFormType = formType === 'signup' ? SIGNUP[0] : LOGIN[0]
    console.log(checkFormType[0])
    return (
    <form onSubmit={onSubmit}>
        <TextField inputType="text" inputName="email"/>
        <TextField inputType="password" inputName="password"/>
        <Button type="submit">{checkFormType.btnCTA}</Button>
    </form>
    )
}

export default AuthForm;