import React, { useGlobal, useEffect } from 'reactn';

const NotificationMsg = () => {
    const [ msg, setMsg ] = useGlobal('notificationMsg');
    const msgTimer = () => {
        let el = document.getElementById("snackbar");
        setTimeout(() => { el.className = el.className.replace("bounceInLeft", "bounceOutRight"); }, 4000);
    }
    useEffect(() => {
        msgTimer()
    },[msg])
    return ( 
    <div style={{zIndex: 99999}} id='snackbar' className={`notification ${msg.variant === 'success' ? 'is-success' : 'is-danger'} animated bounceInLeft`}>
        <button className='delete' onClick={() => setMsg(!msg)}></button>
        {msg.msg}
    </div>
   );
}
 
export default NotificationMsg;