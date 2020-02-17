import React from 'react';

const TextField = ({
    inputType,
    inputName,
    inputPlaceholder,
    onClick
}) => {
    return (
        <input
        type={inputType}
        name={inputName}
        placeholder={inputPlaceholder}
        onClick={onClick}/>
    )
}
export default TextField;