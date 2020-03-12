import React, { useGlobal, useState } from 'reactn';
import { Link, useLocation } from 'react-router-dom';
import './index.css';
// import {logOut}  from '../../services/authServices'
const linksArr = [
  {link: '/', name: 'Home', icon: 'fas fa-home'},
    {link: '/manage-qr', name: 'QR Items', icon: 'fas fa-qrcode'},
    {link: '/manage-users', name: 'Users', icon: 'fas fa-users-cog'},
    {link: '/scan', name: 'Scan', icon: 'far fa-id-card'},
]

const BottomNav = () => {
  const location = useLocation();
    return ( 
    <div className='nav-root'>
    {linksArr.map((link, index) => (
      <Link to={`${link.link}`} style={{textDecoration: 'none'}}>
      <button
      className={`nav-button-root nav-menu-base-root ${location.pathname === link.link ? 'button-selected': ''}`}>
      <span className='nav-action-wrapper'>
        <i className={`${link.icon} nav-button-icon`}></i>
        <span className={`nav-action-label ${location.pathname === link.link ? 'button-selected': ''}`}>
        {link.name}
      </span>
      </span>
      </button>
      </Link>
      ))}
    </div>
     );
}
 
export default BottomNav;