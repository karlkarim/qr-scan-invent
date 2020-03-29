import React, { useGlobal, useEffect } from 'reactn';
import { Link, useLocation } from 'react-router-dom';
import { adminLinks, editorLinks, userLinks} from './navOptions';
import './index.css';

const BottomNav = () => {
  const [ loggedInUserData ] = useGlobal('loggedInUserData');
  const location = useLocation();
  console.log(loggedInUserData[0].role)
  const handleNav = () => {
    let navOpts= [];
    switch (loggedInUserData[0].role) {
      case 'admin':
        navOpts = adminLinks;
        break;
      case 'editor':
        navOpts = editorLinks;
        break;
      default:
        navOpts = userLinks;
        break;
    }
    return navOpts
  }
  useEffect(() => {
    handleNav()
  })
  console.log(handleNav())
  return ( 
    <div className='nav-root'>
    {handleNav().map((link, index) => (
      <Link key={index} to={`${link.link}`} style={{textDecoration: 'none'}}>
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