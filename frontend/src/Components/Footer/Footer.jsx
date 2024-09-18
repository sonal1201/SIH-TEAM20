// import React from 'react';
// import { Link } from 'react-router-dom';
// import './Footer.css';

// export default function Footer() {
//   return (
//     <footer className="footer bg-dark">
//       <p className="mb-0 text-muted" >© 2022 Company, Inc</p>

//       <Link to="/" className="d-flex align-items-center link-dark text-decoration-none">
//         <svg className="bi" width="40" height="32" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16">
//           <use xlinkHref="#bootstrap"></use>
//         </svg>
//       </Link>

//       <ul className="nav">
//         <li className="nav-item">
//           <Link to="/features" className="nav-link text-muted" style={{ color: 'white' }}>Features</Link>
//         </li>
//         <li className="nav-item">
//           <Link to="/faqs" className="nav-link text-muted" style={{ color: 'white' }}>FAQs</Link>
//         </li>
//         <li className="nav-item">
//           <Link to="/about" className="nav-link text-muted" style={{ color: 'white' }}>About</Link>
//         </li>
//       </ul>
//     </footer>
//   );
// }
import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css'; // Ensure this import is correct

const Footer = () => {
  return (
    <footer className="footer bg-dark">
      <p className="mb-0 text-light">© 2022 Company, Inc</p>

      <Link to="/" className="d-flex align-items-center link-dark text-decoration-none">
        <svg className="bi" width="40" height="32" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16">
          <use xlinkHref="#bootstrap"></use>
        </svg>
      </Link>

      <ul className="nav">
        <li className="nav-item">
          <Link to="/features" className="nav-link">Features</Link>
        </li>
        <li className="nav-item">
          <Link to="/faqs" className="nav-link">FAQs</Link>
        </li>
        <li className="nav-item">
          <Link to="/about" className="nav-link">About</Link>
        </li>
      </ul>
    </footer>
  );
};

export default Footer;
