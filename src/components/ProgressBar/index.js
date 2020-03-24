import React from 'react';
import './index.css';

const ProgressBar = ({ label, progress }) => {
  const isEnding = () => {
    console.log(typeof(progress))
    if(progress >= 70) {
      return true;
    } else {
      return false;
    }
  }
  isEnding()
  return ( 
    <>
    <div className="progress-bar">
      <span className="bar">
        <span className={`progress ${isEnding() ? 'ending': ''}`} style={{width:`${progress}%`}}></span>
      </span>
    </div>
        <div className="days-left">{label}</div>
        </>
   );
}
 
export default ProgressBar;