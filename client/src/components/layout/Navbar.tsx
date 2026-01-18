import { useState } from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => setIsOpen(!isOpen);
    const closeMenu = () => setIsOpen(false);

    return (
        <nav className="navbar">
            <div className="navbar-brand">
                <NavLink to="/" onClick={closeMenu}>Yen</NavLink>
            </div>
            <button className="navbar-toggle" onClick={toggleMenu} aria-label="Toggle menu">
                <span className={`hamburger ${isOpen ? 'open' : ''}`}></span>
            </button>
            <ul className={`navbar-links ${isOpen ? 'active' : ''}`}>
                <li><NavLink to="/" onClick={closeMenu}>Home</NavLink></li>
                <li><NavLink to="/projects" onClick={closeMenu}>Projects</NavLink></li>
                <li><NavLink to="/about" onClick={closeMenu}>About</NavLink></li>
                <li><NavLink to="/personal" onClick={closeMenu}>Personal</NavLink></li>
                <li><NavLink to="/contact" onClick={closeMenu}>Contact</NavLink></li>
            </ul>
        </nav>
    );
};

export default Navbar;