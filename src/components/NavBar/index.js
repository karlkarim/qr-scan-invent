import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/tmdLogo.png'
const linksArr = [
    {link: '/manage-qr', name: 'Manage QR'},
    {link: '/scan', name: 'Scan'},
    {link: '/', name: 'Home'}
]
const NavBar = () => {
    return ( 
        <nav class="navbar" role="navigation" aria-label="main navigation">
  <div class="navbar-brand">
    <a class="navbar-item" href="https://bulma.io">
      <img src={logo} width="112" height="28" alt='logo'/>
    </a>

    <a role="button" class="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
    </a>
  </div>

  <div id="navbarBasicExample" class="navbar-menu">
    <div class="navbar-start">
        {linksArr.map((link, index) => (
            <Link className='navbar-item' to={`${link.link}`}>
                {link.name}
            </Link>
        ))}
    </div>

    <div class="navbar-end">
      <div class="navbar-item">
        <div class="buttons">
          <a class="button is-primary">
            <strong>Sign up</strong>
          </a>
          <a class="button is-light">
            Log in
          </a>
        </div>
      </div>
    </div>
  </div>
</nav>
     );
}
 
export default NavBar;