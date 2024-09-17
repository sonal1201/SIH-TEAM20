import React from 'react'
import Navbar from '../Navbar/Navbar.jsx'
import User from '../User/User.jsx'
import Footer from '../Footer/Footer.jsx'
import { Link } from 'react-router-dom'

export default function Admin() {
  return (
    <div>
      <header>
        <div>
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
              {/* <Link className="navbar-brand" to="/">Navbar</Link> */}
              <div className="photo">
                <img src="/Users/nishantkumar/Desktop/new/SIH-TEAM20/frontend/Screenshot 2024-09-17 133547.png" alt="" />
              </div>
              <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
              </button>
              <div className="collapse navbar-collapse collapse-light bg-light d-flex justify-content-end  " id="navbarSupportedContent">
                <div className="left ">
                  <div className="navbar-nav me-auto mb-2 mb-lg-0  ">

                    <Link className="nav-link active nav-item ms-5" aria-current="page" to="/">Home</Link>

                  </div>
                </div>


              </div>
            </div>
          </nav>
        </div>
      </header>




    </div>
  )
}
