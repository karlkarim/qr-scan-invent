import React, { useGlobal, useEffect } from 'reactn';
import './index.css';

const NotificationMsg = () => {
    const [ msg, setMsg ] = useGlobal('notificationMsg');
    const msgTimer = () => {
        let el = document.getElementById("snackbar");
        setTimeout(() => {
            el.className = el.className.replace("bounceInLeft", "bounceOutRight");
            setTimeout(() => {
                setMsg({show: false, msg:'', variant:'success'})
            }, 1000);
        }, 4000 );
    }
    useEffect(() => {
        msgTimer()
    },[msg])
    return ( 
    <div id='snackbar' className={`notification-root animated bounceInLeft`}>
        <div className={`notification-content ${msg.variant === 'success' ? 'green-light' : 'danger-light'}`}>
        <div className={`notification-type ${msg.variant === 'success' ? 'success': 'error'}`}>
            <i class={`${msg.variant === 'success' ? 'far fa-check-circle' :  'fas fa-exclamation'}`}></i>
        </div>
        <div className='message'>
        {msg.msg}
        </div>
        </div>
    </div>
   );
}
 
export default NotificationMsg;