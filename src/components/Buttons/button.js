import React from 'react';
import './button.css';
export const STYLES = [
    "btn-primary-solid",
    "btn-secondary-solid",
    "btn-info-solid",
    "btn-success-solid",
    "btn-warning-solid",
    "btn-danger-solid",
    "btn-primary-outline",
    "btn-secondary-outline",
    "btn-info-outline",
    "btn-success-outline",
    "btn-warning-outline",
    "btn-danger-outline",
]
export const SIZE = [
    "is-small",
    "is-normal",
    "is-medium",
    "is-large"]

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
        <button
            className={`btn ${checkSize} ${checkStyle} ${checkPill}`}
            type={type}
            onClick={onClick}>
            {children}
        </button>
    )
}

export default Button;