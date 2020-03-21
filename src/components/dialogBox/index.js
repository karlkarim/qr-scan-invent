import React, {useGlobal} from 'reactn';
import './style.css';

const DialogBox = ({ header, body, actions }) => {
  const [ dialogState, setDialogState ] = useGlobal('dialogState')

    return(
      <div className={`dialog-root  ${dialogState? '': 'not-active'}`}>
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
export default DialogBox;