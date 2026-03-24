import { useState } from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const closeMenu = () => setIsOpen(false);

  const links = [
    { to: "/", label: "Home" },
    { to: "/projects", label: "Projects" },
    { to: "/about", label: "About" },
    { to: "/personal", label: "Personal" },
    { to: "/contact", label: "Contact" },
  ];

  return (
    <nav className="sticky top-0 z-50 border-b border-surface-border bg-surface/90 backdrop-blur-md">
      <div className="max-w-3xl mx-auto flex justify-between items-center px-6 py-4">
        <NavLink
          to="/"
          onClick={closeMenu}
          className="font-serif text-2xl text-text-primary italic"
        >
          yen
        </NavLink>

        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          <span
            className={`block w-5 h-px bg-text-primary transition-transform ${isOpen ? "rotate-45 translate-y-[7px]" : ""}`}
          />
          <span
            className={`block w-5 h-px bg-text-primary transition-opacity ${isOpen ? "opacity-0" : ""}`}
          />
          <span
            className={`block w-5 h-px bg-text-primary transition-transform ${isOpen ? "-rotate-45 -translate-y-[7px]" : ""}`}
          />
        </button>

        <ul
          className={`${isOpen ? "flex" : "hidden"} md:flex flex-col md:flex-row absolute md:relative top-full left-0 right-0 md:top-auto bg-surface/95 md:bg-transparent backdrop-blur-md md:backdrop-blur-none border-b md:border-0 border-surface-border gap-1 md:gap-8 p-6 md:p-0`}
        >
          {links.map(({ to, label }) => (
            <li key={to}>
              <NavLink
                to={to}
                onClick={closeMenu}
                className={({ isActive }) =>
                  `block text-sm py-2 md:py-0 transition-colors ${
                    isActive
                      ? "text-text-primary"
                      : "text-text-muted hover:text-text-secondary"
                  }`
                }
              >
                {label}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
