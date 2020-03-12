import React, { useGlobal }  from 'reactn';

import './modal.css';

const Modal = ({ header, body, actions}) => {
    const [ dialogState, setDialogState ] = useGlobal('dialogState');

    return(
    <div style={{animationDuration: '0.2s'}} className={`dialog-root animated  ${dialogState? 'fadeIn': 'not-active fadeOut'}`}>
        <div className='backDrop' onClick={() => setDialogState(!dialogState)}></div>
            <div className='dialog-container'>
            <div className='dialog-paper'>
                <div className="dialog-title">
                {header}
            </div>
            <div className='dialog-content-root'>
            {body}
          </div>
          <div className='dialog-actions-root'>
          {actions}
          </div>
          </div>
            </div>
    </div>
    )
}

export default Modal;