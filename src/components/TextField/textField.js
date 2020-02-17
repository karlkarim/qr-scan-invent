import React from 'react';
import './textField.css';
const STYLE = [
    'defaultIpnut',
    'customInput'
]
const TextField = ({
    inputType,
    textStyle,
    inputName,
    inputPlaceholder,
    onClick
}) => {
    const applyStyle = STYLE.includes(textStyle) ? textStyle : STYLE[0]
    return (
        <input
        className={applyStyle}
        type={inputType}
        name={inputName}
        placeholder={inputPlaceholder}
        onClick={onClick}/>
    )
}
export default TextField;