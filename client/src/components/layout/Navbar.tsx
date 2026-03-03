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
    <nav className="sticky top-0 z-50 flex justify-between items-center px-6 py-3 border-b border-surface-border backdrop-blur-xl bg-surface/80">
      <NavLink
        to="/"
        onClick={closeMenu}
        className="font-mono text-lg font-bold text-text-primary"
      >
        yen<span className="text-accent">_</span>
      </NavLink>

      <button
        className="md:hidden flex flex-col gap-1.5 p-2"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle menu"
      >
        <span
          className={`block w-5 h-0.5 bg-text-primary transition-transform ${isOpen ? "rotate-45 translate-y-2" : ""}`}
        />
        <span
          className={`block w-5 h-0.5 bg-text-primary transition-opacity ${isOpen ? "opacity-0" : ""}`}
        />
        <span
          className={`block w-5 h-0.5 bg-text-primary transition-transform ${isOpen ? "-rotate-45 -translate-y-2" : ""}`}
        />
      </button>

      <ul
        className={`${isOpen ? "flex" : "hidden"} md:flex flex-col md:flex-row absolute md:relative top-full left-0 right-0 md:top-auto bg-surface/95 md:bg-transparent backdrop-blur-xl md:backdrop-blur-none border-b md:border-0 border-surface-border gap-1 md:gap-8 p-4 md:p-0`}
      >
        {links.map(({ to, label }) => (
          <li key={to}>
            <NavLink
              to={to}
              onClick={closeMenu}
              className={({ isActive }) =>
                `block font-mono text-xs uppercase tracking-widest py-2 md:py-1 transition-colors border-b md:border-b ${
                  isActive
                    ? "text-accent border-accent"
                    : "text-text-muted border-transparent hover:text-text-secondary"
                }`
              }
            >
              {label}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
