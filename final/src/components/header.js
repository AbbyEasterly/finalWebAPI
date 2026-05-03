import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from "../actions/authActions";

function Header() {
    const dispatch = useDispatch();
    const loggedIn = useSelector((state) => state.auth.loggedIn);
    const username = useSelector((state) => state.auth.username);
    
    
    const navigate = useNavigate();
    const logout = () => {
        dispatch(logoutUser());
        navigate('/login');
    };

    return (
        <div style ={{ backgroundColor: '#5a37ab', color: '#fff', padding: '1px 20px' }}>
            <div className="nav-links" style ={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', width: '100%' }}>
                <h2 className="logo" style ={{ color: '#fff', padding: '1px 20px', justifyContent: 'flex-start', width: '100%' }}> Flashcards! </h2>

                {loggedIn ? (
                    <>
                        <span style={{ color: '#fff', width:150 , marginRight: '20px' }}>Hello {username} </span>
                        <NavLink to="/home" style={{ color: '#fff',width: 100 , marginRight: '10px' }}>Home</NavLink>
                        <NavLink to="/create-pack" style={{ color: '#fff', width: 150, marginRight: '10px' }}>Create Pack</NavLink>
                        
                        <button onClick={logout} style={{ backgroundColor: 'transparent', font: 'inherit', border: 'none', color: '#fff', cursor: 'pointer' }}>Logout</button>
                    </>
                ) : (
                    <>
                        <NavLink to="/login" style={{ color: '#fff', marginRight: '20px' }}>Login</NavLink>
                        <NavLink to="/register" style={{ color: '#fff' }}>Register</NavLink>
                    </>
                )}
            </div>
        </div>
    );
}

export default Header;