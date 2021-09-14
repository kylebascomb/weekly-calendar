import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import { Typography } from '@material-ui/core';

const NavigationBar = ({ auth, onClick }) => {
    const [click, setClick] = useState(false);

    const handleClick = () => setClick(!click);
    const closeMobileMenu = () => setClick(false);


    return (
        <>
            <nav className="navbar">
                <div className="navbar-container">
                    <Link to="/" className="navbar-logo" onClick={closeMobileMenu}>
                        <Typography variant='h4'>Plan My Week</Typography>
                    </Link>
                    <div className='menu-icon' onClick={handleClick}>
                        <i className={click ? 'fa fa-times' : 'fa fa-bars'} />
                    </div>
                </div>
                <ul className={click ? 'nav-menu active' : 'nav-menu'}>
                    <li className='nav-item'>
                        {auth ? (
                            <Link to='/calendar' className='nav-links' onClick={closeMobileMenu}>
                                My Calendar
                            </Link>
                        ) : (
                            <Link to='/login' className='nav-links' onClick={closeMobileMenu}>
                                My Calendar
                            </Link>
                        )
                        }
                    </li>
                    {auth ? (
                        <li className='nav-item'>
                            <Link to='/login' className='nav-links' onClick={onClick}>
                                Logout
                            </Link>
                        </li>
                    ) : (<li className='nav-item'>
                        <Link to='/login' className='nav-links' onClick={closeMobileMenu}>
                            Login
                        </Link>
                    </li>)
                    }

                </ul>
            </nav>
        </>
    )
}

export default NavigationBar;