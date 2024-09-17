import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'

export default function Navbar() {
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid">
                    {/* <Link className="navbar-brand" to="/">Navbar</Link> */}
                    <div className="photo">
                        <img src="https://www.india.gov.in/sites/upload_files/npi/files/logo_1.png" alt="" />
                    </div>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse collapse-light bg-light d-flex justify-content-end  " id="navbarSupportedContent">
                        <div className="left ">
                            <ul className="navbar-nav me-auto mb-2 mb-lg-0  ">
                                <li className="nav-item ms-5">
                                    <Link className="nav-link active" aria-current="page" to="/">Home</Link>
                                </li>

                                <li className="nav-item ms-5 admin ">
                                    <Link className="nav-link active" aria-current="page" to="/Login">IamAdmin</Link>
                                </li>

                            </ul>
                        </div>


                    </div>
                </div>
            </nav>
        </div>
    )
}
