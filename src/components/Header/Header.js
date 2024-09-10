import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../../firebaseConfig'; 
import { onAuthStateChanged, signOut } from 'firebase/auth'; 
import './Header.css';

export default function Header() {
    const [user, setUser] = useState(null); 
    const navigate = useNavigate();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user); 
            } else {
                setUser(null); 
            }
        });

        return () => unsubscribe(); 
    }, []);

    
    const handleSignOut = async () => {
        try {
            await signOut(auth); 
            navigate('/sign-in'); 
        } catch (error) {
            console.error('Error signing out: ', error);
        }
    };

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
                            <Link to='/contact-us' className='nav-link'>Contact Us</Link>
                            {user ? (
                                <button className='nav-link btn' onClick={handleSignOut}>Sign Out</button>
                            ) : (
                                <Link to='/sign-in' className='nav-link'>Sign In</Link>
                            )}
                        </div>
                    </div>
                </div>
            </nav>
        </>
    );
}
