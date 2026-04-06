import React, { useState } from "react";
import { Link as ScrollLink } from "react-scroll"; 
import { Link as RouterLink } from "react-router-dom"; 
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const linkClass =
    "cursor-pointer hover:text-yellow-400 transition-colors duration-200";
  const activeClass = "text-yellow-400 border-b-2 border-yellow-400 pb-1";

  return (
    <>
      {/* Top Navbar */}
      <div className="fixed top-0 left-0 w-full border-b-gray-500 border-2 bg-black z-50 px-10 py-3 flex justify-between items-center">
        
       
        <div className="flex items-center gap-2 h-full">
          <RouterLink to="/">
            <img
              src="images/logo.png"
              alt="logo"
              className="h-12 w-12 rounded-full object-cover cursor-pointer"
            />
          </RouterLink>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex gap-6 text-white items-center">
          {["home", "about", "events", "gallery", "team", "contact"].map((section) => (
            <ScrollLink
              key={section}
              to={section}
              smooth={true}
              duration={500}
              offset={-80}
              activeClass={activeClass}
              className={linkClass}
            >
              {section.charAt(0).toUpperCase() + section.slice(1)}
            </ScrollLink>
          ))}

          {/* Icons */}
          <div className="bg-gray-700 p-4 rounded-full scale-75 ml-8 hover:bg-gray-600 cursor-pointer">
            <img src="vector/search.png" alt="search" />
          </div>
          <div className="bg-gray-700 p-4 rounded-full scale-75 hover:bg-gray-600 cursor-pointer">
            <img className="scale-125" src="vector/profile.png" alt="profile" />
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white"
          onClick={() => setIsOpen(true)}
        >
          <Menu size={28} />
        </button>
      </div>

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
          {["home", "about", "events", "gallery", "team", "contact"].map((section) => (
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
          ))}
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
