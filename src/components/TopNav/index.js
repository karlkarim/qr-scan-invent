import React from 'react';
import './index.css';
import logo from '../../assets/tmdLogo.ico';

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