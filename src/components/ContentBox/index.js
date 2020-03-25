import React from 'react';
import './index.css';
const ContentBox = ({title, icon, children}) => {
  return ( 
    <div className='content-box-root'>
      <div className='content-box-header'>
        <div>{title}</div>
        <div>{icon}</div>
      </div>
      <div className='content-box-content'>
        {children}
      </div>
    </div>
   );
}
 
export default ContentBox;