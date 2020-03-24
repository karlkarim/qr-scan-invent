import React from 'react';
import './index.css';
const ContentBox = ({title, children}) => {
  return ( 
    <div className='content-box-root'>
      <div className='content-box-header'>
        <div>{title}</div>
        <div><i class="fas fa-history"></i></div>
      </div>
      <div className='content-box-content'>
        {children}
      </div>
    </div>
   );
}
 
export default ContentBox;