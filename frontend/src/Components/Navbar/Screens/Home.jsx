// import React from 'react'
// import Navbar from '../Navbar/Navbar.jsx'
// import User from '../User/User.jsx'
// import Footer from '../Footer/Footer.jsx'

// export default function Home() {
//   return (
//     <div>
//         <div> <Navbar/> </div>
//         <div> <User/> </div>
//         <div> <Footer/> </div>

      
//     </div>
//   )
// }


import React from 'react';
import Navbar from '../Navbar/Navbar.jsx';
import User from '../User/User.jsx';
import Footer from '../Footer/Footer.jsx';
import './Home.css'; // Add this import for your styles

export default function Home() {
  return (
    <div className="home-container">
      <Navbar />
      <div className="main-content">
        <User />
      </div>
      <Footer />
    </div>
  );
}
