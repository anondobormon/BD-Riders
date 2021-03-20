import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../App';
import './Header.css';
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';

const Header = () => {
    const [loggedInUser] = useContext(UserContext);
    const loggedUser = loggedInUser.isSignIn;

    return (
        <div>
            <div className="header">
                <div className="logo">
                    <h1><span>BD Riders</span></h1>
                </div>
                <div className='menu-bar'>
                    <ul>
                        <li><Link to="/home">Home</Link></li>
                        <li><Link to="/destination">Destination</Link></li>
                        <li><Link to="/blog">Blog</Link> </li>
                        <li><Link to="/contact">Contact</Link></li>
                        {/* <li><Link to ="/takeRide">Ride</Link></li> */}
                        {loggedUser ? <li><Link >{loggedInUser.name}</Link></li> : <li><Link className='btn btn-warning' to="/login"> Log In</Link></li>}
                    </ul>

                </div>
            </div>









        </div>
    );
};

export default Header;