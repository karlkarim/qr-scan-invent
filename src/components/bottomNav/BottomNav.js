import React, {useState} from 'react';
import { Link,useLocation } from "react-router-dom";
import logo from '../../img/logo.svg';
import app from "../../firebase";
import {logOut} from '../../services/authService' 
import "./BottomNav.css"

const linksArray = [
    
    {link: '/', name: 'Home', icon: 'fa fa-fw fa-home'},
    {link: '/qrscan', name: 'QRScan', icon: 'fas fa-qrcode'},
    {link: '/QRManager', name: 'QRManager', icon: 'fas fa-tasks'}

]


const BottomNav = () => {
    const location = useLocation();
      return ( 
      <div className='nav-root'>
      {linksArray.map((link) => (
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