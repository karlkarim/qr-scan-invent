import React from 'react';
import { Link } from "react-router-dom";

const Nav = () => {
    return ( 
        <ul>
            <li><Link to='/qrscan'> qr</Link></li>
            <li><Link to='/signup'> rega</Link></li>
            <li><Link to='/QRManager'> manageeri</Link></li>
        </ul>
     );
}
 
export default Nav;