import React, {useGlobal} from 'reactn'
import './style.css'
import {logOut} from '../../services/authService'

const ProfileMenu = () => {
    
    const [menuOpen, setMenuOpen] = useGlobal('profileMenuState')

    const handleMenuState = () => {
        setMenuOpen(!menuOpen)
    }

    console.log(menuOpen)
    return (

        <div className= {`profilemenu-root ${menuOpen ? '' : 'menu-closed'}`}>
            <div className="profilmenu-backdrop" onClick={() => handleMenuState()}></div>
            <div className="profilemenu-name">
                Karl
                <div onClick={() => handleMenuState()}>
                <i className="far fa-times-circle"></i>
                </div>
            </div>

            <div className="profilemenu-dropdown">
                <p>Manage Profile</p>
                <p>My Items</p>
                <p onClick={() => logOut()}>Sign Out</p>
            </div>

        </div>

    )

};

export default ProfileMenu;

