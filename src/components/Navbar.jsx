import React, { useState } from "react";
import { Link as ScrollLink } from "react-scroll";
import { Link as RouterLink, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const isHome = location.pathname === "/"; 

  const linkClass = "cursor-pointer hover:text-blue-400 transition-colors duration-200";
  const activeClass = "text-blue-400 border-b-2 border-blue-400 pb-1";

  // Removed "contact" from the array
  const navSections = ["home", "about", "events", "gallery", "team"];

  return (
    <>
      {/* Glassmorphism applied here! 
        bg-black/50 gives it 50% transparency, backdrop-blur-md blurs what's behind it 
      */}
      <nav className="fixed top-0 left-0 w-full border-b border-white/10 bg-black/50 backdrop-blur-md z-50 px-10 py-3 flex justify-between items-center transition-all duration-300">
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
        <div className="hidden md:flex gap-6 text-white items-center font-medium">
          {isHome ? (
            navSections.map((section) => (
              <ScrollLink
                key={section}
                to={section}
                smooth={true}
                duration={500}
                offset={-80}
                activeClass={activeClass}
                spy={true}
                className={linkClass}
              >
                {section.charAt(0).toUpperCase() + section.slice(1)}
              </ScrollLink>
            ))
          ) : (
            <RouterLink to="/" className={linkClass}>
              &larr; Back to Home
            </RouterLink>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white hover:text-blue-400 transition"
          onClick={() => setIsOpen(true)}
        >
          <Menu size={28} />
        </button>
      </nav>

      {/* Mobile Sidebar - Also upgraded with a glass effect! */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-black/80 backdrop-blur-xl border-l border-white/10 shadow-2xl transform transition-transform duration-300 z-50 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center px-6 py-5 border-b border-white/10">
          <h2 className="text-lg font-bold text-white tracking-wider">SSDC</h2>
          <button onClick={() => setIsOpen(false)}>
            <X size={28} className="text-white hover:text-blue-400 transition" />
          </button>
        </div>
        <div className="flex flex-col gap-6 px-6 py-8 text-white font-medium">
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
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 transition-opacity"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
    </>
  );
};

export default Navbar;