import React from 'react';
import './button.css';
const STYLES = [
    "btn-primary-solid",
    "btn-secondary-solid",
    "btn-warning-solid",
    "btn-danger-solid",
    "btn-primary-outline",
    "btn-secondary-outline",
    "btn-warning-outline",
    "btn-danger-outline",
]

export const SIZE = [{
    medium:"btn-medium",
    large:"btn-large",
    small:"btn-small"}]

const Button = ({
    children,
    type,
    onClick,
    buttonStyle,
    buttonSize}) => {
    const checkStyle = STYLES.includes(buttonStyle) ? buttonStyle : STYLES[0];
    const checkSize = SIZE.includes(buttonSize) ? buttonSize : SIZE.medium;
    SIZE.includes()
    return (
        <button className={`btn ${checkSize} ${checkStyle}`} type={type} onClick={onClick}>
            {children}
        </button>
    )
}

export default Button;