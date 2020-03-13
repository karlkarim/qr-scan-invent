import React from 'react';
import './index.css';

const TextField = ({
    inputType,
    inputName,
    inputPlaceholder,
    onClick,
    onChange,
    id,
    error,
    value
}) => {
    return (
        <>
        <input
            className={error ? 'textField-root danger-light': 'textField-root'}
            value={value}
            type={inputType}
            name={inputName}
            placeholder={inputPlaceholder}
            onChange={onChange}
            id={id}
            autoComplete="off"
            onClick={onClick}
        />
        {error ?     
        <p className="help is-danger">This field is required</p> :
        ''
        }
        </>
    )
}
export default TextField;