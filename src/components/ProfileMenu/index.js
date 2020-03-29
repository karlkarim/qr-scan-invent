import React, { useGlobal } from 'reactn';
import {logOut}  from '../../services/authServices'
import './index.css';
const ProfileMenu = () => {
    const [ loggedInUserData ] = useGlobal('loggedInUserData');
    const [ menuOpen, setMenuOpen ] = useGlobal('profileMenuState');
    const handleMenuState = () => {
        let sideMenu = document.querySelector('div.profile-menu-root');
    setTimeout(() => {
        sideMenu.className = sideMenu.className.replace('slideInRight', 'slideOutRight')
        setTimeout(() => {
            setMenuOpen(!menuOpen);
        }, 100);
    }, 100 );}
    return ( 
        <div style={{animationDuration: '0.2s'}} className={`profile-menu-root animated ${menuOpen ? 'slideInRight': 'menu-closed slideOutRight'}`}>
            <div onClick={() => handleMenuState()} className='profile-menu-backDrop'></div>
            <div className='menu-close'>
                <div onClick={() => handleMenuState()}>
                <i className="far fa-times-circle"></i>
                </div>
                <p>{loggedInUserData[0].firstName}</p>
            </div>
            <div className='menu-content'>
                <p>Item one</p>
                <p>Item two</p>
                <p>Item three</p>
                <p className='log-out' onClick={() => logOut()}>Log out&nbsp;<i className="fas fa-door-open"></i></p>
            </div>
        </div>
     );
}
 
export default ProfileMenu;