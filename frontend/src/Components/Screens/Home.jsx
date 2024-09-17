import React from 'react'
import Navbar from '../Navbar/Navbar.jsx'
import User from '../User/User.jsx'
import Footer from '../Footer/Footer.jsx'

export default function Home() {
  return (
    <div>
        <div> <Navbar/> </div>
        {(!localStorage.getItem("authtoken")) ?
                    <div> <User/> </div>
          :
          <div>
            this is admin page
          </div>
          }
        <div> <Footer/> </div>
      
    </div>
  )
}
