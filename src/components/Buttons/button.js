import React from 'react';
import './button.css';
export const STYLES = [
    "is-primary",
    "btn-warning-solid",
    "btn-primary-solid",
    "btn-secondary-solid",
    "btn-danger-solid",
    "btn is-danger",
    "is-primary is-outlined",
    "is-info is-outlined",
    "is-success is-outlined",
    "is-danger is-outlined",
    "btn-karl-custom"
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
        <button className={`btn ${checkSize} ${checkStyle} ${checkPill}`} type={type} onClick={onClick}>
            {children}
        </button>
    )
}

export default Button;