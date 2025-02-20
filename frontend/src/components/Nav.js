import React, { useEffect } from 'react';
import {Link, useNavigate} from 'react-router-dom';

const Nav = ()=>{
    const auth = localStorage.getItem('user');
    const navigate = useNavigate();
    const logOut = ()=>{
        localStorage.clear();
        navigate('/signup');
    };
    
    return(
        <div>
            <img alt="logo" className='logo' src="logo121.png" alt="Logo" />
            { auth ?
            <ul className='navBox'>
                <li><Link to="/">Products</Link></li>
                <li><Link to="/add">Add</Link></li>
                <li><Link to="/update">update</Link></li>
                <li><Link to="/profile">Profile</Link></li>
                <li><Link onClick={logOut} to="/signup">Logout({JSON.parse(auth).name})</Link></li>
            </ul>:
            <ul className='navBox'>
                <li><Link to="/login">Login</Link></li>
                <li><Link to="/signup">SignUp</Link></li>
            </ul>
         }
        </div>
    )
}
export default Nav;