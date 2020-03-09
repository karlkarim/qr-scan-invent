import React, {useState} from 'react';
import { Link } from "react-router-dom";
import logo from '../img/logo.svg';
import app from "../firebase";
import {logOut} from '../services/authService' 




const linksArray = [
    
    {link: '/', name: 'Home'},
    // {link: '/signup', name: 'SignUp'},
    {link: '/qrscan', name: 'QRScan'},
    {link: '/QRManager', name: 'QRManager'}

]


const Nav = () => {
    
    const [navOpen, setNavOpen] = useState(false)
    
    const toggle = () => setNavOpen(!navOpen )
    return ( 
        // <ul>
        //     <li><Link to='/qrscan'> qr</Link></li>
        //     <li><Link to='/signup'> rega</Link></li>
        //     <li><Link to='/QRManager'> manageeri</Link></li>
        // </ul>
        <nav class="navbar" role="navigation" aria-label="main navigation">
            <div className="navbar-brand">
                <a class="navbar-item" href="">
                    <img src={logo} width="112" height="28"/>
                </a>
                <a role="button" onClick={toggle} className={`navbar-burger burger ${navOpen ? 'is-active ' : ''}`} is-active aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                </a> 
            </div>
            <div id="navbarBasicExample" is-active class= {`navbar-menu ${navOpen ? 'is-active ' : ''}`}>
                <div class="navbar-start">
                    {linksArray.map((link, index) =>(
                        <Link key={index} className='navbar-item' to={`${link.link}`}>
                            {link.name}
                        </Link>
                    ))}
                </div>
                <div class="navbar-end">
                    <div class="navbar-item">
                    <Link className='nav-bar-item' onClick={logOut}>
                        Sign out
                    </Link>&nbsp;
                    </div>
                </div>
            </div>
        </nav>
        
     );
}
 
export default Nav;