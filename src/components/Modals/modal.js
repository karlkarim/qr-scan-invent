import React, { useState }  from 'react';
import classNames from 'classnames';
import './modal.css'

const Modal = ({modalState, header, body, actions}) => {
    return(
    <div className={`overlay ${modalState? 'open': ''}`}>
        <div className='modal'>
            <div className='modal-header'>
                {header}
            </div>
            <div className='modal-body'>
            {body}
            </div>
            <div className='modal-actions'>
            {actions}
            </div>
        </div>
    </div>
    )
}

export default Modal;