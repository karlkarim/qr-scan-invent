import React, { useState }  from 'react';
import classNames from 'classnames';
import './modal.css';

const Modal = ({modalState, header, body, actions}) => {
    return(
    <div style={{animationDuration: '0.2s'}} className={`modal animated  ${modalState? 'is-active fadeIn': 'fadeOut'}`}>
        <div className='modal-background'></div>
            <div className="modal-card">
                <header className="modal-card-head">
                <p className="modal-card-title">{header}</p>
                <button className="delete" aria-label="close"></button>
            </header>
            <section className="modal-card-body">
            {body}
          </section>
          <footer className="modal-card-foot">
          {actions}
          </footer>
            </div>
    </div>
    )
}

export default Modal;