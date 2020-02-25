import React from 'react';
import './textField.css';
import { app } from 'firebase';
const STYLE = [
    'input',
    'input is-rounded'
]
const TextField = ({
    inputType,
    textStyle,
    inputName,
    inputPlaceholder,
    onClick,
    onChange,
    id,
    value
}) => {
    const applyStyle = STYLE.includes(textStyle) ? textStyle : STYLE[0]
    return (
        <div className='field is-horizontal'>
        <div className="field-label is-normal">
            <label className="label">Eseme nimi</label>
        </div>
        <div className="field-body">
            <div className="field">
            <p className="control">
                <input
                    className={applyStyle}
                    value={value}
                    type={inputType}
                    name={inputName}
                    placeholder={inputPlaceholder}
                    onChange={onChange}
                    id={id}
                    onClick={onClick}
                />
            </p>
            </div>
        </div>
        </div>
    )
}
export default TextField;