import { NavLink } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className="navbar">
            <div className="navbar-brand">
                <NavLink to="/">Yen Sauliak</NavLink>
            </div>
            <ul className="navbar-links">
                <li><NavLink to="/">Home</NavLink></li>
                <li><NavLink to="/projects">Projects</NavLink></li>
                <li><NavLink to="/about">About</NavLink></li>
                <li><NavLink to="/personal">Personal</NavLink></li>
                <li><NavLink to="/contact">Contact</NavLink></li>
            </ul>
        </nav>
    );
};

export default Navbar;