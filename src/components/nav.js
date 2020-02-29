import React from 'react';
import { Link } from "react-router-dom";

const linksArray = [
    
    {link: '/', name: 'Home'},
    {link: '/signup', name: 'SignUp'},
    {link: '/qrscan', name: 'QRScan'},
    {link: '/QRManager', name: 'QRManager'}

]




const Nav = () => {
    return ( 
        // <ul>
        //     <li><Link to='/qrscan'> qr</Link></li>
        //     <li><Link to='/signup'> rega</Link></li>
        //     <li><Link to='/QRManager'> manageeri</Link></li>
        // </ul>
        <nav class="navbar" role="navigation" aria-label="main navigation">
                <div id="navbarBasicExample" class="navbar-menu">
                    <div class="navbar-start">
                        {linksArray.map((link, index) =>(
                            <Link key={index} className='navbar-item' to={`${link.link}`}>
                                {link.name}
                            </Link>
                        ))}




                    </div>




                </div>


        </nav>
        
     );
}
 
export default Nav;