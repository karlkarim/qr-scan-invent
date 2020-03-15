import React, { useGlobal } from 'reactn';
import './index.css';
import logo from '../../assets/tmdLogo.ico';
const TopNav = () => {
    const [ menuOpen, setMenuOpen ] = useGlobal('profileMenuState');
    return ( 
        <div className='top-nav-root'>
            <div className='nav-logo'>
                <img src={logo} alt='tmx logo'/>
            </div>
            <div onClick={() => setMenuOpen(!menuOpen)} className='nav-actions'>
            <i className="far fa-user-circle"></i>
            </div>
        </div>
     );
}
 
export default TopNav;