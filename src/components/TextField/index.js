import React from 'react';


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
    error,
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
            <div className="control">
                <input
                    className={error ? applyStyle + ' is-danger': applyStyle}
                    value={value}
                    type={inputType}
                    name={inputName}
                    placeholder={inputPlaceholder}
                    onChange={onChange}
                    id={id}
                    onClick={onClick}
                />
            </div>
            {error ?     
            <p class="help is-danger">
                This field is required
            </p> :
            ''
        }
            </div>
        </div>
        </div>
    )
}
export default TextField;