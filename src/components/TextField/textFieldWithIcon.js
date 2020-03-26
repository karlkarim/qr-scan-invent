import React from 'react';
import './index.css';

const TextFieldWithIcon = ({
    inputType,
    inputName,
    inputPlaceholder,
    onClick,
    onChange,
    id,
    error,
    value,
    icon
}) => {
    const autoCompleteHack = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    return (
        <div className='input-container'>
        <i class={`${icon} textField-icon`}></i>
        <input
            className={error ? 'textField-withIcon-root danger-light': 'textField-withIcon-root'}
            value={value}
            type={inputType}
            name={inputName}
            placeholder={inputPlaceholder}
            onChange={onChange}
            id={id}
            autoComplete={'new-password'}            
            onClick={onClick}
        />
        {error ?     
        <p className="help is-danger">This field is required</p> :
        ''
        }
        </div>
    )
}
export default TextFieldWithIcon;