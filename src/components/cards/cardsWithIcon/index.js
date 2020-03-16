import React from 'react';
import './style.css'


const CardIcon = ({ icon, text, onClick }) =>{

    return(

        
    <>    
    <div className="card-container" onClick={onClick}>
        <div className="card-content">
            <div className="card-icon"><i class={icon}></i></div>
            <div className="card-text" >{text}</div>
        </div>
    </div>
    </>
    )
}

export default CardIcon;
