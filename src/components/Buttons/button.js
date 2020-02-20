import React from 'react';
import './button.css';
export const STYLES = [
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
    buttonSize,
    isPill}) => {
    const checkStyle = STYLES.includes(buttonStyle) ? buttonStyle : STYLES[0];
    const checkSize = SIZE.includes(buttonSize) ? buttonSize : SIZE[0];
    const checkPill = isPill ? 'isPill' : ''
    SIZE.includes()
    return (
        <button className={`btn ${checkSize} ${checkStyle} ${checkPill}`} type={type} onClick={onClick}>
            {children}
        </button>
    )
}

export default Button;