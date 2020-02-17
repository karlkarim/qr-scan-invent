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
    "btn-karl-custom"
]

export const SIZE = [
    "btn-medium",
    "btn-large",
    "btn-small"]

const Button = ({
    children,
    type,
    onClick,
    buttonStyle,
    buttonSize}) => {
    const checkStyle = STYLES.includes(buttonStyle) ? buttonStyle : STYLES[0];
    const checkSize = SIZE.includes(buttonSize) ? buttonSize : SIZE[0];
    SIZE.includes()
    return (
        <button className={`btn ${checkSize} ${checkStyle}`} type={type} onClick={onClick}>
            {children}
        </button>
    )
}

export default Button;