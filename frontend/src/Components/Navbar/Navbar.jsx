import React from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaUserShield } from 'react-icons/fa'; // Import the FaUserShield icon
import './Navbar.css';
import logo from './finallogo2.png'; // Import the logo image

export default function Navbar() {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-dark ">
            <div className="container-fluid">
                <div className="navbar-brand p-0">
                
                    <div class="logo">
                            POSTIFY
                    </div>

                </div>
                <button 
                    className="navbar-toggler" 
                    type="button" 
                    data-bs-toggle="collapse" 
                    data-bs-target="#navbarSupportedContent" 
                    aria-controls="navbarSupportedContent" 
                    aria-expanded="false" 
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div 
                    className="collapse navbar-collapse" 
                    id="navbarSupportedContent"
                >
                    <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                        <li className="nav-item" >
                            <Link className="nav-link" aria-current="page" to="/"style={{ color: 'white' }}>
                                <FaHome className="nav-icon red-icon " /> Home
                            </Link>
                        </li>
                        <li className="nav-item admin">
                            <Link className="nav-link" aria-current="page" to="/Login"style={{ color: 'white' }}>
                                <FaUserShield className="nav-icon red-icon " /> Admin
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}
