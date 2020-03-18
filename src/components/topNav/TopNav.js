import React, {useGlobal} from 'reactn';
import './TopNav.css';
import logo from '../../img/logo.svg';



const TopNav = () => {
    const [menuOpen, setMenuOpen] = useGlobal('profileMenuState')
    return ( 
        <div className='top-nav-root'>
            <div className='nav-logo'>
                <img src={logo} alt='tmx logo'/>
            </div>
            <div className='nav-action' onClick={() => setMenuOpen(!menuOpen)}>
            <i class="far fa-user-circle"></i>
            </div>
        </div>
     );
}
 
export default TopNav;