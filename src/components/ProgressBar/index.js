import React from 'react';
import './index.css';

const ProgressBar = ({ label, progress }) => {
  
  const isEnding = () => {
    if(progress <= 2) {
      return true;
    } else {
      return false;
    }
  }
  const calcProgress = () => {
    if(progress <= 10) {
      return 100-(progress*10)  
    }
  }
  return ( 
    <>
    <div className="progress-bar">
      <span className="bar">
        <span className={`progress ${isEnding() ? 'ending': ''}`} style={{width:`${calcProgress()}%`}}></span>
      </span>
    </div>
        <div className={`days-left ${isEnding() ? 'text-ending': ''}`}>{label}</div>
        </>
   );
}
 
export default ProgressBar;