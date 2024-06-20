import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Header.css'; 
import logo from '../images/PA Logo.png';

const Header = () => {
  const location = useLocation();
  const isCollectionPage = location.pathname === '/collection';

  const handleHover = (e) => {
    const target = e.target;
    target.classList.toggle('hovered');
  };

  return (
    <header className="header">
      <div className="header-content">
        <div className="logo-container">
          <img src={logo} alt="Pokemon Archive Logo" className="logo" />
          <h1 className="title">Pokemon Archive</h1>
        </div>
        <nav className="nav-container">
          <ul className="nav-list">
              <li className={!isCollectionPage ? 'active' : ''}>
                  <Link to="/" onMouseEnter={handleHover} onMouseLeave={handleHover}>
                  Archive
                  </Link>
              </li>
              <li className={isCollectionPage ? 'active' : ''}>
                  <Link to="/collection" onMouseEnter={handleHover} onMouseLeave={handleHover}>
                  Your Collection
                  </Link>
              </li>
          </ul>
          <div className={isCollectionPage ? 'indicator collection' : 'indicator archive'}></div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
