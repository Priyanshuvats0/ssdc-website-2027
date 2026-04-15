import React, { useState } from "react";
import { Link as ScrollLink } from "react-scroll";
import { Link as RouterLink, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation(); // Tells us which page we are on

  // Check if we are on the Home page
  const isHome = location.pathname === "/"; 

 // Change hover:text-yellow-400 to hover:text-blue-400
const linkClass = "cursor-pointer hover:text-blue-400 transition-colors duration-200";

// Change text-yellow-400 and border-yellow-400 to blue-400
const activeClass = "text-blue-400 border-b-2 border-blue-400 pb-1";

  // The links to show ONLY on the Home page
  const navSections = ["home", "about", "events", "gallery", "team", "contact"];

  return (
    <>
      <nav className="fixed top-0 left-0 w-full border-b-gray-500 border-b-2 bg-black z-50 px-10 py-3 flex justify-between items-center">
        <div className="flex items-center gap-2 h-full">
          <RouterLink to="/">
            <img
              src="/images/logo.png"
              alt="SSDC Logo"
              className="h-12 w-12 rounded-full object-cover cursor-pointer hover:scale-105 transition"
            />
          </RouterLink>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex gap-6 text-white items-center">
          {isHome ? (
            // If on Home page, show scroll links
            navSections.map((section) => (
              <ScrollLink
                key={section}
                to={section}
                smooth={true}
                duration={500}
                offset={-80}
                activeClass={activeClass}
                spy={true} // Highlights the link as you scroll past the section
                className={linkClass}
              >
                {section.charAt(0).toUpperCase() + section.slice(1)}
              </ScrollLink>
            ))
          ) : (
            // If on Team page, just show a Home button
            <RouterLink to="/" className={linkClass}>
              &larr; Back to Home
            </RouterLink>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white"
          onClick={() => setIsOpen(true)}
        >
          <Menu size={28} />
        </button>
      </nav>

      {/* Mobile Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-gray-900 shadow-lg transform transition-transform duration-300 z-50 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center px-6 py-4 border-b border-gray-700">
          <h2 className="text-lg font-bold text-white">SSDC SLIET</h2>
          <button onClick={() => setIsOpen(false)}>
            <X size={28} className="text-white" />
          </button>
        </div>
        <div className="flex flex-col gap-6 px-6 py-8 text-white">
          {isHome ? (
            navSections.map((section) => (
              <ScrollLink
                key={section}
                to={section}
                smooth={true}
                duration={500}
                offset={-80}
                className={linkClass}
                onClick={() => setIsOpen(false)}
              >
                {section.charAt(0).toUpperCase() + section.slice(1)}
              </ScrollLink>
            ))
          ) : (
            <RouterLink
              to="/"
              className={linkClass}
              onClick={() => setIsOpen(false)}
            >
              &larr; Back to Home
            </RouterLink>
          )}
        </div>
      </div>

      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
    </>
  );
};

export default Navbar;