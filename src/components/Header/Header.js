import React from 'react'
import { Link } from 'react-router-dom';
import './Header.css'
export default function Header() {
    return (
        <>
            <nav className='navbar navbar-expand-lg navbar-light bg-dark'>
                <div className="container-fluid">
                    <Link to='/' className='navbar-brand logo'>Medical Mind</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="">
                            <i className="fas fa-bars" style={{ color: 'white' }}></i>
                        </span>
                    </button>
                    <div className="collapse navbar-collapse justify-content-end" id="navbarNavAltMarkup">
                        <div className="navbar-nav">
                            <Link to='/' className='nav-link'>Home</Link>
                            <Link to='/about-us' className='nav-link'>About Us</Link>
                            <Link to='/Contact-us' className='nav-link'>Contact Us</Link>
                            <Link to='/sign-in' className='nav-link'>Sign In</Link>
                        </div>
                    </div>
                </div>
            </nav>
        </>
    )
}