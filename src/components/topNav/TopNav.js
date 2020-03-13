import React from 'react';
import './TopNav.css';
import logo from '../../img/logo.svg';

const TopNav = () => {
    return ( 
        <div className='top-nav-root'>
            <div className='nav-logo'>
                <img src={logo} alt='tmx logo'/>
            </div>
            <div className='nav-actions'>
            <i class="far fa-user-circle"></i>
            </div>
        </div>
     );
}
 
export default TopNav;